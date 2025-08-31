// Mock data for the application

export const stats = {
  casesResolved: 2450,
  activeOfficers: 156,
  responseTime: '<24hrs',
  successRate: '89%'
};

export const emergencyContacts = {
  helpline: '100',
  email: 'cybercrime@mppolice.gov.in',
  address: 'Cyber Crime Police Station, Bhopal, Madhya Pradesh'
};

export const mockCases = [
  {
    id: 'CYB001',
    title: 'UPI Fraud - Rs. 45,000',
    description: 'Victim received fake UPI payment request and lost money',
    type: 'Financial Fraud',
    status: 'Under Investigation',
    priority: 'High',
    assignedTo: 'Officer Rajesh Kumar',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20',
    confidential: false,
    complainant: {
      name: 'Ramesh Sharma',
      phone: '+91-9876543210',
      email: 'ramesh.sharma@email.com'
    },
    evidence: [
      'Screenshot of fake payment request',
      'Bank transaction statements',
      'Phone call recordings'
    ],
    investigation: {
      timeline: [
        {
          date: '2024-01-15',
          action: 'Case registered',
          officer: 'Reception Desk',
          details: 'Initial complaint filed with basic details'
        },
        {
          date: '2024-01-16',
          action: 'Case assigned to investigator',
          officer: 'Admin',
          details: 'Assigned to Officer Rajesh Kumar for investigation'
        },
        {
          date: '2024-01-18',
          action: 'Bank data requested',
          officer: 'Officer Rajesh Kumar',
          details: 'Formal request sent to SBI for transaction details'
        },
        {
          date: '2024-01-20',
          action: 'Suspect account identified',
          officer: 'Officer Rajesh Kumar',
          details: 'Primary suspect account: SBI-987654321 identified'
        }
      ],
      suspectAccounts: [
        {
          accountNumber: 'SBI-987654321',
          bankName: 'State Bank of India',
          holderName: 'Fake Name 1',
          isMule: true,
          riskScore: 85,
          transactionAmount: 45000
        },
        {
          accountNumber: 'HDFC-456789123',
          bankName: 'HDFC Bank',
          holderName: 'Fake Name 2',
          isMule: true,
          riskScore: 92,
          transactionAmount: 35000
        }
      ],
      mlAnalysis: {
        behaviorScore: 78,
        riskLevel: 'High',
        patterns: ['Rapid money transfer', 'Multiple small transactions', 'Unusual timing']
      }
    }
  },
  {
    id: 'CYB002',
    title: 'Social Media Account Hacking',
    description: 'Instagram account compromised, inappropriate content posted',
    type: 'Cyber Harassment',
    status: 'Resolved',
    priority: 'Medium',
    assignedTo: 'Officer Priya Singh',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25',
    confidential: true,
    complainant: {
      name: 'Confidential',
      phone: 'Protected',
      email: 'Protected'
    },
    evidence: [
      'Screenshots of hacked account',
      'IP log analysis',
      'Recovery email details'
    ],
    investigation: {
      timeline: [
        {
          date: '2024-01-10',
          action: 'Case registered',
          officer: 'Reception Desk',
          details: 'Confidential case filed regarding social media hack'
        },
        {
          date: '2024-01-12',
          action: 'Technical analysis initiated',
          officer: 'Officer Priya Singh',
          details: 'IP trace and digital forensics started'
        },
        {
          date: '2024-01-20',
          action: 'Suspect identified',
          officer: 'Officer Priya Singh',
          details: 'Perpetrator traced through IP analysis'
        },
        {
          date: '2024-01-25',
          action: 'Case resolved',
          officer: 'Officer Priya Singh',
          details: 'Account recovered, suspect apprehended'
        }
      ],
      suspectAccounts: [],
      mlAnalysis: {
        behaviorScore: 65,
        riskLevel: 'Medium',
        patterns: ['Login from different location', 'Unusual activity pattern']
      }
    }
  },
  {
    id: 'CYB003',
    title: 'Online Shopping Fraud - Rs. 25,000',
    description: 'Fake online store, payment made but goods not delivered',
    type: 'E-commerce Fraud',
    status: 'New',
    priority: 'Medium',
    assignedTo: null,
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    confidential: false,
    complainant: {
      name: 'Sunita Verma',
      phone: '+91-8765432109',
      email: 'sunita.verma@email.com'
    },
    evidence: [
      'Website screenshots',
      'Payment receipts',
      'Email communications'
    ],
    investigation: {
      timeline: [
        {
          date: '2024-01-22',
          action: 'Case registered',
          officer: 'Reception Desk',
          details: 'New case registered, awaiting assignment'
        }
      ],
      suspectAccounts: [],
      mlAnalysis: null
    }
  }
];

export const mockComplaintStatuses = [
  {
    complaintId: 'CMP001',
    status: 'Under Investigation',
    lastUpdate: '2024-01-20',
    description: 'Your complaint has been assigned to an investigator and is currently being reviewed.'
  },
  {
    complaintId: 'CMP002',
    status: 'Additional Information Required',
    lastUpdate: '2024-01-18',
    description: 'We need additional evidence to proceed with your case. Please check your email for details.'
  }
];

export const banksList = [
  'State Bank of India',
  'HDFC Bank',
  'ICICI Bank',
  'Punjab National Bank',
  'Bank of Baroda',
  'Axis Bank',
  'Canara Bank',
  'Union Bank of India',
  'Indian Bank',
  'Central Bank of India'
];