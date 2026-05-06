import React, { useState } from 'react';

const ALERTES = [
  { id: 1, type: 'Santé',    urgence: 'Haute',   titre: 'Campagne vaccination Polio',          corps: 'Campagne de vaccination contre la poliomyélite — Zone Nord Antananarivo. Du 10 au 20 mai 2026.', date: '2026-05-03', statut: 'Active', destinataires: 'Tous les Fokontany' },
  { id: 2, type: 'Sécurité', urgence: 'Haute',   titre: 'Restriction de circulation',          corps: 'Restriction de la circulation les 8 et 9 mai sur la RN1. Prévoir itinéraires alternatifs.', date: '2026-05-02', statut: 'Active', destinataires: 'Fokontany Sud' },
  { id: 3, type: 'Admin',    urgence: 'Normale',  titre: 'Maintenance système — 10 mai 02h-04h', corps: 'Coupure planifiée du serveur central pour maintenance. Les données hors-ligne resteront accessibles.', date: '2026-05-01', statut: 'Planifiée', destinataires: 'Agents uniquement' },
  { id: 4, type: 'Infos',    urgence: 'Normale',  titre: 'Journée portes ouvertes — Mairie',    corps: 'La mairie ouvre ses portes le 15 mai pour informer les citoyens sur la digitalisation.', date: '2026-04-28', statut: 'Expirée', destinataires: 'Tous les Fokontany' },
];

const TYPE_COLORS = { Santé: 'badge-red', Sécurité: 'badge-orange', Admin: 'badge-blue', Infos: 'badge-green' };
const URG_COLORS  = { Haute: 'badge-red', Normale: 'badge-gold' };

export default function Alertes() {
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('Tous');
  const [form, setForm] = useState({ type: 'Santé', urgence: 'Normale', titre: '', corps: '', destinataires: 'Tous les Fokontany' });
  const [saved, setSaved] = useState(false);

  const filtered = ALERTES.filter(a => filter === 'Tous' || a.type === filter);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowModal(false); }, 1800);
  };

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">📡 <span>/</span> Alertes</div>
          <h1 className="page-title">Alertes & Communications</h1>
          <p className="page-subtitle">Diffusion d'annonces officielles — SMS, push, USSD</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>📡 Publier une alerte</button>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
        {['Tous', 'Santé', 'Sécurité', 'Admin', 'Infos'].map(f => (
          <button key={f} className={`chip ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>{f}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { l: 'Actives',   v: ALERTES.filter(a => a.statut === 'Active').length,    icon: '🔴', color: '#f87171' },
          { l: 'Planifiées',v: ALERTES.filter(a => a.statut === 'Planifiée').length,  icon: '🟡', color: 'var(--gold-400)' },
          { l: 'Expirées',  v: ALERTES.filter(a => a.statut === 'Expirée').length,    icon: '⚫', color: 'rgba(255,255,255,0.3)' },
          { l: 'Total',     v: ALERTES.length,                                         icon: '📊', color: '#fff' },
        ].map(s => (
          <div key={s.l} className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.v}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Liste alertes */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map(a => (
          <div key={a.id} className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, flexWrap: 'wrap', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span className={`badge ${TYPE_COLORS[a.type]}`}>{a.type}</span>
                <span className={`badge ${URG_COLORS[a.urgence]}`}>⚡ {a.urgence}</span>
                <span className={`badge ${a.statut === 'Active' ? 'badge-green' : a.statut === 'Planifiée' ? 'badge-orange' : 'badge-gray'}`}>{a.statut}</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{a.date}</span>
            </div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 8 }}>{a.titre}</div>
            <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 14 }}>{a.corps}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>
                📍 Destinataires : <strong style={{ color: 'rgba(255,255,255,0.6)' }}>{a.destinataires}</strong>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-glass btn-sm">✏️ Modifier</button>
                {a.statut === 'Active' && <button className="btn btn-danger btn-sm">🔕 Désactiver</button>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">📡 Publier une alerte</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {saved ? (
              <div className="alert alert-success" style={{ textAlign: 'center', flexDirection: 'column', padding: 32 }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>📡</div>
                <div style={{ fontWeight: 700 }}>Alerte publiée avec succès</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 4 }}>Diffusion SMS + Push en cours…</div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="form-grid" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Type *</label>
                    <select className="form-select" value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                      <option>Santé</option><option>Sécurité</option><option>Admin</option><option>Infos</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Urgence *</label>
                    <select className="form-select" value={form.urgence} onChange={e => setForm({...form, urgence: e.target.value})}>
                      <option>Haute</option><option>Normale</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Titre *</label>
                    <input className="form-input" value={form.titre} onChange={e => setForm({...form, titre: e.target.value})} required placeholder="Titre de l'alerte" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Message *</label>
                    <textarea className="form-textarea" value={form.corps} onChange={e => setForm({...form, corps: e.target.value})} required placeholder="Corps du message..." style={{ minHeight: 100 }} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Destinataires</label>
                    <select className="form-select" value={form.destinataires} onChange={e => setForm({...form, destinataires: e.target.value})}>
                      <option>Tous les Fokontany</option>
                      <option>Agents uniquement</option>
                      <option>Fokontany Nord</option>
                      <option>Fokontany Sud</option>
                    </select>
                  </div>
                </div>
                <div className="alert alert-warn" style={{ marginBottom: 20 }}>
                  <span>⚡</span>
                  <div style={{ fontSize: '0.78rem' }}>Cette alerte sera diffusée par SMS (Africa's Talking) et notifications push. Les citoyens sans smartphone recevront un USSD.</div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn btn-primary">📡 Diffuser →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
