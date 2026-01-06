const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/recette';
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri);
    console.log('MongoDB connecté');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Vérifiez la valeur de MONGODB_URI dans .env (identifiants/permissions).');
    // Ne quittez pas le processus : laisser nodemon en mode développement
  }
};

mongoose.connection.on('connected', () => console.log('Mongoose: connexion établie'));
mongoose.connection.on('error', (err) => console.error('Mongoose connection error:', err));

module.exports = connectDB;
