import { UserRepository } from '../repositories/UserRepository';
import type { AuditLog } from '../entities/User';

export class GetAuditLogsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<AuditLog[]> {
    return await this.userRepository.getAuditLogs();
  }
}
