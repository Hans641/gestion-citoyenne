const express = require('express');
const cors = require('cors');
require('dotenv').config();

// On utilise bien l'underscore ici
const citoyenRoutes = require('./routes/citoyen_routes');
const acteRoutes = require('./routes/acte_routes');

const app = express();

app.use(cors());
app.use(express.json());

// Points d'accès de ton API
app.use('/api/citoyens', citoyenRoutes);
app.use('/api/actes', acteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Serveur prêt sur http://localhost:${PORT}`);
});