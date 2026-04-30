import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// --- COMPOSANT 1 : CONNEXION ADMIN ---
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === "admin" && credentials.password === "fokontany2026") {
      localStorage.setItem("isAuthenticated", "true");
      navigate('/admin');
    } else {
      setError("Identifiants incorrects. Veuillez réessayer.");
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

// --- COMPOSANT 3 : TABLEAU ADMIN (PROTÉGÉ + ACTIONS) ---
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
      setCitizens(res.data);
    } catch (err) {
      console.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

const deleteCitizen = async (id) => {
  // Debug: l'utilisateur peut ajouter cette ligne pour voir l'ID dans la console F12
  console.log("Tentative de suppression de l'ID :", id); 

  if (window.confirm("Voulez-vous vraiment supprimer cette inscription ?")) {
    try {
      // Vérifiez que l'URL correspond bien à celle du backend
      await axios.delete(`http://127.0.0.1:8000/citizens/${id}`);
      
      // Mise à jour de l'état local pour faire disparaître la ligne
      setCitizens(citizens.filter(c => c.id !== id));
    } catch (err) {
      console.error("Erreur détaillée:", err.response);
      alert("Erreur lors de la suppression. Vérifiez la console.");
    }
  }
};

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate('/login');
  };

  const filteredCitizens = citizens.filter(c => 
    c.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <th style={{ padding: '15px' }}>ID</th>
              <th style={{ padding: '15px' }}>Nom</th>
              <th style={{ padding: '15px' }}>Prénom</th>
              <th style={{ padding: '15px' }}>Quartier</th>
              <th style={{ padding: '15px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCitizens.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px' }}>{c.id}</td>
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

// --- PROTECTION DES ROUTES ---
const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("isAuthenticated");
  return auth === "true" ? children : <Navigate to="/login" />;
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
      </Routes>
    </Router>
  );
}

export default App;