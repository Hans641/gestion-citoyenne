import React, { useState } from 'react';
import { useAuth } from '../App';

export default function LoginPage({ onBack }) {
  const { login } = useAuth();
  const [creds, setCreds] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const roles = [
    { username: 'admin',   password: 'admin123',  name: 'Admin Hans',        role: 'Administrateur',     avatar: 'AH' },
    { username: 'agent',   password: 'agent123',  name: 'Rakoto Jean',       role: 'Agent Fokontany',    avatar: 'RJ' },
    { username: 'ministre',password: 'mid2024',   name: 'Rabe Ministre',     role: 'Ministère MID',      avatar: 'RM' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    const found = roles.find(r => r.username === creds.username && r.password === creds.password);
    if (found) {
      login({ name: found.name, role: found.role, avatar: found.avatar, username: found.username });
    } else {
      setError('Identifiants incorrects. Vérifiez vos accès.');
    }
    setLoading(false);
  };

  const quickLogin = (r) => {
    setCreds({ username: r.username, password: r.password });
  };

  return (
    <div className="auth-bg">
      <div style={{ width: '100%', maxWidth: 900, display: 'flex', gap: 24, alignItems: 'stretch' }}>

        {/* ─ Panel gauche — Info ─ */}
        <div className="glass-card" style={{ flex: 1, padding: '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#10b981,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🌿</div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem' }}>CommuneDigit</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)' }}>Portail Agents & Administration</div>
              </div>
            </div>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.6rem', fontWeight: 800, lineHeight: 1.2, marginBottom: 16 }}>
              Espace réservé<br />aux agents habilités
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 32 }}>
              Gérez les demandes citoyennes, validez les actes d'état civil, délivrez les certificats et suivez les statistiques de votre territoire.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: '🔐', text: 'Connexion JWT sécurisée' },
                { icon: '📊', text: 'Tableau de bord en temps réel' },
                { icon: '📴', text: 'Fonctionne hors-ligne' },
                { icon: '🌍', text: 'Interface en français & malagasy' },
              ].map(f => (
                <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)' }}>
                  <span>{f.icon}</span> {f.text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick demo logins */}
          <div style={{ marginTop: 32 }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 10 }}>
              Accès rapide démo
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {roles.map(r => (
                <button key={r.username} className="btn btn-glass btn-sm" style={{ justifyContent: 'flex-start', gap: 10 }} onClick={() => quickLogin(r)}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'linear-gradient(135deg,#10b981,#14b8a6)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>{r.avatar}</span>
                  <span style={{ fontSize: '0.8rem' }}>{r.name} <span style={{ opacity: 0.45 }}>· {r.role}</span></span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ─ Panel droit — Formulaire ─ */}
        <div className="glass-card auth-card" style={{ flex: '0 0 380px', padding: '44px 36px' }}>
          <div className="auth-logo">
            <div style={{ width: 56, height: 56, borderRadius: 16, background: 'linear-gradient(135deg,#10b981,#14b8a6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', margin: '0 auto', boxShadow: '0 8px 24px rgba(16,185,129,0.35)' }}>🔐</div>
          </div>
          <div className="auth-title">Connexion</div>
          <div className="auth-sub">Entrez vos identifiants d'agent</div>

          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Identifiant</label>
              <input
                className="form-input"
                type="text"
                value={creds.username}
                onChange={e => setCreds({ ...creds, username: e.target.value })}
                placeholder="Ex: agent001"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mot de passe</label>
              <input
                className="form-input"
                type="password"
                value={creds.password}
                onChange={e => setCreds({ ...creds, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="alert alert-error" style={{ fontSize: '0.8rem' }}>
                <span>⚠️</span> {error}
              </div>
            )}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }} disabled={loading}>
              {loading ? '⏳ Connexion...' : 'Se connecter →'}
            </button>
          </form>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>Première connexion ou mot de passe oublié ?</div>
            <button style={{ background: 'none', border: 'none', color: 'var(--emerald-400)', fontSize: '0.8rem', cursor: 'pointer', fontWeight: 600 }}>
              Contacter l'administrateur
            </button>
          </div>

          <div className="divider" />
          <button className="btn btn-glass" style={{ width: '100%', justifyContent: 'center' }} onClick={onBack}>
            ← Retour au portail citoyen
          </button>
        </div>
      </div>
    </div>
  );
}
