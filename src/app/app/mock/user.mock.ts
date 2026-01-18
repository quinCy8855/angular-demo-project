export type UserRole = 'ADMIN' | 'OFFICER' | 'VIEWER';

export const CURRENT_USER = {
  id: 'u01',
  name: 'Demo User',
  role: 'OFFICER' as UserRole,
};
