import React, { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserRole } from '../../domain/entities/User';
import { RefreshCw, UserCheck, ShieldAlert, Search } from 'lucide-react';
import '../styles/Users.css';

const UsersView: React.FC = () => {
  const { users, loading, error, changeUserRole, refresh } = useUsers();
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtrado
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.lastname.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phone.includes(searchTerm)
    );
  });

  if (loading) return <div className="loading-state"><RefreshCw className="animate-spin" /> Cargando usuarios...</div>;

  return (
    <div className="users-view">
      <div className="view-header">
        <h1>Gestión de Usuarios</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar por nombre, correo o tel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <button className="refresh-btn" onClick={refresh} title="Actualizar lista">
            <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="users-table-container desktop-only">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Roles</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => {
              const hasDriverRole = user.roles?.some(r => r.id === 'DRIVER');
              const hasAdminRole = user.roles?.some(r => r.id === 'ADMIN');

              return (
                <tr key={user.id}>
                  <td>
                    <div className="user-info">
                      <img src={user.image || 'https://via.placeholder.com/40'} alt={user.name} className="user-avatar" />
                      <span>{user.name} {user.lastname}</span>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <div className="roles-container">
                      {user.roles?.map(role => (
                        <span key={role.id} className={`role-badge ${role.id.toLowerCase()}`}>
                          {role.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {!hasDriverRole && (
                        <button 
                          onClick={() => changeUserRole(user.id, UserRole.DRIVER)}
                          className="btn-driver"
                        >
                          Hacer Conductor
                        </button>
                      )}
                      {!hasAdminRole && (
                        <button 
                          onClick={() => changeUserRole(user.id, UserRole.ADMIN)}
                          className="btn-admin"
                        >
                          Hacer Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="users-cards mobile-only">
        {filteredUsers.map(user => {
          const hasDriverRole = user.roles?.some(r => r.id === 'DRIVER');
          const hasAdminRole = user.roles?.some(r => r.id === 'ADMIN');

          return (
            <div key={user.id} className="user-card">
              <div className="card-header">
                <img src={user.image || 'https://via.placeholder.com/40'} alt={user.name} className="user-avatar" />
                <div>
                  <h3>{user.name} {user.lastname}</h3>
                  <p>{user.email}</p>
                  <p className="user-phone">{user.phone}</p>
                </div>
              </div>
              <div className="card-body">
                <div className="roles-container">
                  {user.roles?.map(role => (
                    <span key={role.id} className={`role-badge ${role.id.toLowerCase()}`}>{role.name}</span>
                  ))}
                </div>
              </div>
              <div className="card-actions">
                {!hasDriverRole && (
                  <button onClick={() => changeUserRole(user.id, UserRole.DRIVER)} className="btn-driver-outline">
                    <UserCheck size={16} /> Conductor
                  </button>
                )}
                {!hasAdminRole && (
                  <button onClick={() => changeUserRole(user.id, UserRole.ADMIN)} className="btn-admin-outline">
                    <ShieldAlert size={16} /> Admin
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersView;
