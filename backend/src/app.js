const express = require('express');
const cors = require('cors'); // 1. Importation
const authRoutes = require('./routes/auth_routes');
const citoyenRoutes = require('./routes/citoyen_routes');
const acteRoutes = require('./routes/acte_routes');
// NE PAS METTRE app.use(cors()) ICI

const app = express(); // 2. INITIALISATION (La voiture démarre ici)

// 3. UTILISATION (On peut maintenant utiliser app)
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/citoyens', citoyenRoutes);
app.use('/api/actes', acteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Serveur prêt sur http://localhost:${PORT}`);
});