import { CaseDetail } from '../model.ts/case.detail.model';

export const CASE_DETAIL_MOCKS: CaseDetail[] = [
  {
    id: 'CS-2025-0001',
    caseNo: 'CS-2025-0001',

    summary: 'Billing transaction failed during invoice generation',
    description: `
Customer reported that billing invoices could not be generated.
System returned timeout error when processing transactions during peak hours.
Issue impacts multiple accounts intermittently.
    `,

    category: 'Billing',
    subCategory: 'Invoice Generation',

    environment: 'Production',
    frequency: 'Intermittent',

    errorCodes: ['BILLING_TIMEOUT', 'TXN_FAILED_504'],
    affectedModules: ['Billing Engine', 'Invoice Service', 'Payment Adapter'],

    impact: {
      severity: 'HIGH',
      affectedUsers: 120,
      affectedAccounts: ['ACC-10023', 'ACC-10045', 'ACC-10102', 'ACC-10188'],
      estimatedLoss: 450000,
      description:
        'Invoices could not be issued, causing delayed payments and revenue loss.',
    },

    analysis: {
      suspectedCauses: [
        'Database connection pool exhaustion',
        'High transaction volume during peak hours',
        'Inefficient retry mechanism',
      ],
      confirmedCause: 'Database connection pool saturation under heavy load',
      notes: `
Monitoring data shows DB connections hitting 100% usage between 18:00–21:00.
Retry logic amplified load instead of mitigating failures.
      `,
    },

    resolution: {
      workaround: 'Temporarily restart billing service during peak hours',
      permanentFix: 'Increase DB pool size and refactor retry strategy',
      fixStatus: 'IN_PROGRESS',
      expectedCompletion: '2025-01-13T18:00:00',
    },

    activities: [
      {
        time: '2025-01-10T09:00:00',
        action: 'Case created',
        by: 'System',
      },
      {
        time: '2025-01-10T09:25:00',
        action: 'Assigned to Billing Support Team',
        by: 'Admin',
      },
      {
        time: '2025-01-10T11:10:00',
        action: 'Initial root cause analysis completed',
        by: 'Billing Engineer',
      },
      {
        time: '2025-01-10T15:30:00',
        action: 'Temporary workaround applied',
        by: 'DevOps',
      },
    ],

    attachments: [
      {
        id: 'ATT-001',
        fileName: 'error-log-20250110.txt',
        fileType: 'text/plain',
        uploadedBy: 'Billing Engineer',
        uploadedAt: '2025-01-10T10:40:00',
      },
      {
        id: 'ATT-002',
        fileName: 'db-connection-graph.png',
        fileType: 'image/png',
        uploadedBy: 'DevOps',
        uploadedAt: '2025-01-10T12:05:00',
      },
    ],

    createdAt: '2025-01-10T09:00:00',
    updatedAt: '2025-01-10T15:30:00',
  },

  {
    id: 'CS-2025-0002',
    caseNo: 'CS-2025-0002',

    summary: 'User unable to login to mobile application',
    description: `
Multiple users reported login failure after recent mobile app update.
Authentication token validation failed unexpectedly.
    `,

    category: 'Authentication',
    subCategory: 'Mobile Login',

    environment: 'Production',
    frequency: 'Always',

    errorCodes: ['AUTH_401', 'TOKEN_INVALID'],
    affectedModules: ['Auth Service', 'Mobile API'],

    impact: {
      severity: 'HIGH',
      affectedUsers: 120,
      affectedAccounts: ['ACC-10023', 'ACC-10045', 'ACC-10102', 'ACC-10188'],
      estimatedLoss: 450000,
      description:
        'Invoices could not be issued, causing delayed payments and revenue loss.',
    },

    analysis: {
      suspectedCauses: [
        'Invalid JWT secret rotation',
        'Mismatch between mobile and backend token config',
      ],
      confirmedCause:
        'JWT secret updated on backend but not synced to mobile environment',
      notes:
        'Rollback temporarily resolved issue while config sync is prepared.',
    },

    resolution: {
      workaround: 'Rollback authentication config to previous version',
      permanentFix: 'Align JWT configuration across all environments',
      fixStatus: 'DONE',
      expectedCompletion: '2025-01-11T12:00:00',
    },

    activities: [
      {
        time: '2025-01-11T08:30:00',
        action: 'Incident reported by customers',
        by: 'Support',
      },
      {
        time: '2025-01-11T09:00:00',
        action: 'Authentication rollback executed',
        by: 'Backend Engineer',
      },
    ],

    attachments: [],

    createdAt: '2025-01-11T08:30:00',
    updatedAt: '2025-01-11T09:45:00',
  },
];
