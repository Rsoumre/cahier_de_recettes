const jwt = require('jsonwebtoken');

// verifie si l'utilisateur est authentifié avant d'accéder à une route protégée
module.exports = (req, res, next) => {
    try {
        const header = req.header('Authorization');
        // si aucun token n'est fourni on refuse l'accès
        if (!header) return res.status(401).json({ message: "No token" });
        // le token est au format "Bearer token
        const token = header.split(" ")[1];
        // vérification du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // on stocke les informations decodées dans la requête pour 
        req.user = decoded;
        next();
    } catch (error) {
        // en cas d'erreur on refuse l'accès
        res.status(401).json({ message: "Access denied" });
    }
};
