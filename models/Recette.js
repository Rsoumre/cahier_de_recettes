const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
  // Titre de la recette
  titre: {
    type: String,
    required: true
  },
  // Liste des ingrédients
  ingredients: {
    type: [String],
    required: true
  },
  // Étapes de préparation
  etapes: {
    type: [String],
    required: true
  },
  // Nom de l'auteur de la recette
  auteur: {
    type: String,
    required: true,
  },
  // Date de création de la recette
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Recette', recetteSchema);