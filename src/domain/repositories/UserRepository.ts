import { UserRole } from '../entities/User';
import type { User, AuditLog } from '../entities/User';

export abstract class UserRepository {
  abstract getUsers(): Promise<User[]>;
  abstract updateUserRole(user: User, newRole: UserRole): Promise<void>;
  abstract getAuditLogs(): Promise<AuditLog[]>;
}
