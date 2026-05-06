import React, { useState } from 'react';
import { useAuth } from '../App';

const SERVICES = [
  { icon: '📋', title: 'État Civil', desc: 'Naissances, mariages, décès', color: 'var(--emerald-500)' },
  { icon: '📜', title: 'Certificats', desc: 'Résidence, héritage, divers', color: 'var(--teal-400)' },
  { icon: '💳', title: 'Paiements', desc: 'Taxes, amendes, redevances', color: 'var(--gold-400)' },
  { icon: '📡', title: 'Alertes', desc: 'Santé, sécurité, annonces', color: '#f87171' },
  { icon: '🗺️', title: 'Cartographie', desc: 'Fokontany géolocalisés', color: '#a78bfa' },
  { icon: '🤖', title: 'Assistance', desc: 'Chatbot multilingue 24/7', color: '#60a5fa' },
];

const STEPS = [
  { num: '01', title: 'Créez votre compte', desc: 'Inscription rapide avec votre CIN ou numéro de téléphone.' },
  { num: '02', title: 'Soumettez votre demande', desc: 'Formulaires simples, disponibles même sans connexion.' },
  { num: '03', title: 'Suivez en temps réel', desc: 'Notifications SMS ou app à chaque étape de votre dossier.' },
];

export default function PublicPage({ onLogin }) {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('demande');
  const [formData, setFormData] = useState({ nom: '', prenom: '', cin: '', telephone: '', fokontany: '', service: '', description: '' });
  const [status, setStatus] = useState('');
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = 'CD-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    setStatus(`Demande enregistrée ! Référence : ${ref}. Vous recevrez un SMS de confirmation.`);
    setFormData({ nom: '', prenom: '', cin: '', telephone: '', fokontany: '', service: '', description: '' });
  };

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackId) return;
    setTrackResult({
      ref: trackId,
      type: 'Certificat de résidence',
      status: 'En traitement',
      agent: 'Rakoto Jean',
      updated: '03 mai 2026 — 14h32',
    });
  };

  const demoLogin = () => {
    login({ name: 'Admin Hans', role: 'Administrateur', fokontany: 'Sabotsy Namehana', avatar: 'AH' });
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(6,78,59,0.4)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 'auto' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: 'linear-gradient(135deg,#10b981,#14b8a6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', boxShadow: '0 4px 12px rgba(16,185,129,0.4)',
          }}>🌿</div>
          <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>CommuneDigit</span>
          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: 20 }}>MG</span>
        </div>
        <a href="#services" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Services</a>
        <a href="#comment" style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>Comment ça marche</a>
        <button className="btn btn-glass btn-sm" onClick={onLogin}>Espace Agent</button>
        <button className="btn btn-primary btn-sm" onClick={demoLogin}>Démo Admin ↗</button>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: '100px 32px 80px', textAlign: 'center', position: 'relative' }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 99, padding: '6px 18px', marginBottom: 24,
          fontSize: '0.8rem', color: 'var(--emerald-400)', fontWeight: 700,
        }}>
          🇲🇬 &nbsp; Ministère de l'Intérieur · Digitalisation 2024
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 800, lineHeight: 1.05, marginBottom: 20, color: '#fff',
          maxWidth: 780, margin: '0 auto 20px',
        }}>
          Vos démarches<br />
          <span style={{ background: 'linear-gradient(135deg,#10b981,#2dd4bf)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            administratives simplifiées
          </span>
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.6 }}>
          Une plateforme numérique unifiée pour toutes les communes et Fokontany de Madagascar. Accessible en ligne, hors-ligne et par SMS.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#formulaire" className="btn btn-primary" style={{ fontSize: '1rem', padding: '12px 28px' }}>Faire une demande →</a>
          <a href="#suivi" className="btn btn-glass" style={{ fontSize: '1rem', padding: '12px 28px' }}>Suivre mon dossier</a>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 40, marginTop: 60,
          flexWrap: 'wrap',
        }}>
          {[
            { v: '1 400+', l: 'Fokontany connectés' },
            { v: '99%',    l: 'Disponibilité' },
            { v: '3min',   l: 'Temps moyen de saisie' },
            { v: '3 langues', l: 'Français · Malagasy · En' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.8rem', fontWeight: 800, color: 'var(--emerald-400)' }}>{s.v}</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: 10 }}>Nos services</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)' }}>Tous vos besoins administratifs en un seul endroit</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {SERVICES.map(s => (
              <div key={s.title} className="glass-card" style={{ padding: '28px 20px', textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '2rem', marginBottom: 12 }}>{s.icon}</div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.95rem', marginBottom: 6 }}>{s.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{s.desc}</div>
                <div style={{ width: 30, height: 3, background: s.color, borderRadius: 99, margin: '14px auto 0' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMULAIRE + SUIVI ── */}
      <section id="formulaire" style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Tabs */}
          <div className="tabs" style={{ marginBottom: 28, display: 'inline-flex' }} id="suivi">
            {['demande', 'suivi'].map(t => (
              <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t === 'demande' ? '📋 Nouvelle demande' : '🔍 Suivre mon dossier'}
              </button>
            ))}
          </div>

          <div className="glass-card" style={{ padding: 36 }}>
            {activeTab === 'demande' ? (
              <>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 6 }}>Faire une demande en ligne</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginBottom: 28 }}>
                  Remplissez le formulaire. Votre demande sera traitée par l'agent Fokontany compétent.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid" style={{ marginBottom: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Nom *</label>
                      <input className="form-input" value={formData.nom} onChange={e => setFormData({...formData, nom: e.target.value})} placeholder="Ex: Rakoto" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Prénom(s) *</label>
                      <input className="form-input" value={formData.prenom} onChange={e => setFormData({...formData, prenom: e.target.value})} placeholder="Ex: Jean" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">N° CIN (si disponible)</label>
                      <input className="form-input" value={formData.cin} onChange={e => setFormData({...formData, cin: e.target.value})} placeholder="Ex: 101234567890" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Téléphone *</label>
                      <input className="form-input" value={formData.telephone} onChange={e => setFormData({...formData, telephone: e.target.value})} placeholder="Ex: 034 XX XXX XX" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Fokontany *</label>
                      <input className="form-input" value={formData.fokontany} onChange={e => setFormData({...formData, fokontany: e.target.value})} placeholder="Ex: Sabotsy Namehana" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Type de service *</label>
                      <select className="form-select" value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} required>
                        <option value="">Choisir un service...</option>
                        <option>Acte de naissance</option>
                        <option>Acte de mariage</option>
                        <option>Acte de décès</option>
                        <option>Certificat de résidence</option>
                        <option>Certificat d'héritage</option>
                        <option>Permis divers</option>
                        <option>Paiement de taxe</option>
                        <option>Autre</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group" style={{ marginBottom: 20 }}>
                    <label className="form-label">Précisions / Motif</label>
                    <textarea className="form-textarea" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Décrivez brièvement votre demande..." />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
                      🔒 Vos données sont chiffrées et protégées (Loi 2014-038)
                    </span>
                    <button type="submit" className="btn btn-primary">Soumettre ma demande →</button>
                  </div>
                </form>
                {status && (
                  <div className="alert alert-success" style={{ marginTop: 20 }}>
                    <span>✅</span>
                    <div style={{ fontSize: '0.875rem' }}>{status}</div>
                  </div>
                )}
              </>
            ) : (
              <>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, marginBottom: 6 }}>Suivre mon dossier</h2>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.875rem', marginBottom: 28 }}>
                  Entrez votre référence reçue par SMS après votre demande.
                </p>
                <form onSubmit={handleTrack} style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
                  <input className="form-input" value={trackId} onChange={e => setTrackId(e.target.value)} placeholder="Ex: CD-A3K9PX2F" style={{ flex: 1 }} />
                  <button type="submit" className="btn btn-primary">Rechercher</button>
                </form>
                {trackResult && (
                  <div className="glass-card" style={{ padding: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                      <div>
                        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>Dossier #{trackResult.ref}</div>
                        <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginTop: 4 }}>{trackResult.type}</div>
                      </div>
                      <span className="badge badge-orange">⏳ {trackResult.status}</span>
                    </div>
                    <div className="timeline">
                      {[
                        { label: 'Demande reçue', time: '01 mai — 09h14', done: true },
                        { label: 'En traitement', time: '03 mai — 14h32', current: true },
                        { label: 'Validation agent', time: 'En attente', todo: true },
                        { label: 'Document prêt', time: '—', todo: true },
                      ].map((step, i) => (
                        <div key={i} className="timeline-item">
                          <div className={`timeline-dot ${step.done ? 'badge-green' : step.current ? 'badge-orange' : 'badge-gray'}`} style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, border: '1px solid rgba(255,255,255,0.2)' }}>
                            {step.done ? '✓' : step.current ? '◉' : '○'}
                          </div>
                          <div className="timeline-content">
                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: step.todo ? 'rgba(255,255,255,0.35)' : '#fff' }}>{step.label}</div>
                            <div className="timeline-time">{step.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="divider" />
                    <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>Agent responsable : <strong style={{ color: 'rgba(255,255,255,0.7)' }}>{trackResult.agent}</strong> · Dernière mise à jour : {trackResult.updated}</div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── COMMENT ÇA MARCHE ── */}
      <section id="comment" style={{ padding: '60px 32px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: '2rem', fontWeight: 800, marginBottom: 10 }}>Comment ça marche</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 48 }}>Simple, rapide et accessible depuis n'importe quel appareil</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {STEPS.map((s, i) => (
              <div key={i} className="glass-card" style={{ padding: 28, textAlign: 'left' }}>
                <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '2.5rem', fontWeight: 800, color: 'rgba(16,185,129,0.3)', marginBottom: 12 }}>{s.num}</div>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{s.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '28px 32px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', fontSize: '0.8rem', color: 'rgba(255,255,255,0.3)' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginBottom: 12 }}>
          <span>Ministère de l'Intérieur et de la Décentralisation</span>
          <span>·</span>
          <span>Loi 2014-038 · Convention de Malabo</span>
          <span>·</span>
          <span>🔒 Données chiffrées AES-256</span>
        </div>
        <div>CommuneDigit © 2024 — Madagascar</div>
      </footer>
    </div>
  );
}
