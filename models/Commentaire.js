const mongoose = require('mongoose');

const commentaireSchema = new mongoose.Schema({
  auteur: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  recette: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recette',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Commentaire', commentaireSchema);
