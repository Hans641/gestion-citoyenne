import React, { useState } from 'react';

const MONTHS = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun'];
const DATA_ACTES     = [45, 52, 48, 71, 89, 64];
const DATA_PAIEMENTS = [120000, 145000, 98000, 210000, 320000, 185000];
const DATA_CITOYENS  = [2600, 2680, 2720, 2790, 2830, 2847];

const BAR_MAX_ACTES = Math.max(...DATA_ACTES);
const BAR_MAX_PAY   = Math.max(...DATA_PAIEMENTS);

function MiniBar({ val, max, color, label, sub }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', gap: 4, flex: 1 }}>
      <div style={{ width: '100%', height: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <div style={{
          width: '70%', borderRadius: '4px 4px 0 0',
          height: `${(val / max) * 100}%`,
          background: color,
          transition: 'height 0.6s cubic-bezier(0.16,1,0.3,1)',
          minHeight: 4,
        }} />
      </div>
      <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', textAlign: 'center', width: '100%' }}>{label}</div>
    </div>
  );
}

function LineChart({ data, color, label, format }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 120, w = 100;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 10) - 5;
    return `${x},${y}`;
  });
  const poly = pts.join(' ');
  const area = `0,${h} ${poly} ${w},${h}`;

  return (
    <div>
      <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.875rem', marginBottom: 12 }}>{label}</div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width: '100%', height: 120, overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#grad-${label})`} />
        <polyline points={poly} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {data.map((v, i) => {
          const [x, y] = pts[i].split(',').map(Number);
          return <circle key={i} cx={x} cy={y} r="3" fill={color} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />;
        })}
      </svg>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {MONTHS.map(m => <span key={m} style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>{m}</span>)}
      </div>
    </div>
  );
}

export default function Statistiques() {
  const [period, setPeriod] = useState('6M');

  return (
    <>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="breadcrumb">📊 <span>/</span> Statistiques</div>
          <h1 className="page-title">Statistiques & Indicateurs</h1>
          <p className="page-subtitle">Tableaux de bord en temps réel pour les décideurs</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['1M', '3M', '6M', '1A'].map(p => (
            <button key={p} className={`chip ${period === p ? 'active' : ''}`} onClick={() => setPeriod(p)}>{p}</button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="stats-grid" style={{ marginBottom: 20 }}>
        {[
          { icon: '📋', value: '469', label: 'Actes enregistrés (6M)', trend: '+18%', up: true, color: 'var(--emerald-500)' },
          { icon: '👥', value: '2 847', label: 'Citoyens actifs', trend: '+9.5%', up: true, color: 'var(--teal-400)' },
          { icon: '💳', value: '1.08M', label: 'Taxes collectées (Ar)', trend: '+31%', up: true, color: '#a78bfa' },
          { icon: '⏱️', value: '2.4h', label: 'Délai moyen traitement', trend: '-22%', up: true, color: 'var(--gold-400)' },
        ].map(s => (
          <div key={s.label} className="glass-card stat-card" style={{ color: s.color }}>
            <span className="stat-icon">{s.icon}</span>
            <div className="stat-value" style={{ color: '#fff' }}>{s.value}</div>
            <div className="stat-label">{s.label}</div>
            <div className={`stat-trend ${s.up ? 'up' : 'down'}`}>{s.up ? '↑' : '↓'} {s.trend}</div>
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Actes bar chart */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>Actes enregistrés / mois</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>Naissances · Mariages · Décès</div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 130, padding: '0 8px' }}>
            {DATA_ACTES.map((v, i) => (
              <MiniBar
                key={i} val={v} max={BAR_MAX_ACTES}
                color={`linear-gradient(to top, var(--emerald-600), var(--emerald-400))`}
                label={MONTHS[i]} sub={v}
              />
            ))}
          </div>
          <div style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--emerald-400)', fontWeight: 700 }}>
            ↑ Pic en avril : 71 actes · Mai : 89 actes (record)
          </div>
        </div>

        {/* Évolution citoyens */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>Évolution du registre</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Nombre de citoyens enregistrés</div>
          <LineChart data={DATA_CITOYENS} color="var(--teal-400)" label="" format={v => v.toLocaleString()} />
          <div style={{ marginTop: 4, fontSize: '0.78rem', color: 'var(--teal-400)', fontWeight: 700 }}>
            +247 citoyens en 6 mois · Croissance régulière
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid-2" style={{ marginBottom: 20 }}>
        {/* Répartition par type */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 20 }}>Répartition des actes</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { l: 'Naissances', v: 62, color: 'var(--emerald-400)' },
              { l: 'Certificats résidence', v: 24, color: 'var(--teal-400)' },
              { l: 'Mariages', v: 8, color: '#a78bfa' },
              { l: 'Décès', v: 4, color: '#f87171' },
              { l: 'Autres', v: 2, color: 'rgba(255,255,255,0.3)' },
            ].map(s => (
              <div key={s.l}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5, fontSize: '0.8rem' }}>
                  <span style={{ color: 'rgba(255,255,255,0.65)' }}>{s.l}</span>
                  <span style={{ fontWeight: 700, color: s.color }}>{s.v}%</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar" style={{ width: `${s.v}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Taxes collectées */}
        <div className="glass-card" style={{ padding: 24 }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', marginBottom: 4 }}>Recettes fiscales (Ar)</div>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginBottom: 16 }}>Taxes, amendes, redevances</div>
          <LineChart data={DATA_PAIEMENTS} color="#a78bfa" label="" />
          <div style={{ marginTop: 4, fontSize: '0.78rem', color: '#a78bfa', fontWeight: 700 }}>
            Pic en mai : 320 000 Ar · Total 6M : 1 078 000 Ar
          </div>
        </div>
      </div>

      {/* Tableau par Fokontany */}
      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem' }}>Performance par Fokontany</div>
          <button className="btn btn-glass btn-sm">⬇ Rapport PDF</button>
        </div>
        <div className="glass-table-wrap">
          <table className="glass-table">
            <thead><tr><th>Fokontany</th><th>Population</th><th>Actes</th><th>Taux couverture</th><th>Taxes (Ar)</th><th>Statut sync</th></tr></thead>
            <tbody>
              {[
                { nom: 'Sabotsy Namehana', pop: 12400, actes: 89, taux: 72, taxes: 320000, sync: 'Synchronisé' },
                { nom: 'Ivandry',          pop: 15600, actes: 120, taux: 77, taxes: 412000, sync: 'Synchronisé' },
                { nom: 'Ambohimanga',      pop: 8200,  actes: 45, taux: 55, taxes: 186000, sync: 'Synchronisé' },
                { nom: 'Ankorondrano',     pop: 9800,  actes: 62, taux: 63, taxes: 248000, sync: 'Hors-ligne' },
                { nom: 'Ambodivona',       pop: 7300,  actes: 34, taux: 47, taxes: 112000, sync: 'Synchronisé' },
              ].map(r => (
                <tr key={r.nom}>
                  <td style={{ fontWeight: 600 }}>{r.nom}</td>
                  <td style={{ color: 'rgba(255,255,255,0.6)' }}>{r.pop.toLocaleString()}</td>
                  <td style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, color: 'var(--emerald-400)' }}>{r.actes}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 99, overflow: 'hidden' }}>
                        <div style={{ width: `${r.taux}%`, height: '100%', background: 'var(--emerald-500)', borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--emerald-400)', minWidth: 32 }}>{r.taux}%</span>
                    </div>
                  </td>
                  <td style={{ fontWeight: 700 }}>{r.taxes.toLocaleString()}</td>
                  <td><span className={`badge ${r.sync === 'Synchronisé' ? 'badge-green' : 'badge-orange'}`}>{r.sync}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
