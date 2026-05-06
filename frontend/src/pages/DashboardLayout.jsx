import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../App';

// Pages
import DashboardHome  from './DashboardHome';
import EtatCivil      from './EtatCivil';
import Certificats    from './Certificats';
import Citoyens       from './Citoyens';
import Paiements      from './Paiements';
import Cartographie   from './Cartographie';
import Alertes        from './Alertes';
import Statistiques   from './Statistiques';
import Parametres     from './Parametres';
import Chatbot        from './Chatbot';
import Agents         from './Agents';
import AuditLog       from './AuditLog';
import Impressions    from './Impressions';

// ── Role-based nav visibility ────────────────────────────────────
const NAV = [
  { section: 'Principal', items: [
    { id: 'home',         icon: '🏠', label: 'Tableau de bord',   badge: null,  roles: ['all'] },
    { id: 'citoyens',     icon: '👥', label: 'Citoyens',           badge: null,  roles: ['all'] },
    { id: 'etatcivil',    icon: '📋', label: 'État Civil',         badge: '3',   roles: ['all'] },
    { id: 'certificats',  icon: '📜', label: 'Certificats',        badge: null,  roles: ['all'] },
    { id: 'paiements',    icon: '💳', label: 'Paiements',          badge: null,  roles: ['all'] },
    { id: 'impressions',  icon: '🖨️', label: 'Impressions',       badge: null,  roles: ['all'] },
  ]},
  { section: 'Territoire', items: [
    { id: 'cartographie', icon: '🗺️', label: 'Cartographie',     badge: null,  roles: ['all'] },
    { id: 'alertes',      icon: '📡', label: 'Alertes',           badge: '2',   roles: ['all'] },
    { id: 'statistiques', icon: '📊', label: 'Statistiques',      badge: null,  roles: ['all'] },
  ]},
  { section: 'Administration', items: [
    { id: 'agents',       icon: '👔', label: 'Agents',            badge: null,  roles: ['Administrateur', 'Ministère MID'] },
    { id: 'auditlog',     icon: '🔍', label: 'Journal d\'audit',  badge: '1',   roles: ['Administrateur', 'Ministère MID'] },
  ]},
  { section: 'Système', items: [
    { id: 'chatbot',      icon: '🤖', label: 'Assistant IA',      badge: null,  roles: ['all'] },
    { id: 'parametres',   icon: '⚙️', label: 'Paramètres',       badge: null,  roles: ['all'] },
  ]},
];

const PAGE_MAP = {
  home:         DashboardHome,
  citoyens:     Citoyens,
  etatcivil:    EtatCivil,
  certificats:  Certificats,
  paiements:    Paiements,
  impressions:  Impressions,
  cartographie: Cartographie,
  alertes:      Alertes,
  statistiques: Statistiques,
  agents:       Agents,
  auditlog:     AuditLog,
  chatbot:      Chatbot,
  parametres:   Parametres,
};

// ── Notification panel ───────────────────────────────────────────
const NOTIFICATIONS = [
  { id: 1, type: 'warning', icon: '⚠️', title: 'Acte en attente de validation',   time: 'il y a 5 min',  read: false },
  { id: 2, type: 'info',    icon: '📡', title: 'Alerte Santé publiée avec succès', time: 'il y a 1h',    read: false },
  { id: 3, type: 'success', icon: '✅', title: 'Synchronisation complète',          time: 'il y a 3h',    read: true },
  { id: 4, type: 'info',    icon: '💳', title: 'Nouveau paiement — 25 000 Ar',     time: 'hier',          read: true },
];

function NotifPanel({ onClose }) {
  const [notifs, setNotifs] = useState(NOTIFICATIONS);
  const markAll = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  return (
    <div style={{
      position: 'absolute', top: '100%', right: 0, marginTop: 8,
      width: 340, zIndex: 500,
      background: 'rgba(10,20,40,0.95)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 16,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      animation: 'slideUp 0.2s ease',
    }}>
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '0.95rem' }}>Notifications</div>
        <button onClick={markAll} style={{ background: 'none', border: 'none', color: 'var(--emerald-400)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: 600 }}>
          Tout marquer lu
        </button>
      </div>
      <div style={{ maxHeight: 320, overflowY: 'auto' }}>
        {notifs.map(n => (
          <div key={n.id} style={{
            padding: '14px 20px',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', gap: 12, alignItems: 'flex-start',
            background: n.read ? 'transparent' : 'rgba(16,185,129,0.05)',
            cursor: 'pointer',
            transition: 'background 0.15s',
          }}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
          >
            <span style={{ fontSize: '1.1rem', marginTop: 1 }}>{n.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.82rem', fontWeight: n.read ? 400 : 700, color: n.read ? 'rgba(255,255,255,0.6)' : '#fff', lineHeight: 1.4 }}>{n.title}</div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>{n.time}</div>
            </div>
            {!n.read && <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--emerald-400)', flexShrink: 0, marginTop: 6 }} />}
          </div>
        ))}
      </div>
      <div style={{ padding: '12px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', textAlign: 'center' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--emerald-400)', fontSize: '0.78rem', cursor: 'pointer', fontWeight: 600 }}>
          Voir toutes les notifications →
        </button>
      </div>
    </div>
  );
}

// ── Search overlay ───────────────────────────────────────────────
const SEARCH_ITEMS = [
  { label: 'Rakoto Jean', sub: 'Citoyen · Sabotsy Namehana', icon: '👤', page: 'citoyens' },
  { label: 'EC-0091 — Acte de naissance', sub: 'État civil · Validé', icon: '📋', page: 'etatcivil' },
  { label: 'CRT-002 — Certificat héritage', sub: 'Certificats · En cours', icon: '📜', page: 'certificats' },
  { label: 'TXN-001 — Taxe locale', sub: 'Paiements · 25 000 Ar', icon: '💳', page: 'paiements' },
  { label: 'Alerte Vaccination Polio', sub: 'Alertes · Active · Haute urgence', icon: '📡', page: 'alertes' },
  { label: 'Rasoa Nivo — Agent AGT-002', sub: 'Agents · Ambohimanga', icon: '👔', page: 'agents' },
  { label: 'Statistiques Fokontany', sub: 'Mai 2026 · 89 actes', icon: '📊', page: 'statistiques' },
];

function SearchOverlay({ query, onNavigate, onClose }) {
  const results = SEARCH_ITEMS.filter(i =>
    (i.label + i.sub).toLowerCase().includes(query.toLowerCase())
  );
  if (!query || results.length === 0) return null;
  return (
    <div style={{
      position: 'absolute', top: '100%', left: 0, marginTop: 8,
      width: '100%', maxWidth: 500, zIndex: 500,
      background: 'rgba(10,20,40,0.97)',
      backdropFilter: 'blur(24px)',
      border: '1px solid rgba(255,255,255,0.15)',
      borderRadius: 14,
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      overflow: 'hidden',
      animation: 'slideUp 0.15s ease',
    }}>
      <div style={{ padding: '8px 0' }}>
        {results.map((r, i) => (
          <button key={i}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            onClick={() => { onNavigate(r.page); onClose(); }}
          >
            <span style={{ fontSize: '1.1rem' }}>{r.icon}</span>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{r.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>{r.sub}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'rgba(255,255,255,0.25)' }}>↩ Aller</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main layout ──────────────────────────────────────────────────
export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const [active, setActive]         = useState('home');
  const [search, setSearch]         = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lang, setLang]             = useState('fr');
  const [showNotifs, setShowNotifs] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const notifRef = useRef(null);
  const searchRef = useRef(null);

  const PageComponent = PAGE_MAP[active] || DashboardHome;
  const unreadCount = NOTIFICATIONS.filter(n => !n.read).length;

  // Filter nav by role
  const userRole = user?.role || '';
  const visibleNav = NAV.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.roles.includes('all') || item.roles.includes(userRole)
    ),
  })).filter(s => s.items.length > 0);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifs(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearch(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navigate = (page) => {
    setActive(page);
    setSidebarOpen(false);
    setSearch('');
    setShowSearch(false);
  };

  return (
    <div className="app-layout">

      {/* ── SIDEBAR ── */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo" style={{ 
          padding: '20px 16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          overflow: 'hidden' // Empêche tout ce qui dépasse d'être visible
        }}>
          <div className="logo-icon" style={{ fontSize: '1.6rem', flexShrink: 0 }}>🌿</div>
          <div className="logo-text" style={{ minWidth: 0 }}>
            <div className="logo-name" style={{ 
              fontFamily: 'Syne, sans-serif', 
              fontWeight: 800, 
              fontSize: '1rem', 
              lineHeight: '1.1', // Resserre l'espace entre les lignes
              color: '#fff'
            }}>
              CommuneDigit
            </div>
            <div className="logo-sub" style={{ 
              fontSize: '0.62rem', 
              opacity: 0.5, 
              marginTop: '2px'
            }}>
              Portail Administration
            </div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 8 }}>
          {visibleNav.map(section => (
            <div key={section.section}>
              <div className="nav-section-label">{section.section}</div>
              {section.items.map(item => (
                <button
                  key={item.id}
                  className={`nav-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => navigate(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Role badge */}
        <div style={{ padding: '10px 12px' }}>
          <div style={{ padding: '8px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, fontSize: '0.72rem', color: 'var(--emerald-400)', display: 'flex', gap: 6, alignItems: 'center' }}>
            <span>🛡️</span> {userRole}
          </div>
        </div>

        <div className="sidebar-footer">
          <div className="user-card" onClick={logout} title="Cliquer pour se déconnecter">
            <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#10b981,#14b8a6)' }}>{user?.avatar || '?'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="user-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
              <div className="user-role">Se déconnecter ↩</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 99, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* ── MAIN ── */}
      <div className="main-content">

        {/* ── TOPBAR ── */}
        <header className="topbar">
          {/* Hamburger mobile */}
          <button className="icon-btn" id="menu-toggle" style={{ display: 'none' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
          </button>

          {/* Search */}
          <div ref={searchRef} style={{ position: 'relative', flex: 1, maxWidth: 480 }}>
            <div className="topbar-search" onClick={() => setShowSearch(true)}>
              <span className="topbar-search-icon">🔍</span>
              <input
                value={search}
                onChange={e => { setSearch(e.target.value); setShowSearch(true); }}
                onFocus={() => setShowSearch(true)}
                placeholder="Rechercher citoyen, dossier, acte… (⌘K)"
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.9rem', padding: 0 }}>✕</button>
              )}
            </div>
            {showSearch && (
              <SearchOverlay query={search} onNavigate={navigate} onClose={() => { setShowSearch(false); setSearch(''); }} />
            )}
          </div>

          <div className="topbar-actions">
            {/* Sync */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.72rem', color: 'var(--emerald-400)', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', padding: '5px 12px', borderRadius: 99, whiteSpace: 'nowrap' }}>
              <span style={{ width: 6, height: 6, background: 'var(--emerald-400)', borderRadius: '50%', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ display: 'none' }} className="sync-text">Synchronisé</span>
              <span>✓</span>
            </div>

            {/* Lang */}
            <div style={{ display: 'flex', gap: 2 }}>
              <button className={`lang-btn ${lang === 'fr' ? 'active' : ''}`} onClick={() => setLang('fr')}>FR</button>
              <button className={`lang-btn ${lang === 'mg' ? 'active' : ''}`} onClick={() => setLang('mg')}>MG</button>
            </div>

            {/* Notifications */}
            <div ref={notifRef} style={{ position: 'relative' }}>
              <button className="icon-btn" onClick={() => setShowNotifs(v => !v)}>
                🔔
                {unreadCount > 0 && (
                  <span style={{ position: 'absolute', top: 4, right: 4, width: 16, height: 16, background: '#ef4444', borderRadius: '50%', fontSize: '0.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid rgba(0,0,0,0.4)' }}>
                    {unreadCount}
                  </span>
                )}
              </button>
              {showNotifs && <NotifPanel onClose={() => setShowNotifs(false)} />}
            </div>

            {/* User menu */}
            <div className="topbar-user" onClick={() => navigate('parametres')}>
              <div className="avatar avatar-sm" style={{ background: 'linear-gradient(135deg,#10b981,#14b8a6)' }}>{user?.avatar || '?'}</div>
              <span className="topbar-user-name">{user?.name?.split(' ')[0]}</span>
            </div>
          </div>
        </header>

        {/* ── BREADCRUMB TABS for quick nav ── */}
        <div style={{
          display: 'flex', gap: 6, padding: '8px 32px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          overflowX: 'auto',
        }}>
          {['home', 'citoyens', 'etatcivil', 'certificats', 'paiements', 'cartographie', 'alertes'].map(id => {
            const item = NAV.flatMap(s => s.items).find(i => i.id === id);
            if (!item) return null;
            return (
              <button key={id}
                onClick={() => navigate(id)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 6,
                  fontSize: '0.72rem',
                  fontWeight: active === id ? 700 : 500,
                  color: active === id ? '#fff' : 'rgba(255,255,255,0.4)',
                  background: active === id ? 'rgba(255,255,255,0.1)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s',
                }}
              >
                {item.icon} {item.label}
              </button>
            );
          })}
        </div>

        {/* ── PAGE ── */}
        <main className="page-content">
          <div key={active} className="fade-in">
            <PageComponent onNavigate={navigate} />
          </div>
        </main>

        {/* Footer */}
        <footer style={{ padding: '12px 32px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: 'rgba(255,255,255,0.25)' }}>
          <span>CommuneDigit v1.0.2 · FastAPI + PostgreSQL · AES-256 · SHA-256</span>
          <span>Conformité : Loi 2014-038 · Convention de Malabo 🇲🇬</span>
        </footer>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes slideUp { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width:768px){
          #menu-toggle{display:flex!important}
          .sync-text{display:none!important}
          .topbar-user span{display:none}
        }
        @media (min-width:900px){
          .sync-text{display:inline!important}
        }
      `}</style>
    </div>
  );
}
