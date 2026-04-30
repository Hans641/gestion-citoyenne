import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

// --- COMPOSANT 1 : INSCRIPTION PUBLIQUE ---
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
            <label>Numéro CIN</label>
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

// --- COMPOSANT 2 : TABLEAU ADMIN ---
const AdminList = () => {
  const [citizens, setCitizens] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/citizens/').then(res => setCitizens(res.data));
  }, []);

  return (
    <div className="page-container">
      <h1>Espace Administration</h1>
      <table className="admin-table">
        <thead>
          <tr><th>ID</th><th>Nom</th><th>Prénom</th><th>Quartier</th></tr>
        </thead>
        <tbody>
          {citizens.map(c => (
            <tr key={c.id}><td>{c.id}</td><td>{c.last_name}</td><td>{c.first_name}</td><td>{c.address}</td></tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="back-link">Retour à l'accueil</Link>
    </div>
  );
};

// --- ROUTEUR PRINCIPAL ---
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicForm />} />
        <Route path="/admin" element={<AdminList />} />
      </Routes>
    </Router>
  );
}

export default App;