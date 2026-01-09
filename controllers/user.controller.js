const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Recupérer tous les utilisateurs
exports.getAllUsers = async (req, res) => {
    try {

        // Recupération des utilisateurs en base de données
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Recupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Inscrire un nouvel utilisateur
exports.register = async (req, res) => {
    try {
        // hashage du mot de passe
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // creation d'un nouvel utilisateur
        const user = new User({ ...req.body, password: hashedPassword });
        await user.save();
        res.status(201).json(user); // recupérer l'utilisateur créé
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Connexion utilisateur
exports.login = async (req, res) => {
  try {
    //recupération de l'utilisateur par email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    // vérification du mot de passe     
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Création du token
    const token = jwt.sign(
      { id: user._id },        // payload du token 
      process.env.JWT_SECRET,  // clé secrète
      { expiresIn: '1h' }      // expiration du token
    );

    res.status(200).json({
      message: 'Login successful',
      token: token
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Deconnexion utilisateur
exports.logout = (req, res) => {
    // avec jwt la deconnexion se fait coté client en supprimant le token
    res.status(200).json({ message: 'Logout successful' });
};


// Mettre à jour un utilisateur
exports.updateUser = async (req, res) => {
    try {
        // mise a jour de donnees utilisateur
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};