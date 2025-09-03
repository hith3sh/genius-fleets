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

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Dashboard />} />
                
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/FleetManagement" element={<FleetManagement />} />
                
                <Route path="/VehicleDocuments" element={<VehicleDocuments />} />
                
                <Route path="/HREmployees" element={<HREmployees />} />
                
                <Route path="/HREmployeeProfile" element={<HREmployeeProfile />} />
                
                <Route path="/HRAttendance" element={<HRAttendance />} />
                
                <Route path="/HRPayroll" element={<HRPayroll />} />
                
                <Route path="/HRLeaveRequests" element={<HRLeaveRequests />} />
                
                <Route path="/SettingsUserAccess" element={<SettingsUserAccess />} />
                
                <Route path="/UserAccessRules" element={<UserAccessRules />} />
                
                <Route path="/Bookings" element={<Bookings />} />
                
                <Route path="/Customers" element={<Customers />} />
                
                <Route path="/Leads" element={<Leads />} />
                
                <Route path="/Quotations" element={<Quotations />} />
                
                <Route path="/Marketing" element={<Marketing />} />
                
                <Route path="/CorporateClients" element={<CorporateClients />} />
                
                <Route path="/SalesPerformance" element={<SalesPerformance />} />
                
                <Route path="/FinanceOverview" element={<FinanceOverview />} />
                
                <Route path="/Invoices" element={<Invoices />} />
                
                <Route path="/Payments" element={<Payments />} />
                
                <Route path="/Expenses" element={<Expenses />} />
                
                <Route path="/Reports" element={<Reports />} />
                
                <Route path="/TaxVAT" element={<TaxVAT />} />
                
                <Route path="/Depreciation" element={<Depreciation />} />
                
                <Route path="/Inventory" element={<Inventory />} />
                
                <Route path="/FleetStatus" element={<FleetStatus />} />
                
                <Route path="/FleetHealth" element={<FleetHealth />} />
                
                <Route path="/DamageLogs" element={<DamageLogs />} />
                
                <Route path="/Contracts" element={<Contracts />} />
                
                <Route path="/SalikFines" element={<SalikFines />} />
                
                <Route path="/GPSTracking" element={<GPSTracking />} />
                
                <Route path="/MobileBooking" element={<MobileBooking />} />
                
                <Route path="/CustomerDocsUpload" element={<CustomerDocsUpload />} />
                
                <Route path="/BookingConfirmation" element={<BookingConfirmation />} />
                
                <Route path="/BookingReview" element={<BookingReview />} />
                
                <Route path="/InvoiceView" element={<InvoiceView />} />
                
                <Route path="/LandingPage" element={<LandingPage />} />
                
                <Route path="/VehicleImageLibrary" element={<VehicleImageLibrary />} />
                
                <Route path="/FleetAnalyst" element={<FleetAnalyst />} />
                
                <Route path="/CustomerDocuments" element={<CustomerDocuments />} />
                
                <Route path="/RentCars" element={<RentCars />} />
                
                <Route path="/StaffDocuments" element={<StaffDocuments />} />
                
                <Route path="/LegalDocuments" element={<LegalDocuments />} />
                
                <Route path="/AIDocumentProcessing" element={<AIDocumentProcessing />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}