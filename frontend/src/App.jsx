import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [citoyens, setCitoyens] = useState([]);

  useEffect(() => {
    // Récupération des données depuis le backend
    api.get('/citoyens')
      .then(res => setCitoyens(res.data))
      .catch(err => console.error("Erreur API:", err));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Portail National des Services Communaux</h1>
      <h2>Liste des Citoyens Enregistrés</h2>
      <ul>
        {citoyens.map(c => (
          <li key={c.id}>
            <strong>{c.nom} {c.prenom}</strong> - Fokontany: {c.fokontany}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;