const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  ingredients: {
    type: [String],
    required: true
  },
  etapes: {
    type: [String],
    required: true
  },
  auteur: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recette', recetteSchema);