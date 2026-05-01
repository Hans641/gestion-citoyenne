import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from './pages/AdminDashboard'; // Import de la nouvelle interface
import './App.css';

// --- COMPOSANT 1 : CONNEXION ADMIN ---
const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
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
        setError("Erreur de connexion au serveur.");
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
      setStatus("Erreur lors de l'envoi.");
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
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminDashboard /> 
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;