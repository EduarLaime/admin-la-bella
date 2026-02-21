export enum UserRole {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  DRIVER = 'DRIVER',
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  image?: string;
  password?: string;
  notification_token?: string;
  roles?: Array<{ id: string, name: string }>;
  createdAt?: Date;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  targetUserId: string;
  targetUserName: string;
  action: string;
  timestamp: Date;
}
