const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
const recetteRoutes = require('./routes/recette.routes');

connectDB();

const app = express();

app.use(express.json());
app.use ('/recettes', recetteRoutes);
app.use('/users',userRoutes);

app.get('/', (req, res) => {
  res.send('API de gestion des recettes');
});

module.exports = app;