const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire.controller');

// Ajouter un commentaire à une recette
router.post('/recette/:recetteId', commentaireController.createCommentaire);

// Lire les commentaires d’une recette
router.get('/recette/:recetteId', commentaireController.getCommentairesByRecette);

module.exports = router;
