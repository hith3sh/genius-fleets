import React, { useState, useEffect } from 'react';
import { User } from '@/api/entities';
import { UserAccess } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { navigationItems } from '../components/navigation';
import { ShieldCheck, User as UserIcon } from 'lucide-react';

const allModules = navigationItems.flatMap(item => 
  item.subItems ? [item.name, ...item.subItems.map(sub => sub.page)] : [item.page]
).filter(Boolean);


export default function SettingsUserAccess() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAccess, setUserAccess] = useState(null);
  const [accessibleModules, setAccessibleModules] = useState(new Set());
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadUsers() {
      const allUsers = await User.list();
      setUsers(allUsers);
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function loadUserAccess() {
      if (!selectedUser) return;
      setIsLoading(true);
      const accessRecords = await UserAccess.filter({ user_email: selectedUser.email });
      if (accessRecords.length > 0) {
        setUserAccess(accessRecords[0]);
        setAccessibleModules(new Set(accessRecords[0].accessible_modules));
      } else {
        setUserAccess(null);
        setAccessibleModules(new Set());
      }
      setIsLoading(false);
    }
    loadUserAccess();
  }, [selectedUser]);

  const handleModuleToggle = (moduleName) => {
    setAccessibleModules(prev => {
      const newSet = new Set(prev);
      if (newSet.has(moduleName)) {
        newSet.delete(moduleName);
      } else {
        newSet.add(moduleName);
      }
      return newSet;
    });
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) return;
    setIsLoading(true);
    const payload = {
      user_email: selectedUser.email,
      accessible_modules: Array.from(accessibleModules),
    };
    if (userAccess) {
      await UserAccess.update(userAccess.id, payload);
    } else {
      await UserAccess.create(payload);
    }
    setIsLoading(false);
    alert('Access rules saved successfully!');
  };

  return (
    <div className="p-6 md:p-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck className="text-blue-600" />
            Role-Based Access Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="font-medium">Select Employee to Manage Access</label>
            <Select onValueChange={email => setSelectedUser(users.find(u => u.email === email))}>
              <SelectTrigger>
                <SelectValue placeholder="Select an employee..." />
              </SelectTrigger>
              <SelectContent>
                {users.map(user => (
                  <SelectItem key={user.id} value={user.email}>
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      {user.full_name} ({user.email})
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedUser && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Manage Permissions for {selectedUser.full_name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {navigationItems.map(item => (
                  <div key={item.name} className="p-4 border rounded-lg">
                    <h4 className="font-bold mb-2">{item.name}</h4>
                    {item.subItems ? (
                      <div className="space-y-2 pl-4">
                        {item.subItems.map(subItem => (
                          <div key={subItem.page} className="flex items-center gap-2">
                            <Checkbox
                              id={`${selectedUser.id}-${subItem.page}`}
                              checked={accessibleModules.has(subItem.page)}
                              onCheckedChange={() => handleModuleToggle(subItem.page)}
                            />
                            <label htmlFor={`${selectedUser.id}-${subItem.page}`}>{subItem.name}</label>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={`${selectedUser.id}-${item.page}`}
                          checked={accessibleModules.has(item.page)}
                          onCheckedChange={() => handleModuleToggle(item.page)}
                        />
                        <label htmlFor={`${selectedUser.id}-${item.page}`}>{item.name}</label>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <Button onClick={handleSaveChanges} disabled={isLoading}>
                {isLoading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}