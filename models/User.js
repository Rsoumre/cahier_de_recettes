const mongoose = require('mongoose');

const recetteSchema = new mongoose.Schema({
    // Nom de l'utilisateur
    name: {
        type: String,
        required: true
    },
    // Email de l'utilisateur
    email: {
        type: String,
        required: true,
        unique: true
    },
    // Mot de passe de l'utilisateur
    password: {
        type: String,
        required: true,
    },
},
    { timestamps: true } // Ajoute les champs createdAt et updatedAt automatiquement
)

module.exports = mongoose.model('User', recetteSchema);