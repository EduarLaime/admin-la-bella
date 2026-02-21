import { UserRepository } from '../../domain/repositories/UserRepository';
import { UserRole } from '../../domain/entities/User';
import type { User, AuditLog } from '../../domain/entities/User';
import httpClient from '../../infrastructure/http/httpClient';

export class ApiUserRepository extends UserRepository {
  async getUsers(): Promise<User[]> {
    const response = await httpClient.get<User[]>('/users');
    return response.data;
  }

  async updateUserRole(user: User, newRole: UserRole): Promise<void> {
    // Definiciones de roles exactas según tu DB
    const roleDefinitions: Record<UserRole, any> = {
      [UserRole.ADMIN]: { id: 'ADMIN', name: 'ADMIN', image: 'https://img.icons8.com/color/48/000000/admin-settings-male.png', route: 'admin/home' },
      [UserRole.CLIENT]: { id: 'CLIENT', name: 'CLIENT', image: 'https://img.icons8.com/color/48/000000/user.png', route: 'client/home' },
      [UserRole.DRIVER]: { id: 'DRIVER', name: 'DRIVER', image: 'https://img.icons8.com/color/48/000000/taxi.png', route: 'driver/home' }
    };

    const newRoleObj = roleDefinitions[newRole];
    
    // Obtenemos IDs de roles actuales para no duplicar
    const currentRoles = user.roles || [];
    const hasRole = currentRoles.some(r => r.id === newRole);
    
    if (hasRole) return;

    // Importante: TypeORM necesita el array de objetos completo para actualizar la tabla user_has_roles
    const updatedRoles = [...currentRoles, newRoleObj];

    // Enviamos solo los roles al endpoint PUT /users/:id
    // El backend ahora los recibirá porque actualizaste el UpdateUserDto
    await httpClient.put(`/users/${user.id}`, {
      roles: updatedRoles
    });
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return [];
  }
}
