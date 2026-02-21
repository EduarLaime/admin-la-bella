import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';
import httpClient from '../../infrastructure/http/httpClient';
import '../styles/Login.css';

const LoginView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const response = await httpClient.post('/auth/login', { email, password });
      const { user, token } = response.data;

      // Verificar si tiene el rol ADMIN
      // El backend parece devolver los roles como un array de objetos o IDs en user.roles
      const isAdmin = user.roles?.some((r: any) => r.id === 'ADMIN' || r.name === 'ADMIN');
      
      if (isAdmin) {
        login(user, token);
        navigate('/');
      } else {
        setError('Acceso denegado: Se requieren permisos de administrador');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-header">
          <ShieldCheck size={48} color="#4f46e5" />
          <h1>Acceso Admin</h1>
          <p>La Bella App Management</p>
        </div>
        
        {error && <div className="error-banner">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="admin@labella.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar'}
        </button>
      </form>
    </div>
  );
};

export default LoginView;
