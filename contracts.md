# Cyber Shikayat Mitra - API Contracts & Implementation Guide

## Overview
This document outlines the API contracts, data structures, and implementation plan for the enhanced Cyber Shikayat Mitra application.

## 1. API Contracts

### Authentication Endpoints

#### POST /api/auth/login
**Request:**
```json
{
  "email": "string",
  "password": "string"
}
```
**Response:**
```json
{
  "success": boolean,
  "user": {
    "id": "string",
    "email": "string", 
    "name": "string",
    "role": "admin|investigator",
    "badge": "string"
  },
  "token": "string"
}
```

#### POST /api/auth/logout
**Request:** Authorization header with token
**Response:**
```json
{
  "success": boolean,
  "message": "string"
}
```

### Complaint Management Endpoints

#### POST /api/complaints
**Request:**
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "address": "string",
  "incidentType": "string",
  "incidentDate": "string",
  "description": "string",
  "financialLoss": "number",
  "suspectInfo": "string",
  "evidenceFiles": ["file uploads"]
}
```
**Response:**
```json
{
  "success": boolean,
  "complaintId": "string",
  "message": "string"
}
```

#### GET /api/complaints/:complaintId/status
**Response:**
```json
{
  "complaintId": "string",
  "status": "string",
  "lastUpdate": "string",
  "description": "string",
  "timeline": [
    {
      "date": "string",
      "action": "string",
      "officer": "string",
      "details": "string"
    }
  ]
}
```

### Case Management Endpoints

#### GET /api/cases
**Query Parameters:** 
- search: string
- status: string  
- type: string
- page: number
- limit: number

**Response:**
```json
{
  "cases": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "type": "string",
      "status": "New|Under Investigation|Resolved",
      "priority": "High|Medium|Low",
      "assignedTo": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "confidential": boolean,
      "complainant": {
        "name": "string",
        "phone": "string",
        "email": "string"
      }
    }
  ],
  "total": number,
  "page": number,
  "totalPages": number
}
```

#### GET /api/cases/:id
**Response:**
```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "type": "string",
  "status": "string",
  "priority": "string",
  "assignedTo": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "confidential": boolean,
  "complainant": {
    "name": "string",
    "phone": "string", 
    "email": "string"
  },
  "evidence": ["string"],
  "investigation": {
    "timeline": [
      {
        "date": "string",
        "action": "string",
        "officer": "string",
        "details": "string"
      }
    ],
    "suspectAccounts": [
      {
        "accountNumber": "string",
        "bankName": "string",
        "holderName": "string",
        "isMule": boolean,
        "riskScore": number,
        "transactionAmount": number
      }
    ],
    "mlAnalysis": {
      "behaviorScore": number,
      "riskLevel": "string",
      "patterns": ["string"]
    }
  }
}
```

#### PUT /api/cases/:id/assign
**Request:**
```json
{
  "officerId": "string",
  "notes": "string"
}
```

#### PUT /api/cases/:id/status
**Request:**
```json
{
  "status": "string",
  "notes": "string"
}
```

### Investigation Endpoints

#### POST /api/investigation/:caseId/bank-request
**Request:**
```json
{
  "bank": "string",
  "accountNumber": "string",
  "requestType": "transaction_history|account_details|kyc_documents|linked_accounts",
  "justification": "string"
}
```

#### POST /api/investigation/:caseId/ml-analysis
**Request:**
```json
{
  "analysisType": "behavior|mule_detection",
  "data": "object"
}
```

#### POST /api/investigation/:caseId/notes
**Request:**
```json
{
  "note": "string"
}
```

## 2. Database Models

### User
```javascript
{
  _id: ObjectId,
  email: String,
  password: String, // hashed
  name: String,
  role: String, // 'admin' or 'investigator'
  badge: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Case
```javascript
{
  _id: ObjectId,
  caseId: String, // e.g., 'CYB001'
  title: String,
  description: String,
  type: String,
  status: String,
  priority: String,
  assignedTo: ObjectId, // ref to User
  confidential: Boolean,
  complainant: {
    name: String,
    phone: String,
    email: String
  },
  evidence: [String], // file paths/URLs
  investigation: {
    timeline: [{
      date: Date,
      action: String,
      officer: String,
      details: String
    }],
    suspectAccounts: [{
      accountNumber: String,
      bankName: String,
      holderName: String,
      isMule: Boolean,
      riskScore: Number,
      transactionAmount: Number
    }],
    mlAnalysis: {
      behaviorScore: Number,
      riskLevel: String,
      patterns: [String]
    }
  },
  createdAt: Date,
  updatedAt: Date
}
```

### BankRequest
```javascript
{
  _id: ObjectId,
  caseId: ObjectId,
  bank: String,
  accountNumber: String,
  requestType: String,
  justification: String,
  status: String, // 'pending', 'completed', 'rejected'
  requestedBy: ObjectId, // ref to User
  createdAt: Date,
  updatedAt: Date
}
```

### InvestigationNote
```javascript
{
  _id: ObjectId,
  caseId: ObjectId,
  note: String,
  officer: ObjectId, // ref to User
  createdAt: Date
}
```

## 3. Mock Data Migration

### Current Mock Data in mockData.js:
- `stats`: Dashboard statistics - will be replaced with aggregated data from database
- `mockCases`: Case data - will be moved to Case collection in MongoDB
- `mockComplaintStatuses`: Complaint status data - will be derived from Case timeline
- `banksList`: Static bank list - can remain as static data or move to database

### Frontend Integration Changes:
1. Replace mock data imports with API calls
2. Add loading states for API requests
3. Add error handling for failed requests
4. Implement real authentication flow
5. Add file upload functionality for evidence

## 4. Implementation Priority

### Phase 1: Core Backend
1. Set up MongoDB models
2. Implement authentication system
3. Create case management CRUD operations
4. Basic complaint filing and tracking

### Phase 2: Investigation Features  
1. Bank request system
2. ML analysis integration (mock initially)
3. Investigation timeline management
4. Note-taking system

### Phase 3: Advanced Features
1. File upload and evidence management
2. Real ML model integration
3. Advanced search and filtering
4. Reporting and analytics

### Phase 4: Security & Performance
1. Role-based access control
2. Audit logging
3. Data encryption
4. Performance optimization

## 5. Environment Variables Needed

```
MONGO_URL=mongodb://localhost:27017/cyber-shikayat
JWT_SECRET=your-jwt-secret-key
FILE_UPLOAD_PATH=/uploads
MAX_FILE_SIZE=10MB
ML_API_URL=http://localhost:5000 (for ML services)
```

## 6. External Dependencies

- JWT for authentication
- Multer for file uploads
- bcrypt for password hashing
- ML/AI service for behavior analysis (future integration)

This contract serves as the blueprint for seamless frontend-backend integration while maintaining the advanced features and modern UI/UX of the enhanced Cyber Shikayat Mitra application.