const Commentaire = require('../models/Commentaire');
const mongoose = require('mongoose');

// Créer un commentaire
exports.createCommentaire = async (req, res) => {
  try {
    const { auteur, message, recette } = req.body;

    // verication des champs obligatoires
    if (!auteur || !message || !recette) {
      return res.status(400).json({ message: 'Les champs `auteur`, `message` et `recette` sont requis.' });
    }

    // verification que l'id de la recette est valide
    if (!mongoose.Types.ObjectId.isValid(recette)) {
      return res.status(400).json({ message: 'ID de recette invalide.' });
    }

    // nettoyage du message et verification de sa longueur
    const trimmedMessage = String(message).trim();
    if (trimmedMessage.length < 2 || trimmedMessage.length > 2000) {
      return res.status(400).json({ message: 'Le message doit contenir entre 2 et 2000 caractères.' });
    }

    // creation d'un nouvel objet commentaire
    const commentaire = new Commentaire({
      auteur: String(auteur).trim(),
      message: trimmedMessage,
      recette
    });

    // sauvegarde en base de données
    await commentaire.save();
    res.status(201).json(commentaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lister commentaires (option: filtrer par recette, pagination)
exports.getAllCommentaires = async (req, res) => {
  try {
    const { recette, page = 1, limit = 20 } = req.query;

    // preparation du filtre
    const filter = {};
    if (recette) {
      if (!mongoose.Types.ObjectId.isValid(recette)) {
        return res.status(400).json({ message: 'ID de recette invalide.' });
      }
      filter.recette = recette;
    }

    // pagination
    const p = Math.max(parseInt(page, 10) || 1, 1);
    const l = Math.max(parseInt(limit, 10) || 20, 1);
    const skip = (p - 1) * l;

    //recupération des commentaires avec total pour pagination
    const [total, data] = await Promise.all([
      Commentaire.countDocuments(filter),
      Commentaire.find(filter)
        .sort({ date: -1 }) // trier par date décroissante
        .skip(skip)
        .limit(l)
        .populate('recette', 'titre') // peupler le champ recette avec son titre    
    ]);

    res.json({ total, page: p, limit: l, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Récupérer un commentaire par ID
exports.getCommentaireById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }
    const commentaire = await Commentaire.findById(id).populate('recette', 'titre');
    if (!commentaire) return res.status(404).json({ message: 'Commentaire non trouvé.' });
    res.json(commentaire);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mettre à jour un commentaire
exports.updateCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }
    const updates = {};
    if (req.body.auteur) updates.auteur = String(req.body.auteur).trim();
    if (req.body.message) {
      const m = String(req.body.message).trim();
      if (m.length < 2 || m.length > 2000) {
        return res.status(400).json({ message: 'Le message doit contenir entre 2 et 2000 caractères.' });
      }
      updates.message = m;
    }

    // mise a jour base
    const updated = await Commentaire.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Commentaire non trouvé.' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Supprimer un commentaire
exports.deleteCommentaire = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'ID invalide.' });
    }
    const deleted = await Commentaire.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Commentaire non trouvé.' });
    res.json({ message: 'Commentaire supprimé.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
