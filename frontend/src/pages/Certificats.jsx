// Certificats.jsx
import React, { useState } from 'react';

const CERTS = [
  { id: 'CRT-001', type: 'Résidence',  citoyen: 'Rakoto Jean',   date: '2026-05-03', statut: 'Délivré',    prix: '2 000 Ar' },
  { id: 'CRT-002', type: 'Héritage',   citoyen: 'Rasoa Marie',   date: '2026-05-01', statut: 'En cours',   prix: '5 000 Ar' },
  { id: 'CRT-003', type: 'Résidence',  citoyen: 'Rabe Paul',     date: '2026-04-28', statut: 'En attente', prix: '2 000 Ar' },
  { id: 'CRT-004', type: 'Permis',     citoyen: 'Ravelo Soa',    date: '2026-04-25', statut: 'Délivré',    prix: '10 000 Ar' },
  { id: 'CRT-005', type: 'Résidence',  citoyen: 'Andrianina',    date: '2026-04-22', statut: 'Délivré',    prix: '2 000 Ar' },
];

export default function Certificats() {
  const [showModal, setShowModal] = useState(false);
  const [type, setType] = useState('Résidence');
  const [form, setForm] = useState({ citoyen: '', cin: '', fokontany: '', motif: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => { setSaved(false); setShowModal(false); }, 1800);
  };

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">📜 <span>/</span> Certificats</div>
          <h1 className="page-title">Certificats & Autorisations</h1>
          <p className="page-subtitle">Délivrance des certificats de résidence, héritage et permis divers</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Nouveau certificat</button>
      </div>

      {/* Types de certificats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 14, marginBottom: 24 }}>
        {[
          { icon: '🏠', type: 'Résidence',  prix: '2 000 Ar', nb: 3 },
          { icon: '⚖️', type: 'Héritage',   prix: '5 000 Ar', nb: 1 },
          { icon: '🔧', type: 'Permis',      prix: '10 000 Ar', nb: 1 },
          { icon: '📄', type: 'Autre',       prix: 'Variable', nb: 0 },
        ].map(c => (
          <div key={c.type} className="glass-card" style={{ padding: '20px', textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: '1.8rem', marginBottom: 8 }}>{c.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{c.type}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', margin: '4px 0' }}>{c.prix}</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{c.nb} en cours</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginRight: 'auto' }}>Registre des certificats</div>
          <button className="btn btn-glass btn-sm">⬇ Exporter</button>
        </div>
        <div className="glass-table-wrap">
          <table className="glass-table">
            <thead><tr><th>Réf.</th><th>Type</th><th>Citoyen</th><th>Date</th><th>Statut</th><th>Tarif</th><th>Actions</th></tr></thead>
            <tbody>
              {CERTS.map(c => (
                <tr key={c.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>{c.id}</td>
                  <td><span className="badge badge-blue">{c.type}</span></td>
                  <td style={{ fontWeight: 600 }}>{c.citoyen}</td>
                  <td style={{ fontSize: '0.83rem', color: 'rgba(255,255,255,0.5)' }}>{c.date}</td>
                  <td><span className={`badge ${c.statut === 'Délivré' ? 'badge-green' : c.statut === 'En cours' ? 'badge-orange' : 'badge-gold'}`}>{c.statut}</span></td>
                  <td style={{ fontWeight: 700, color: 'var(--emerald-400)' }}>{c.prix}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-glass btn-sm">👁</button>
                      {c.statut !== 'Délivré' && <button className="btn btn-primary btn-sm">✓ Délivrer</button>}
                      {c.statut === 'Délivré' && <button className="btn btn-glass btn-sm">🖨 Imprimer</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">📜 Nouveau certificat</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {saved ? (
              <div className="alert alert-success" style={{ textAlign: 'center', flexDirection: 'column', padding: 32 }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>✅</div>
                <div style={{ fontWeight: 700 }}>Certificat créé avec succès</div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Type de certificat *</label>
                  <select className="form-select" value={type} onChange={e => setType(e.target.value)}>
                    <option>Résidence</option><option>Héritage</option><option>Permis</option><option>Autre</option>
                  </select>
                </div>
                <div className="form-grid" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Nom du citoyen *</label>
                    <input className="form-input" value={form.citoyen} onChange={e => setForm({...form, citoyen: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CIN</label>
                    <input className="form-input" value={form.cin} onChange={e => setForm({...form, cin: e.target.value})} />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Fokontany</label>
                    <input className="form-input" value={form.fokontany} onChange={e => setForm({...form, fokontany: e.target.value})} />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 24 }}>
                  <label className="form-label">Motif / Objet</label>
                  <textarea className="form-textarea" value={form.motif} onChange={e => setForm({...form, motif: e.target.value})} />
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Créer le certificat →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
