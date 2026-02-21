import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './presentation/context/AuthContext';
import ProtectedRoute from './presentation/components/ProtectedRoute';
import Layout from './presentation/components/Layout';
import LoginView from './presentation/views/LoginView';
import UsersView from './presentation/views/UsersView';
import AuditLogsView from './presentation/views/AuditLogsView';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={
              <Layout>
                <UsersView />
              </Layout>
            } />
            <Route path="/audit" element={
              <Layout>
                <AuditLogsView />
              </Layout>
            } />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
