import { UserRepository } from '../repositories/UserRepository';
import { UserRole } from '../entities/User';
import type { User } from '../entities/User';

export class UpdateUserRoleUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(user: User, newRole: UserRole): Promise<void> {
    await this.userRepository.updateUserRole(user, newRole);
  }
}
