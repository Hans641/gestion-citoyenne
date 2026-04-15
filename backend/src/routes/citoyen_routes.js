const express = require('express');
const router = express.Router();
const db = require('../db');

// GET : Récupérer tous les citoyens
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM citoyen');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST : Ajouter un citoyen
router.post('/', async (req, res) => {
    const { nom, prenom, telephone, fokontany_id } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO citoyen (nom, prenom, telephone, fokontany_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [nom, prenom, telephone, fokontany_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;