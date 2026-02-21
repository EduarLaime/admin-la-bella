import { useState, useEffect, useCallback } from 'react';
import { UserRole } from '../../domain/entities/User';
import type { User } from '../../domain/entities/User';
import { ApiUserRepository } from '../../data/repositories/ApiUserRepository';
import { GetUsersUseCase } from '../../domain/use-cases/GetUsersUseCase';
import { UpdateUserRoleUseCase } from '../../domain/use-cases/UpdateUserRoleUseCase';

const userRepository = new ApiUserRepository();
const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateUserRoleUseCase = new UpdateUserRoleUseCase(userRepository);

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getUsersUseCase.execute();
      setUsers(data);
    } catch (err) {
      setError('Error al cargar usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const changeUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const userToUpdate = users.find(u => u.id === userId);
      if (!userToUpdate) return;

      await updateUserRoleUseCase.execute(userToUpdate, newRole);
      
      setUsers(prev => prev.map(u => {
        if (u.id === userId) {
          const roleExists = u.roles?.some(r => r.name === newRole);
          if (roleExists) return u;
          const newRoleObj = { id: Math.random().toString(), name: newRole };
          return { ...u, roles: [...(u.roles || []), newRoleObj] };
        }
        return u;
      }));
    } catch (err) {
      setError('Error al actualizar el rol');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, changeUserRole, refresh: fetchUsers };
};
