const mongoose = require('mongoose');

const twistSchema = new mongoose.Schema({
  name: { type: String },
  recipe: { type: String },
  image: { type: String },
  sweet: { type: Number },
  tart: { type: Number },
  bitter: { type: Number },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  mainSpirit: [],
  otherIngredients: []
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
  mainSpirit: [],
  otherIngredients: []
});

module.exports = mongoose.model('Cocktail', cocktailSchema);
