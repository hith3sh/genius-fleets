

import React, { useState, useEffect, createContext, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/api/entities";
import { UserAccess } from "@/api/entities";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import WelcomeScreen from "../components/dashboard/WelcomeScreen";
import { navigationItems } from '../components/navigation'; // Corrected import path
import FleetAnalystWidget from "../components/common/FleetAnalystWidget";


const SidebarContext = createContext();

export { navigationItems };

export function SidebarProvider({ children }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openModule, setOpenModule] = useState(null);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const closeMobile = () => setIsMobileOpen(false);
  const toggleMobile = () => setIsMobileOpen((prev) => !prev);

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toggleExpanded,
        isMobileOpen,
        closeMobile,
        toggleMobile,
        openModule,
        setOpenModule
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

export function Sidebar({ children, className, style }) {
  const { isMobileOpen, closeMobile, isExpanded } = useSidebar();
  return (
    <>
      <AnimatePresence>
        {isMobileOpen &&
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          />
        }
      </AnimatePresence>
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? "280px" : "80px" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col border-r bg-white transition-all lg:static lg:w-auto ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={style}
      >
        {children}
      </motion.aside>
    </>
  );
}

export function SidebarHeader({ children, className }) {
  return <div className={`border-b border-gray-200/50 px-6 py-4 ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className }) {
  return <div className={`flex-1 overflow-y-auto px-3 py-4 ${className}`}>
    {children}
  </div>;
}

export function SidebarFooter({ children, className }) {
  return <div className={`border-t border-gray-200/50 px-4 py-3 ${className}`}>{children}</div>;
}

export function SidebarTrigger({ className }) {
  const { toggleMobile } = useSidebar();
  return (
    <button
      onClick={toggleMobile}
      className={`text-gray-600 hover:text-gray-800 focus:outline-none ${className}`}
    >
      <Menu className="h-6 w-6" />
    </button>
  );
}

function NavItem({ item, hasAccess }) {
  const { pathname } = useLocation();
  const { isExpanded, closeMobile, openModule, setOpenModule } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  // Determine if a parent item or any of its sub-items are currently active
  const isParentActive = item.subItems?.some((sub) => sub.page && pathname.includes(createPageUrl(sub.page))) || (item.page && pathname.includes(createPageUrl(item.page)));

  // Check if item is accessible
  const isAccessible = hasAccess(item);

  // Effect to manage module opening/closing
  useEffect(() => {
    if (item.subItems) {
      if (openModule === item.name) {
        setIsOpen(true);
      } else if (openModule && openModule !== item.name) {
        setIsOpen(false);
      }
    }
  }, [openModule, item.name, item.subItems]);

  // Effect to open collapsible if any sub-item is active on load
  useEffect(() => {
    if (item.subItems && isParentActive) {
      setIsOpen(true);
      setOpenModule(item.name);
    }
  }, [item.subItems, isParentActive, item.name, setOpenModule]);

  const handleModuleClick = () => {
    if (item.subItems) {
      if (openModule === item.name) {
        setOpenModule(null);
      } else {
        setOpenModule(item.name);
      }
    }
  };

  const itemClasses = isAccessible ?
    `cursor-pointer ${isParentActive ? "bg-violet-100 text-violet-800 font-semibold" : "hover:bg-gray-100 text-gray-700"}` :
    "text-gray-400 cursor-not-allowed filter blur-sm opacity-70 pointer-events-none";

  if (item.subItems) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} disabled={!isAccessible}>
        <CollapsibleTrigger asChild>
          <div
            onClick={handleModuleClick}
            className={`relative px-4 py-2 my-1 font-medium rounded-lg transition-colors duration-200 flex items-center justify-between ${itemClasses}`}
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5" />
              {isExpanded && <span className="truncate">{item.name}</span>}
            </div>
            {isExpanded && isAccessible && (
              isOpen ?
                <ChevronDown className="w-4 h-4" /> :
                <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-1 ml-4 mt-1">
          {item.subItems.map((subItem) => {
            const isSubItemActive = subItem.page && pathname === createPageUrl(subItem.page);
            return (
              hasAccess(subItem) &&
              <Link
                key={subItem.page}
                to={createPageUrl(subItem.page)}
                onClick={closeMobile}
                className={`flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${isSubItemActive ? "bg-violet-100 text-violet-700 font-semibold" : "hover:bg-gray-100 text-gray-600"}`}
              >
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span>{subItem.name}</span>
              </Link>
            );
          })}
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Link
      to={isAccessible && item.page ? createPageUrl(item.page) : '#'}
      onClick={isAccessible ? closeMobile : (e) => e.preventDefault()}
      className={`relative px-4 py-2 my-1 font-medium rounded-lg transition-colors duration-200 flex items-center gap-3 ${itemClasses} ${isParentActive && isAccessible ? "bg-violet-100 text-violet-800 font-semibold" : "text-gray-700"}`}
    >
      <item.icon className="w-5 h-5" />
      {isExpanded && <span className="truncate">{item.name}</span>}
    </Link>
  );
}

function CustomerPortalLayout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    User.me().then(setUser)
      .catch((error) => {
        console.warn("Not logged in for customer portal or error fetching user:", error);
        User.login(); // Redirect to login if not authenticated
      });
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      await User.logout();
    } catch (error) {
      console.error("An error occurred during logout:", error);
    } finally {
      // Always redirect to the root to ensure a clean state
      // The routing logic will handle redirecting to landing page
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png"
                alt="Al Jisr Car Rentals Logo"
                className="h-14 object-contain"
              />
            </div>
            <div className="flex items-center gap-4">
              {user && (
                <span className="font-medium text-gray-700">
                  Welcome, {user.full_name || user.email}
                </span>
              )}
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}

export default function Layout({ children, currentPageName }) {
  const [user, setUser] = useState(null);
  const [userAccess, setUserAccess] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Set the browser title
  useEffect(() => {
    document.title = "Al Jisr Car Rentals - Premium Car Rental Management";
  }, []);

  useEffect(() => {
    async function checkAuthAndRedirect() {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);

        // Scenario 1: A login was just completed (indicated by sessionStorage flag)
        const loginInProgress = sessionStorage.getItem('login_in_progress');
        
        if (loginInProgress === 'true') {
          sessionStorage.removeItem('login_in_progress'); // Clear the flag immediately

          // Perform the redirect after successful login
          if (currentUser.role === 'Customer') {
            window.location.href = createPageUrl('MobileBooking');
          } else {
            window.location.href = createPageUrl('Dashboard');
          }
          return; // Stop execution to allow redirect to happen
        }

        // Scenario 2: User is authenticated from a previous session but is on a protected page.
        // We set up their access rights but DO NOT redirect them from the landing page.
        if (currentPageName !== 'LandingPage') {
            console.log('🎯 Layout: Setting up access for user role:', currentUser.role);
            
            // User.me() now includes all access data, so we can use it directly
            const userAccessData = {
              role: currentUser.role,
              accessible_modules: currentUser.accessible_modules || [],
              user_email: currentUser.email
            };
            
            // For Management role, ensure 'all' modules access for backward compatibility
            if (currentUser.role === 'Management') {
              console.log('👑 Layout: Management user detected, granting full access');
              userAccessData.accessible_modules = 'all';
            }
            
            console.log('📋 Layout: Setting userAccess:', userAccessData);
            setUserAccess(userAccessData);
        }
      } catch (error) {
        // User is not authenticated
        console.warn("Authentication check failed:", error);
        setUser(null);
        setUserAccess(null);
        // If they are on a protected page (not landing page), force login.
        // If they are on the landing page, nothing to do, as it's publicly accessible.
        if (currentPageName !== 'LandingPage') {
          // Set a flag before redirecting to login
          sessionStorage.setItem('login_in_progress', 'true');
          await User.login();
        }
      } finally {
        setIsLoading(false);
      }
    }
    checkAuthAndRedirect();
  }, [currentPageName, location.pathname]);

  // If the current page is the landing page or rent cars page, render it without any layout wrapper
  if (currentPageName === 'LandingPage' || currentPageName === 'RentCars') {
    return <>{children}</>;
  }
  
  const hasAccess = (navItem) => {
    // Rule 1: Management role has access to everything.
    if (userAccess?.role === 'Management') return true;
    
    // Rule 2: Legacy support for 'all' modules (for backward compatibility)
    if (userAccess?.accessible_modules === 'all') return true;
    
    // Rule 3: If no userAccess or user is not assigned a role, deny access
    if (!userAccess || !userAccess.role) return false;
    
    // Rule 4: If accessible_modules is not an array, deny access
    if (!Array.isArray(userAccess.accessible_modules)) return false;

    const modules = userAccess.accessible_modules;

    // Rule 5: For parent menu items, grant access if AT LEAST ONE child is accessible.
    if (navItem.subItems) {
      return navItem.subItems.some((sub) => sub.page && modules.includes(sub.page));
    }

    // Rule 6: For individual menu items, grant access if the page name is in the user's list.
    return navItem.page ? modules.includes(navItem.page) : false;
  };
  
  // Determine if the sidebar trigger (hamburger menu) should be visible
  const shouldShowSidebarTrigger = () => {
    if (!userAccess || userAccess.role === 'Management' || userAccess.accessible_modules === 'all') {
      return true; // Show for Management or if access isn't determined yet
    }
    if (Array.isArray(userAccess.accessible_modules)) {
      if (userAccess.accessible_modules.length > 1) {
        return true; // Show if user has access to more than one module
      }
      if (userAccess.accessible_modules.length === 1 && userAccess.accessible_modules[0] === 'MobileBooking') {
        return false; // Hide if the only accessible module is MobileBooking
      }
    }
    return true; // Default to showing it
  };

  const handleLogout = async () => {
    try {
      // Clear session-related storage first
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
      // Call the official logout method from the SDK
      await User.logout();
    } catch (error)
    {
      console.error("An error occurred during logout:", error);
    } finally {
      // ALWAYS redirect to the root to ensure a clean state
      // This forces a full reload, clearing all component state.
      // The routing logic will handle redirecting to landing page
      window.location.href = '/';
    }
  };

  function SidebarFooterContent() {
    const { isExpanded } = useSidebar();

    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-gray-50">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-semibold text-sm">
              {user?.full_name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          {isExpanded &&
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 text-sm truncate">
                {user?.full_name || 'User'}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {user?.role || 'User'} Access
              </p>
            </div>
          }
        </div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="w-full flex items-center justify-center text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200"
        >
          <LogOut className={`w-4 h-4 ${isExpanded ? 'mr-2' : ''}`} />
          {isExpanded && <span>Logout</span>}
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png"
            alt="Al Jisr Car Rentals Logo"
            className="h-64 object-contain mx-auto mb-8"
          />
          <p className="text-gray-600 mb-6 text-lg">Premium Car Rental Management</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  // CONDITIONAL LAYOUT RENDERING
  if (user?.role === 'Customer') {
    return <CustomerPortalLayout>{children}</CustomerPortalLayout>;
  }

  // If the user is not authenticated and not on the landing page, the useEffect hook will handle redirection.
  // If loading is complete, proceed to render the main layout.
  // The layout itself will handle what to show based on whether user/userAccess has been populated.

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full" style={{ backgroundColor: '#f8fafc' }}>
        <style>
          {`
            :root {
              --primary-violet: #6D28D9;
              --primary-teal: #0D9488;
            }
          `}
        </style>

        <Sidebar className="border-r border-gray-200/50 bg-white shadow-sm">
          <SidebarHeader className="border-b border-gray-200/50">
            <div className="flex flex-col items-center p-4">
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png"
                alt="Al Jisr Car Rentals Logo" 
                className="w-full h-auto max-h-32 object-contain"
              />
            </div>
          </SidebarHeader>

          <SidebarContent>
            <nav className="flex-1">
              {navigationItems.map((item) =>
                <NavItem key={item.name} item={item} hasAccess={hasAccess} />
              )}
            </nav>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200/50">
            <SidebarFooterContent />
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col bg-slate-50">
          <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 px-6 py-3 md:hidden sticky top-0 z-30">
            <div className="flex items-center gap-4">
              {shouldShowSidebarTrigger() && (
                <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-lg transition-colors duration-200" />
              )}
              <img
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4492b025e_AlJisrCarRentals.png"
                alt="Al Jisr Car Rentals Logo"
                className="h-12 object-contain"
              />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {currentPageName === 'Dashboard' && (userAccess?.role !== 'Management' && !hasAccess({ page: 'Dashboard' })) ?
              <WelcomeScreen user={user} /> :
              children
            }
          </div>
          
          {/* Only show the Fleet Analyst widget for non-Customer users */}
          {user && user.role !== 'Customer' && <FleetAnalystWidget />}
        </main>
      </div>
    </SidebarProvider>
  );
}

