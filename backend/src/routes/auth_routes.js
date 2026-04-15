const express = require('express');
const router = express.Router();
const db = require('../db'); 

router.post('/login', async (req, res) => {
  // Affiche direct ce que le Front envoie
  console.log("--- REQUÊTE REÇUE ---");
  console.log("Corps de la requête (req.body) :", req.body);

  const { matricule, password } = req.body;

  try {
    const result = await db.query('SELECT * FROM agent WHERE matricule = $1', [matricule]);
    const agent = result.rows[0];

    if (agent) {
      console.log("Agent trouvé en base :", agent.matricule);
      console.log("MDP en base :", agent.password);
      console.log("MDP saisi :", password);

      if (agent.password.trim() === password.trim()) {
        console.log("✅ MATCH !");
        return res.json({ 
          token: "fake-token-debug", 
          agent: { id: agent.id, matricule: agent.matricule } 
        });
      }
    }
    
    console.log("❌ ÉCHEC");
    res.status(401).json({ error: "Invalide" });

  } catch (err) {
    console.error("ERREUR SQL :", err);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;