const express = require('express');
const router = express.Router();
const recetteController = require('../controllers/recette.controller');
const auth = require('../middlewares/auth');

// Routes publiques

// récupérer toutes les recettes
router.get('/', recetteController.getAllRecettes);
// récupérer une recette par ID
router.get('/:id', recetteController.getRecetteById);

// Routes protégées

// créer une recette
router.post('/', auth, recetteController.createRecette);
// mettre à jour une recette
router.put('/:id', auth, recetteController.updateRecette);
// supprimer une recette
router.delete('/:id', auth, recetteController.deleteRecette);

module.exports = router;
