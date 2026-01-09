const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  // Nom de l'auteur
  auteur: {
    type: String,
    required: true
  },
  // Contenu du commentaire
  message: {
    type: String,
    required: true
  },
  // Référence à la recette associée
  recette: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recette',
    required: true
  },
  // Date de création du commentaire
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
