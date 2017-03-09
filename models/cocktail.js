const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
}, {
  timestamps: true
});

commentSchema.methods.madeBy = function madeBy(user) {
  return this.createdBy.id === user.id;
};

const twistSchema = new mongoose.Schema({
  name: { type: String },
  recipe: { type: String },
  image: { type: String },
  sweet: { type: Number },
  tart: { type: Number },
  bitter: { type: Number },
  comments: [ commentSchema ],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  mainSpirit: {
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    tpnb: { type: Number }
  },
  otherIngredients: []
});

twistSchema.virtual('imageSRC')
  .get(function getImageSRC(){
    if(!this.image) return null;
    return `https://s3-eu-west-1.amazonaws.com/wdi-25-full-stack-app/${this.image}`;
  });

twistSchema.methods.madeBy = function madeBy(user) {
  return this.createdBy.id === user.id;
};


const cocktailSchema = new mongoose.Schema({
  name: { type: String },
  sweet: { type: Number },
  tart: { type: Number },
  bitter: { type: Number },
  recipe: { type: String },
  twists: [ twistSchema ],
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  mainSpirit: {
    name: { type: String },
    image: { type: String },
    price: { type: Number },
    tpnb: { type: Number }
  },
  otherIngredients: []
});

cocktailSchema.pre('remove', function removeImage(next) {
  s3.deleteObject({ Key: this.image }, next);
});


module.exports = mongoose.model('Cocktail', cocktailSchema);
