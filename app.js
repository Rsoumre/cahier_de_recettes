const express = require('express');

const app = express();

const recetteRoutes = require('./routes/recette.routes');

app.use(express.json());
app.use ('/recettes', recetteRoutes);

app.get('/', (req, res) => {
  res.send('API de gestion des recettes');
});

module.exports = app;