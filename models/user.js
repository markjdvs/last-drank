const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
  image: { type: String }
});

userSchema
  .virtual('imageSRC')
  .get(function getImageSRC() {
    if(!this.image) return null; //could put a placeholder image in here like a blank face
    return `https://s3-eu-west-1.amazonaws.com/wdi-25-full-stack-app/${this.image}`;
  });

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image }, next); //amazon calls files objects, folders buckets
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', userSchema);
