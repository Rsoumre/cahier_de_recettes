const express = require ('express');
const router = express.Router() ;
const recetteController = require ('../controllers/recette.controller');

// Routes pour les recettes
router.post('/recettes', recetteController.createRecette);
router.get('/recettes', recetteController.getAllRecettes);
router.get('/recettes', recetteController.getRecetteById);
router.put('/recettes', recetteController.updateRecette);
router.delete('/recettes',recetteController.deleteRecette);

module.exports = router;