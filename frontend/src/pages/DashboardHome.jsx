import React, { useState, useEffect } from 'react';
import { useAuth } from '../App';

const STATS = [
  { icon: '👥', value: '2847',  label: 'Citoyens enregistrés', trend: '+12%', up: true,  color: 'var(--emerald-500)', page: 'citoyens'    },
  { icon: '📋', value: '143',   label: 'Demandes ce mois',     trend: '+8%',  up: true,  color: 'var(--teal-400)',   page: 'etatcivil'   },
  { icon: '⏳', value: '18',    label: 'Dossiers en attente',  trend: '-5%',  up: false, color: 'var(--gold-400)',   page: 'etatcivil'   },
  { icon: '💳', value: '4200000', label: 'Taxes collectées (Ar)',trend: '+24%', up: true, color: '#a78bfa',           page: 'paiements'   },
];

const RECENT = [
  { id: 'CD-001', citoyen: 'Rakoto Jean',    type: 'Acte de naissance',    status: 'Validé',      date: 'il y a 2h'  },
  { id: 'CD-002', citoyen: 'Rasoa Marie',    type: 'Certificat résidence', status: 'En cours',    date: 'il y a 3h'  },
  { id: 'CD-003', citoyen: 'Rabe Paul',      type: 'Acte de mariage',      status: 'En attente',  date: 'il y a 5h'  },
  { id: 'CD-004', citoyen: 'Ravelo Soa',     type: 'Paiement taxe',        status: 'Validé',      date: 'hier'       },
  { id: 'CD-005', citoyen: 'Andrianina',     type: 'Permis construction',  status: 'Rejeté',      date: 'hier'       },
];

const ACTIVITY = [
  { icon: '👶', text: 'Nouvelle naissance enregistrée — Rakoto Mialy', time: 'il y a 8 min',  color: 'var(--emerald-500)' },
  { icon: '💳', text: 'Paiement taxe reçu — 25 000 Ar — Ravelo Soa',  time: 'il y a 22 min', color: '#a78bfa' },
  { icon: '📜', text: 'Certificat résidence délivré — CRT-003',         time: 'il y a 1h',    color: 'var(--teal-400)' },
  { icon: '📡', text: 'Alerte Santé publiée — Zone Nord',               time: 'il y a 2h',    color: '#f87171' },
  { icon: '🔐', text: 'Connexion agent — Rasoa Nivo (AGT-002)',         time: 'il y a 3h',    color: 'rgba(255,255,255,0.4)' },
  { icon: '✏️', text: 'Mise à jour citoyen — Andrianina Lova',         time: 'il y a 4h',    color: 'var(--gold-400)' },
];

const PHASE_DATA = [
  { label: 'Phase 1 — Préparation',  pct: 100, color: 'var(--emerald-500)' },
  { label: 'Phase 2 — MVP Dev',      pct: 85,  color: 'var(--teal-400)'   },
  { label: 'Phase 3 — Pilote',       pct: 40,  color: '#a78bfa'           },
  { label: 'Phase 4 — Déploiement',  pct: 0,   color: 'var(--gold-400)'   },
  { label: 'Phase 5 — Pérennisation',pct: 0,   color: '#f87171'           },
];

function StatusBadge({ s }) {
  const map = { 'Validé': 'badge-green', 'En cours': 'badge-orange', 'En attente': 'badge-gold', 'Rejeté': 'badge-red' };
  return <span className={`badge ${map[s] || 'badge-gray'}`}>{s}</span>;
}

function AnimCounter({ target }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    const n = parseInt(target, 10);
    if (isNaN(n)) return;
    let cur = 0;
    const step = Math.ceil(n / 40);
    const t = setInterval(() => {
      cur = Math.min(cur + step, n);
      setVal(cur);
      if (cur >= n) clearInterval(t);
    }, 25);
    return () => clearInterval(t);
  }, [target]);
  if (parseInt(target) >= 1000000) return <span>{(val / 1000000).toFixed(1)}M</span>;
  if (parseInt(target) >= 1000)    return <span>{val.toLocaleString('fr-FR')}</span>;
  return <span>{val}</span>;
}

export default function DashboardHome({ onNavigate }) {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Bonjour' : hour < 18 ? 'Bon après-midi' : 'Bonsoir';
  const [activityTab, setActivityTab] = useState('recent');

  return (
    <>
      {/* Header */}
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">🏠 <span>/</span> Tableau de bord</div>
          <h1 className="page-title">{greeting}, {user?.name?.split(' ')[0]} 👋</h1>
          <p className="page-subtitle">
            {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            &nbsp;·&nbsp;<span style={{ color: 'var(--emerald-400)' }}>✓ Tout synchronisé</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-glass btn-sm" onClick={() => onNavigate('etatcivil')}>📋 Nouvel acte</button>
          <button className="btn btn-glass btn-sm" onClick={() => onNavigate('impressions')}>🖨️ Imprimer</button>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('certificats')}>+ Certificat</button>
        </div>
      </div>

      {/* Alertes banner */}
      <div className="alert alert-error" style={{ marginBottom: 10 }}>
        <span style={{ fontSize: '1.1rem' }}>🏥</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>Alerte sanitaire active</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: 2 }}>Campagne vaccination Polio — Zone Nord · 10 au 20 mai 2026</div>
        </div>
        <button className="btn btn-glass btn-sm" style={{ marginLeft: 'auto' }} onClick={() => onNavigate('alertes')}>Détails →</button>
      </div>
      <div className="alert alert-warn" style={{ marginBottom: 20 }}>
        <span style={{ fontSize: '1.1rem' }}>⚠️</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>18 dossiers en attente</div>
          <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: 2 }}>Dont 3 actes d'état civil non validés depuis plus de 48h</div>
        </div>
        <button className="btn btn-glass btn-sm" style={{ marginLeft: 'auto' }} onClick={() => onNavigate('etatcivil')}>Traiter →</button>
      </div>

      {/* Stats */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {STATS.map(s => (
          <div key={s.label} className="glass-card stat-card"
            style={{ cursor: 'pointer', transition: 'transform 0.2s' }}
            onClick={() => onNavigate(s.page)}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-value"><AnimCounter target={s.value} /></div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>{s.up ? '↑' : '↓'} {s.trend} ce mois</div>
          </div>
        ))}
      </div>

      {/* Row 2 */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Dossiers récents */}
        <div className="glass-card" style={{ overflow: 'hidden' }}>
          <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem' }}>Derniers dossiers</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>Mis à jour en temps réel</div>
            </div>
            <button className="btn btn-glass btn-sm" onClick={() => onNavigate('etatcivil')}>Tout voir →</button>
          </div>
          <div className="glass-table-wrap">
            <table className="glass-table">
              <thead><tr><th>Réf.</th><th>Citoyen</th><th>Type</th><th>Statut</th><th>Date</th></tr></thead>
              <tbody>
                {RECENT.map(r => (
                  <tr key={r.id} style={{ cursor: 'pointer' }}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)' }}>{r.id}</td>
                    <td style={{ fontWeight: 600 }}>{r.citoyen}</td>
                    <td style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.83rem' }}>{r.type}</td>
                    <td><StatusBadge s={r.status} /></td>
                    <td style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)' }}>{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Flux d'activité */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem' }}>Flux d'activité</div>
            <div className="tabs" style={{ padding: 3 }}>
              <button className={`tab-btn ${activityTab === 'recent' ? 'active' : ''}`} onClick={() => setActivityTab('recent')}>Récent</button>
              <button className={`tab-btn ${activityTab === 'all' ? 'active' : ''}`} onClick={() => setActivityTab('all')}>Tout</button>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {(activityTab === 'recent' ? ACTIVITY.slice(0, 4) : ACTIVITY).map((a, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: 12, paddingBottom: 14, position: 'relative' }}>
                {i < arr.length - 1 && <div style={{ position: 'absolute', left: 13, top: 28, width: 1, height: 'calc(100% - 14px)', background: 'rgba(255,255,255,0.07)' }} />}
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: `${a.color}22`, border: `1px solid ${a.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', flexShrink: 0, zIndex: 1 }}>
                  {a.icon}
                </div>
                <div style={{ flex: 1, paddingTop: 2 }}>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.4 }}>{a.text}</div>
                  <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20 }}>
        {/* Sync */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 16 }}>📡 Synchronisation</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: 'Données locales',  pct: 100, color: 'var(--emerald-500)' },
              { label: 'Sync serveur',     pct: 87,  color: 'var(--teal-400)'   },
              { label: 'Cache hors-ligne', pct: 94,  color: '#a78bfa'           },
              { label: 'Intégrité SHA-256',pct: 100, color: 'var(--gold-400)'   },
            ].map(s => (
              <div key={s.label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.78rem', color: 'rgba(255,255,255,0.55)' }}>
                  <span>{s.label}</span><span style={{ fontWeight: 700, color: '#fff' }}>{s.pct}%</span>
                </div>
                <div className="progress-bar-wrap"><div className="progress-bar" style={{ width: `${s.pct}%`, background: s.color }} /></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>Algorithme LWW · Dernière sync : 3 min</div>
        </div>

        {/* Actions rapides */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 16 }}>⚡ Actions rapides</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '👶', label: 'Enregistrer naissance',  page: 'etatcivil'    },
              { icon: '📜', label: 'Délivrer certificat',     page: 'certificats'  },
              { icon: '💳', label: 'Encaisser paiement',      page: 'paiements'    },
              { icon: '🖨️', label: 'Imprimer un document',   page: 'impressions'  },
              { icon: '📡', label: 'Publier une alerte',      page: 'alertes'      },
              { icon: '📊', label: 'Voir les statistiques',   page: 'statistiques' },
            ].map(a => (
              <button key={a.label} className="btn btn-glass" style={{ justifyContent: 'flex-start', padding: '9px 14px', gap: 10, fontSize: '0.82rem' }} onClick={() => onNavigate(a.page)}>
                <span style={{ width: 20, textAlign: 'center' }}>{a.icon}</span> {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Plan */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 16 }}>🗓️ Plan de déploiement</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {PHASE_DATA.map((p, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.75rem' }}>
                  <span style={{ color: p.pct === 100 ? '#fff' : p.pct > 0 ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.3)' }}>{p.label}</span>
                  <span style={{ fontWeight: 700, color: p.color }}>{p.pct}%</span>
                </div>
                <div className="progress-bar-wrap"><div className="progress-bar" style={{ width: `${p.pct}%`, background: p.color }} /></div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '10px 14px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 8, fontSize: '0.72rem', color: 'var(--emerald-400)' }}>
            🚀 Pilote : 5 Fokontany · 200 agents formés
          </div>
        </div>
      </div>
    </>
  );
}
