import React, { useState } from 'react';

const AGENTS = [
  { id: 1, nom: 'Rakoto',    prenom: 'Jean',     matricule: 'AGT-001', role: 'Agent Fokontany', fokontany: 'Sabotsy Namehana', statut: 'Actif',    actes: 142, dernier: '2026-05-03', avatar: 'RJ' },
  { id: 2, nom: 'Rasoa',     prenom: 'Nivo',     matricule: 'AGT-002', role: 'Agent Fokontany', fokontany: 'Ambohimanga',      statut: 'Actif',    actes: 98,  dernier: '2026-05-02', avatar: 'RN' },
  { id: 3, nom: 'Rabe',      prenom: 'Bodo',     matricule: 'AGT-003', role: 'Agent Fokontany', fokontany: 'Ivandry',          statut: 'Actif',    actes: 211, dernier: '2026-05-03', avatar: 'RB' },
  { id: 4, nom: 'Andrianina',prenom: 'Soa',      matricule: 'AGT-004', role: 'Superviseur',     fokontany: 'Ankorondrano',     statut: 'Inactif',  actes: 0,   dernier: '2026-04-10', avatar: 'AS' },
  { id: 5, nom: 'Randria',   prenom: 'Patrick',  matricule: 'AGT-005', role: 'Administrateur',  fokontany: 'Tous',             statut: 'Actif',    actes: 56,  dernier: '2026-05-03', avatar: 'RP' },
];

const ROLE_COLORS = { 'Administrateur': 'badge-blue', 'Superviseur': 'badge-gold', 'Agent Fokontany': 'badge-green' };

export default function Agents() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ nom: '', prenom: '', matricule: '', role: 'Agent Fokontany', fokontany: '', email: '', telephone: '' });
  const [saved, setSaved] = useState(false);

  const filtered = AGENTS.filter(a => {
    const q = search.toLowerCase();
    return (a.nom + ' ' + a.prenom + ' ' + a.matricule + ' ' + a.fokontany).toLowerCase().includes(q);
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowModal(false); }, 1800);
  };

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">👔 <span>/</span> Agents</div>
          <h1 className="page-title">Gestion des Agents</h1>
          <p className="page-subtitle">Administration des comptes agents, rôles et affectations Fokontany</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Nouvel agent</button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { l: 'Total agents', v: AGENTS.length, icon: '👔', color: '#fff' },
          { l: 'Actifs',       v: AGENTS.filter(a => a.statut === 'Actif').length, icon: '✅', color: 'var(--emerald-400)' },
          { l: 'Actes ce mois', v: AGENTS.reduce((s, a) => s + a.actes, 0), icon: '📋', color: 'var(--teal-400)' },
          { l: 'Fokontany couverts', v: 5, icon: '📍', color: '#a78bfa' },
        ].map(s => (
          <div key={s.l} className="glass-card" style={{ padding: '18px 20px' }}>
            <div style={{ fontSize: '1.3rem', marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.v}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Recherche */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, alignItems: 'center' }}>
        <div className="search-wrap" style={{ flex: '1 1 280px', maxWidth: 400 }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un agent..." />
        </div>
      </div>

      {/* Cards agents */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16, marginBottom: 24 }}>
        {filtered.map(a => (
          <div key={a.id} className="glass-card" style={{ padding: 22, cursor: 'pointer', transition: 'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            onClick={() => setSelected(a)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <div className="avatar avatar-md" style={{ background: `hsl(${a.id * 70}, 55%, 40%)`, fontSize: '0.85rem' }}>{a.avatar}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>{a.nom} {a.prenom}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>{a.matricule}</div>
              </div>
              <span className={`badge ${a.statut === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{a.statut}</span>
            </div>
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Rôle</span>
                <span className={`badge ${ROLE_COLORS[a.role] || 'badge-gray'}`} style={{ fontSize: '0.68rem' }}>{a.role}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Fokontany</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>{a.fokontany}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>Actes validés</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-400)' }}>{a.actes}</span>
              </div>
            </div>
            {/* Performance bar */}
            <div style={{ marginTop: 14 }}>
              <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: `${Math.min((a.actes / 211) * 100, 100)}%` }} />
              </div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: 4 }}>Performance relative</div>
            </div>
          </div>
        ))}
      </div>

      {/* Table détaillée */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem' }}>Registre des agents</div>
          <button className="btn btn-glass btn-sm">⬇ Exporter</button>
        </div>
        <div className="glass-table-wrap">
          <table className="glass-table">
            <thead>
              <tr><th>Agent</th><th>Matricule</th><th>Rôle</th><th>Fokontany</th><th>Actes</th><th>Dernier acte</th><th>Statut</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar avatar-sm" style={{ background: `hsl(${a.id * 70}, 55%, 40%)`, fontSize: '0.7rem' }}>{a.avatar}</div>
                      <span style={{ fontWeight: 600 }}>{a.nom} {a.prenom}</span>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{a.matricule}</td>
                  <td><span className={`badge ${ROLE_COLORS[a.role] || 'badge-gray'}`}>{a.role}</span></td>
                  <td style={{ fontSize: '0.83rem' }}>{a.fokontany}</td>
                  <td style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--emerald-400)' }}>{a.actes}</td>
                  <td style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{a.dernier}</td>
                  <td><span className={`badge ${a.statut === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{a.statut}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-glass btn-sm" onClick={() => setSelected(a)}>👁</button>
                      <button className="btn btn-glass btn-sm">✏️</button>
                      <button className="btn btn-danger btn-sm">🚫</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal fiche agent */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Fiche agent</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="avatar avatar-lg" style={{ background: `hsl(${selected.id * 70}, 55%, 40%)` }}>{selected.avatar}</div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>{selected.nom} {selected.prenom}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6, flexWrap: 'wrap' }}>
                  <span className={`badge ${selected.statut === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{selected.statut}</span>
                  <span className={`badge ${ROLE_COLORS[selected.role]}`}>{selected.role}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
              {[
                { l: 'Matricule', v: selected.matricule },
                { l: 'Fokontany', v: selected.fokontany },
                { l: 'Actes validés', v: selected.actes },
                { l: 'Dernier acte', v: selected.dernier },
              ].map(f => (
                <div key={f.l} className="glass-card" style={{ padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.l}</div>
                  <div style={{ fontWeight: 700 }}>{f.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', marginBottom: 8 }}>Performance globale</div>
              <div className="progress-bar-wrap">
                <div className="progress-bar" style={{ width: `${Math.min((selected.actes / 211) * 100, 100)}%` }} />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 4 }}>{selected.actes} actes / 211 max</div>
            </div>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-glass" onClick={() => setSelected(null)}>Fermer</button>
              <button className="btn btn-glass">✏️ Modifier</button>
              <button className="btn btn-danger">🚫 Désactiver</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal nouveau agent */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal" style={{ maxWidth: 580 }}>
            <div className="modal-header">
              <div className="modal-title">👔 Nouvel agent</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {saved ? (
              <div className="alert alert-success" style={{ textAlign: 'center', flexDirection: 'column', padding: 32 }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>✅</div>
                <div style={{ fontWeight: 700 }}>Agent créé avec succès</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 4 }}>Identifiants envoyés par SMS</div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="form-grid" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input className="form-input" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prénom *</label>
                    <input className="form-input" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Rôle *</label>
                    <select className="form-select" value={form.role} onChange={e => setForm({...form, role: e.target.value})}>
                      <option>Agent Fokontany</option>
                      <option>Superviseur</option>
                      <option>Administrateur</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fokontany *</label>
                    <input className="form-input" value={form.fokontany} onChange={e => setForm({...form, fokontany: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="agent@commune.mg" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
                    <input className="form-input" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} required />
                  </div>
                </div>
                <div className="alert alert-info" style={{ marginBottom: 20 }}>
                  <span>📱</span>
                  <div style={{ fontSize: '0.78rem' }}>Un matricule sera généré automatiquement. Les identifiants de connexion seront envoyés par SMS au numéro renseigné.</div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Créer l'agent →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
