import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// --- COMPOSANT 1 : CONNEXION ADMIN (ACTUALISÉ) ---
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Appel au Backend pour vérifier les identifiants en base de données
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username: credentials.username,
        password: credentials.password
      });

      if (response.data.message === "Connexion réussie") {
        localStorage.setItem("isAuthenticated", "true");
        navigate('/admin');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        setError("Erreur de connexion au serveur. Vérifiez que le Backend est lancé.");
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Connexion</h1>
        <p className="subtitle">Espace Administration - Lovan’ny Tanàna</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Identifiant</label>
            <input 
              type="text" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Ex: admin"
              required 
            />
          </div>
          <div className="input-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="submit-btn">Se connecter</button>
        </form>
        {error && <div className="message error">{error}</div>}
      </div>
    </div>
  );
};

// --- COMPOSANT 2 : INSCRIPTION PUBLIQUE ---
const PublicForm = () => {
  const [formData, setFormData] = useState({ first_name: '', last_name: '', address: '', cin: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/citizens/', formData);
      setStatus("Succès ! Votre inscription a été enregistrée.");
      setFormData({ first_name: '', last_name: '', address: '', cin: '' });
    } catch (err) {
      setStatus("Erreur lors de l'envoi. Le serveur est-il allumé ?");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <h1>Lovan’ny Tanàna</h1>
        <p className="subtitle">Veuillez remplir les informations ci-dessous</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nom</label>
            <input 
              type="text" 
              value={formData.last_name} 
              onChange={e => setFormData({...formData, last_name: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Prénom</label>
            <input 
              type="text" 
              value={formData.first_name} 
              onChange={e => setFormData({...formData, first_name: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Adresse / Quartier</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={e => setFormData({...formData, address: e.target.value})} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Numéro CIN (si disponible)</label>
            <input 
              type="text" 
              value={formData.cin} 
              onChange={e => setFormData({...formData, cin: e.target.value})} 
            />
          </div>
          <button type="submit" className="submit-btn">S'inscrire</button>
        </form>
        {status && <div className={`message ${status.includes('Succès') ? 'success' : 'error'}`}>{status}</div>}
      </div>
    </div>
  );
};

// --- COMPOSANT 3 : TABLEAU ADMIN ---
const AdminList = () => {
  const [citizens, setCitizens] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCitizens();
  }, []);

const fetchCitizens = async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/citizens/');
    console.log("Données reçues du backend :", res.data); // Ajoutez cette ligne
    setCitizens(res.data);
  } catch (err) {
    console.error("Erreur de chargement", err);
  } finally {
    setLoading(false);
  }
};

  const deleteCitizen = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette inscription ?")) {
      try {
        await axios.delete(`http://127.0.0.1:8000/citizens/${id}`);
        setCitizens(citizens.filter(c => c.id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression.");
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };

// Dans App.jsx, modifiez le filteredCitizens ainsi :
const filteredCitizens = citizens.filter(c => {
  const search = searchTerm.toLowerCase();
  // On ajoute une sécurité avec "|| ''" pour éviter de chercher sur du "null"
  return (
    (c.last_name || '').toLowerCase().includes(search) ||
    (c.first_name || '').toLowerCase().includes(search) ||
    (c.address || '').toLowerCase().includes(search)
  );
});

  return (
    <div className="page-container" style={{ padding: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#0062ff' }}>Espace Administration</h1>
        <button onClick={handleLogout} className="submit-btn" style={{ width: 'auto', padding: '10px 20px', background: '#ef4444' }}>Déconnexion</button>
      </div>

      <div className="input-group" style={{ marginTop: '20px', maxWidth: '400px' }}>
        <input 
          type="text" 
          placeholder="Rechercher par nom, prénom ou quartier..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '10px' }}
        />
      </div>

      {loading ? (
        <p>Chargement des données...</p>
      ) : (
        <table className="admin-table" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
              <th style={{ padding: '15px' }}>Nom</th>
              <th style={{ padding: '15px' }}>Prénom</th>
              <th style={{ padding: '15px' }}>Quartier</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitizens.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{c.last_name}</td>
                <td style={{ padding: '15px' }}>{c.first_name}</td>
                <td style={{ padding: '15px' }}>{c.address}</td>
                <td style={{ padding: '15px' }}>
                  <button 
                    onClick={() => deleteCitizen(c.id)} 
                    style={{ color: '#ef4444', cursor: 'pointer', background: 'none', border: 'none', fontWeight: 'bold' }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// --- PROTECTION DES ROUTES (INVISIBILITÉ DU PANEL SANS AUTH) ---
const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("isAuthenticated") === "true";
  return auth ? children : <Navigate to="/login" replace />;
};

// --- ROUTEUR PRINCIPAL ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicForm />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminList />
            </PrivateRoute>
          } 
        />
        {/* Redirection automatique si la route n'existe pas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;