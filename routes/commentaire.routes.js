const express = require('express');
const router = express.Router();
const commentaireController = require('../controllers/commentaire.controller.v2');

// Routes commentaires
// créer un commentaire
router.post('/', commentaireController.createCommentaire);
// récupérer tous les commentaires
router.get('/', commentaireController.getAllCommentaires);
// récupérer un commentaire par ID
router.get('/:id', commentaireController.getCommentaireById);
// mettre à jour un commentaire
router.put('/:id', commentaireController.updateCommentaire);
// supprimer un commentaire
router.delete('/:id', commentaireController.deleteCommentaire);

module.exports = router;
