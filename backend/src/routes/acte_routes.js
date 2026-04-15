const express = require('express');
const router = express.Router();
const db = require('../db');
const crypto = require('crypto'); // Module natif de Node.js

// POST : Créer un acte avec Hashage SHA256
router.post('/', async (req, res) => {
    const { type, date_evenement, citoyen_id, agent_id } = req.body;

    // 1. Créer une chaîne de caractères unique pour cet acte
    const dataToHash = `${type}-${date_evenement}-${citoyen_id}`;
    
    // 2. Générer le Hash SHA256
    const hash = crypto.createHash('sha256').update(dataToHash).digest('hex');

    try {
        const result = await db.query(
            `INSERT INTO acte_etat_civil (type, date_evenement, hash_sha256, citoyen_id, agent_id) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [type, date_evenement, hash, citoyen_id, agent_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        // On trie par date_evenement puisque created_at n'existe pas
        const result = await db.query('SELECT * FROM acte_etat_civil ORDER BY date_evenement DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
module.exports = router;