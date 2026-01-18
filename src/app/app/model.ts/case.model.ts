export type CaseStatus = 'NEW' | 'PENDING' | 'APPROVED' | 'REJECTED';
export type CasePriority = 'NORMAL' | 'URGENT';
export interface CaseItem {
  id: string;
  caseNo: string;
  customerName: string;
  amount: number;
  status: CaseStatus;
  priority: CasePriority;
  createdAt: string;
  updatedAt: string;
}
