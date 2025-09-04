import React from 'react';
import Layout from "./Layout.jsx";
import Dashboard from "./Dashboard";
import FleetManagement from "./FleetManagement";
import VehicleDocuments from "./VehicleDocuments";
import HREmployees from "./HREmployees";
import HREmployeeProfile from "./HREmployeeProfile";
import HRAttendance from "./HRAttendance";
import HRPayroll from "./HRPayroll";
import HRLeaveRequests from "./HRLeaveRequests";
import SettingsUserAccess from "./SettingsUserAccess";
import UserAccessRules from "./UserAccessRules";
import Bookings from "./Bookings";
import Customers from "./Customers";
import Leads from "./Leads";
import Quotations from "./Quotations";
import Marketing from "./Marketing";
import CorporateClients from "./CorporateClients";
import SalesPerformance from "./SalesPerformance";
import FinanceOverview from "./FinanceOverview";
import Invoices from "./Invoices";
import Payments from "./Payments";
import Expenses from "./Expenses";
import Reports from "./Reports";
import TaxVAT from "./TaxVAT";
import Depreciation from "./Depreciation";
import Inventory from "./Inventory";
import FleetStatus from "./FleetStatus";
import FleetHealth from "./FleetHealth";
import DamageLogs from "./DamageLogs";
import Contracts from "./Contracts";
import SalikFines from "./SalikFines";
import GPSTracking from "./GPSTracking";
import MobileBooking from "./MobileBooking";
import CustomerDocsUpload from "./CustomerDocsUpload";
import BookingConfirmation from "./BookingConfirmation";
import BookingReview from "./BookingReview";
import InvoiceView from "./InvoiceView";
import LandingPage from "./LandingPage";
import VehicleImageLibrary from "./VehicleImageLibrary";
import FleetAnalyst from "./FleetAnalyst";
import CustomerDocuments from "./CustomerDocuments";
import RentCars from "./RentCars";
import StaffDocuments from "./StaffDocuments";
import LegalDocuments from "./LegalDocuments";
import AIDocumentProcessing from "./AIDocumentProcessing";

// Import authentication components
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";
import EmailVerification from "../components/auth/EmailVerification";
import ProtectedRoute from "../components/auth/ProtectedRoute";

// Import error components
import NotFoundPage from "../components/errors/NotFoundPage";

import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const PAGES = {
    Dashboard: Dashboard,
    FleetManagement: FleetManagement,
    VehicleDocuments: VehicleDocuments,
    HREmployees: HREmployees,
    HREmployeeProfile: HREmployeeProfile,
    HRAttendance: HRAttendance,
    HRPayroll: HRPayroll,
    HRLeaveRequests: HRLeaveRequests,
    SettingsUserAccess: SettingsUserAccess,
    UserAccessRules: UserAccessRules,
    Bookings: Bookings,
    Customers: Customers,
    Leads: Leads,
    Quotations: Quotations,
    Marketing: Marketing,
    CorporateClients: CorporateClients,
    SalesPerformance: SalesPerformance,
    FinanceOverview: FinanceOverview,
    Invoices: Invoices,
    Payments: Payments,
    Expenses: Expenses,
    Reports: Reports,
    TaxVAT: TaxVAT,
    Depreciation: Depreciation,
    Inventory: Inventory,
    FleetStatus: FleetStatus,
    FleetHealth: FleetHealth,
    DamageLogs: DamageLogs,
    Contracts: Contracts,
    SalikFines: SalikFines,
    GPSTracking: GPSTracking,
    MobileBooking: MobileBooking,
    CustomerDocsUpload: CustomerDocsUpload,
    BookingConfirmation: BookingConfirmation,
    BookingReview: BookingReview,
    InvoiceView: InvoiceView,
    LandingPage: LandingPage,
    VehicleImageLibrary: VehicleImageLibrary,
    FleetAnalyst: FleetAnalyst,
    CustomerDocuments: CustomerDocuments,
    RentCars: RentCars,
    StaffDocuments: StaffDocuments,
    LegalDocuments: LegalDocuments,
    AIDocumentProcessing: AIDocumentProcessing,
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Module access requirements for different pages
const MODULE_ACCESS = {
    HREmployees: 'hr',
    HREmployeeProfile: 'hr',
    HRAttendance: 'hr',
    HRPayroll: 'hr',
    HRLeaveRequests: 'hr',
    SettingsUserAccess: 'admin',
    UserAccessRules: 'admin',
    FinanceOverview: 'finance',
    Invoices: 'finance',
    Payments: 'finance',
    Expenses: 'finance',
    Reports: 'finance',
    TaxVAT: 'finance',
    Depreciation: 'finance',
};

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    const { user, loading } = useAuth();
    
    // Show loading state while checking authentication
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    // Check if the path is a public route
    const isPublicRoute = ['/login', '/signup', '/forgot-password', '/verify-email', '/landing-page'].includes(location.pathname.toLowerCase());
    
    // If user is authenticated and tries to access auth pages, redirect to dashboard
    // Exception: allow access to /verify-email even if authenticated but not confirmed
    if (user && isPublicRoute && location.pathname.toLowerCase() !== '/landing-page' && location.pathname.toLowerCase() !== '/verify-email') {
        return <Navigate to="/dashboard" replace />;
    }
    
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route path="/landing-page" element={<LandingPage />} />
            
            {/* Root route - redirect to landing page for non-authenticated users */}
            <Route path="/" element={
                user ? (
                    <ProtectedRoute>
                        <Layout currentPageName={currentPage}>
                            <Dashboard />
                        </Layout>
                    </ProtectedRoute>
                ) : <Navigate to="/landing-page" replace />
            } />
            
            {/* Explicit landing page route to handle direct access */}
            <Route path="/landingpage" element={<Navigate to="/landing-page" replace />} />
            
            <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Layout currentPageName={currentPage}>
                        <Dashboard />
                    </Layout>
                </ProtectedRoute>
            } />
            
            {/* Generate protected routes for all pages */}
            {Object.keys(PAGES).map(pageName => {
                if (pageName === 'Dashboard' || pageName === 'LandingPage') return null; // Already handled
                
                const requiredModule = MODULE_ACCESS[pageName];
                
                return (
                    <Route 
                        key={pageName}
                        path={`/${pageName}`} 
                        element={
                            <ProtectedRoute requiredModule={requiredModule}>
                                <Layout currentPageName={pageName}>
                                    {React.createElement(PAGES[pageName])}
                                </Layout>
                            </ProtectedRoute>
                        } 
                    />
                );
            })}
            
            {/* Catch all route - show 404 for unknown routes */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}