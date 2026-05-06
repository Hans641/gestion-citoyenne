import React, { useState } from 'react';

const MOCK = [
  { id: 1, nom: 'Rakoto', prenom: 'Jean', cin: '101001234567', telephone: '034 12 345 67', fokontany: 'Sabotsy Namehana', statut: 'Actif',    actes: 3, last: '2026-05-01' },
  { id: 2, nom: 'Rasoa',  prenom: 'Marie', cin: '101007654321', telephone: '032 98 765 43', fokontany: 'Ambohimanga',      statut: 'Actif',    actes: 1, last: '2026-04-15' },
  { id: 3, nom: 'Rabe',   prenom: 'Paul',  cin: '',             telephone: '033 55 443 21', fokontany: 'Ivandry',          statut: 'Inactif',  actes: 0, last: '—' },
  { id: 4, nom: 'Ravelo', prenom: 'Soa',   cin: '101009876543', telephone: '034 76 543 21', fokontany: 'Sabotsy Namehana', statut: 'Actif',    actes: 5, last: '2026-04-28' },
  { id: 5, nom: 'Andrianina', prenom: 'Lova', cin: '101002345678', telephone: '032 45 678 90', fokontany: 'Ambohimanga', statut: 'Actif',     actes: 2, last: '2026-04-22' },
  { id: 6, nom: 'Randria', prenom: 'Zo',   cin: '',             telephone: '034 33 222 11', fokontany: 'Ivandry',          statut: 'Actif',    actes: 1, last: '2026-03-10' },
];

export default function Citoyens() {
  const [search, setSearch] = useState('');
  const [filterFok, setFilterFok] = useState('Tous');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nom: '', prenom: '', cin: '', telephone: '', fokontany: '', adresse: '' });
  const [saved, setSaved] = useState(false);

  const foks = ['Tous', ...new Set(MOCK.map(c => c.fokontany))];

  const filtered = MOCK.filter(c => {
    const q = search.toLowerCase();
    const match = (c.nom + ' ' + c.prenom + ' ' + c.cin).toLowerCase().includes(q);
    const fok = filterFok === 'Tous' || c.fokontany === filterFok;
    return match && fok;
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
          <div className="breadcrumb">👥 <span>/</span> Citoyens</div>
          <h1 className="page-title">Annuaire des citoyens</h1>
          <p className="page-subtitle">Registre central des résidents — {MOCK.length} citoyens enregistrés</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Nouveau citoyen</button>
      </div>

      {/* Filtres */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="search-wrap" style={{ flex: '1 1 280px', maxWidth: 400 }}>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher par nom, CIN..." />
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {foks.map(f => <button key={f} className={`chip ${filterFok === f ? 'active' : ''}`} onClick={() => setFilterFok(f)}>{f}</button>)}
        </div>
      </div>

      {/* Liste */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div className="glass-table-wrap">
          <table className="glass-table">
            <thead>
              <tr>
                <th>Citoyen</th>
                <th>CIN</th>
                <th>Téléphone</th>
                <th>Fokontany</th>
                <th>Statut</th>
                <th>Actes</th>
                <th>Dernier acte</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar avatar-sm" style={{ background: `hsl(${c.id * 60}, 60%, 40%)` }}>{c.nom[0]}</div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{c.nom} {c.prenom}</div>
                        <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>ID #{c.id}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: c.cin ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.25)' }}>
                    {c.cin || '—'}
                  </td>
                  <td style={{ fontSize: '0.83rem' }}>{c.telephone}</td>
                  <td>
                    <span className="badge badge-blue">{c.fokontany}</span>
                  </td>
                  <td>
                    <span className={`badge ${c.statut === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{c.statut}</span>
                  </td>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{c.actes}</td>
                  <td style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>{c.last}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button className="btn btn-glass btn-sm" onClick={() => setSelected(c)}>👁</button>
                      <button className="btn btn-glass btn-sm">✏️</button>
                      <button className="btn btn-danger btn-sm">🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '14px 24px', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.35)' }}>
          {filtered.length} résultat(s) sur {MOCK.length} citoyens
        </div>
      </div>

      {/* ── Fiche citoyen ── */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">Fiche citoyen</div>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div className="avatar avatar-lg" style={{ background: `hsl(${selected.id * 60}, 60%, 40%)` }}>{selected.nom[0]}</div>
              <div>
                <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>{selected.nom} {selected.prenom}</div>
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <span className={`badge ${selected.statut === 'Actif' ? 'badge-green' : 'badge-gray'}`}>{selected.statut}</span>
                  <span className="badge badge-blue">{selected.fokontany}</span>
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { l: 'CIN', v: selected.cin || 'Non renseigné' },
                { l: 'Téléphone', v: selected.telephone },
                { l: 'Fokontany', v: selected.fokontany },
                { l: 'Actes enregistrés', v: selected.actes },
                { l: 'Dernier acte', v: selected.last },
              ].map(f => (
                <div key={f.l}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{f.l}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500 }}>{f.v}</div>
                </div>
              ))}
            </div>
            <div className="divider" />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn btn-glass" onClick={() => setSelected(null)}>Fermer</button>
              <button className="btn btn-primary">Voir les actes →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal nouveau citoyen ── */}
      {showModal && (
        <div className="modal-overlay" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal">
            <div className="modal-header">
              <div className="modal-title">👥 Enregistrer un citoyen</div>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            {saved ? (
              <div className="alert alert-success" style={{ textAlign: 'center', flexDirection: 'column', padding: 32 }}>
                <div style={{ fontSize: '2rem', marginBottom: 10 }}>✅</div>
                <div style={{ fontWeight: 700 }}>Citoyen enregistré avec succès</div>
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="form-grid" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label className="form-label">Nom *</label>
                    <input className="form-input" value={form.nom} onChange={e => setForm({...form, nom: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Prénom(s) *</label>
                    <input className="form-input" value={form.prenom} onChange={e => setForm({...form, prenom: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CIN</label>
                    <input className="form-input" value={form.cin} onChange={e => setForm({...form, cin: e.target.value})} placeholder="Si disponible" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Téléphone *</label>
                    <input className="form-input" value={form.telephone} onChange={e => setForm({...form, telephone: e.target.value})} required />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Fokontany *</label>
                    <input className="form-input" value={form.fokontany} onChange={e => setForm({...form, fokontany: e.target.value})} required />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label">Adresse</label>
                    <textarea className="form-textarea" value={form.adresse} onChange={e => setForm({...form, adresse: e.target.value})} placeholder="Adresse complète" />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-glass" onClick={() => setShowModal(false)}>Annuler</button>
                  <button type="submit" className="btn btn-primary">Enregistrer →</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
