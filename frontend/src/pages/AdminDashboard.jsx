import React, { useState } from 'react';
import CitizenList from "../components/CitizenList";
import PaperManagement from '../components/PaperManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('citizens');

  const navItems = [
    { id: 'citizens', label: 'Citoyens', icon: '👥' },
    { id: 'papers', label: 'Tarifs Actes', icon: '📄' },
    { id: 'stats', label: 'Statistiques', icon: '📊' },
  ];

  return (
    <div className="dashboard-container">
      
      {/* BARRE LATÉRALE */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#0062ff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyCenter: 'center', fontWeight: 'bold', color: 'white', paddingLeft: '9px' }}>C</div>
            <h2 style={{ margin: 0 }}>CommuneDigit</h2>
          </div>

          <nav className="nav-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <span style={{ marginRight: '10px' }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profil Admin en bas */}
        <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid #2d3748' }}>
          <p style={{ fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>Admin Hans</p>
          <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>Développeur</p>
        </div>
      </aside>

      {/* ZONE DE CONTENU PRINCIPALE */}
      <main className="main-content">
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <input 
            type="text" 
            placeholder="Rechercher un dossier..." 
            className="search-bar"
            style={{ marginBottom: 0 }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>
            🔔
            </button>
            {/* Le bouton a été retiré ici */}
        </div>
        </header>

        <section>
          <h1>
            {activeTab === 'citizens' ? 'Annuaire des Citoyens' : 'Gestion des Tarifs'}
          </h1>
          <p className="subtitle">
            {activeTab === 'citizens' 
              ? 'Gérez la liste des résidents et leurs informations personnelles.' 
              : 'Configurez les montants demandés pour les documents officiels.'}
          </p>

          <div className="citizen-list-container">
            {activeTab === 'citizens' && <CitizenList />}
            {activeTab === 'papers' && <PaperManagement />}
            {activeTab === 'stats' && (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontStyle: 'italic' }}>
                Statistiques en cours de développement...
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;