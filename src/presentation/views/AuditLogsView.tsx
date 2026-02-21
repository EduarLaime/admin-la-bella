import React from 'react';
import { useAuditLogs } from '../hooks/useAuditLogs';
import { Clock, Activity } from 'lucide-react';
import '../styles/AuditLogs.css';

const AuditLogsView: React.FC = () => {
  const { logs, loading } = useAuditLogs();

  if (loading) return <div>Cargando logs...</div>;

  return (
    <div className="audit-view">
      <h1>Logs de Auditoría</h1>
      <p>Historial de cambios realizados por administradores.</p>

      <div className="timeline">
        {logs.map(log => (
          <div key={log.id} className="timeline-item">
            <div className="timeline-icon">
              <Activity size={18} color="#6366f1" />
            </div>
            <div className="timeline-content">
              <div className="log-header">
                <strong>{log.adminName}</strong>
                <span className="log-date">
                  <Clock size={14} /> {new Date(log.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="log-action">
                {log.action} a <strong>{log.targetUserName}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuditLogsView;
