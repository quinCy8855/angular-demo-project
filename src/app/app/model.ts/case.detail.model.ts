export interface CaseDetail {
  id: string; // ⭐ สำคัญ ใช้รับจากหน้าหลัก
  caseNo: string;

  summary: string;
  description: string;

  category: string;
  subCategory: string;

  environment: 'Production' | 'UAT' | 'Staging';
  frequency: 'Once' | 'Intermittent' | 'Always';

  errorCodes: string[];
  affectedModules: string[];

  impact: {
    severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
    affectedUsers: number;
    affectedAccounts: string[];
    estimatedLoss: number;
    description: string;
  };

  analysis: {
    suspectedCauses: string[];
    confirmedCause: string;
    notes: string;
  };

  resolution: {
    workaround: string;
    permanentFix: string;
    fixStatus: 'PLANNED' | 'IN_PROGRESS' | 'DONE';
    expectedCompletion: string;
  };

  activities?: {
    time: string;
    action: string;
    by: string;
  }[];

  attachments: {
    id: string;
    fileName: string;
    fileType: string;
    uploadedBy: string;
    uploadedAt: string;
  }[];

  createdAt: string;
  updatedAt: string;
}
