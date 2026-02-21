import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Users, ClipboardList, LogOut, Menu, X, ShieldCheck, Sun, Moon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Layout.css';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark');
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <ShieldCheck size={32} color="#F39C12" />
          <span>Admin Bella</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link 
            to="/" 
            className={isActive('/') ? 'active' : ''} 
            onClick={() => setIsSidebarOpen(false)}
          >
            <Users size={20} /> Usuarios
          </Link>
          <Link 
            to="/audit" 
            className={isActive('/audit') ? 'active' : ''} 
            onClick={() => setIsSidebarOpen(false)}
          >
            <ClipboardList size={20} /> Auditoría
          </Link>
          
          <button className="theme-btn" onClick={() => setIsDark(!isDark)}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            {isDark ? 'Modo Claro' : 'Modo Oscuro'}
          </button>

          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={20} /> Salir
          </button>
        </nav>
      </aside>

      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
