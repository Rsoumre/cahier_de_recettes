const Commentaire = require('../models/Commentaire');

// Ajouter un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const commentaire = new Commentaire({
      auteur: req.body.auteur,
      message: req.body.message,
      recette: req.params.recetteId
    });

    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Récupérer les commentaires d’une recette
exports.getCommentairesByRecette = async (req, res) => {
  try {
    const commentaires = await Commentaire.find({
      recette: req.params.recetteId
    });
    res.json(commentaires);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
