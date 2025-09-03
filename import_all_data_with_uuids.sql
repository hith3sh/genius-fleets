-- Generated Import Script for Supabase with UUID Mapping
-- All foreign key relationships use proper UUIDs

BEGIN;

-- Import data for user_access
INSERT INTO user_access (id, user_email, accessible_modules) VALUES
  ('15d20e6e-f7af-4cdb-8634-c60e1e8709cc', 'roosewalt@gmail.com', ARRAY['Dashboard', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'Bookings', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches', 'MobileBooking', 'VehicleImageLibrary', 'FleetAnalyst', 'Inquiries', 'Quotes', 'Products', 'SalesOrders', 'PriceLists', 'Drivers', 'Maintenance', 'Vehicles', 'FuelLog', 'Employees', 'LeaveManagement', 'Payroll', 'Attendance', 'Documents', 'Accounts', 'Templates']),
  ('9cd5c72d-4b90-4b30-b932-4e8f619eaeac', 'blogger.pereira@gmail.com', ARRAY['Customers', 'Marketing', 'Leads', 'CorporateClients', 'Quotations', 'SalesPerformance', 'FleetStatus', 'SalikFines', 'HREmployees', 'HRLeaveRequests', 'HRAttendance', 'HRPayroll', 'FinanceOverview', 'Expenses', 'Depreciation', 'Invoices', 'Reports', 'Inventory', 'Payments', 'TaxVAT', 'VehicleImageLibrary', 'StaffDocuments', 'VehicleDocuments', 'LegalDocuments', 'CustomerDocuments', 'AIDocumentProcessing', 'UserAccessRules', 'BusinessInfo', 'Branches', 'FleetManagement', 'DamageLogs', 'GPSTracking', 'FleetHealth', 'Contracts', 'APISettings', 'Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'Products', 'SalesOrders', 'PriceLists', 'Maintenance']),
  ('bd3ac35f-a8cf-4cbf-962b-a2aad33c8a7c', 'lalchempakathinal@gmail.com', ARRAY['Customers', 'Marketing', 'Leads', 'CorporateClients', 'Quotations', 'SalesPerformance', 'FleetStatus', 'FleetAnalyst', 'SalikFines', 'FleetManagement', 'DamageLogs', 'GPSTracking', 'FleetHealth', 'Contracts', 'HREmployees', 'HRLeaveRequests', 'HRAttendance', 'HRPayroll', 'Payments', 'TaxVAT', 'Inventory', 'Reports', 'Invoices', 'FinanceOverview', 'Expenses', 'Depreciation', 'VehicleImageLibrary', 'StaffDocuments', 'BusinessInfo', 'Branches', 'UserAccessRules', 'APISettings', 'AIDocumentProcessing', 'CustomerDocuments', 'VehicleDocuments', 'LegalDocuments', 'Dashboard', 'Bookings', 'MobileBooking', 'SalesOrders', 'PriceLists', 'Quotes', 'Products', 'Inquiries', 'Vehicles', 'FuelLog', 'Drivers', 'Maintenance', 'Attendance', 'Employees', 'Accounts', 'Documents', 'Templates', 'Payroll', 'LeaveManagement', 'User Access Rules', 'API Settings', 'Branches', 'Quotations']),
  ('8527d5fb-9388-4df4-9e3e-45a3f480747e', 'mohsin57ali@gmail.com', ARRAY['Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'SalesOrders', 'Customers', 'Products', 'PriceLists', 'Vehicles', 'Drivers', 'Maintenance', 'FuelLog', 'VehicleDocuments', 'Employees', 'Payroll', 'Attendance', 'LeaveManagement', 'Invoices', 'Payments', 'Expenses', 'Accounts', 'Reports', 'Documents', 'Templates', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('340e75d9-b10b-44b8-9006-3eb503ed58aa', 'mohsin57ali@gmail.com', ARRAY['Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'SalesOrders', 'Customers', 'Products', 'PriceLists', 'Vehicles', 'Drivers', 'Maintenance', 'FuelLog', 'VehicleDocuments', 'Employees', 'Payroll', 'Attendance', 'LeaveManagement', 'Invoices', 'Payments', 'Expenses', 'Accounts', 'Reports', 'Documents', 'Templates', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('39c9b7fd-d5da-44ff-b34c-b7caeda290c3', 'roosewalt@gmail.com', ARRAY['MobileBooking', 'Dashboard', 'Bookings', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'FleetAnalyst', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleImageLibrary', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('21b6f0b7-3f0c-430f-8e96-0dce3efc6a0a', 'hithesh0215@gmail.com', ARRAY['MobileBooking', 'Dashboard', 'Bookings', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'FleetAnalyst', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleImageLibrary', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches'])
ON CONFLICT DO NOTHING;


-- Import data for customer
INSERT INTO customer (id, name, email, phone, license_number, address, customer_type, status) VALUES
  ('1fa16640-f86a-4fb8-b248-978306a50353', 'John Smith', 'john.smith@email.com', '+971-50-123-4567', 'DL12345678', '123 Business Bay, Dubai, UAE', 'Individual', 'Active'),
  ('0442ffa1-55f8-4a9f-993d-aa69e42fcb56', 'Roosewalt Pereira', 'roosewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('6d813873-8f5c-4693-b026-df4e58fb33f8', 'Roosewalt Sabestian Pereira', 'blogger.pereira@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active'),
  ('fc743530-6f53-42d7-be5a-cc827f978e48', 'Roosewalt Sabestian Pereira', 'roosewalt@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active'),
  ('5a1a8d4c-3d83-43df-8c6f-dbf3e3becf62', 'Test booking', 'help@joboy.', '582628980', NULL, NULL, 'Individual', 'Active'),
  ('4cda2a84-cc81-4d17-a8c4-abbf9e63e21c', 'Test', 'test', 'Test', NULL, NULL, 'Individual', 'Active'),
  ('12ebc3ed-5a51-48be-b7dc-e8cf2180e071', 'Majid ABdul', 'majid1212@gmail.com', '+971123456789', NULL, '903 Al Saud Bldg 2', 'Individual', 'Active'),
  ('0a08c2f5-0b08-41b9-8378-22aa145899dc', 'Lal Sebastian', 'lalchempakathinal@gmail.com', '+971000000000', NULL, 'Street No. 25', 'Individual', 'Active'),
  ('9ae0f3e8-f242-4964-bb30-8635c36d44ad', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('b9cf2c27-eea6-4759-8def-6ca267b92088', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('2f8357f9-512c-4fa2-b07f-e9c20d510e64', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '502345678', 'DUB123456', 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('ef3f0e53-d0ab-403e-bfff-5380004e102a', 'Priya Ramesh Nair', 'priya.nair@example.com', '+971523456789', NULL, 'Apt 405, Bur Dubai, Dubai', 'Individual', 'Active'),
  ('24c78e61-0fe2-4324-bdea-e14fc69cc894', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('d74ba312-bb07-4af6-ae45-4651f907066a', 'Gabesh Shah', 'gabesh@gmail.com', '+971502402200', NULL, 'Flat 111, Hasani 19', 'Individual', 'Active'),
  ('acfda92f-1f61-46ad-a300-44354b2c6d91', 'Ahmed Shah', 'as123@gmail.com', '+971562000200', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('dc200b7e-74ab-4800-992b-2f123fe3ecfa', 'Ganesh Shah', 'Gshah12@gmail.com', '+971562440222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('58b7cb37-fc29-44b5-960c-f0d419e02fcd', 'Roman Bhat', 'roman111@gmail.com', '+971562440440', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('71d96124-2cb3-496c-aaf0-ec86238810cb', 'ABC Xghhhh', 'abc@gmail.com', '+971562220222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('e852596b-6fc1-4b2a-bfeb-8fb900b4f203', 'aaaaaaa', 'aaaaa@gmail.com', '+971555555555', NULL, 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('e12840bc-0c83-457b-acff-413c1916827c', 'kkkk hhhhh', 'gggg@gmail.com', '+971562440022', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('c07c4768-0de3-47b8-b1d4-81f8d1b45865', 'Michael Andrew Smith', 'michael.smith@example.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('32083a3f-27da-47e5-8de1-c0bdbe0ec5cf', 'Fatima Hassan El Sayed', 'fatima.elsayed@example.com', '+971567654321', 'DUB345678', 'Apt 902, Al Nahda, Dubai', 'Individual', 'Active'),
  ('6ecf5b51-479b-4ee7-8142-d6ca281a24e1', 'Zhang Wei', 'zhang.wei@example.com', '+971583214567', 'DUB901234', 'International City, China Cluster, Dubai', 'Corporate', 'Active'),
  ('5d3b1b99-3e41-4092-8c56-7a855ba9d030', 'Ahmed Al Mansouri', 'ahmed.almansouri@email.com', '+971 50 123 4567', '12345678', 'Dubai Marina, Dubai, UAE', 'Individual', 'Active'),
  ('5dc291aa-49ff-4dec-ad47-87c0b61e083f', 'Sarah Johnson', 'sarah.johnson@email.com', '+971 55 234 5678', '87654321', 'Jumeirah Beach Residence, Dubai, UAE', 'Individual', 'Active'),
  ('08ca423b-08d6-4852-a1be-a6f103580162', 'Mohammed Hassan', 'mohammed.hassan@email.com', '+971 50 345 6789', '11223344', 'Al Barsha, Dubai, UAE', 'Individual', 'Active'),
  ('c14fc4ff-3300-4541-9260-1fa5df307b2b', 'Emirates Business Solutions', 'contact@emiratesbiz.com', '+971 4 567 8900', NULL, 'Business Bay, Dubai, UAE', 'Corporate', 'Active'),
  ('9723c325-1a0b-4b37-9f9e-1787a15c7539', 'Fatima Al Zahra', 'fatima.alzahra@email.com', '+971 56 456 7890', '55667788', 'Downtown Dubai, Dubai, UAE', 'Individual', 'Active'),
  ('073e167c-9203-41df-aac0-3d67a51ba00c', 'Lexus Auto LLC', 'roosewalt@geniushands.ae', NULL, NULL, NULL, 'Individual', 'Active'),
  ('a514a977-4986-4aea-83db-c615a34ff234', 'Amazon Corp', 'amazon@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('54d1926f-a2b4-4d2e-9cce-e242c4971d38', 'DDD trading LLC', 'ddd@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('3503abf9-ae1b-4da6-a2b9-16cd0cf8760e', 'Google enterprises', 'google@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('1170f075-c339-4c06-a278-4a9385b18732', 'ABCD LLC', 'abvgalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('bfabcd84-cbd7-4c7e-849e-1a2e9f1f3e22', 'Google enterprises', 'ggggalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('e1c5ab7b-56c9-471b-8565-3a3d7bff6d2e', 'Amazon Corp', 'vbbbsewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active')
ON CONFLICT DO NOTHING;


-- Import data for vehicle
INSERT INTO vehicle (id, license_plate, make, model, variant_trim, year, vin, engine_number, transmission_type, fuel_type, color, chassis_number, body_type, odometer_reading, odometer_source, seating_capacity, number_of_doors, vehicle_class, gps_installed, status, location, assigned_branch, current_renter, purchase_date, purchase_price, current_market_value, lease_owned, leasing_company, insurance_provider, insurance_policy_number, insurance_expiry_date, salik_tag_number, registration_expiry_date, mortgage_loan_status, sold_date, sold_value, estimated_present_value, last_service_date, next_service_due_km, next_service_due_date, tyre_change_date, battery_replacement_date, service_provider, service_notes, accident_history, damage_notes, registration_copy, insurance_copy, emission_test, image_set_id, vehicle_photos, real_time_location, fuel_level, engine_status, battery_level, daily_rate, monthly_rate, health_rating, live_latitude, live_longitude, registration_date, country_of_origin, owner_name, tc_number, place_of_issue) VALUES
  ('52278633-a8df-4190-8f64-4e76c51fd02f', 'P/61550', 'NISSAN', 'PATHFINDER', NULL, 2020, '5N1DR2AM9LC643661', NULL, 'Automatic', 'Petrol', 'WHITE', '5N1DR2AM9LC643661', 'Sedan', 150000, 'Manual', 7, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-07-27', 65000.0, NULL, 'Owned', NULL, NULL, '2530004975', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-09-30', '2025-06-13', '2025-05-14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png'], NULL, NULL, NULL, NULL, 100.0, 2500.0, 'Good', NULL, NULL, '2026-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('63f309e9-66b0-474c-9eeb-78da645470f3', 'F/20428', 'NISSAN', 'ALTIMA SE', 'SE', 2019, '1N4BL4DV0KC109577', NULL, 'Automatic', 'Petrol', 'BLUE', '1N4BL4DV0KC109577', 'Sedan', 450000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-12-12', 45000.0, 40000.0, 'Owned', NULL, NULL, '2510034606', '2026-05-08', NULL, '2026-04-08', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-07-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png'], NULL, NULL, NULL, NULL, 50.0, 2000.0, 'Good', NULL, NULL, '2009-04-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', 'M/61477', 'NISSAN', 'VERSA', NULL, 2020, '3N1CN8EVXLL825586', NULL, 'Automatic', 'Petrol', 'SILVER', '3N1CN8EVXLL825586', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2023-11-08', 40000.0, 35000.0, 'Owned', NULL, NULL, '2566S30788', '2026-03-22', NULL, '2026-02-22', NULL, NULL, NULL, NULL, '2025-07-31', 20000, '2025-09-30', '2024-10-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2024-02-25', 'MEXICO', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('72e5d407-ae6e-49cf-a0b5-71f248698b09', 'E/36249', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4BL4CV2LC244742', NULL, 'Automatic', 'Petrol', 'ORANGE', '1N4BL4CV2LC244742', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2025-02-12', 40000.0, 35000.0, 'Owned', NULL, NULL, 'DXB-MVA-2025-03', '2026-03-21', NULL, '2026-02-21', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-30', '2025-03-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png'], NULL, NULL, NULL, NULL, NULL, NULL, 'Good', NULL, NULL, '2025-02-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('00a0392d-1e57-416b-ba6a-d87f20f70a1b', 'U/59738', 'LEXUS', 'RX 450 H', NULL, 2012, 'JTJBC11A402039088', NULL, 'Automatic', 'Petrol', 'BLACK', 'JTJBC11A402039088', 'Sedan', 500000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-09-20', 50000.0, 45000.0, 'Owned', NULL, NULL, '20/4021/25A/800', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-15', '2025-02-28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png'], NULL, NULL, NULL, NULL, 120.0, 3000.0, 'Good', NULL, NULL, '2025-06-23', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('18543785-499a-4df3-8c9d-5f002683667e', 'P/76403', 'NISSAN', 'ALTIMA SE', 'SE', 2014, '1N4BL3AP9EC184945', NULL, 'Automatic', 'Petrol', 'GRAY', '1N4BL3AP9EC184945', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-11-06', 40000.0, 35000.0, 'Owned', NULL, NULL, '2523195442', '2026-07-22', NULL, '2026-06-22', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2024-11-15', '2025-01-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('ab06a8f7-7032-418c-9f22-99948f263662', 'Q/17651', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4AL4FV0LN310443', NULL, 'Automatic', 'Petrol', 'WHITE', '1N4AL4FV0LN310443', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-10-18', 45000.0, 35000.0, 'Owned', NULL, NULL, '2530004895', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-28', '2025-04-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2024-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('7bab82c1-7ee1-4c02-81c5-499ca0ba44bb', 'BB/13678', 'TOYOTA', 'COROLLA 1.3', NULL, 2018, '5YFBURHEXJP848055', NULL, 'Automatic', 'Petrol', 'BLACK', '5YFBURHEXJP848055', 'Sedan', 150000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2025-01-08', 35000.0, 30000.0, 'Owned', NULL, NULL, '2410084265', '2025-10-23', NULL, '2025-09-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-24', '2024-12-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2025-09-24', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('1ca7d603-9cf2-4a94-aad4-582e7a2f2baa', 'P/56942', 'CHEVROLET', 'MALIBU', NULL, 2019, '1G1ZB5ST9KF224575', NULL, 'Automatic', 'Petrol', 'BLACK', '1G1ZB5ST9KF224575', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-09-05', 35000.0, 30000.0, 'Owned', NULL, NULL, '2530004974', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-06-28', '2025-06-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('b7bf8f06-686f-4b72-a489-a0b8145abedb', 'P/63062', 'NISSAN', 'UNKNOWN', NULL, 2020, 'JN8AT2MV5LW110335', NULL, 'Automatic', 'Petrol', 'WHITE', 'JN8AT2MV5LW110335', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Under Maintenance', 'Dubai', 'Al nahda', NULL, '2025-01-15', 25000.0, 20000.0, 'Owned', NULL, NULL, '2530004973', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-07-24', '2024-12-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY[]::TEXT[], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2026-06-25', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('4296f5cf-7d5b-4638-8b52-c687b75785e5', 'U/61913', 'NISSAN', 'UNKNOWN', NULL, 2018, '5N1AT2MT9JC790860', NULL, 'Automatic', 'Petrol', 'BLACK', '5N1AT2MT9JC790860', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Sold', 'Dubai', 'Al nahda', NULL, '2024-02-24', 35000.0, 25000.0, 'Owned', NULL, NULL, '2530005028', '2026-06-27', NULL, '2026-07-27', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-25', '2024-05-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY[]::TEXT[], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, NULL, 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('a0a35f54-a6c2-4ed7-9392-1386254b0b2b', 'Q/38571', 'HONDA', 'CIVIC', NULL, 2020, '19XFC2F81LE007089', NULL, 'Automatic', 'Petrol', 'SILVER', '19XFC2F81LE007089', 'Sedan', 240000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-09-19', 40000.0, 35000.0, 'Owned', NULL, NULL, '2530005577', '2026-08-11', NULL, '2026-07-11', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-17', '2025-07-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2014-07-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI')
ON CONFLICT DO NOTHING;


-- Import data for employee
INSERT INTO employee (id, employee_id, name, email, phone, date_of_birth, nationality, gender, address, department, designation, join_date, employment_type, reporting_manager_id, status, base_salary, passport_copy_url, visa_page_url, emirates_id_url, other_documents) VALUES
  ('d917127b-42f8-496a-86aa-8a5dcc825704', 'EMP1001', 'Omar Khalid Hassan', 'omar.hassan@example.com', '+971502345678', '1991-03-15', NULL, 'Male', 'Al Nahda, Dubai', 'Marketing', 'Sales executive', '2025-05-15', 'Full-time', NULL, 'Active', '4000', NULL, NULL, NULL, ARRAY[]::TEXT[]),
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', 'EMP1002', 'John Michael Smith', 'john.smith@example.com', '+971551239876', '1990-11-02', NULL, 'Male', NULL, 'Marketing', 'Sales executive', '2025-04-20', 'Full-time', NULL, 'Active', '4000', NULL, NULL, NULL, ARRAY[]::TEXT[]),
  ('c49db6fd-b2e7-4cab-b955-4839fa0430ba', 'EMP1005', 'Ahmed Raza Khan', 'ahmed.khan@example.com', '+971543219876', '1994-12-25', NULL, 'Male', 'Jumeirah Lake Towers, Dubai', 'Operations', 'Driver', '2025-08-11', 'Full-time', NULL, 'Active', '2500', NULL, NULL, NULL, ARRAY[]::TEXT[])
ON CONFLICT DO NOTHING;


-- Import data for shift
INSERT INTO shift (id, name, start_time, end_time, duration_hours) VALUES
  ('9be051e8-6b92-4f93-8d58-518133688c11', 'Morning shift', '08:00', '17:30', '9.5'),
  ('18b2a4da-53dd-4aa9-ae2b-5401d4c13623', 'Night shift', '17:00', '02:00', '9')
ON CONFLICT DO NOTHING;


-- Import data for lead
INSERT INTO lead (id, name, email, phone, source, status, assigned_to_id, notes) VALUES
  ('0a0c4f86-062a-4d94-b206-8d009e8f7932', 'Zhang Wei', 'zhang.wei@example.com', '583214567', 'website', 'New', NULL, NULL),
  ('03089f68-5efb-4776-82c3-f021fa2fb2c0', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL),
  ('6633ac9e-ef2e-4342-9b01-a4ac0bb0d142', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL),
  ('f418580b-5c4e-45bf-bc1c-78d69669a84b', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '583214567', 'Social media', 'Won', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for booking
INSERT INTO booking (customer_id, vehicle_id, booking_date, start_date, end_date, pickup_location, dropoff_location, total_amount, vat_amount, final_amount, status, payment_status, special_requests) VALUES
  ('24c78e61-0fe2-4324-bdea-e14fc69cc894', '1ca7d603-9cf2-4a94-aad4-582e7a2f2baa', '2025-08-27', '2025-08-27', '2025-08-29', 'Al nahda', 'Al nahda', '100', NULL, NULL, 'Completed', 'Partial', NULL),
  ('c07c4768-0de3-47b8-b1d4-81f8d1b45865', '00a0392d-1e57-416b-ba6a-d87f20f70a1b', '2025-08-27', '2025-08-29', '2025-08-30', 'Al qusais', 'Al nahda', '120', NULL, NULL, 'Confirmed', 'Partial', NULL),
  ('073e167c-9203-41df-aac0-3d67a51ba00c', '52278633-a8df-4190-8f64-4e76c51fd02f', '2025-09-01', '2025-09-03', '2025-09-06', 'business bay', 'business bay', '300', NULL, NULL, 'Pending', 'Pending', 'fuel full'),
  ('0442ffa1-55f8-4a9f-993d-aa69e42fcb56', '52278633-a8df-4190-8f64-4e76c51fd02f', '2025-09-01', '2025-09-02', '2025-09-05', 'Airport terminal', 'Airport terminal', '300', NULL, NULL, 'Pending', 'Pending', NULL),
  ('0442ffa1-55f8-4a9f-993d-aa69e42fcb56', '00a0392d-1e57-416b-ba6a-d87f20f70a1b', '2025-09-01', '2025-09-02', '2025-09-12', 'business bay', 'business bay', '1200', NULL, NULL, 'Pending', 'Pending', NULL),
  ('a514a977-4986-4aea-83db-c615a34ff234', '00a0392d-1e57-416b-ba6a-d87f20f70a1b', '2025-09-01', '2025-09-03', '2025-09-12', 'business bay', 'business bay', '1080', NULL, NULL, 'Pending', 'Pending', NULL),
  ('54d1926f-a2b4-4d2e-9cce-e242c4971d38', '18543785-499a-4df3-8c9d-5f002683667e', '2025-09-01', '2025-09-02', '2025-10-02', 'business bay', 'business bay', '1800', NULL, NULL, 'Pending', 'Pending', NULL),
  ('3503abf9-ae1b-4da6-a2b9-16cd0cf8760e', '18543785-499a-4df3-8c9d-5f002683667e', '2025-09-01', '2025-09-04', '2025-10-10', 'Airport terminal', 'Airport terminal', '2160', NULL, NULL, 'Pending', 'Pending', NULL),
  ('1170f075-c339-4c06-a278-4a9385b18732', '1ca7d603-9cf2-4a94-aad4-582e7a2f2baa', '2025-09-01', '2025-09-02', '2025-09-30', 'business bay', 'business bay', '1400', NULL, NULL, 'Pending', 'Pending', NULL),
  ('bfabcd84-cbd7-4c7e-849e-1a2e9f1f3e22', '72e5d407-ae6e-49cf-a0b5-71f248698b09', '2025-09-01', '2025-09-02', '2025-09-30', 'Airport terminal', 'Airport terminal', '2800', NULL, NULL, 'Pending', 'Pending', NULL),
  ('e1c5ab7b-56c9-471b-8565-3a3d7bff6d2e', '63f309e9-66b0-474c-9eeb-78da645470f3', '2025-09-01', '2025-09-02', '2025-09-23', 'business bay', 'business bay', '1050', NULL, NULL, 'Pending', 'Pending', NULL)
ON CONFLICT DO NOTHING;


-- Import data for vehicle_document
INSERT INTO vehicle_document (vehicle_id, document_type, document_name, file_url, file_type, upload_date, expiry_date, extracted_data, notes, is_verified) VALUES
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', 'Mulkia', 'M 61477.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d5794d60_M61477.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL),
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', 'Insurance', 'ContractorAccessPermit_12-06-2025_5254637.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cf2b60e60_ContractorAccessPermit_12-06-2025_5254637.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL),
  ('63f309e9-66b0-474c-9eeb-78da645470f3', 'Mulkia', 'mulikia', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1b0ddd80b_F20428.pdf', 'pdf', '2025-08-29', NULL, NULL, NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for customer_document
INSERT INTO customer_document (customer_id, document_type, document_part, file_name, file_url, expiry_date, is_verified) VALUES
  ('9ae0f3e8-f242-4964-bb30-8635c36d44ad', 'Driving License', 'Front', 'DL Ahmed khalid al mansoori', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/64070d005_NISSANVERSASILVER2020.png', NULL, NULL),
  ('0a08c2f5-0b08-41b9-8378-22aa145899dc', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/65d584b16_NISSANPATHFINDERWHITE2020.png', '2026-05-27', NULL),
  ('0a08c2f5-0b08-41b9-8378-22aa145899dc', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/26bb110dd_ChevroletMALIBUBLACK2019.png', '2026-08-18', NULL),
  ('32083a3f-27da-47e5-8de1-c0bdbe0ec5cf', 'Driving License', 'Front', 'test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d1b8e46aa_NISSANPATHFINDERWHITE2020.png', '2026-08-01', NULL),
  ('32083a3f-27da-47e5-8de1-c0bdbe0ec5cf', 'Driving License', 'main', 'LEXUS RX 450 H  BLACK 2012', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d6441074_LEXUSRX450HBLACK2012.png', '2026-02-05', NULL)
ON CONFLICT DO NOTHING;


-- Import data for attendance
INSERT INTO attendance (employee_id, date, check_in_time, check_out_time, shift_id, status, working_hours, overtime_hours, notes) VALUES
  ('d917127b-42f8-496a-86aa-8a5dcc825704', '2025-08-27', '2025-08-27T08:00:00', NULL, '9be051e8-6b92-4f93-8d58-518133688c11', 'Present', NULL, NULL, NULL),
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', '2025-08-27', '2025-08-27T08:00:00', NULL, '9be051e8-6b92-4f93-8d58-518133688c11', 'Present', NULL, NULL, NULL),
  ('d917127b-42f8-496a-86aa-8a5dcc825704', '2025-08-26', '2025-08-26T08:00:00', '2025-08-26T17:30:00', '9be051e8-6b92-4f93-8d58-518133688c11', 'Present', NULL, NULL, NULL),
  ('c49db6fd-b2e7-4cab-b955-4839fa0430ba', '2025-08-27', '2025-08-27T07:00:00', NULL, '9be051e8-6b92-4f93-8d58-518133688c11', 'Present', NULL, NULL, NULL),
  ('c49db6fd-b2e7-4cab-b955-4839fa0430ba', '2025-08-26', '2025-08-26T17:00:00', '2025-08-26T03:00:00', '18b2a4da-53dd-4aa9-ae2b-5401d4c13623', 'Present', NULL, NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for payroll
INSERT INTO payroll (employee_id, month, year, base_salary, overtime_pay, deductions, net_pay, status, processing_date) VALUES
  ('d917127b-42f8-496a-86aa-8a5dcc825704', '8', '2025', '4000', NULL, NULL, '4000', 'Processed', '2025-08-27'),
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', '8', '2025', '4000', NULL, NULL, '4000', 'Processed', '2025-08-27'),
  ('c49db6fd-b2e7-4cab-b955-4839fa0430ba', '8', '2025', '2500', NULL, NULL, '2500', 'Processed', '2025-08-27')
ON CONFLICT DO NOTHING;


-- Import data for leave_request
INSERT INTO leave_request (employee_id, leave_type, start_date, end_date, reason, status, manager_comment, hr_comment) VALUES
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', 'Sick', '2025-08-25', '2025-08-26', 'Fever', 'Approved', NULL, NULL),
  ('c49db6fd-b2e7-4cab-b955-4839fa0430ba', 'Casual', '2025-08-30', '2025-08-30', 'emergency', 'Rejected', NULL, 'emergency'),
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', 'Sick', '2025-08-29', '2025-08-29', 'sick', 'Approved', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for quotation
INSERT INTO quotation (customer_id, lead_id, vehicle_details, daily_rate, start_date, end_date, total_amount, validity_date, terms_and_conditions, status, sales_rep_id) VALUES
  ('08ca423b-08d6-4852-a1be-a6f103580162', NULL, 'Versa', '100', '2025-08-29', '2025-08-30', '200', '2025-08-31', 'Standard rental terms and conditions apply.', 'Draft', NULL),
  ('5dc291aa-49ff-4dec-ad47-87c0b61e083f', NULL, 'Versa', '150', '2025-08-29', '2025-08-30', '300', '2025-08-29', 'Standard rental terms and conditions apply.', 'Rejected', NULL),
  ('9723c325-1a0b-4b37-9f9e-1787a15c7539', NULL, 'toyota', '100', '2025-08-29', '2025-08-29', '100', '2025-08-29', 'Standard rental terms and conditions apply.', 'Sent', NULL),
  ('9723c325-1a0b-4b37-9f9e-1787a15c7539', NULL, 'toyota', '100', '2025-08-29', '2025-08-29', '100', '2025-08-29', 'Standard rental terms and conditions apply.', 'Accepted', NULL)
ON CONFLICT DO NOTHING;


-- Import data for corporate_client
INSERT INTO corporate_client (company_name, account_manager_id, billing_agreement, contacts, notes) VALUES
  ('Future micra', NULL, '1. Billing
The Client agrees to be billed for all rental charges and associated fees incurred by its authorized employees. Invoices will be issued monthly and are due within 20  days of the invoice date.

2. Payment
Payment will be made via  bank / credit card. Late payments may be subject to a late fee of  1.5% per month.', ARRAY['{''name'': ''Zhang Wei'', ''role'': ''Manager '', ''phone'': ''583214567'', ''email'': ''zhang.wei@example.com''}'], NULL),
  ('Future micra', NULL, 'test', ARRAY[]::TEXT[], NULL),
  ('Future micra', NULL, NULL, ARRAY['{''name'': ''sdfsdf'', ''role'': '''', ''phone'': '''', ''email'': ''''}'], NULL),
  ('Future micra', NULL, 'Test', ARRAY['{''name'': ''Test1'', ''role'': ''Manager test'', ''phone'': ''566552258'', ''email'': ''test@example.ioae''}'], NULL),
  ('Emirates Tech Solutions', 'placeholder-user-id-1', 'Net 30 payment terms, monthly invoicing', ARRAY['{''name'': ''Ali Hassan Al Maktoum'', ''role'': ''Fleet Manager'', ''phone'': ''+971 4 123 4567'', ''email'': ''ali.hassan@emiratestech.com''}', '{''name'': ''Sarah Johnson'', ''role'': ''Procurement Head'', ''phone'': ''+971 4 123 4568'', ''email'': ''sarah.johnson@emiratestech.com''}'], 'Premium corporate client, requires luxury vehicle fleet'),
  ('Dubai Business Hub', 'placeholder-user-id-2', 'Quarterly payment, bulk discount applicable', ARRAY['{''name'': ''Mohammed Al Rashid'', ''role'': ''CEO'', ''phone'': ''+971 4 234 5678'', ''email'': ''mohammed@dubaibiz.com''}'], 'Long-term client since 2020')
ON CONFLICT DO NOTHING;


-- Import data for interaction_log
INSERT INTO interaction_log (customer_id, lead_id, type, notes, sales_rep_id, date) VALUES
  ('66ed509a-8549-49cf-8095-134928702ff7', NULL, 'Note', 'test2', '6891f57922e817b10a5d63fc', '2025-08-07T12:00:34.136Z'),
  ('66ed509a-8549-49cf-8095-134928702ff7', NULL, 'Note', 'Test', '6891f57922e817b10a5d63fc', '2025-08-07T12:00:08.606Z'),
  ('4cda2a84-cc81-4d17-a8c4-abbf9e63e21c', NULL, 'Note', 'aa', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:43.590Z'),
  ('4cda2a84-cc81-4d17-a8c4-abbf9e63e21c', NULL, 'Note', 'a
a
a
a
a
a
a', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:36.249Z'),
  ('4cda2a84-cc81-4d17-a8c4-abbf9e63e21c', NULL, 'Note', 'aaa', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:59.740Z')
ON CONFLICT DO NOTHING;


-- Import data for invoice
INSERT INTO invoice (invoice_number, client_id, client_name, invoice_date, due_date, amount, tax, status, notes, payment_id, booking_id) VALUES
  ('INV-2025-21536', '24c78e61-0fe2-4324-bdea-e14fc69cc894', 'Unknown Customer', '2025-08-27', '2025-08-28', '100', '5', 'Paid', NULL, NULL, '56f984a1-7665-4d51-89db-380d937e1ecd'),
  ('INV-2025-17091', 'c07c4768-0de3-47b8-b1d4-81f8d1b45865', 'Michael Andrew Smith', '2025-08-31', '2025-09-15', '120', '5', 'Unpaid', 'Invoice for Booking #3D92EB71', NULL, '902ea402-9e92-4134-b9c0-43a773b4e109'),
  ('INV-2025-63474', '073e167c-9203-41df-aac0-3d67a51ba00c', 'Lexus Auto LLC', '2025-09-01', '2025-09-16', '300', '5', 'Unpaid', 'Invoice for Booking #14C1F384', NULL, '5c41eb1e-185b-4258-b60a-4f962463a31f'),
  ('INV-2025-88026', '0442ffa1-55f8-4a9f-993d-aa69e42fcb56', 'Roosewalt Pereira', '2025-09-01', '2025-09-16', '300', '5', 'Unpaid', 'Invoice for Booking #4CE0838C', NULL, 'f311f38f-4aa1-4db7-a9cf-39fbf0165259'),
  ('INV-1756730056527', '0442ffa1-55f8-4a9f-993d-aa69e42fcb56', 'Roosewalt Pereira', '2025-09-01', '2025-10-01', NULL, NULL, 'Sent', 'Invoice for Booking #EB0ECC82', NULL, 'e1114987-037c-4ab2-a9fa-3aa490c02db9'),
  ('INV-1756736447807', '54d1926f-a2b4-4d2e-9cce-e242c4971d38', 'DDD trading LLC', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #9DB71405', NULL, 'e5c363cd-d753-4167-9ba3-cc7b3d63177c'),
  ('INV-1756737440787', 'a514a977-4986-4aea-83db-c615a34ff234', 'Amazon Corp', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #05390BFF', NULL, 'bced9797-959b-42ce-910f-6b62a34bbcd9'),
  ('INV-1756737868373', '1170f075-c339-4c06-a278-4a9385b18732', 'ABCD LLC', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #53356FBC', NULL, '18b44574-3c76-4bf7-a21e-bfe8a572a927'),
  ('INV-1756738388091', '3503abf9-ae1b-4da6-a2b9-16cd0cf8760e', 'Google enterprises', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #E48F3F8B', NULL, 'ff0901d5-63d7-4e10-a5e7-e962bd1fa33e'),
  ('INV-1756739156014', 'bfabcd84-cbd7-4c7e-849e-1a2e9f1f3e22', 'Google enterprises', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #CACBE81B', NULL, '272d6f2d-f090-48f1-ab55-64b0bd716eed'),
  ('INV-1756740683249', 'e1c5ab7b-56c9-471b-8565-3a3d7bff6d2e', 'Amazon Corp', '2025-09-01', '2025-10-01', NULL, NULL, 'Draft', 'Invoice for Booking #BF49053F', NULL, 'e1f2d6b0-8706-4e99-8794-5ffe30b07875')
ON CONFLICT DO NOTHING;


-- Import data for payment
INSERT INTO payment (payment_date, counterpart, amount, method, reference_no, remarks) VALUES
  ('2025-08-26', 'Customer', '2500', 'Cash', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for expense
INSERT INTO expense (expense_date, category, description, amount, paid_to, payment_method, project_client, receipt_url) VALUES
  ('2025-08-27', 'Utilities', 'DEWA', '1000', 'DEWA', 'Company Account', NULL, NULL),
  ('2025-08-27', 'Maintenance', 'Breakdown', '300', 'AutoGarage', 'Bank Transfer', 'P/76403', NULL),
  ('2025-08-27', 'Salaries', 'Driver salary', '2500', 'Driver', 'Company Account', 'P/61550', NULL),
  ('2025-08-27', 'Marketing', 'Google ads', '400', 'Google', 'Company Account', NULL, NULL),
  ('2025-08-27', 'Travel', 'Staff travel allowance', '100', 'Staff', 'Cash', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for asset
INSERT INTO asset (asset_name, purchase_date, purchase_cost, depreciation_method, lifespan_years, depreciation_start_date) VALUES
  ('Nissan Pathfinder', '2024-10-24', '45000', 'Straight-Line', '5', '2025-07-24')
ON CONFLICT DO NOTHING;


-- Import data for inventory_part
INSERT INTO inventory_part (item_name, category, unit_cost, quantity_available, reorder_level, supplier) VALUES
  ('Michelin 225/65 R17', 'Tyres', '450', '15', '5', 'TyreCo Dubai'),
  ('Air Filter', 'Filters', '120', '10', '5', 'AutoParts UAE'),
  ('Oil filter Bosch', 'Filters', '90', '12', '10', 'Tyre & Parts Co'),
  ('Brake Pads (Front) Brembo', 'Brakes', '350', '30', '25', 'SpeedParts Dubai'),
  ('Brake Pads (Rear) ATE', 'Brakes', '300', '35', '25', 'SpeedParts Dubai'),
  ('Tyre 285/60 R18 Goodyear', 'Tyres', '900', '10', '15', 'Desert tyres'),
  ('Semi-Synthetic 10W-40 Castrol', 'Engine Oil', '140', '40', '50', 'OilMaster UAE'),
  ('Front Bumper Nissan OEM', 'Body Parts', '1200', '5', '5', 'AutoBody UAE')
ON CONFLICT DO NOTHING;


-- Import data for maintenance_log
INSERT INTO maintenance_log (vehicle_id, service_date, odometer_reading, service_type, vendor, cost, report_url, notes, next_service_due_date, status) VALUES
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', '2025-08-27', '245015', 'Inspection', NULL, '250', NULL, NULL, '2025-10-31', 'Upcoming'),
  ('72e5d407-ae6e-49cf-a0b5-71f248698b09', '2025-08-27', '125456', 'Repair', NULL, '300', NULL, NULL, '2025-08-27', 'Upcoming')
ON CONFLICT DO NOTHING;


-- Import data for incident_log
INSERT INTO incident_log (vehicle_id, incident_date, type, severity, description, photo_urls, responsible_user_id, status) VALUES
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', '2025-08-27T09:41', 'Mechanical Issue', 'Medium', 'Breakdown', ARRAY[]::TEXT[], NULL, 'Resolved'),
  ('7c762e0e-1b86-41a0-92b1-4d816eda621b', '2025-08-27T09:42', 'Mechanical Issue', 'Medium', 'Breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/8f375d216_WhatsAppImage2025-08-22at21538PM.jpeg'], NULL, 'Resolved'),
  ('7bab82c1-7ee1-4c02-81c5-499ca0ba44bb', '2025-08-27T09:57', 'Mechanical Issue', 'Low', 'Tyre puncture', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a1a9373d9_NISSANALTIMASEORANGE2020.png'], NULL, 'Under Review'),
  ('63f309e9-66b0-474c-9eeb-78da645470f3', '2025-08-29T00:00:00.000Z', 'Accident', 'Low', 'breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/863242177_NISSANPATHFINDERWHITE2020.png'], NULL, 'Resolved'),
  ('1ca7d603-9cf2-4a94-aad4-582e7a2f2baa', '2025-08-29T16:00:00.000Z', 'Mechanical Issue', 'Critical', 'breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cb4d94844_NISSANVERSASILVER2020.png'], NULL, 'Resolved')
ON CONFLICT DO NOTHING;


-- Import data for vehicle_contract
INSERT INTO vehicle_contract (vehicle_id, customer_name, start_date, end_date, contract_value, payment_terms, document_url, status, booking_id) VALUES
  ('52278633-a8df-4190-8f64-4e76c51fd02f', 'Ahmed Khalid Al Mansoori', '2025-08-27', '2025-09-17', '2500', '50% advance', NULL, 'Active', NULL),
  ('52278633-a8df-4190-8f64-4e76c51fd02f', 'Ahmed Khalid Al Mansoori', '2025-09-17', '2026-09-17', '2500', '50% advance', NULL, 'Active', NULL),
  ('63f309e9-66b0-474c-9eeb-78da645470f3', 'Test booking', '2025-08-29', '2025-10-29', '3000', NULL, 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/83ad19a94_AlJisrCarRentals-CompleteAPISpecification.pdf', 'Expired', NULL)
ON CONFLICT DO NOTHING;


-- Import data for car_image
INSERT INTO car_image (image_set_id, model_tag, color_tag, image_url, notes) VALUES
  ('Toyota Camry', 'Toyota-Camry', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e3e46be48_ToyotaCamryWhite.png', NULL),
  ('Mitsubish-Attrage', 'Mitsubish-Attrage', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d46adda3d_MitsubishiAttrage.jpg', NULL),
  ('Nissan-Sunny', 'Nissan-Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/124cc26bf_NissanSunny.jpg', NULL),
  ('Hyundai-Elantra', 'Hyundai-Elantra', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c6bf2624b_Hyundai-Elentra.png', NULL),
  ('Hyundai-Sonata', 'Hyundai-Sonata', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4a7ee9d80_Hyundai-Sonata.png', NULL),
  ('Ford Expedition', 'Ford Expedition', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/bce8ade62_FordExpedition.png', NULL),
  ('Ford Explorer', 'Ford Explorer', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e094828e3_FordExplorerblack.png', NULL),
  ('Nissan Sunny', 'Nissan Sunny', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2ffffd361_NissanSunnyRed.png', NULL),
  ('Nissan Sunny', 'Nissan Sunny', 'Blue', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png', NULL),
  ('Nissan Sunny', 'Nissan Sunny', 'Gray', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png', NULL),
  ('Nissan Sunny', 'Nissan Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/7260b9382_NissanSunnyWhite.jpg', NULL),
  ('NISSAN-PATHFINDER', 'NISSAN PATHFINDER', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png', NULL),
  ('NISSAN-VERSA', 'NISSAN-VERSA', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png', NULL),
  ('LEXUS-RX 450 H', 'LEXUS-RX 450 H', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png', NULL),
  ('HONDA-CIVIC', 'HONDA-CIVIC', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png', NULL),
  ('Chevrolet-MALIBU', 'Chevrolet-MALIBU', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png', NULL),
  ('Nissan-Altima SE', 'Nissan-Altima SE', 'ORANGE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png', NULL),
  ('Nissan-Altima SE', 'Nissan-Altima SE', 'GREY', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1eb090ffa_NISSANALTIMASEGREY2014.png', NULL),
  ('Nissan-Altima SE', 'Nissan-Altima SE', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png', NULL),
  ('TOYOTA COROLA', 'TOYOTA COROLA', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png', NULL)
ON CONFLICT DO NOTHING;


-- Import data for staff_document
INSERT INTO staff_document (employee_id, document_type, document_name, file_url, file_type, upload_date, expiry_date, description, is_confidential, is_verified) VALUES
  ('61bf341f-bca5-4cc4-9d68-9edf9c393aeb', 'Employment Contract', 'Contract test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/798974d01_toclaideforsuggestions.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-08-30', NULL, NULL, 'true', NULL)
ON CONFLICT DO NOTHING;


-- Import data for legal_document
INSERT INTO legal_document (category, document_type, document_name, file_url, file_type, upload_date, expiry_date, description, is_critical, renewal_reminder_days, responsible_department, is_verified) VALUES
  ('Legal', 'Trade License', 'trade license', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4c11441eb_AlJisrCarRentals-CompleteAPISpecification.pdf', 'application/pdf', '2025-08-30', NULL, NULL, 'true', '30', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for ai_document_processing
INSERT INTO ai_document_processing (document_name, file_url, file_type, document_type, processing_status, upload_date, processed_date, ai_extracted_data, reviewed_data, confidence_scores, processing_notes, is_reviewed, error_message, processed_by) VALUES
  ('2025-06-00815.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/18a7fe400_2025-06-00815.pdf', 'application/pdf', 'Invoice', 'Completed', '2025-08-30T08:45:56.947Z', '2025-08-30T08:46:28.542Z', '{"vendor_name":"FUTURE MICRA Services LLC","invoice_number":"2025-06-00815","invoice_date":"26 Jun 2025","due_date":"26 Jun 2025","total_amount":3337.5,"tax_amount":275,"currency":"AED","items":[{"description":"Waterproofing of two layers.","quantity":1,"unit_price":5500,"total":5500},{"description":"Inspection charge deduction","quantity":1,"unit_price":-150,"total":-150},{"description":"Advance amount received","quantity":1,"unit_price":-2287.5,"total":-2287.5}]}', '{"vendor_name":"FUTURE MICRA Services LLC","invoice_number":"2025-06-00815","invoice_date":"26 Jun 2025","due_date":"26 Jun 2025","total_amount":3337.5,"tax_amount":275,"currency":"AED","items":[{"description":"Waterproofing of two layers.","quantity":1,"unit_price":5500,"total":5500},{"description":"Inspection charge deduction","quantity":1,"unit_price":-150,"total":-150},{"description":"Advance amount received","quantity":1,"unit_price":-2287.5,"total":-2287.5}]}', '{"vendor_name":0.8750834120867277,"invoice_number":0.8173448487512891,"invoice_date":0.9551784689304866,"due_date":0.7424009182943934,"total_amount":0.7963484740426529,"tax_amount":0.9425398021026463,"currency":0.7462278545932612,"items":0.7377776268445952}', NULL, 'true', NULL, 'lalchempakathinal@gmail.com'),
  ('P 61550.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/96b8b054d_P61550.pdf', 'application/pdf', 'License', 'Completed', '2025-08-30T08:51:52.472Z', '2025-08-30T08:52:13.030Z', '{"license_number":"P/61550","license_type":"Vehicle Registration Card","holder_name":"MOHSIN ALI ZULIFQAR ALI","issue_date":"25-JUN-26","expiry_date":"25-JUN-26","issuing_authority":"UNITED ARAB EMIRATES MINISTRY OF INTERIOR","restrictions":"Changes to vehicle or owner information must be notified to licensing authority"}', '{"license_number":"P/61550","license_type":"Vehicle Registration Card","holder_name":"MOHSIN ALI ZULIFQAR ALI","issue_date":"25-JUN-26","expiry_date":"25-JUN-26","issuing_authority":"UNITED ARAB EMIRATES MINISTRY OF INTERIOR","restrictions":"Changes to vehicle or owner information must be notified to licensing authority"}', '{"license_number":0.9825045132386544,"license_type":0.9992436758753225,"holder_name":0.7952661625865582,"issue_date":0.9753953550164702,"expiry_date":0.8739967729628069,"issuing_authority":0.823447678059876,"restrictions":0.7345941866291039}', NULL, 'true', NULL, 'lalchempakathinal@gmail.com')
ON CONFLICT DO NOTHING;


COMMIT;

-- Import Summary
SELECT 'Import completed successfully!' as status;
SELECT table_name, COUNT(*) as record_count FROM (
  SELECT 'user_access' as table_name, COUNT(*) FROM user_access UNION ALL
  SELECT 'customer' as table_name, COUNT(*) FROM customer UNION ALL
  SELECT 'vehicle' as table_name, COUNT(*) FROM vehicle UNION ALL
  SELECT 'employee' as table_name, COUNT(*) FROM employee UNION ALL
  SELECT 'shift' as table_name, COUNT(*) FROM shift UNION ALL
  SELECT 'lead' as table_name, COUNT(*) FROM lead UNION ALL
  SELECT 'booking' as table_name, COUNT(*) FROM booking UNION ALL
  SELECT 'vehicle_document' as table_name, COUNT(*) FROM vehicle_document UNION ALL
  SELECT 'customer_document' as table_name, COUNT(*) FROM customer_document UNION ALL
  SELECT 'attendance' as table_name, COUNT(*) FROM attendance UNION ALL
  SELECT 'payroll' as table_name, COUNT(*) FROM payroll UNION ALL
  SELECT 'leave_request' as table_name, COUNT(*) FROM leave_request UNION ALL
  SELECT 'quotation' as table_name, COUNT(*) FROM quotation UNION ALL
  SELECT 'corporate_client' as table_name, COUNT(*) FROM corporate_client UNION ALL
  SELECT 'interaction_log' as table_name, COUNT(*) FROM interaction_log UNION ALL
  SELECT 'invoice' as table_name, COUNT(*) FROM invoice UNION ALL
  SELECT 'payment' as table_name, COUNT(*) FROM payment UNION ALL
  SELECT 'expense' as table_name, COUNT(*) FROM expense UNION ALL
  SELECT 'asset' as table_name, COUNT(*) FROM asset UNION ALL
  SELECT 'inventory_part' as table_name, COUNT(*) FROM inventory_part UNION ALL
  SELECT 'maintenance_log' as table_name, COUNT(*) FROM maintenance_log UNION ALL
  SELECT 'incident_log' as table_name, COUNT(*) FROM incident_log UNION ALL
  SELECT 'vehicle_contract' as table_name, COUNT(*) FROM vehicle_contract UNION ALL
  SELECT 'car_image' as table_name, COUNT(*) FROM car_image UNION ALL
  SELECT 'staff_document' as table_name, COUNT(*) FROM staff_document UNION ALL
  SELECT 'legal_document' as table_name, COUNT(*) FROM legal_document UNION ALL
  SELECT 'ai_document_processing' as table_name, COUNT(*) FROM ai_document_processing
) counts GROUP BY table_name ORDER BY table_name;