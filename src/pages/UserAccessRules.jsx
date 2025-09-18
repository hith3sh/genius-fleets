import React, { useState, useEffect } from "react";
import { UserAccess } from "@/api/entities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  CheckSquare,
  Square
} from "lucide-react";
import { navigationItems } from '../components/navigation';

// Define module categories based on navigation structure
const moduleCategories = [
  {
    name: "Core Modules",
    modules: [
      { name: "Mobile Booking Page", page: "MobileBooking" },
      { name: "Management Dashboard", page: "Dashboard" },
      { name: "Bookings", page: "Bookings" }
    ]
  },
  {
    name: "Sales Management",
    modules: [
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
    modules: [
      { name: "Fleet Status", page: "FleetStatus" },
      { name: "Fleet Management", page: "FleetManagement" },
      { name: "Fleet Health", page: "FleetHealth" },
      { name: "AI Fleet Analyst", page: "FleetAnalyst" },
      { name: "Damage & Incident Logs", page: "DamageLogs" },
      { name: "Contracts", page: "Contracts" },
      { name: "Salik & Fines", page: "SalikFines" },
      { name: "GPS Tracking", page: "GPSTracking" }
    ]
  },
  {
    name: "HR Management",
    modules: [
      { name: "Employee List", page: "HREmployees" },
      { name: "Attendance & Shifts", page: "HRAttendance" },
      { name: "Payroll", page: "HRPayroll" },
      { name: "Leave Requests", page: "HRLeaveRequests" }
    ]
  },
  {
    name: "Finance Management",
    modules: [
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
    modules: [
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
    modules: [
      { name: "Business Info", page: "BusinessInfo" },
      { name: "User Access Rules", page: "UserAccessRules" },
      { name: "API Settings", page: "APISettings" },
      { name: "Branches / Locations", page: "Branches" }
    ]
  }
];

export default function UserAccessRules() {
  const [users, setUsers] = useState([]);
  const [userAccessRules, setUserAccessRules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRule, setEditingRule] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    user_email: '',
    role: 'Staff',
    accessible_modules: []
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [accessRulesData] = await Promise.all([
        UserAccess.list()
      ]);
      setUsers(accessRulesData.filter(u => u.role !== 'Management'));
      setUserAccessRules(accessRulesData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingRule) {
        await UserAccess.update(editingRule.id, formData);
      } else {
        await UserAccess.create(formData);
      }
      resetForm();
      loadData();
    } catch (error) {
      console.error("Error saving user access rule:", error);
    }
  };

  const handleEdit = (rule) => {
    setEditingRule(rule);
    setFormData({
      user_email: rule.user_email,
      role: rule.role || 'Staff',
      accessible_modules: rule.accessible_modules || []
    });
    setShowForm(true);
  };

  const handleDelete = async (ruleId) => {
    if (confirm('Are you sure you want to delete this access rule?')) {
      try {
        await UserAccess.delete(ruleId);
        loadData();
      } catch (error) {
        console.error("Error deleting access rule:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      user_email: '',
      role: 'Staff',
      accessible_modules: []
    });
    setEditingRule(null);
    setShowForm(false);
  };

  const handleModuleToggle = (modulePageName) => {
    const newModules = formData.accessible_modules.includes(modulePageName)
      ? formData.accessible_modules.filter(m => m !== modulePageName)
      : [...formData.accessible_modules, modulePageName];
    
    setFormData({ ...formData, accessible_modules: newModules });
  };

  const handleCategorySelectAll = (categoryModules, isAllSelected) => {
    const categoryPageNames = categoryModules.map(m => m.page);
    let newModules;
    
    if (isAllSelected) {
      // Remove all modules from this category
      newModules = formData.accessible_modules.filter(m => !categoryPageNames.includes(m));
    } else {
      // Add all modules from this category
      newModules = [...new Set([...formData.accessible_modules, ...categoryPageNames])];
    }
    
    setFormData({ ...formData, accessible_modules: newModules });
  };

  const isCategoryFullySelected = (categoryModules) => {
    return categoryModules.every(m => formData.accessible_modules.includes(m.page));
  };

  const isCategoryPartiallySelected = (categoryModules) => {
    return categoryModules.some(m => formData.accessible_modules.includes(m.page)) && 
           !isCategoryFullySelected(categoryModules);
  };

  const filteredUsers = users.filter(user => 
    user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getUserAccessRule = (userEmail) => {
    return userAccessRules.find(rule => rule.user_email === userEmail);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              User Access Rules
            </h1>
            <p className="text-gray-600 mt-1">Control user permissions and module access</p>
          </div>
        </div>
        <Button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Access Rule
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const accessRule = getUserAccessRule(user.email);
          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {user.full_name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{user.full_name || 'Unknown User'}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">
                          {accessRule?.role || 'No Role Assigned'}
                        </Badge>
                        {accessRule ? (
                          <Badge className="bg-green-100 text-green-800">
                            {accessRule.role === 'Management' ? 'All modules' : `${accessRule.accessible_modules?.length || 0} modules`}
                          </Badge>
                        ) : (
                          <Badge variant="destructive">No access rule</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {accessRule ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(accessRule)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(accessRule.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setFormData({ user_email: user.email, role: 'Staff', accessible_modules: [] });
                          setShowForm(true);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add Rule
                      </Button>
                    )}
                  </div>
                </div>
                {accessRule && (
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-sm text-gray-600 mb-2">Accessible Modules:</p>
                    <div className="flex flex-wrap gap-2">
                      {accessRule.accessible_modules?.slice(0, 5).map((module) => (
                        <Badge key={module} variant="secondary" className="text-xs">
                          {module}
                        </Badge>
                      ))}
                      {accessRule.accessible_modules?.length > 5 && (
                        <Badge variant="secondary" className="text-xs">
                          +{accessRule.accessible_modules.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                {editingRule ? 'Edit Access Rule' : 'Add Access Rule'}
              </CardTitle>
            </CardHeader>
            <CardContent className="overflow-y-auto max-h-[70vh]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="user_email">User Email</Label>
                  {editingRule ? (
                    <Input
                      id="user_email"
                      value={formData.user_email}
                      disabled
                      className="bg-gray-50"
                    />
                  ) : (
                    <Select
                      value={formData.user_email}
                      onValueChange={(value) => setFormData({ ...formData, user_email: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a user" />
                      </SelectTrigger>
                      <SelectContent>
                        {users.map((user) => (
                          <SelectItem key={user.id} value={user.email}>
                            {user.full_name || 'Unknown User'} ({user.email})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div>
                  <Label htmlFor="role" className="text-base font-semibold">User Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Staff">Staff</SelectItem>
                      <SelectItem value="Manager">Manager</SelectItem>
                      <SelectItem value="Sales Executive">Sales Executive</SelectItem>
                      <SelectItem value="HR Admin">HR Admin</SelectItem>
                      <SelectItem value="Finance Manager">Finance Manager</SelectItem>
                      <SelectItem value="Fleet Manager">Fleet Manager</SelectItem>
                      <SelectItem value="Management">Management (Full Access)</SelectItem>
                      <SelectItem value="Customer">Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-1">
                    {formData.role === 'Management' && "Management role grants access to all modules regardless of selections below."}
                    {formData.role === 'Customer' && "Customer role provides limited access to booking functionalities."}
                    {!['Management', 'Customer'].includes(formData.role) && "Select specific modules this user can access below."}
                  </p>
                </div>

                <div>
                  <Label className="text-base font-semibold">Module Access Permissions</Label>
                  <p className="text-sm text-gray-600 mb-4">
                    {formData.role === 'Management' 
                      ? "Management role automatically has access to all modules" 
                      : "Select which modules this user can access"}
                  </p>
                  
                  <div className={`space-y-6 ${formData.role === 'Management' ? 'opacity-50 pointer-events-none' : ''}`}>
                    {moduleCategories.map((category) => {
                      const isFullySelected = isCategoryFullySelected(category.modules);
                      const isPartiallySelected = isCategoryPartiallySelected(category.modules);
                      
                      return (
                        <div key={category.name} className="border rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <Checkbox
                              id={`category-${category.name}`}
                              checked={isFullySelected}
                              onCheckedChange={() => handleCategorySelectAll(category.modules, isFullySelected)}
                              className={isPartiallySelected ? "data-[state=checked]:bg-blue-500" : ""}
                            />
                            {isPartiallySelected && !isFullySelected && (
                              <CheckSquare className="w-4 h-4 text-blue-500 -ml-7" />
                            )}
                            <Label
                              htmlFor={`category-${category.name}`}
                              className="text-lg font-semibold cursor-pointer"
                            >
                              {category.name}
                            </Label>
                            <Badge variant="outline" className="text-xs">
                              {category.modules.filter(m => formData.accessible_modules.includes(m.page)).length}/{category.modules.length}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-6">
                            {category.modules.map((module) => (
                              <div key={module.page} className="flex items-center space-x-2">
                                <Checkbox
                                  id={module.page}
                                  checked={formData.accessible_modules.includes(module.page)}
                                  onCheckedChange={() => handleModuleToggle(module.page)}
                                />
                                <Label htmlFor={module.page} className="text-sm cursor-pointer">
                                  {module.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingRule ? 'Update Rule' : 'Create Rule'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}