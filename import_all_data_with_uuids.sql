-- Generated Import Script for Supabase with UUID Mapping
-- All foreign key relationships use proper UUIDs

BEGIN;

-- Import data for user_access
INSERT INTO user_access (id, user_email, accessible_modules) VALUES
  ('f103aaa1-e607-4b95-acbb-47a8c1b3b71f', 'roosewalt@gmail.com', ARRAY['Dashboard', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'Bookings', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches', 'MobileBooking', 'VehicleImageLibrary', 'FleetAnalyst', 'Inquiries', 'Quotes', 'Products', 'SalesOrders', 'PriceLists', 'Drivers', 'Maintenance', 'Vehicles', 'FuelLog', 'Employees', 'LeaveManagement', 'Payroll', 'Attendance', 'Documents', 'Accounts', 'Templates']),
  ('36870ab2-6b9b-4dd8-bb8c-93fccc460ac1', 'blogger.pereira@gmail.com', ARRAY['Customers', 'Marketing', 'Leads', 'CorporateClients', 'Quotations', 'SalesPerformance', 'FleetStatus', 'SalikFines', 'HREmployees', 'HRLeaveRequests', 'HRAttendance', 'HRPayroll', 'FinanceOverview', 'Expenses', 'Depreciation', 'Invoices', 'Reports', 'Inventory', 'Payments', 'TaxVAT', 'VehicleImageLibrary', 'StaffDocuments', 'VehicleDocuments', 'LegalDocuments', 'CustomerDocuments', 'AIDocumentProcessing', 'UserAccessRules', 'BusinessInfo', 'Branches', 'FleetManagement', 'DamageLogs', 'GPSTracking', 'FleetHealth', 'Contracts', 'APISettings', 'Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'Products', 'SalesOrders', 'PriceLists', 'Maintenance']),
  ('3d2889ba-9ddc-403c-b67e-13710bff4b5d', 'lalchempakathinal@gmail.com', ARRAY['Customers', 'Marketing', 'Leads', 'CorporateClients', 'Quotations', 'SalesPerformance', 'FleetStatus', 'FleetAnalyst', 'SalikFines', 'FleetManagement', 'DamageLogs', 'GPSTracking', 'FleetHealth', 'Contracts', 'HREmployees', 'HRLeaveRequests', 'HRAttendance', 'HRPayroll', 'Payments', 'TaxVAT', 'Inventory', 'Reports', 'Invoices', 'FinanceOverview', 'Expenses', 'Depreciation', 'VehicleImageLibrary', 'StaffDocuments', 'BusinessInfo', 'Branches', 'UserAccessRules', 'APISettings', 'AIDocumentProcessing', 'CustomerDocuments', 'VehicleDocuments', 'LegalDocuments', 'Dashboard', 'Bookings', 'MobileBooking', 'SalesOrders', 'PriceLists', 'Quotes', 'Products', 'Inquiries', 'Vehicles', 'FuelLog', 'Drivers', 'Maintenance', 'Attendance', 'Employees', 'Accounts', 'Documents', 'Templates', 'Payroll', 'LeaveManagement', 'User Access Rules', 'API Settings', 'Branches', 'Quotations']),
  ('867c0b28-a72e-4683-a472-a5ff9d72ce06', 'mohsin57ali@gmail.com', ARRAY['Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'SalesOrders', 'Customers', 'Products', 'PriceLists', 'Vehicles', 'Drivers', 'Maintenance', 'FuelLog', 'VehicleDocuments', 'Employees', 'Payroll', 'Attendance', 'LeaveManagement', 'Invoices', 'Payments', 'Expenses', 'Accounts', 'Reports', 'Documents', 'Templates', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('45ba66c5-eafb-4923-a3b0-4b709c7f1783', 'mohsin57ali@gmail.com', ARRAY['Dashboard', 'Bookings', 'MobileBooking', 'Inquiries', 'Quotes', 'SalesOrders', 'Customers', 'Products', 'PriceLists', 'Vehicles', 'Drivers', 'Maintenance', 'FuelLog', 'VehicleDocuments', 'Employees', 'Payroll', 'Attendance', 'LeaveManagement', 'Invoices', 'Payments', 'Expenses', 'Accounts', 'Reports', 'Documents', 'Templates', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('18f4bf71-8419-4d76-8fc8-5ffcc3db35ed', 'roosewalt@gmail.com', ARRAY['MobileBooking', 'Dashboard', 'Bookings', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'FleetAnalyst', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleImageLibrary', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches']),
  ('0f637d69-2eee-4fbd-942a-51a7af6ba32e', 'hithesh0215@gmail.com', ARRAY['MobileBooking', 'Dashboard', 'Bookings', 'Customers', 'Leads', 'Quotations', 'Marketing', 'CorporateClients', 'SalesPerformance', 'FleetStatus', 'FleetManagement', 'FleetHealth', 'FleetAnalyst', 'DamageLogs', 'Contracts', 'SalikFines', 'GPSTracking', 'HREmployees', 'HRAttendance', 'HRPayroll', 'HRLeaveRequests', 'FinanceOverview', 'Invoices', 'Payments', 'Expenses', 'Reports', 'TaxVAT', 'Depreciation', 'Inventory', 'VehicleImageLibrary', 'VehicleDocuments', 'CustomerDocuments', 'StaffDocuments', 'LegalDocuments', 'AIDocumentProcessing', 'BusinessInfo', 'UserAccessRules', 'APISettings', 'Branches'])
ON CONFLICT DO NOTHING;


-- Import data for customer
INSERT INTO customer (id, name, email, phone, license_number, address, customer_type, status) VALUES
  ('240e7ff0-20f5-4bc4-87a1-c1d990fa78cf', 'John Smith', 'john.smith@email.com', '+971-50-123-4567', 'DL12345678', '123 Business Bay, Dubai, UAE', 'Individual', 'Active'),
  ('15823c2b-aabb-46b3-920a-1e6924c1d101', 'Roosewalt Pereira', 'roosewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('ea1df3d0-0378-4f6f-ba2c-82001d5ad3d3', 'Roosewalt Sabestian Pereira', 'blogger.pereira@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active'),
  ('53c97025-6d9c-4737-96e8-d256aea4c882', 'Roosewalt Sabestian Pereira', 'roosewalt@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active'),
  ('a0e2ea3b-ca0e-4d32-8561-40e4f346f16c', 'Test booking', 'help@joboy.', '582628980', NULL, NULL, 'Individual', 'Active'),
  ('498f3458-f88a-49f0-866f-67d3944ad4da', 'Test', 'test', 'Test', NULL, NULL, 'Individual', 'Active'),
  ('efd8a6a6-f3d7-4a1a-96d4-6db44aa6a34e', 'Majid ABdul', 'majid1212@gmail.com', '+971123456789', NULL, '903 Al Saud Bldg 2', 'Individual', 'Active'),
  ('c7fc5859-da7c-4ea8-911a-d4f76ed9731a', 'Lal Sebastian', 'lalchempakathinal@gmail.com', '+971000000000', NULL, 'Street No. 25', 'Individual', 'Active'),
  ('c32c062e-9931-4730-bc67-f4e9a88efe05', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('dd957f65-1fc1-4798-98c2-c0ad6f6bdb91', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('9547e21d-4c07-4443-9777-b055c0120738', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '502345678', 'DUB123456', 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active'),
  ('fae2f73f-c448-4a28-b56d-447907266e39', 'Priya Ramesh Nair', 'priya.nair@example.com', '+971523456789', NULL, 'Apt 405, Bur Dubai, Dubai', 'Individual', 'Active'),
  ('94770b90-2c45-4a16-8b88-0ab6c5f7ad5c', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('7d7cc39f-bdbb-46e5-a365-be6a6fadaa05', 'Gabesh Shah', 'gabesh@gmail.com', '+971502402200', NULL, 'Flat 111, Hasani 19', 'Individual', 'Active'),
  ('b0615653-62ca-4ef5-98ad-aab0aa6b5068', 'Ahmed Shah', 'as123@gmail.com', '+971562000200', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('6f19a99a-ecce-45e8-8f3a-a8b31fb293c5', 'Ganesh Shah', 'Gshah12@gmail.com', '+971562440222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('5d6073d4-71da-4be3-9873-fcb83f4e52d9', 'Roman Bhat', 'roman111@gmail.com', '+971562440440', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('4589f271-24af-4e1f-90a7-e54b432dd421', 'ABC Xghhhh', 'abc@gmail.com', '+971562220222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('6fc27975-11ff-4a13-a5a5-8c694a480c92', 'aaaaaaa', 'aaaaa@gmail.com', '+971555555555', NULL, 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('4053a3c4-892e-4b35-ae6b-520e9249ba27', 'kkkk hhhhh', 'gggg@gmail.com', '+971562440022', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active'),
  ('d5b29ff2-c24a-4cda-bfe1-a27b2806c080', 'Michael Andrew Smith', 'michael.smith@example.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('ebe8df6e-eec0-4b56-bc0c-b0517efcbc4f', 'Fatima Hassan El Sayed', 'fatima.elsayed@example.com', '+971567654321', 'DUB345678', 'Apt 902, Al Nahda, Dubai', 'Individual', 'Active'),
  ('c0180aa2-702f-4730-8ad5-7d9c04d79d82', 'Zhang Wei', 'zhang.wei@example.com', '+971583214567', 'DUB901234', 'International City, China Cluster, Dubai', 'Corporate', 'Active'),
  ('a944ef5e-24f2-45f4-86b5-d2eb6ffceed6', 'Ahmed Al Mansouri', 'ahmed.almansouri@email.com', '+971 50 123 4567', '12345678', 'Dubai Marina, Dubai, UAE', 'Individual', 'Active'),
  ('5a27f8ec-9494-4239-9552-c32a09378e64', 'Sarah Johnson', 'sarah.johnson@email.com', '+971 55 234 5678', '87654321', 'Jumeirah Beach Residence, Dubai, UAE', 'Individual', 'Active'),
  ('952736e9-f5a5-454e-838f-1f07c223ddb5', 'Mohammed Hassan', 'mohammed.hassan@email.com', '+971 50 345 6789', '11223344', 'Al Barsha, Dubai, UAE', 'Individual', 'Active'),
  ('c0b5b04d-584b-4f1f-9132-bc420435a26c', 'Emirates Business Solutions', 'contact@emiratesbiz.com', '+971 4 567 8900', NULL, 'Business Bay, Dubai, UAE', 'Corporate', 'Active'),
  ('f0b3e8da-6cb7-45bf-992b-2a8f6a209ad1', 'Fatima Al Zahra', 'fatima.alzahra@email.com', '+971 56 456 7890', '55667788', 'Downtown Dubai, Dubai, UAE', 'Individual', 'Active'),
  ('6893061b-bb4e-483b-97f2-ca55efb96395', 'Lexus Auto LLC', 'roosewalt@geniushands.ae', NULL, NULL, NULL, 'Individual', 'Active'),
  ('f4596eac-6c4e-4b1c-82f7-dea481ada69b', 'Amazon Corp', 'amazon@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('084efde7-235c-472a-aa96-10855c689360', 'DDD trading LLC', 'ddd@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('6a81ed9f-d527-4749-b291-a0a0e49d452d', 'Google enterprises', 'google@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('d6bbc0ec-a01c-4bc2-88fa-868c26e4ecde', 'ABCD LLC', 'abvgalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('6f80cdb5-ae97-48ff-8f7b-36d82c485a59', 'Google enterprises', 'ggggalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active'),
  ('081b2076-4018-48a7-a104-da3caba4015b', 'Amazon Corp', 'vbbbsewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active')
ON CONFLICT DO NOTHING;


-- Import data for vehicle
INSERT INTO vehicle (id, license_plate, make, model, variant_trim, year, vin, engine_number, transmission_type, fuel_type, color, chassis_number, body_type, odometer_reading, odometer_source, seating_capacity, number_of_doors, vehicle_class, gps_installed, status, location, assigned_branch, current_renter, purchase_date, purchase_price, current_market_value, lease_owned, leasing_company, insurance_provider, insurance_policy_number, insurance_expiry_date, salik_tag_number, registration_expiry_date, mortgage_loan_status, sold_date, sold_value, estimated_present_value, last_service_date, next_service_due_km, next_service_due_date, tyre_change_date, battery_replacement_date, service_provider, service_notes, accident_history, damage_notes, registration_copy, insurance_copy, emission_test, image_set_id, vehicle_photos, real_time_location, fuel_level, engine_status, battery_level, daily_rate, monthly_rate, health_rating, live_latitude, live_longitude, registration_date, country_of_origin, owner_name, tc_number, place_of_issue) VALUES
  ('a4b11003-89a8-4090-8d0f-92025fa29e66', 'P/61550', 'NISSAN', 'PATHFINDER', NULL, 2020, '5N1DR2AM9LC643661', NULL, 'Automatic', 'Petrol', 'WHITE', '5N1DR2AM9LC643661', 'Sedan', 150000, 'Manual', 7, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-07-27', 65000.0, NULL, 'Owned', NULL, NULL, '2530004975', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-09-30', '2025-06-13', '2025-05-14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png'], NULL, NULL, NULL, NULL, 100.0, 2500.0, 'Good', NULL, NULL, '2026-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('009f2121-4992-4677-835e-a49c17fe28a6', 'F/20428', 'NISSAN', 'ALTIMA SE', 'SE', 2019, '1N4BL4DV0KC109577', NULL, 'Automatic', 'Petrol', 'BLUE', '1N4BL4DV0KC109577', 'Sedan', 450000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-12-12', 45000.0, 40000.0, 'Owned', NULL, NULL, '2510034606', '2026-05-08', NULL, '2026-04-08', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-07-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png'], NULL, NULL, NULL, NULL, 50.0, 2000.0, 'Good', NULL, NULL, '2009-04-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('8cd8e2e3-1fb7-4634-8585-931b3da81f48', 'M/61477', 'NISSAN', 'VERSA', NULL, 2020, '3N1CN8EVXLL825586', NULL, 'Automatic', 'Petrol', 'SILVER', '3N1CN8EVXLL825586', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2023-11-08', 40000.0, 35000.0, 'Owned', NULL, NULL, '2566S30788', '2026-03-22', NULL, '2026-02-22', NULL, NULL, NULL, NULL, '2025-07-31', 20000, '2025-09-30', '2024-10-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2024-02-25', 'MEXICO', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('267e5554-7125-4157-a4bd-8d6e8dd9e3db', 'E/36249', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4BL4CV2LC244742', NULL, 'Automatic', 'Petrol', 'ORANGE', '1N4BL4CV2LC244742', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2025-02-12', 40000.0, 35000.0, 'Owned', NULL, NULL, 'DXB-MVA-2025-03', '2026-03-21', NULL, '2026-02-21', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-30', '2025-03-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png'], NULL, NULL, NULL, NULL, NULL, NULL, 'Good', NULL, NULL, '2025-02-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('42fb09a4-526f-4f22-ad6e-a0c5d0121edc', 'U/59738', 'LEXUS', 'RX 450 H', NULL, 2012, 'JTJBC11A402039088', NULL, 'Automatic', 'Petrol', 'BLACK', 'JTJBC11A402039088', 'Sedan', 500000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-09-20', 50000.0, 45000.0, 'Owned', NULL, NULL, '20/4021/25A/800', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-15', '2025-02-28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png'], NULL, NULL, NULL, NULL, 120.0, 3000.0, 'Good', NULL, NULL, '2025-06-23', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('78e0bedf-0fa0-494b-8ba9-bb3e5f3f6338', 'P/76403', 'NISSAN', 'ALTIMA SE', 'SE', 2014, '1N4BL3AP9EC184945', NULL, 'Automatic', 'Petrol', 'GRAY', '1N4BL3AP9EC184945', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-11-06', 40000.0, 35000.0, 'Owned', NULL, NULL, '2523195442', '2026-07-22', NULL, '2026-06-22', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2024-11-15', '2025-01-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('bfeaee8d-c461-4753-99cb-3f01f89ad008', 'Q/17651', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4AL4FV0LN310443', NULL, 'Automatic', 'Petrol', 'WHITE', '1N4AL4FV0LN310443', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-10-18', 45000.0, 35000.0, 'Owned', NULL, NULL, '2530004895', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-28', '2025-04-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2024-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('6048df41-1c43-4e7a-951a-aa6a7cc54b81', 'BB/13678', 'TOYOTA', 'COROLLA 1.3', NULL, 2018, '5YFBURHEXJP848055', NULL, 'Automatic', 'Petrol', 'BLACK', '5YFBURHEXJP848055', 'Sedan', 150000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2025-01-08', 35000.0, 30000.0, 'Owned', NULL, NULL, '2410084265', '2025-10-23', NULL, '2025-09-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-24', '2024-12-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2025-09-24', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('0ec9c4f2-853c-4749-b4a0-346d4d963c97', 'P/56942', 'CHEVROLET', 'MALIBU', NULL, 2019, '1G1ZB5ST9KF224575', NULL, 'Automatic', 'Petrol', 'BLACK', '1G1ZB5ST9KF224575', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-09-05', 35000.0, 30000.0, 'Owned', NULL, NULL, '2530004974', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-06-28', '2025-06-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png'], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('1b24e1ea-7a0d-40ae-a81e-e8a93275c7dc', 'P/63062', 'NISSAN', 'UNKNOWN', NULL, 2020, 'JN8AT2MV5LW110335', NULL, 'Automatic', 'Petrol', 'WHITE', 'JN8AT2MV5LW110335', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Under Maintenance', 'Dubai', 'Al nahda', NULL, '2025-01-15', 25000.0, 20000.0, 'Owned', NULL, NULL, '2530004973', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-07-24', '2024-12-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY[]::TEXT[], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2026-06-25', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('cf9571c3-0134-40a7-ac85-3987c95b6dbe', 'U/61913', 'NISSAN', 'UNKNOWN', NULL, 2018, '5N1AT2MT9JC790860', NULL, 'Automatic', 'Petrol', 'BLACK', '5N1AT2MT9JC790860', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Sold', 'Dubai', 'Al nahda', NULL, '2024-02-24', 35000.0, 25000.0, 'Owned', NULL, NULL, '2530005028', '2026-06-27', NULL, '2026-07-27', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-25', '2024-05-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY[]::TEXT[], NULL, NULL, NULL, NULL, 50.0, 1800.0, 'Good', NULL, NULL, NULL, 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI'),
  ('9a06a8a3-bdaf-42d4-8044-769cb4e44086', 'Q/38571', 'HONDA', 'CIVIC', NULL, 2020, '19XFC2F81LE007089', NULL, 'Automatic', 'Petrol', 'SILVER', '19XFC2F81LE007089', 'Sedan', 240000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-09-19', 40000.0, 35000.0, 'Owned', NULL, NULL, '2530005577', '2026-08-11', NULL, '2026-07-11', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-17', '2025-07-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png'], NULL, NULL, NULL, NULL, 60.0, 2000.0, 'Good', NULL, NULL, '2014-07-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI')
ON CONFLICT DO NOTHING;


-- Import data for employee
INSERT INTO employee (id, employee_id, name, email, phone, date_of_birth, nationality, gender, address, department, designation, join_date, employment_type, reporting_manager_id, status, base_salary, passport_copy_url, visa_page_url, emirates_id_url, other_documents) VALUES
  ('c85770aa-23c8-4cb8-a162-0259b3839b33', 'EMP1001', 'Omar Khalid Hassan', 'omar.hassan@example.com', '+971502345678', '1991-03-15', NULL, 'Male', 'Al Nahda, Dubai', 'Marketing', 'Sales executive', '2025-05-15', 'Full-time', NULL, 'Active', '4000', NULL, NULL, NULL, ARRAY[]::TEXT[]),
  ('88650e0b-d240-450b-948b-c7f5a6fc5bbc', 'EMP1002', 'John Michael Smith', 'john.smith@example.com', '+971551239876', '1990-11-02', NULL, 'Male', NULL, 'Marketing', 'Sales executive', '2025-04-20', 'Full-time', NULL, 'Active', '4000', NULL, NULL, NULL, ARRAY[]::TEXT[]),
  ('8e33c522-8326-4e69-ae8a-ddea4b4287a4', 'EMP1005', 'Ahmed Raza Khan', 'ahmed.khan@example.com', '+971543219876', '1994-12-25', NULL, 'Male', 'Jumeirah Lake Towers, Dubai', 'Operations', 'Driver', '2025-08-11', 'Full-time', NULL, 'Active', '2500', NULL, NULL, NULL, ARRAY[]::TEXT[])
ON CONFLICT DO NOTHING;


-- Import data for shift
INSERT INTO shift (id, name, start_time, end_time, duration_hours) VALUES
  ('5c760923-0d26-4a6c-b961-8499b248b885', 'Morning shift', '08:00', '17:30', '9.5'),
  ('739351a2-1e24-4132-87b4-517cdc6c3f79', 'Night shift', '17:00', '02:00', '9')
ON CONFLICT DO NOTHING;


-- Import data for lead
INSERT INTO lead (id, name, email, phone, source, status, assigned_to_id, notes) VALUES
  ('62f42b8e-d9c5-488f-9d1a-11eb57674419', 'Zhang Wei', 'zhang.wei@example.com', '583214567', 'website', 'New', NULL, NULL),
  ('bc3c3b4b-317b-4e0b-a7b8-9ae4af83c2c7', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL),
  ('a9921579-d8fc-4966-afc9-acfb188922c8', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL),
  ('3fd243e5-929f-4cd0-90a5-8c216923f004', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '583214567', 'Social media', 'Won', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for booking
INSERT INTO booking (id, customer_id, vehicle_id, booking_date, start_date, end_date, pickup_location, dropoff_location, total_amount, vat_amount, final_amount, status, payment_status, special_requests) VALUES
  ('b735952d-a196-4414-8b08-1d84e90719f8', '94770b90-2c45-4a16-8b88-0ab6c5f7ad5c', '0ec9c4f2-853c-4749-b4a0-346d4d963c97', '2025-08-27', '2025-08-27', '2025-08-29', 'Al nahda', 'Al nahda', '100', NULL, NULL, 'Completed', 'Partial', NULL),
  ('7c391d99-c659-424a-b3b6-b40e4a8db127', 'd5b29ff2-c24a-4cda-bfe1-a27b2806c080', '42fb09a4-526f-4f22-ad6e-a0c5d0121edc', '2025-08-27', '2025-08-29', '2025-08-30', 'Al qusais', 'Al nahda', '120', NULL, NULL, 'Confirmed', 'Partial', NULL),
  ('f2233aea-9001-4cb8-aa0b-13d0cde11de8', '6893061b-bb4e-483b-97f2-ca55efb96395', 'a4b11003-89a8-4090-8d0f-92025fa29e66', '2025-09-01', '2025-09-03', '2025-09-06', 'business bay', 'business bay', '300', NULL, NULL, 'Pending', 'Pending', 'fuel full'),
  ('6eaabdc6-b48b-401b-9888-da1f9bcd9a7d', '15823c2b-aabb-46b3-920a-1e6924c1d101', 'a4b11003-89a8-4090-8d0f-92025fa29e66', '2025-09-01', '2025-09-02', '2025-09-05', 'Airport terminal', 'Airport terminal', '300', NULL, NULL, 'Pending', 'Pending', NULL),
  ('5a50d093-d245-4f59-899e-0e26ddcee39b', '15823c2b-aabb-46b3-920a-1e6924c1d101', '42fb09a4-526f-4f22-ad6e-a0c5d0121edc', '2025-09-01', '2025-09-02', '2025-09-12', 'business bay', 'business bay', '1200', NULL, NULL, 'Pending', 'Pending', NULL),
  ('f9cde902-2114-4ba4-b382-34a267899ea1', 'f4596eac-6c4e-4b1c-82f7-dea481ada69b', '42fb09a4-526f-4f22-ad6e-a0c5d0121edc', '2025-09-01', '2025-09-03', '2025-09-12', 'business bay', 'business bay', '1080', NULL, NULL, 'Pending', 'Pending', NULL),
  ('c58fb18a-5a9f-46bc-aab0-17ff995d8ca2', '084efde7-235c-472a-aa96-10855c689360', '78e0bedf-0fa0-494b-8ba9-bb3e5f3f6338', '2025-09-01', '2025-09-02', '2025-10-02', 'business bay', 'business bay', '1800', NULL, NULL, 'Pending', 'Pending', NULL),
  ('11d556cd-26a1-4f9a-931b-ef415743b175', '6a81ed9f-d527-4749-b291-a0a0e49d452d', '78e0bedf-0fa0-494b-8ba9-bb3e5f3f6338', '2025-09-01', '2025-09-04', '2025-10-10', 'Airport terminal', 'Airport terminal', '2160', NULL, NULL, 'Pending', 'Pending', NULL),
  ('1751f812-887b-499b-9534-4bf81be452d3', 'd6bbc0ec-a01c-4bc2-88fa-868c26e4ecde', '0ec9c4f2-853c-4749-b4a0-346d4d963c97', '2025-09-01', '2025-09-02', '2025-09-30', 'business bay', 'business bay', '1400', NULL, NULL, 'Pending', 'Pending', NULL),
  ('8c1817c9-9ca4-49fc-8130-4cc246c7d23e', '6f80cdb5-ae97-48ff-8f7b-36d82c485a59', '267e5554-7125-4157-a4bd-8d6e8dd9e3db', '2025-09-01', '2025-09-02', '2025-09-30', 'Airport terminal', 'Airport terminal', '2800', NULL, NULL, 'Pending', 'Pending', NULL),
  ('f6949cf5-fb5e-4e21-a7f1-728b51a90587', '081b2076-4018-48a7-a104-da3caba4015b', '009f2121-4992-4677-835e-a49c17fe28a6', '2025-09-01', '2025-09-02', '2025-09-23', 'business bay', 'business bay', '1050', NULL, NULL, 'Pending', 'Pending', NULL)
ON CONFLICT DO NOTHING;


-- Import data for vehicle_document
INSERT INTO vehicle_document (id, vehicle_id, document_type, document_name, file_url, file_type, upload_date, expiry_date, extracted_data, notes, is_verified) VALUES
  ('f49b612c-405f-4825-8358-95cb5960e182', '8cd8e2e3-1fb7-4634-8585-931b3da81f48', 'Mulkia', 'M 61477.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d5794d60_M61477.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL),
  ('9081a718-ec35-455f-a03c-0af81160a5c8', '8cd8e2e3-1fb7-4634-8585-931b3da81f48', 'Insurance', 'ContractorAccessPermit_12-06-2025_5254637.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cf2b60e60_ContractorAccessPermit_12-06-2025_5254637.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL),
  ('5c632e23-7002-4939-b77a-9713cbe36fd4', '009f2121-4992-4677-835e-a49c17fe28a6', 'Mulkia', 'mulikia', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1b0ddd80b_F20428.pdf', 'pdf', '2025-08-29', NULL, NULL, NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for customer_document
INSERT INTO customer_document (id, customer_id, document_type, document_part, file_name, file_url, expiry_date, is_verified) VALUES
  ('f3109fab-ca41-4ae1-b4c5-02ff8da643ca', 'c32c062e-9931-4730-bc67-f4e9a88efe05', 'Driving License', 'Front', 'DL Ahmed khalid al mansoori', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/64070d005_NISSANVERSASILVER2020.png', NULL, NULL),
  ('65bb553d-ddb3-4c5b-bcfe-6a1f5b4f53ac', 'c7fc5859-da7c-4ea8-911a-d4f76ed9731a', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/65d584b16_NISSANPATHFINDERWHITE2020.png', '2026-05-27', NULL),
  ('095c6ad3-2446-4fd7-9842-280a10aeed40', 'c7fc5859-da7c-4ea8-911a-d4f76ed9731a', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/26bb110dd_ChevroletMALIBUBLACK2019.png', '2026-08-18', NULL),
  ('17cde6a0-4ac1-42f7-a131-cb19bfb487d7', 'ebe8df6e-eec0-4b56-bc0c-b0517efcbc4f', 'Driving License', 'Front', 'test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d1b8e46aa_NISSANPATHFINDERWHITE2020.png', '2026-08-01', NULL),
  ('389baeb2-28fd-40dd-8be9-a09f47960cc2', 'ebe8df6e-eec0-4b56-bc0c-b0517efcbc4f', 'Driving License', 'main', 'LEXUS RX 450 H  BLACK 2012', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d6441074_LEXUSRX450HBLACK2012.png', '2026-02-05', NULL)
ON CONFLICT DO NOTHING;


-- Import data for attendance
INSERT INTO attendance (id, employee_id, date, check_in_time, check_out_time, shift_id, status, working_hours, overtime_hours, notes) VALUES
  ('c7a5f5a2-82ab-470c-bb95-e33998068340', 'c85770aa-23c8-4cb8-a162-0259b3839b33', '2025-08-27', '2025-08-27T08:00:00', NULL, '5c760923-0d26-4a6c-b961-8499b248b885', 'Present', NULL, NULL, NULL),
  ('e4598138-1f57-4d00-8ba3-18843c04c8f0', '88650e0b-d240-450b-948b-c7f5a6fc5bbc', '2025-08-27', '2025-08-27T08:00:00', NULL, '5c760923-0d26-4a6c-b961-8499b248b885', 'Present', NULL, NULL, NULL),
  ('e7775ee8-dfda-4907-a219-b6e0b0783687', 'c85770aa-23c8-4cb8-a162-0259b3839b33', '2025-08-26', '2025-08-26T08:00:00', '2025-08-26T17:30:00', '5c760923-0d26-4a6c-b961-8499b248b885', 'Present', NULL, NULL, NULL),
  ('8e124bb6-56ef-446d-b233-51496afc62f3', '8e33c522-8326-4e69-ae8a-ddea4b4287a4', '2025-08-27', '2025-08-27T07:00:00', NULL, '5c760923-0d26-4a6c-b961-8499b248b885', 'Present', NULL, NULL, NULL),
  ('84f346bb-fbf4-44f0-8c67-865037b99697', '8e33c522-8326-4e69-ae8a-ddea4b4287a4', '2025-08-26', '2025-08-26T17:00:00', '2025-08-26T03:00:00', '739351a2-1e24-4132-87b4-517cdc6c3f79', 'Present', NULL, NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for payroll
INSERT INTO payroll (id, employee_id, month, year, base_salary, overtime_pay, deductions, net_pay, status, processing_date) VALUES
  ('74ef7273-fee4-4313-8d5f-f434c8415c4c', 'c85770aa-23c8-4cb8-a162-0259b3839b33', '8', '2025', '4000', NULL, NULL, '4000', 'Processed', '2025-08-27'),
  ('b32f56ff-f929-438f-9959-720f9ee108be', '88650e0b-d240-450b-948b-c7f5a6fc5bbc', '8', '2025', '4000', NULL, NULL, '4000', 'Processed', '2025-08-27'),
  ('8109ddb8-66ca-48c2-b95f-56bb5f5dccda', '8e33c522-8326-4e69-ae8a-ddea4b4287a4', '8', '2025', '2500', NULL, NULL, '2500', 'Processed', '2025-08-27')
ON CONFLICT DO NOTHING;


-- Import data for leave_request
INSERT INTO leave_request (id, employee_id, leave_type, start_date, end_date, reason, status, manager_comment, hr_comment) VALUES
  ('9ec6df46-b348-462b-8734-198334a1aa00', '88650e0b-d240-450b-948b-c7f5a6fc5bbc', 'Sick', '2025-08-25', '2025-08-26', 'Fever', 'Approved', NULL, NULL),
  ('a74113e5-17a6-4536-9eba-b81dbe189f32', '8e33c522-8326-4e69-ae8a-ddea4b4287a4', 'Casual', '2025-08-30', '2025-08-30', 'emergency', 'Rejected', NULL, 'emergency'),
  ('d5f7e7d2-06a6-420a-ba83-a780cfe9e1c8', '88650e0b-d240-450b-948b-c7f5a6fc5bbc', 'Sick', '2025-08-29', '2025-08-29', 'sick', 'Approved', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for quotation
INSERT INTO quotation (id, customer_id, lead_id, vehicle_details, daily_rate, start_date, end_date, total_amount, validity_date, terms_and_conditions, status, sales_rep_id) VALUES
  ('8451dee9-ea39-4e6a-a54d-dbe8056b9d66', '952736e9-f5a5-454e-838f-1f07c223ddb5', NULL, 'Versa', '100', '2025-08-29', '2025-08-30', '200', '2025-08-31', 'Standard rental terms and conditions apply.', 'Draft', NULL),
  ('a358fbfb-a6bb-4407-88a0-df6d937497ca', '5a27f8ec-9494-4239-9552-c32a09378e64', NULL, 'Versa', '150', '2025-08-29', '2025-08-30', '300', '2025-08-29', 'Standard rental terms and conditions apply.', 'Rejected', NULL),
  ('4e21993a-413d-44d6-9689-a5f201eb261c', 'f0b3e8da-6cb7-45bf-992b-2a8f6a209ad1', NULL, 'toyota', '100', '2025-08-29', '2025-08-29', '100', '2025-08-29', 'Standard rental terms and conditions apply.', 'Sent', NULL),
  ('f620cf44-8d74-40a5-971a-91568e4154d1', 'f0b3e8da-6cb7-45bf-992b-2a8f6a209ad1', NULL, 'toyota', '100', '2025-08-29', '2025-08-29', '100', '2025-08-29', 'Standard rental terms and conditions apply.', 'Accepted', NULL)
ON CONFLICT DO NOTHING;


-- Import data for corporate_client
INSERT INTO corporate_client (id, company_name, account_manager_id, billing_agreement, contacts, notes) VALUES
  ('bb0c670c-19c0-4492-a71e-1096f3ff7044', 'Future micra', NULL, '1. Billing
The Client agrees to be billed for all rental charges and associated fees incurred by its authorized employees. Invoices will be issued monthly and are due within 20  days of the invoice date.

2. Payment
Payment will be made via  bank / credit card. Late payments may be subject to a late fee of  1.5% per month.', '[{"name": "Zhang Wei", "role": "Manager ", "phone": "583214567", "email": "zhang.wei@example.com"}]'::jsonb, NULL),
  ('08767737-8ce3-4e8a-b616-4a186a746761', 'Future micra', NULL, 'test', '[]'::jsonb, NULL),
  ('a5d2ad46-3e84-451c-9938-5e1527258fa8', 'Future micra', NULL, NULL, '[{"name": "sdfsdf", "role": "", "phone": "", "email": ""}]'::jsonb, NULL),
  ('b55cf187-f9d1-464f-b767-6cc5de9e8fac', 'Future micra', NULL, 'Test', '[{"name": "Test1", "role": "Manager test", "phone": "566552258", "email": "test@example.ioae"}]'::jsonb, NULL),
  ('0b858d7e-39c9-4426-8724-c618bbb3c84d', 'Emirates Tech Solutions', 'placeholder-user-id-1', 'Net 30 payment terms, monthly invoicing', '[{"name": "Ali Hassan Al Maktoum", "role": "Fleet Manager", "phone": "+971 4 123 4567", "email": "ali.hassan@emiratestech.com"}, {"name": "Sarah Johnson", "role": "Procurement Head", "phone": "+971 4 123 4568", "email": "sarah.johnson@emiratestech.com"}]'::jsonb, 'Premium corporate client, requires luxury vehicle fleet'),
  ('7f9440a0-f8d2-45b8-9a40-05449193daff', 'Dubai Business Hub', 'placeholder-user-id-2', 'Quarterly payment, bulk discount applicable', '[{"name": "Mohammed Al Rashid", "role": "CEO", "phone": "+971 4 234 5678", "email": "mohammed@dubaibiz.com"}]'::jsonb, 'Long-term client since 2020')
ON CONFLICT DO NOTHING;


-- Import data for interaction_log
INSERT INTO interaction_log (id, customer_id, lead_id, type, notes, sales_rep_id, date) VALUES
  ('7e9e0b86-7437-4f06-8232-ba190d37f0a0', '498f3458-f88a-49f0-866f-67d3944ad4da', NULL, 'Note', 'aa', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:43.590Z'),
  ('8761c627-e5c5-46aa-b3af-26e6e6ac8e15', '498f3458-f88a-49f0-866f-67d3944ad4da', NULL, 'Note', 'a
a
a
a
a
a
a', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:36.249Z'),
  ('0b20ea80-354a-4d38-aaaf-04c4ed0bb0d8', '498f3458-f88a-49f0-866f-67d3944ad4da', NULL, 'Note', 'aaa', '6891f57922e817b10a5d63fc', '2025-08-11T08:53:59.740Z')
ON CONFLICT DO NOTHING;


-- Import data for invoice
INSERT INTO invoice (id, invoice_number, client_id, client_name, invoice_date, due_date, rental_amount, vat_amount, status, notes, payment_id, booking_id, subtotal, total_amount, vat_enabled, vat_rate) VALUES
  ('f8a8c008-93b7-4312-b286-1f15339c8015', 'INV-2025-21536', '94770b90-2c45-4a16-8b88-0ab6c5f7ad5c', 'Unknown Customer', '2025-08-27', '2025-08-28', 100.0, 5.0, 'Paid', NULL, NULL, 'b735952d-a196-4414-8b08-1d84e90719f8', 100.0, 105.0, TRUE, 5),
  ('63c965fd-55d5-491c-b2cc-6b4e5e944f32', 'INV-2025-17091', 'd5b29ff2-c24a-4cda-bfe1-a27b2806c080', 'Michael Andrew Smith', '2025-08-31', '2025-09-15', 120.0, 5.0, 'Sent', 'Invoice for Booking #3D92EB71', NULL, '7c391d99-c659-424a-b3b6-b40e4a8db127', 120.0, 125.0, TRUE, 5),
  ('af036b10-ef4e-4296-8cf1-5a4fcf57ccef', 'INV-2025-63474', '6893061b-bb4e-483b-97f2-ca55efb96395', 'Lexus Auto LLC', '2025-09-01', '2025-09-16', 300.0, 5.0, 'Sent', 'Invoice for Booking #14C1F384', NULL, 'f2233aea-9001-4cb8-aa0b-13d0cde11de8', 300.0, 305.0, TRUE, 5),
  ('4460516a-4057-411e-919b-ac2c5cd05642', 'INV-2025-88026', '15823c2b-aabb-46b3-920a-1e6924c1d101', 'Roosewalt Pereira', '2025-09-01', '2025-09-16', 300.0, 5.0, 'Sent', 'Invoice for Booking #4CE0838C', NULL, '6eaabdc6-b48b-401b-9888-da1f9bcd9a7d', 300.0, 305.0, TRUE, 5),
  ('142685ad-e610-45e0-8991-b467abdd6bf2', 'INV-1756730056527', '15823c2b-aabb-46b3-920a-1e6924c1d101', 'Roosewalt Pereira', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Sent', 'Invoice for Booking #EB0ECC82', NULL, '5a50d093-d245-4f59-899e-0e26ddcee39b', 0.0, 0.0, TRUE, 5),
  ('dd2d0a11-e487-471f-8f1b-99269e120c62', 'INV-1756736447807', '084efde7-235c-472a-aa96-10855c689360', 'DDD trading LLC', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #9DB71405', NULL, 'c58fb18a-5a9f-46bc-aab0-17ff995d8ca2', 0.0, 0.0, TRUE, 5),
  ('8943541f-8001-4cf2-843b-d007879613e4', 'INV-1756737440787', 'f4596eac-6c4e-4b1c-82f7-dea481ada69b', 'Amazon Corp', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #05390BFF', NULL, 'f9cde902-2114-4ba4-b382-34a267899ea1', 0.0, 0.0, TRUE, 5),
  ('3e2a3d3a-c78b-48ee-8191-7bf091ab20a3', 'INV-1756737868373', 'd6bbc0ec-a01c-4bc2-88fa-868c26e4ecde', 'ABCD LLC', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #53356FBC', NULL, '1751f812-887b-499b-9534-4bf81be452d3', 0.0, 0.0, TRUE, 5),
  ('c99f02d3-7c66-41b3-b5ca-c4c36971df43', 'INV-1756738388091', '6a81ed9f-d527-4749-b291-a0a0e49d452d', 'Google enterprises', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #E48F3F8B', NULL, '11d556cd-26a1-4f9a-931b-ef415743b175', 0.0, 0.0, TRUE, 5),
  ('1a103c42-a4e6-4a65-a9cc-872ef1287c68', 'INV-1756739156014', '6f80cdb5-ae97-48ff-8f7b-36d82c485a59', 'Google enterprises', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #CACBE81B', NULL, '8c1817c9-9ca4-49fc-8130-4cc246c7d23e', 0.0, 0.0, TRUE, 5),
  ('b3350daa-b19a-4157-a7c6-4e885a6ffb76', 'INV-1756740683249', '081b2076-4018-48a7-a104-da3caba4015b', 'Amazon Corp', '2025-09-01', '2025-10-01', 0.0, 0.0, 'Draft', 'Invoice for Booking #BF49053F', NULL, 'f6949cf5-fb5e-4e21-a7f1-728b51a90587', 0.0, 0.0, TRUE, 5)
ON CONFLICT DO NOTHING;


-- Import data for payment
INSERT INTO payment (id, payment_date, counterpart, amount, method, reference_no, remarks) VALUES
  ('089727d6-1fba-46de-a6e6-4311d71930eb', '2025-08-26', 'Customer', '2500', 'Cash', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for expense
INSERT INTO expense (id, expense_date, category, description, amount, paid_to, payment_method, project_client, receipt_url) VALUES
  ('64388e9a-423e-4716-98d3-7d6d9a5e9799', '2025-08-27', 'Utilities', 'DEWA', '1000', 'DEWA', 'Company Account', NULL, NULL),
  ('b15bba8c-cfcf-4602-800c-7c85287c3b32', '2025-08-27', 'Maintenance', 'Breakdown', '300', 'AutoGarage', 'Bank Transfer', 'P/76403', NULL),
  ('a9236895-0e18-4ba5-a933-9797ac22bfd5', '2025-08-27', 'Salaries', 'Driver salary', '2500', 'Driver', 'Company Account', 'P/61550', NULL),
  ('c5fdc17a-399a-4d71-a020-88abc9e55cbc', '2025-08-27', 'Marketing', 'Google ads', '400', 'Google', 'Company Account', NULL, NULL),
  ('033b9874-49de-4d63-91db-4c4a4a4eb5ce', '2025-08-27', 'Travel', 'Staff travel allowance', '100', 'Staff', 'Cash', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for asset
INSERT INTO asset (id, asset_name, purchase_date, purchase_cost, depreciation_method, lifespan_years, depreciation_start_date) VALUES
  ('8f3aac80-271c-4587-9892-f708bf7845ce', 'Nissan Pathfinder', '2024-10-24', '45000', 'Straight-Line', '5', '2025-07-24')
ON CONFLICT DO NOTHING;


-- Import data for inventory_part
INSERT INTO inventory_part (id, item_name, category, unit_cost, quantity_available, reorder_level, supplier) VALUES
  ('49c773a0-6bee-45e6-a63a-f530f17ff6c8', 'Michelin 225/65 R17', 'Tyres', '450', '15', '5', 'TyreCo Dubai'),
  ('f2454263-ca3c-4561-b996-d34b62deb5a8', 'Air Filter', 'Filters', '120', '10', '5', 'AutoParts UAE'),
  ('57de8319-a20f-45ad-8382-9916c42fced7', 'Oil filter Bosch', 'Filters', '90', '12', '10', 'Tyre & Parts Co'),
  ('5d5020b7-7ec2-4843-a8dc-0070346bb66f', 'Brake Pads (Front) Brembo', 'Brakes', '350', '30', '25', 'SpeedParts Dubai'),
  ('5b0f0a56-bd81-41b2-a4e1-1cf905ad6f5c', 'Brake Pads (Rear) ATE', 'Brakes', '300', '35', '25', 'SpeedParts Dubai'),
  ('95642566-1dc8-4bb8-9798-3538be41c9d1', 'Tyre 285/60 R18 Goodyear', 'Tyres', '900', '10', '15', 'Desert tyres'),
  ('637d3ae3-7792-4e2e-a2a0-ba57666728f6', 'Semi-Synthetic 10W-40 Castrol', 'Engine Oil', '140', '40', '50', 'OilMaster UAE'),
  ('aa78467a-5a75-40cc-b2fc-a1b0160ccceb', 'Front Bumper Nissan OEM', 'Body Parts', '1200', '5', '5', 'AutoBody UAE')
ON CONFLICT DO NOTHING;


-- Import data for maintenance_log
INSERT INTO maintenance_log (id, vehicle_id, service_date, odometer_reading, service_type, vendor, cost, report_url, notes, next_service_due_date, status) VALUES
  ('35e87106-3b9d-4321-90a7-18761a46da9d', '8cd8e2e3-1fb7-4634-8585-931b3da81f48', '2025-08-27', '245015', 'Inspection', NULL, '250', NULL, NULL, '2025-10-31', 'Upcoming'),
  ('20dd09b0-9ec7-4ae1-a2b0-3f068348a33b', '267e5554-7125-4157-a4bd-8d6e8dd9e3db', '2025-08-27', '125456', 'Repair', NULL, '300', NULL, NULL, '2025-08-27', 'Upcoming')
ON CONFLICT DO NOTHING;


-- Import data for incident_log
INSERT INTO incident_log (id, vehicle_id, incident_date, type, severity, description, photo_urls, responsible_user_id, status) VALUES
  ('47c67acb-ef60-4af4-a117-f2e1df8a2afc', '8cd8e2e3-1fb7-4634-8585-931b3da81f48', '2025-08-27T09:41', 'Mechanical Issue', 'Medium', 'Breakdown', ARRAY[]::TEXT[], NULL, 'Resolved'),
  ('8a87ff72-586b-436a-aeaa-97b9785d1807', '8cd8e2e3-1fb7-4634-8585-931b3da81f48', '2025-08-27T09:42', 'Mechanical Issue', 'Medium', 'Breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/8f375d216_WhatsAppImage2025-08-22at21538PM.jpeg'], NULL, 'Resolved'),
  ('996944f6-bad2-43c9-a847-636098a484cd', '6048df41-1c43-4e7a-951a-aa6a7cc54b81', '2025-08-27T09:57', 'Mechanical Issue', 'Low', 'Tyre puncture', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a1a9373d9_NISSANALTIMASEORANGE2020.png'], NULL, 'Under Review'),
  ('6e94d626-e296-404a-8781-6831bd07cf67', '009f2121-4992-4677-835e-a49c17fe28a6', '2025-08-29T00:00:00.000Z', 'Accident', 'Low', 'breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/863242177_NISSANPATHFINDERWHITE2020.png'], NULL, 'Resolved'),
  ('be789bf1-08a5-481e-99b4-13dc86760495', '0ec9c4f2-853c-4749-b4a0-346d4d963c97', '2025-08-29T16:00:00.000Z', 'Mechanical Issue', 'Critical', 'breakdown', ARRAY['https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cb4d94844_NISSANVERSASILVER2020.png'], NULL, 'Resolved')
ON CONFLICT DO NOTHING;


-- Import data for vehicle_contract
INSERT INTO vehicle_contract (id, vehicle_id, customer_name, start_date, end_date, contract_value, payment_terms, document_url, status, booking_id) VALUES
  ('c6d7c7a9-0d91-4161-a520-181f0b945537', 'a4b11003-89a8-4090-8d0f-92025fa29e66', 'Ahmed Khalid Al Mansoori', '2025-08-27', '2025-09-17', '2500', '50% advance', NULL, 'Active', NULL),
  ('dbddeacd-6869-4434-83ae-80d665013fc7', 'a4b11003-89a8-4090-8d0f-92025fa29e66', 'Ahmed Khalid Al Mansoori', '2025-09-17', '2026-09-17', '2500', '50% advance', NULL, 'Active', NULL),
  ('cce520a1-54fb-4ce1-bd94-0ec59be4ad87', '009f2121-4992-4677-835e-a49c17fe28a6', 'Test booking', '2025-08-29', '2025-10-29', '3000', NULL, 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/83ad19a94_AlJisrCarRentals-CompleteAPISpecification.pdf', 'Expired', NULL)
ON CONFLICT DO NOTHING;


-- Import data for car_image
INSERT INTO car_image (id, image_set_id, model_tag, color_tag, image_url, notes) VALUES
  ('b756e7ce-d1ec-47af-ae70-58325c240acb', 'Toyota Camry', 'Toyota-Camry', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e3e46be48_ToyotaCamryWhite.png', NULL),
  ('ad23c973-c9d2-475c-ba1f-f4333775df94', 'Mitsubish-Attrage', 'Mitsubish-Attrage', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d46adda3d_MitsubishiAttrage.jpg', NULL),
  ('8927986b-239f-4cee-b422-6ffdc54b24bb', 'Nissan-Sunny', 'Nissan-Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/124cc26bf_NissanSunny.jpg', NULL),
  ('e4ed9e20-e56f-4ee8-a58b-8f4fb56dd558', 'Hyundai-Elantra', 'Hyundai-Elantra', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c6bf2624b_Hyundai-Elentra.png', NULL),
  ('15aa41b5-d654-4db0-b292-c956c1ac97e5', 'Hyundai-Sonata', 'Hyundai-Sonata', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4a7ee9d80_Hyundai-Sonata.png', NULL),
  ('2973e134-43d5-4b41-8c36-30d319b5c72a', 'Ford Expedition', 'Ford Expedition', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/bce8ade62_FordExpedition.png', NULL),
  ('272908c5-43b7-4c08-b6b5-e3f0c0f1854b', 'Ford Explorer', 'Ford Explorer', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e094828e3_FordExplorerblack.png', NULL),
  ('5f012648-46fe-4543-8175-56a9eae3e672', 'Nissan Sunny', 'Nissan Sunny', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2ffffd361_NissanSunnyRed.png', NULL),
  ('28d850c5-7b5d-4a93-8f56-00ee1f4a4249', 'Nissan Sunny', 'Nissan Sunny', 'Blue', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png', NULL),
  ('08af846d-a3e5-4d4c-8c96-6e01157d6626', 'Nissan Sunny', 'Nissan Sunny', 'Gray', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png', NULL),
  ('d97af286-86f9-4968-b06a-6afc7fcc9546', 'Nissan Sunny', 'Nissan Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/7260b9382_NissanSunnyWhite.jpg', NULL),
  ('a3a750f5-8de5-41d5-8e18-fd7e13c45e95', 'NISSAN-PATHFINDER', 'NISSAN PATHFINDER', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png', NULL),
  ('5a27e0b5-2e0f-4b83-bb13-6585ecc9beb1', 'NISSAN-VERSA', 'NISSAN-VERSA', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png', NULL),
  ('e77f8092-07a5-4d0d-89e5-904fd4efb058', 'LEXUS-RX 450 H', 'LEXUS-RX 450 H', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png', NULL),
  ('a44f829d-fca0-42bf-a020-dcf81cc376e5', 'HONDA-CIVIC', 'HONDA-CIVIC', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png', NULL),
  ('ea43e4c8-1f12-44dd-a728-e9aceac002f8', 'Chevrolet-MALIBU', 'Chevrolet-MALIBU', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png', NULL),
  ('38116a18-c414-45f6-83ed-b300a237d251', 'Nissan-Altima SE', 'Nissan-Altima SE', 'ORANGE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png', NULL),
  ('74e73fed-2837-475e-a8d1-04b33a81bee1', 'Nissan-Altima SE', 'Nissan-Altima SE', 'GREY', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1eb090ffa_NISSANALTIMASEGREY2014.png', NULL),
  ('6d76c97b-2194-48ff-a04b-a1278b900661', 'Nissan-Altima SE', 'Nissan-Altima SE', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png', NULL),
  ('01ba7379-541d-4db8-9d51-b6d1c0ac7726', 'TOYOTA COROLA', 'TOYOTA COROLA', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png', NULL)
ON CONFLICT DO NOTHING;


-- Import data for staff_document
INSERT INTO staff_document (id, employee_id, document_type, document_name, file_url, file_type, upload_date, expiry_date, description, is_confidential, is_verified) VALUES
  ('8fefcae6-c6ef-4218-930c-99a41985416f', '88650e0b-d240-450b-948b-c7f5a6fc5bbc', 'Employment Contract', 'Contract test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/798974d01_toclaideforsuggestions.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-08-30', NULL, NULL, 'true', NULL)
ON CONFLICT DO NOTHING;


-- Import data for legal_document
INSERT INTO legal_document (id, category, document_type, document_name, file_url, file_type, upload_date, expiry_date, description, is_critical, renewal_reminder_days, responsible_department, is_verified) VALUES
  ('9aab8167-5240-4c3f-b0ba-af49b2512a1b', 'Legal', 'Trade License', 'trade license', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4c11441eb_AlJisrCarRentals-CompleteAPISpecification.pdf', 'application/pdf', '2025-08-30', NULL, NULL, 'true', '30', NULL, NULL)
ON CONFLICT DO NOTHING;


-- Import data for ai_document_processing
INSERT INTO ai_document_processing (id, document_name, file_url, file_type, document_type, processing_status, upload_date, processed_date, ai_extracted_data, reviewed_data, confidence_scores, processing_notes, is_reviewed, error_message, processed_by) VALUES
  ('900a2187-84f0-48a5-8b17-ac061877511d', '2025-06-00815.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/18a7fe400_2025-06-00815.pdf', 'application/pdf', 'Invoice', 'Completed', '2025-08-30T08:45:56.947Z', '2025-08-30T08:46:28.542Z', '{"vendor_name":"FUTURE MICRA Services LLC","invoice_number":"2025-06-00815","invoice_date":"26 Jun 2025","due_date":"26 Jun 2025","total_amount":3337.5,"tax_amount":275,"currency":"AED","items":[{"description":"Waterproofing of two layers.","quantity":1,"unit_price":5500,"total":5500},{"description":"Inspection charge deduction","quantity":1,"unit_price":-150,"total":-150},{"description":"Advance amount received","quantity":1,"unit_price":-2287.5,"total":-2287.5}]}', '{"vendor_name":"FUTURE MICRA Services LLC","invoice_number":"2025-06-00815","invoice_date":"26 Jun 2025","due_date":"26 Jun 2025","total_amount":3337.5,"tax_amount":275,"currency":"AED","items":[{"description":"Waterproofing of two layers.","quantity":1,"unit_price":5500,"total":5500},{"description":"Inspection charge deduction","quantity":1,"unit_price":-150,"total":-150},{"description":"Advance amount received","quantity":1,"unit_price":-2287.5,"total":-2287.5}]}', '{"vendor_name":0.8750834120867277,"invoice_number":0.8173448487512891,"invoice_date":0.9551784689304866,"due_date":0.7424009182943934,"total_amount":0.7963484740426529,"tax_amount":0.9425398021026463,"currency":0.7462278545932612,"items":0.7377776268445952}', NULL, 'true', NULL, 'lalchempakathinal@gmail.com'),
  ('f3a40e9c-ec54-4f5a-a816-faa00d69a752', 'P 61550.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/96b8b054d_P61550.pdf', 'application/pdf', 'License', 'Completed', '2025-08-30T08:51:52.472Z', '2025-08-30T08:52:13.030Z', '{"license_number":"P/61550","license_type":"Vehicle Registration Card","holder_name":"MOHSIN ALI ZULIFQAR ALI","issue_date":"25-JUN-26","expiry_date":"25-JUN-26","issuing_authority":"UNITED ARAB EMIRATES MINISTRY OF INTERIOR","restrictions":"Changes to vehicle or owner information must be notified to licensing authority"}', '{"license_number":"P/61550","license_type":"Vehicle Registration Card","holder_name":"MOHSIN ALI ZULIFQAR ALI","issue_date":"25-JUN-26","expiry_date":"25-JUN-26","issuing_authority":"UNITED ARAB EMIRATES MINISTRY OF INTERIOR","restrictions":"Changes to vehicle or owner information must be notified to licensing authority"}', '{"license_number":0.9825045132386544,"license_type":0.9992436758753225,"holder_name":0.7952661625865582,"issue_date":0.9753953550164702,"expiry_date":0.8739967729628069,"issuing_authority":0.823447678059876,"restrictions":0.7345941866291039}', NULL, 'true', NULL, 'lalchempakathinal@gmail.com')
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