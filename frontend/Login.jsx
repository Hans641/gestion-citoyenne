import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulation simple : l'utilisateur pourra intégrer une vérification JWT plus tard
    if (credentials.username === "admin" && credentials.password === "fokontany2026") {
      localStorage.setItem("isAuthenticated", "true");
      navigate('/admin');
    } else {
      alert("Identifiants incorrects");
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
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Mot de passe</label>
            <input 
              type="password" 
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required 
            />
          </div>

          <button type="submit" className="submit-btn">Se connecter</button>
        </form>
      </div>
    </div>
  );
};

export default Login;