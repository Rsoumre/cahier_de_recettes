const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = require('./app');

// définir le port
const PORT = process.env.PORT || 6000;

// démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});