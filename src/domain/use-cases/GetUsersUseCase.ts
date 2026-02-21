import { UserRepository } from '../repositories/UserRepository';
import type { User } from '../entities/User';

export class GetUsersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepository.getUsers();
  }
}
