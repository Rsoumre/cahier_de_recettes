const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// Routes publiques
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes protégées
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.post('/', userController.register);  
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/logout', userController.logout);

module.exports = router;