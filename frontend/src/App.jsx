import React, { useState, createContext, useContext } from 'react';
import './index.css';

// ─── Auth Context ───────────────────────────────────────────────
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

// ─── App State Context ──────────────────────────────────────────
const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

// ─── Pages ─────────────────────────────────────────────────────
import LoginPage     from './pages/LoginPage';
import PublicPage    from './pages/PublicPage';
import DashboardLayout from './pages/DashboardLayout';

export default function App() {
  const [user, setUser] = useState(null);   // null = non connecté
  const [view, setView] = useState('public'); // 'public' | 'login' | 'dashboard'
  const [lang, setLang] = useState('mg');   // Malagasy par défaut
  const [theme, setTheme] = useState('dark'); // 'dark' | 'light'

  // Apply theme to <html> so CSS [data-theme] selectors work everywhere
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  const login = (userData) => {
    setUser(userData);
    setView('dashboard');
  };
  const logout = () => {
    setUser(null);
    setView('public');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <AppContext.Provider value={{ lang, setLang, theme, toggleTheme }}>
        {view === 'public'    && <PublicPage onLogin={() => setView('login')} />}
        {view === 'login'     && <LoginPage onBack={() => setView('public')} />}
        {view === 'dashboard' && user && <DashboardLayout />}
      </AppContext.Provider>
    </AuthContext.Provider>
  );
}
