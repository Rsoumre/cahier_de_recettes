const express = require('express');
const userController = require('../controllers/user.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

// Routes publiques

// inscrire un nouvel utilisateur
router.post('/register', userController.register);
// connecter un utilisateur
router.post('/login', userController.login);

// Routes protégées

// récupérer tous les utilisateurs
router.get('/', auth, userController.getAllUsers);
// récupérer un utilisateur par ID
router.get('/:id', auth, userController.getUserById);
// mettre à jour un utilisateur
router.put('/:id', auth, userController.updateUser);
// supprimer un utilisateur
router.delete('/:id', auth, userController.deleteUser);
// déconnecter un utilisateur
router.post('/logout', auth, userController.logout);

module.exports = router;
