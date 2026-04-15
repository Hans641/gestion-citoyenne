import { useState } from 'react';
import { LogIn, ShieldCheck, Database } from 'lucide-react';
import api from '../services/api';

function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({ matricule: '', password: '' });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await api.post('/auth/login', credentials);
        // On stocke le token pour rester connecté même si on rafraîchit la page
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('agent_id', res.data.agent.id);
        onLogin(); 
    } catch (err) {
        alert("Matricule ou mot de passe invalide. [Conformité Loi 2014-038]");
    }
    };

  return (
    <div style={loginContainer}>
      <div style={loginCard}>
        <div style={logoSection}>
          <Database size={40} color="#2563eb" />
          <h2 style={{ margin: '10px 0 5px 0', color: '#1e293b' }}>PORTAIL AGENT</h2>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Ministère de l'Intérieur - Madagascar</p>
        </div>

        <form onSubmit={handleSubmit} style={loginForm}>
          <div style={inputGroup}>
            <label style={labelStyle}>Matricule de l'agent</label>
            <input 
              type="text" required placeholder="Ex: AGT-2024-001"
              value={credentials.matricule}
              onChange={(e) => setCredentials({...credentials, matricule: e.target.value})}
              style={inputStyle}
            />
          </div>
          <div style={inputGroup}>
            <label style={labelStyle}>Mot de passe</label>
            <input 
              type="password" required placeholder="••••••••"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={inputStyle}
            />
          </div>
          <button type="submit" style={loginButton}>
            <LogIn size={18} /> Se connecter au registre
          </button>
        </form>

        <div style={footerNote}>
          <ShieldCheck size={14} />
          <span>Accès sécurisé conforme à la loi 2014-038</span>
        </div>
      </div>
    </div>
  );
}

// --- STYLES ---
const loginContainer = { height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f5f9' };
const loginCard = { backgroundColor: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' };
const logoSection = { marginBottom: '30px' };
const loginForm = { display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' };
const inputGroup = { display: 'flex', flexDirection: 'column', gap: '8px' };
const labelStyle = { fontSize: '0.85rem', fontWeight: '600', color: '#475569' };
const inputStyle = { padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '1rem' };
const loginButton = { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px', backgroundColor: '#1e293b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' };
const footerNote = { marginTop: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#94a3b8', fontSize: '0.75rem' };

export default Login;