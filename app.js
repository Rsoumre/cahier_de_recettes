const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const recetteRoutes = require('./routes/recette.routes');

const commentaireRoutes = require('./routes/commentaire.routes');
require('dotenv').config();

// Connexion à la base de données
connectDB();

// middleware pour parser le JSON
const app = express();

// definition des routes principales de l'API
app.use(express.json());
app.use ('/recettes', recetteRoutes);
app.use('/users',userRoutes);
app.use('/commentaires', commentaireRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('API de gestion des recettes');
});

// exporer l'application pour le serveur.js
module.exports = app;