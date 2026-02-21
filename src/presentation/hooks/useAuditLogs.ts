import { useState, useEffect } from 'react';
import type { AuditLog } from '../../domain/entities/User';
import { ApiUserRepository } from '../../data/repositories/ApiUserRepository';
import { GetAuditLogsUseCase } from '../../domain/use-cases/GetAuditLogsUseCase';

const userRepository = new ApiUserRepository();
const getAuditLogsUseCase = new GetAuditLogsUseCase(userRepository);

export const useAuditLogs = () => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const data = await getAuditLogsUseCase.execute();
        setLogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return { logs, loading };
};
