import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './Dashboard'; // Assure-toi que le fichier src/Dashboard.jsx existe

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Si l'agent n'est pas connecté, on affiche la page de Login
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // Si l'agent est connecté, on affiche le tableau de bord
  return <Dashboard />;
}

export default App;