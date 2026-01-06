const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = require('./app');

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});