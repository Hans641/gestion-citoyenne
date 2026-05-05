import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

// --- COMPOSANT 1 : CONNEXION ---
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/login', {
        username: credentials.username.trim(),
        password: credentials.password.trim()
      });

      if (response.data.message === "Connexion réussie") {
        localStorage.setItem("isAuthenticated", "true");
        navigate('/admin');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Identifiants incorrects. Veuillez réessayer.");
      } else {
        setError("Erreur de connexion au serveur.");
      }
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="auth-card" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 style={{ textAlign: 'center' }}>Connexion</h1>
        <p className="subtitle" style={{ textAlign: 'center' }}>Accédez à vos services communaux</p>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label style={{ display: 'block', textAlign: 'center' }}>Numéro de téléphone</label>
            <input 
              type="text" 
              value={credentials.username}
              onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              placeholder="Ex: +261340000001"
              style={{ textAlign: 'center' }}
              required 
            />
          </div>
          <div className="input-group">
            <label style={{ display: 'block', textAlign: 'center' }}>Mot de passe</label>
            <input 
              type="password" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="••••••••"
              style={{ textAlign: 'center' }}
              required 
            />
          </div>
          <button type="submit" className="submit-btn" style={{ width: '100%' }}>Se connecter</button>
        </form>
        {error && <div className="message error" style={{ textAlign: 'center', marginTop: '10px' }}>{error}</div>}
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Pas encore de compte ? <span onClick={() => navigate('/')} style={{ color: '#0062ff', cursor: 'pointer', fontWeight: 'bold' }}>S'inscrire</span>
        </p>
      </div>
    </div>
  );
};

// --- COMPOSANT 2 : INSCRIPTION PUBLIQUE ---
const PublicForm = () => {
  const [formData, setFormData] = useState({ 
    first_name: '', last_name: '', address: '', cin: '', 
    username: '', password: '', confirmPassword: '' 
  });
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setStatus("Erreur : Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      await axios.post('http://127.0.0.1:8000/citizens/', dataToSend);
      setStatus("Succès ! Votre inscription a été enregistrée.");
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus("Erreur lors de l'envoi.");
    }
  };

  return (
    <div className="auth-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="auth-card" style={{ width: '100%', maxWidth: '650px', padding: '30px' }}>
        <h1 style={{ textAlign: 'center', color: '#0062ff' }}>Lovan’ny Tanàna</h1>
        <p className="subtitle" style={{ textAlign: 'center' }}>Veuillez remplir les informations ci-dessous</p>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <div className="input-group">
              <label>Nom</label>
              <input type="text" value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Prénom</label>
              <input type="text" value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} required />
            </div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label>Adresse / Quartier</label>
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Numéro de téléphone</label>
              <input type="text" placeholder="+261..." value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Numéro CIN</label>
              <input type="text" value={formData.cin} onChange={e => setFormData({...formData, cin: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Mot de passe</label>
              <input type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>
            <div className="input-group">
              <label>Confirmation</label>
              <input type="password" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} required />
            </div>
          </div>
          <button type="submit" className="submit-btn" style={{ width: '100%', marginTop: '20px' }}>S'inscrire</button>
        </form>
        {status && <div className={`message ${status.includes('Succès') ? 'success' : 'error'}`} style={{ textAlign: 'center', marginTop: '10px' }}>{status}</div>}
        
        <p style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
          Déjà inscrit ? <span onClick={() => navigate('/login')} style={{ color: '#0062ff', cursor: 'pointer', fontWeight: 'bold' }}>Se connecter</span>
        </p>
      </div>
    </div>
  );
};

// --- PROTECTION DES ROUTES ---
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
        <Route path="/admin" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;