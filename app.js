const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const recetteRoutes = require('./routes/recette.routes');

const commentaireRoutes = require('./routes/commentaire.route');

// Connexion à la base de données
connectDB();

const app = express();

app.use(express.json());
app.use ('/recettes', recetteRoutes);
app.use('/users',userRoutes);
app.use('/commentaires', commentaireRoutes);

// Route de base

app.get('/', (req, res) => {
  res.send('API de gestion des recettes');
});

module.exports = app;