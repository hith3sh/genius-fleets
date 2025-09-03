import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  UserCheck,
  DollarSign,
  FileText,
  Settings,
  Smartphone,
  BrainCircuit
} from "lucide-react";

export const navigationItems = [
  {
    name: "Mobile Booking Page",
    page: "MobileBooking",
    icon: Smartphone
  },
  {
    name: "Management Dashboard",
    page: "Dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Sales Management",
    icon: Users,
    subItems: [
      { name: "Customer Management", page: "Customers" },
      { name: "Leads", page: "Leads" },
      { name: "Quotations", page: "Quotations" },
      { name: "Marketing", page: "Marketing" },
      { name: "Corporate Clients", page: "CorporateClients" },
      { name: "Sales Performance", page: "SalesPerformance" }
    ]
  },
  {
    name: "Fleet Management",
    icon: Car,
    subItems: [
      { name: "Fleet Status", page: "FleetStatus" },
      { name: "Fleet Management", page: "FleetManagement" },
      { name: "Fleet Health", page: "FleetHealth" },
      { name: "AI Fleet Analyst", page: "FleetAnalyst", icon: BrainCircuit },
      { name: "Damage & Incident Logs", page: "DamageLogs" },
      { name: "Contracts", page: "Contracts" },
      { name: "Salik & Fines", page: "SalikFines" },
      { name: "GPS Tracking", page: "GPSTracking" }
    ]
  },
  {
    name: "Bookings",
    page: "Bookings",
    icon: Calendar
  },
  {
    name: "HR Management",
    icon: UserCheck,
    subItems: [
      { name: "Employee List", page: "HREmployees" },
      { name: "Attendance & Shifts", page: "HRAttendance" },
      { name: "Payroll", page: "HRPayroll" },
      { name: "Leave Requests", page: "HRLeaveRequests" }
    ]
  },
  {
    name: "Finance Management",
    icon: DollarSign,
    subItems: [
      { name: "Overview", page: "FinanceOverview" },
      { name: "Invoices", page: "Invoices" },
      { name: "Payments", page: "Payments" },
      { name: "Expenses", page: "Expenses" },
      { name: "Reports", page: "Reports" },
      { name: "Tax / VAT", page: "TaxVAT" },
      { name: "Depreciation", page: "Depreciation" },
      { name: "Inventory / Parts", page: "Inventory" }
    ]
  },
  {
    name: "Document Control",
    icon: FileText,
    subItems: [
      { name: "Vehicle Image Library", page: "VehicleImageLibrary" },
      { name: "Vehicle Documents", page: "VehicleDocuments" },
      { name: "Customer Documents", page: "CustomerDocuments" },
      { name: "Staff Documents", page: "StaffDocuments" },
      { name: "Legal & Company Docs", page: "LegalDocuments" },
      { name: "Manual AI Document Processing", page: "AIDocumentProcessing" }
    ]
  },
  {
    name: "Settings",
    icon: Settings,
    subItems: [
      { name: "Business Info", page: "BusinessInfo" },
      { name: "User Access Rules", page: "UserAccessRules" },
      { name: "API Settings", page: "APISettings" },
      { name: "Branches / Locations", page: "Branches" }
    ]
  }
];