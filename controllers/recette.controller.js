const Recette = require('../models/Recette');

// Créer une recette
exports.createRecette = async (req, res) => {
  try {
    const recette = new Recette(req.body);
    await recette.save();
    res.status(201).json(recette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Lire toutes les recettes
exports.getAllRecettes = async (req, res) => {
  try {
    const recettes = await Recette.find();
    res.json(recettes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire une recette par ID
exports.getRecetteById = async (req, res) => {
  try {
    const recette = await Recette.findById(req.params.id);
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json(recette);
  } catch (error) {
    res.status(400).json({ message: 'ID invalide' });
  }
};

// Modifier une recette
exports.updateRecette = async (req, res) => {
  try {
    const recette = await Recette.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!recette) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json(recette);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer une recette
exports.deleteRecette = async (req, res) => {
  try {
    const deleted = await Recette.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Recette non trouvée' });
    }
    res.json({ message: 'Recette supprimée' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
