const express = require('express');
const cors = require('cors');
const citoyenRoutes = require('./routes/citoyen_routes'); // Import des routes

const app = express();
app.use(cors());
app.use(express.json()); // Très important pour lire le JSON envoyé par React

// Utilisation des routes
app.use('/api/citoyens', citoyenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Serveur prêt sur http://localhost:${PORT}`);
});