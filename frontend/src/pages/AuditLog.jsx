import React, { useState } from 'react';

const LOGS = [
  { id: 1, action: 'CREATE', entite: 'ActeEtatCivil', detail: 'Enregistrement naissance — Rakoto Mialy', agent: 'Rakoto Jean', matricule: 'AGT-001', timestamp: '2026-05-03 14:32:11', ip: '192.168.1.42', hash: 'a3f9e2d1...', risque: 'Faible' },
  { id: 2, action: 'UPDATE', entite: 'Citoyen',       detail: 'Mise à jour téléphone — Rasoa Marie',    agent: 'Rakoto Jean', matricule: 'AGT-001', timestamp: '2026-05-03 13:15:44', ip: '192.168.1.42', hash: 'b1c2d3e4...', risque: 'Faible' },
  { id: 3, action: 'VALIDATE', entite: 'Transaction', detail: 'Paiement taxe — 25 000 Ar — TXN-004',    agent: 'Rasoa Nivo',  matricule: 'AGT-002', timestamp: '2026-05-03 11:08:22', ip: '10.0.0.15',   hash: 'c5d6e7f8...', risque: 'Moyen' },
  { id: 4, action: 'DELETE',  entite: 'Citoyen',       detail: 'Suppression compte — ID #32',            agent: 'Rabe Bodo',   matricule: 'AGT-003', timestamp: '2026-05-02 16:55:01', ip: '10.0.0.22',   hash: 'd9e0f1a2...', risque: 'Élevé' },
  { id: 5, action: 'LOGIN',   entite: 'Session',        detail: 'Connexion réussie — Portail admin',      agent: 'Andrianina',  matricule: 'AGT-004', timestamp: '2026-05-02 08:30:00', ip: '172.16.0.5',  hash: 'e3f4a5b6...', risque: 'Faible' },
  { id: 6, action: 'CREATE',  entite: 'Certificat',     detail: 'Délivrance certificat résidence — CRT-003', agent: 'Rabe Bodo', matricule: 'AGT-003', timestamp: '2026-05-01 10:20:33', ip: '10.0.0.22', hash: 'f7a8b9c0...', risque: 'Faible' },
  { id: 7, action: 'EXPORT',  entite: 'Registre',       detail: 'Export CSV citoyens — 2847 entrées',     agent: 'Randria Patrick', matricule: 'AGT-005', timestamp: '2026-04-30 17:01:55', ip: '192.168.1.100', hash: 'a1b2c3d4...', risque: 'Moyen' },
  { id: 8, action: 'ALERT',   entite: 'Alerte',          detail: 'Publication alerte Santé — Vaccination Polio', agent: 'Randria Patrick', matricule: 'AGT-005', timestamp: '2026-04-28 09:14:22', ip: '192.168.1.100', hash: 'b5c6d7e8...', risque: 'Faible' },
];

const ACTION_STYLE = {
  CREATE:   { badge: 'badge-green',  icon: '➕' },
  UPDATE:   { badge: 'badge-blue',   icon: '✏️' },
  VALIDATE: { badge: 'badge-gold',   icon: '✅' },
  DELETE:   { badge: 'badge-red',    icon: '🗑' },
  LOGIN:    { badge: 'badge-gray',   icon: '🔐' },
  EXPORT:   { badge: 'badge-orange', icon: '📤' },
  ALERT:    { badge: 'badge-orange', icon: '📡' },
};

const RISK_STYLE = {
  'Faible': 'badge-green',
  'Moyen':  'badge-orange',
  'Élevé':  'badge-red',
};

export default function AuditLog() {
  const [filterAction, setFilterAction]   = useState('Tous');
  const [filterRisque, setFilterRisque]   = useState('Tous');
  const [search, setSearch]               = useState('');
  const [selectedLog, setSelectedLog]     = useState(null);
  const [dateDebut, setDateDebut]         = useState('');
  const [dateFin, setDateFin]             = useState('');

  const filtered = LOGS.filter(l => {
    const q = search.toLowerCase();
    const matchSearch = (l.detail + l.agent + l.entite + l.matricule).toLowerCase().includes(q);
    const matchAction = filterAction === 'Tous' || l.action === filterAction;
    const matchRisque = filterRisque === 'Tous' || l.risque === filterRisque;
    return matchSearch && matchAction && matchRisque;
  });

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">🔍 <span>/</span> Journal d'audit</div>
          <h1 className="page-title">Journal d'audit</h1>
          <p className="page-subtitle">Traçabilité complète — Qui a fait quoi, quand et depuis où</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-glass btn-sm">⬇ Export JSON</button>
          <button className="btn btn-glass btn-sm">📄 Rapport PDF</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { l: 'Total entrées', v: LOGS.length, icon: '📋', color: '#fff' },
          { l: 'Actions risquées', v: LOGS.filter(l => l.risque === 'Élevé').length, icon: '⚠️', color: '#f87171' },
          { l: 'Aujourd\'hui', v: LOGS.filter(l => l.timestamp.startsWith('2026-05-03')).length, icon: '📅', color: 'var(--teal-400)' },
          { l: 'Agents actifs', v: new Set(LOGS.map(l => l.matricule)).size, icon: '👔', color: '#a78bfa' },
        ].map(s => (
          <div key={s.l} className="glass-card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: '1.2rem', marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.v}</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 2 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Alerte actions élevées */}
      {LOGS.some(l => l.risque === 'Élevé') && (
        <div className="alert alert-error" style={{ marginBottom: 20 }}>
          <span>⚠️</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Actions à risque élevé détectées</div>
            <div style={{ fontSize: '0.8rem', marginTop: 2, opacity: 0.8 }}>
              {LOGS.filter(l => l.risque === 'Élevé').length} action(s) nécessitent une vérification manuelle.
              Consultez les entrées marquées en rouge.
            </div>
          </div>
          <button className="btn btn-glass btn-sm" style={{ marginLeft: 'auto' }}>Voir</button>
        </div>
      )}

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-wrap" style={{ flex: '1 1 240px', maxWidth: 360 }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher action, agent, entité..." />
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Tous', 'CREATE', 'UPDATE', 'VALIDATE', 'DELETE', 'EXPORT', 'LOGIN', 'ALERT'].map(a => (
            <button key={a} className={`chip ${filterAction === a ? 'active' : ''}`} onClick={() => setFilterAction(a)} style={{ fontSize: '0.72rem' }}>
              {a !== 'Tous' && ACTION_STYLE[a]?.icon + ' '}{a}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {['Tous', 'Faible', 'Moyen', 'Élevé'].map(r => (
            <button key={r} className={`chip ${filterRisque === r ? 'active' : ''}`} onClick={() => setFilterRisque(r)} style={{ fontSize: '0.72rem' }}>
              {r}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginLeft: 'auto' }}>
          <input className="form-input" type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} style={{ padding: '6px 10px', fontSize: '0.78rem', width: 140 }} />
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem' }}>→</span>
          <input className="form-input" type="date" value={dateFin} onChange={e => setDateFin(e.target.value)} style={{ padding: '6px 10px', fontSize: '0.78rem', width: 140 }} />
        </div>
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '14px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem' }}>
            Journal — <span style={{ color: 'var(--emerald-400)', fontFamily: 'monospace' }}>{filtered.length}</span> entrées
          </div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>
            🔒 Logs immuables · SHA-256 · Conformité Loi 2014-038
          </div>
        </div>
        <div className="glass-table-wrap">
          <table className="glass-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Horodatage</th>
                <th>Action</th>
                <th>Entité</th>
                <th>Détail</th>
                <th>Agent</th>
                <th>IP</th>
                <th>Risque</th>
                <th>Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => {
                const as = ACTION_STYLE[l.action] || { badge: 'badge-gray', icon: '•' };
                return (
                  <tr key={l.id} style={{ cursor: 'pointer', background: l.risque === 'Élevé' ? 'rgba(239,68,68,0.05)' : undefined }}
                    onClick={() => setSelectedLog(l)}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)' }}>#{l.id.toString().padStart(4, '0')}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{l.timestamp}</td>
                    <td><span className={`badge ${as.badge}`} style={{ fontSize: '0.7rem' }}>{as.icon} {l.action}</span></td>
                    <td style={{ fontSize: '0.8rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{l.entite}</td>
                    <td style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{l.detail}</td>
                    <td>
                      <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{l.agent}</div>
                      <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>{l.matricule}</div>
                    </td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{l.ip}</td>
                    <td><span className={`badge ${RISK_STYLE[l.risque]}`} style={{ fontSize: '0.68rem' }}>{l.risque}</span></td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.7rem', color: 'rgba(16,185,129,0.7)' }}>✓ {l.hash}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', display: 'flex', justifyContent: 'space-between' }}>
          <span>{filtered.length} entrée(s) affichée(s)</span>
          <span>Logs conservés 5 ans · Lecture seule</span>
        </div>
      </div>

      {/* Modal détail log */}
      {selectedLog && (
        <div className="modal-overlay" onClick={() => setSelectedLog(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 560 }}>
            <div className="modal-header">
              <div>
                <div className="modal-title">Détail de l'entrée #{selectedLog.id.toString().padStart(4, '0')}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 4, fontFamily: 'monospace' }}>{selectedLog.timestamp}</div>
              </div>
              <button className="modal-close" onClick={() => setSelectedLog(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { l: 'Action', v: selectedLog.action },
                { l: 'Entité concernée', v: selectedLog.entite },
                { l: 'Détail', v: selectedLog.detail },
                { l: 'Agent', v: `${selectedLog.agent} (${selectedLog.matricule})` },
                { l: 'Adresse IP', v: selectedLog.ip },
                { l: 'Niveau de risque', v: selectedLog.risque },
                { l: 'Empreinte SHA-256', v: selectedLog.hash },
              ].map(f => (
                <div key={f.l} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', minWidth: 160 }}>{f.l}</div>
                  <div style={{ fontSize: '0.875rem', fontWeight: f.l === 'Empreinte SHA-256' ? 400 : 600, fontFamily: f.l === 'Empreinte SHA-256' || f.l === 'Adresse IP' ? 'monospace' : 'inherit', color: f.l === 'Empreinte SHA-256' ? 'var(--emerald-400)' : '#fff' }}>{f.v}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div className="alert alert-info" style={{ marginTop: 0 }}>
              <span>🔒</span>
              <div style={{ fontSize: '0.78rem' }}>Cette entrée est immuable. Toute modification est techniquement impossible (append-only log).</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button className="btn btn-glass" onClick={() => setSelectedLog(null)}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
