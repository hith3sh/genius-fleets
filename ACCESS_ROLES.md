# Access Roles - Genius Fleets

## Overview
The webapp uses a role-based access control (RBAC) system with three core database roles and extended role types for granular permissions.

## Core Roles

### 1. Management
- **Access Level**: Full system access
- **Permissions**: All modules and CRUD operations
- **Override**: Bypasses all module-level restrictions

### 2. Staff
- **Access Level**: Module-based permissions
- **Permissions**: Access only to assigned modules via `accessible_modules` array
- **Control**: Granular access control per module

### 3. Customer
- **Access Level**: Limited external access
- **Permissions**: Booking-related functionalities only
- **Restrictions**: Cannot access internal management modules

## Extended Role Types

| Role | Description |
|------|-------------|
| **Staff** | Basic staff member |
| **Manager** | Department manager level |
| **Sales Executive** | Sales team member |
| **HR Admin** | Human resources administrator |
| **Finance Manager** | Financial operations manager |
| **Fleet Manager** | Fleet operations manager |
| **Management** | Full system access |
| **Customer** | External customer access |

## Module Categories

### Core Modules
- Mobile Booking Page
- Management Dashboard
- Bookings

### Sales Management
- Customer Management
- Leads
- Quotations
- Marketing
- Corporate Clients
- Sales Performance

### Fleet Management
- Fleet Status
- Fleet Management
- Fleet Health
- AI Fleet Analyst
- Damage & Incident Logs
- Contracts
- Salik & Fines
- GPS Tracking

### HR Management
- Employee Management
- Attendance
- Payroll
- Leave Requests
- Staff Documents

### Finance Management
- Finance Overview
- Invoices
- Payments
- Expenses
- Reports
- Tax/VAT
- Depreciation

### Document Management
- Vehicle Documents
- Customer Documents
- Staff Documents
- Legal Documents
- AI Document Processing

### System Administration
- User Access Rules
- Business Info
- API Settings
- Branches

## Security Implementation

- **Database Level**: Supabase Row Level Security (RLS) policies
- **Validation**: All access validated against `user_access` table
- **Enforcement**: Role-based permissions enforced at both frontend and backend
- **Granular Control**: Module-level access control for Staff roles

## Access Control Logic

```javascript
// Management role has access to everything
if (user.role === 'Management') return true;

// Staff roles check module permissions
return user.accessible_modules.includes(module);
```
