
SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

-- INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
-- 	('00000000-0000-0000-0000-000000000000', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', 'authenticated', 'authenticated', 'rayovihj@gmail.com', '$2a$10$7i4EeNBrYzAG75X.MS1SbuUsVTP/MTAVAeawupLWZ1nJThUTsn6y.', '2025-09-04 08:56:32.730525+00', NULL, '', '2025-09-04 08:56:17.778484+00', '', NULL, '', '', NULL, '2025-09-04 09:14:06.141468+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5a439cc3-022e-4c60-9522-2b6cd086dc1b", "email": "rayovihj@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-04 08:56:17.769739+00', '2025-09-04 09:14:06.14584+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', 'authenticated', 'authenticated', 'lalsebastian@live.in', '$2a$10$dGyKHI/ZnuxOzvSPWfH3/.mGXthAzaBgLOZcm33ZMyeHpZSH1ZmIW', '2025-09-09 06:56:06.469705+00', NULL, '', '2025-09-09 06:54:52.61257+00', '', NULL, '', '', NULL, '2025-09-09 07:02:11.597001+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ce4346f3-480d-41e7-b3e7-5b877c551f49", "email": "lalsebastian@live.in", "email_verified": true, "phone_verified": false}', NULL, '2025-09-09 06:54:52.603265+00', '2025-09-09 07:02:11.600127+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'c04b9881-2763-4e69-ad0a-5a886b921a72', 'authenticated', 'authenticated', 'lalchempakathinal@gmail.com', '$2a$10$1F2.fkggdBFVy2hOSS1XyOtkJMjYokYLLAioKlLLngJAtnpup.zJq', '2025-09-05 07:24:05.590449+00', NULL, '', '2025-09-05 07:23:23.808894+00', '', '2025-09-12 08:16:56.625244+00', '', '', NULL, '2025-09-12 08:17:51.976752+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c04b9881-2763-4e69-ad0a-5a886b921a72", "email": "lalchempakathinal@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-05 07:23:23.801121+00', '2025-09-12 08:17:51.983352+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'b58df48b-a460-469e-b539-333706ed62b8', 'authenticated', 'authenticated', 'blogger.pereira@gmail.com', '$2a$10$bVOyFa6cosmLuxgj5l8GGuFE.BIcDIe4C5alRMXjrs8E4yIyLd6Ue', '2025-09-05 06:12:45.018238+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-05 06:12:45.005139+00', '2025-09-05 06:12:45.02347+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'dd123875-127d-4b03-8c65-5ae3e2f61689', 'authenticated', 'authenticated', 'hitheshtube@gmail.com', '$2a$10$2lF7Cwr9NdDPrrhwjHBUGuWRVXMfJE/qTEGXrsczpiZnBNeWs1QdK', '2025-09-04 09:40:19.628725+00', NULL, '', '2025-09-04 09:40:01.053201+00', '', NULL, '', '', NULL, '2025-09-04 09:40:33.472387+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "dd123875-127d-4b03-8c65-5ae3e2f61689", "email": "hitheshtube@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-04 09:40:01.03948+00', '2025-09-05 06:21:06.862702+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'a42b0485-f52d-4735-a34d-e329650a08d3', 'authenticated', 'authenticated', 'hithesh0215@gmail.com', '$2a$10$g9rUQ75b./YWIIGVRcpdUOq203X8LORHa1ElHaeFAfjkDRVV9nOpu', '2025-09-03 11:10:25.190399+00', NULL, '', '2025-09-03 11:10:12.6883+00', '', NULL, '', '', NULL, '2025-09-14 14:43:15.361491+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a42b0485-f52d-4735-a34d-e329650a08d3", "email": "hithesh0215@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-03 11:10:12.676397+00', '2025-09-18 06:55:06.227626+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
-- 	('00000000-0000-0000-0000-000000000000', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', 'authenticated', 'authenticated', 'roosewalt@gmail.com', '$2a$10$W0peN5xXRfEB9Xa3LZCRy.F.LNVYEVpbtiUM5BwOjWxotMO9oMRTi', '2025-09-05 06:22:24.156333+00', NULL, '', '2025-09-05 06:22:00.431775+00', '', NULL, '', '', NULL, '2025-09-12 08:32:22.033657+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a0e89c20-e2da-44fd-9fac-92937d4243c0", "email": "roosewalt@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-05 06:22:00.395854+00', '2025-09-12 09:35:53.934137+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);



--
-- Data for Name: customer; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."customer" ("id", "name", "email", "phone", "license_number", "address", "customer_type", "status", "tags", "residency_status", "driving_license_url", "passport_url", "emirates_id_url", "created_at", "updated_at") VALUES
	('d0e18764-a369-4cbb-af5d-18457de10fe9', 'John Smith', 'john.smith@email.com', '+971-50-123-4567', 'DL12345678', '123 Business Bay, Dubai, UAE', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('381b1e79-a2a6-40f3-8de5-16c81cdd32b6', 'Roosewalt Pereira', 'roosewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b536cd0d-9c5c-4b26-b70f-573351535efc', 'Roosewalt Sabestian Pereira', 'blogger.pereira@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('70f8154a-b275-4e9d-9cfd-a9a94ceb2d56', 'Roosewalt Sabestian Pereira', 'roosewalt@gmail.com', '0562440200', NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6db9c7c4-5ae4-47dc-b7d5-f9586ab6aca4', 'Test booking', 'help@joboy.', '582628980', NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('82408aa6-e6d2-49bb-a382-abf89d2364e6', 'Test', 'test', 'Test', NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b9caf5ee-e010-49b8-85f9-206b107254d7', 'Majid ABdul', 'majid1212@gmail.com', '+971123456789', NULL, '903 Al Saud Bldg 2', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('a5b35a6c-2269-440f-a733-0e1a569e9a3d', 'Lal Sebastian', 'lalchempakathinal@gmail.com', '+971000000000', NULL, 'Street No. 25', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('f7a597ad-5ec1-4b3b-85a5-5e1e1fc52490', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('f277d6b1-6b93-4612-9748-eaad82b5c915', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '+971502345678', NULL, 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('402be2e9-b8fd-4bbf-8c3f-5c98245d8202', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '502345678', 'DUB123456', 'Villa 12, Jumeirah 1, Dubai', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('8df6e6ef-b473-4260-80e3-f61e5bb31013', 'Priya Ramesh Nair', 'priya.nair@example.com', '+971523456789', NULL, 'Apt 405, Bur Dubai, Dubai', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('84454752-80ad-40eb-bfb5-0b6354c72b80', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('12c44cba-9b0d-42dc-b0e5-3773ee023d1e', 'Gabesh Shah', 'gabesh@gmail.com', '+971502402200', NULL, 'Flat 111, Hasani 19', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('8fab467d-f7a3-4403-9ac1-12154e293b84', 'Ahmed Shah', 'as123@gmail.com', '+971562000200', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('abd85f65-c080-4615-8788-a65cd7edcb02', 'Ganesh Shah', 'Gshah12@gmail.com', '+971562440222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('42ce1dc9-2f51-481b-b260-cd05b78e2f36', 'Roman Bhat', 'roman111@gmail.com', '+971562440440', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('21d3ad6a-6671-4c15-9030-30f731306e9e', 'ABC Xghhhh', 'abc@gmail.com', '+971562220222', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0f2b97de-5ed7-4716-95c6-f0e45927be76', 'aaaaaaa', 'aaaaa@gmail.com', '+971555555555', NULL, 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b81b31db-525a-4e23-b179-63c3f512bf20', 'kkkk hhhhh', 'gggg@gmail.com', '+971562440022', 'ABC1234', 'Flat 111, Hasani 19
Doha Street', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4a8e72b3-fcaa-466d-b39d-a84b4a310c59', 'Michael Andrew Smith', 'michael.smith@example.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4580c21b-69c6-4c4d-be99-81870977ef22', 'Fatima Hassan El Sayed', 'fatima.elsayed@example.com', '+971567654321', 'DUB345678', 'Apt 902, Al Nahda, Dubai', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('f5dee011-0dfe-47a9-bc90-945d108413a1', 'Zhang Wei', 'zhang.wei@example.com', '+971583214567', 'DUB901234', 'International City, China Cluster, Dubai', 'Corporate', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('019de787-ef5b-40d6-9867-c3dd217589d2', 'Ahmed Al Mansouri', 'ahmed.almansouri@email.com', '+971 50 123 4567', '12345678', 'Dubai Marina, Dubai, UAE', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('44ea7aa9-cb3a-4b75-8c05-5e6610ed6d5f', 'Sarah Johnson', 'sarah.johnson@email.com', '+971 55 234 5678', '87654321', 'Jumeirah Beach Residence, Dubai, UAE', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('410f8600-f778-4d3b-aba8-273fdd293211', 'Mohammed Hassan', 'mohammed.hassan@email.com', '+971 50 345 6789', '11223344', 'Al Barsha, Dubai, UAE', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('2ea62973-9711-4fb3-8147-c7a6bb50b6ef', 'Emirates Business Solutions', 'contact@emiratesbiz.com', '+971 4 567 8900', NULL, 'Business Bay, Dubai, UAE', 'Corporate', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6243eb36-5f34-482d-b267-185ac847d25a', 'Fatima Al Zahra', 'fatima.alzahra@email.com', '+971 56 456 7890', '55667788', 'Downtown Dubai, Dubai, UAE', 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('67e74177-62b4-4f2a-bb6c-bf1ffc19c9fe', 'Lexus Auto LLC', 'roosewalt@geniushands.ae', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('734fff24-2a40-4d2d-8da1-f362a91eb913', 'Amazon Corp', 'amazon@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('39f090b8-0d29-4a5b-95e4-3957aaec30ba', 'DDD trading LLC', 'ddd@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('553008e2-8f6e-4731-8d91-7d6e387bd8b8', 'Google enterprises', 'google@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('804b8df4-850b-4ea6-bc32-96c3f4310ee7', 'ABCD LLC', 'abvgalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('cde86c3e-ef33-471e-b04d-badb00ec344b', 'Google enterprises', 'ggggalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('aa8f6057-8fa1-44b3-bf9b-7eb860edd459', 'Amazon Corp', 'vbbbsewalt@gmail.com', NULL, NULL, NULL, 'Individual', 'Active', NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('903bd417-77d8-4884-8bdd-b566dd52dacd', 'James Robert Miller', 'james.miller@example.com', '+971558765452', 'A7654321', ' Sheikh Zayed Road, Business Bay, Dubai, UAE', 'Individual', 'Active', '{}', 'Resident', NULL, NULL, NULL, '2025-09-09 07:30:13.753046+00', '2025-09-09 07:30:13.753046+00');


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."vehicle" ("id", "license_plate", "make", "model", "variant_trim", "year", "vin", "engine_number", "transmission_type", "fuel_type", "color", "chassis_number", "body_type", "odometer_reading", "odometer_source", "seating_capacity", "number_of_doors", "vehicle_class", "gps_installed", "status", "location", "assigned_branch", "current_renter", "purchase_date", "purchase_price", "current_market_value", "lease_owned", "leasing_company", "insurance_provider", "insurance_policy_number", "insurance_expiry_date", "salik_tag_number", "registration_expiry_date", "mortgage_loan_status", "sold_date", "sold_value", "estimated_present_value", "last_service_date", "next_service_due_km", "next_service_due_date", "tyre_change_date", "battery_replacement_date", "service_provider", "service_notes", "accident_history", "damage_notes", "registration_copy", "insurance_copy", "emission_test", "image_set_id", "vehicle_photos", "real_time_location", "fuel_level", "engine_status", "battery_level", "daily_rate", "monthly_rate", "health_rating", "live_latitude", "live_longitude", "registration_date", "country_of_origin", "owner_name", "tc_number", "place_of_issue", "created_at", "updated_at") VALUES
	('9fca6371-1ece-4f72-ba2d-ba5de439df36', 'P/61550', 'NISSAN', 'PATHFINDER', NULL, 2020, '5N1DR2AM9LC643661', NULL, 'Automatic', 'Petrol', 'WHITE', '5N1DR2AM9LC643661', 'Sedan', 150000, 'Manual', 7, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-07-27', 65000.00, NULL, 'Owned', NULL, NULL, '2530004975', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-09-30', '2025-06-13', '2025-05-14', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png}', NULL, NULL, NULL, NULL, 100.00, 2500.00, 'Good', NULL, NULL, '2026-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('3f5020bd-fd79-4889-b125-487f9cb98b2b', 'F/20428', 'NISSAN', 'ALTIMA SE', 'SE', 2019, '1N4BL4DV0KC109577', NULL, 'Automatic', 'Petrol', 'BLUE', '1N4BL4DV0KC109577', 'Sedan', 450000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-12-12', 45000.00, 40000.00, 'Owned', NULL, NULL, '2510034606', '2026-05-08', NULL, '2026-04-08', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-07-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png}', NULL, NULL, NULL, NULL, 50.00, 2000.00, 'Good', NULL, NULL, '2009-04-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('db2449e5-a071-410a-8a96-f9fb70584f16', 'M/61477', 'NISSAN', 'VERSA', NULL, 2020, '3N1CN8EVXLL825586', NULL, 'Automatic', 'Petrol', 'SILVER', '3N1CN8EVXLL825586', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2023-11-08', 40000.00, 35000.00, 'Owned', NULL, NULL, '2566S30788', '2026-03-22', NULL, '2026-02-22', NULL, NULL, NULL, NULL, '2025-07-31', 20000, '2025-09-30', '2024-10-31', '2024-11-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png}', NULL, NULL, NULL, NULL, 50.00, 1800.00, 'Good', NULL, NULL, '2024-02-25', 'MEXICO', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('df61908f-3002-42a6-b55d-877b10cf6894', 'E/36249', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4BL4CV2LC244742', NULL, 'Automatic', 'Petrol', 'ORANGE', '1N4BL4CV2LC244742', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2025-02-12', 40000.00, 35000.00, 'Owned', NULL, NULL, 'DXB-MVA-2025-03', '2026-03-21', NULL, '2026-02-21', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-30', '2025-03-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png}', NULL, NULL, NULL, NULL, NULL, NULL, 'Good', NULL, NULL, '2025-02-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('1c0ae19f-8b8b-441c-aea3-6f91705ac1a4', 'U/59738', 'LEXUS', 'RX 450 H', NULL, 2012, 'JTJBC11A402039088', NULL, 'Automatic', 'Petrol', 'BLACK', 'JTJBC11A402039088', 'Sedan', 500000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2023-09-20', 50000.00, 45000.00, 'Owned', NULL, NULL, '20/4021/25A/800', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-15', '2025-02-28', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png}', NULL, NULL, NULL, NULL, 120.00, 3000.00, 'Good', NULL, NULL, '2025-06-23', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0195e12e-64a8-49d7-bfb1-529025f89375', 'P/76403', 'NISSAN', 'ALTIMA SE', 'SE', 2014, '1N4BL3AP9EC184945', NULL, 'Automatic', 'Petrol', 'GRAY', '1N4BL3AP9EC184945', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-11-06', 40000.00, 35000.00, 'Owned', NULL, NULL, '2523195442', '2026-07-22', NULL, '2026-06-22', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2024-11-15', '2025-01-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png}', NULL, NULL, NULL, NULL, 60.00, 2000.00, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('fc8ee4c7-d5e6-483d-b64d-b663e2173b4e', 'Q/17651', 'NISSAN', 'ALTIMA SE', 'SE', 2020, '1N4AL4FV0LN310443', NULL, 'Automatic', 'Petrol', 'WHITE', '1N4AL4FV0LN310443', 'Sedan', 300000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-10-18', 45000.00, 35000.00, 'Owned', NULL, NULL, '2530004895', '2026-07-23', NULL, '2026-06-23', NULL, NULL, NULL, NULL, '2025-07-31', 15000, '2025-10-31', '2025-04-28', '2025-04-26', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png}', NULL, NULL, NULL, NULL, 60.00, 2000.00, 'Good', NULL, NULL, '2024-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('c521a998-6c13-4cc3-a271-22d4576c4df3', 'BB/13678', 'TOYOTA', 'COROLLA 1.3', NULL, 2018, '5YFBURHEXJP848055', NULL, 'Automatic', 'Petrol', 'BLACK', '5YFBURHEXJP848055', 'Sedan', 150000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2025-01-08', 35000.00, 30000.00, 'Owned', NULL, NULL, '2410084265', '2025-10-23', NULL, '2025-09-23', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-24', '2024-12-12', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png}', NULL, NULL, NULL, NULL, 50.00, 1800.00, 'Good', NULL, NULL, '2025-09-24', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('3161a3dc-9abc-4d1b-a1c5-95de8e44cd60', 'P/56942', 'CHEVROLET', 'MALIBU', NULL, 2019, '1G1ZB5ST9KF224575', NULL, 'Automatic', 'Petrol', 'BLACK', '1G1ZB5ST9KF224575', 'Sedan', 250000, 'Manual', 5, 4, 'Economy', NULL, 'Available', 'Dubai', 'Al nahda', NULL, '2024-09-05', 35000.00, 30000.00, 'Owned', NULL, NULL, '2530004974', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-06-28', '2025-06-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png}', NULL, NULL, NULL, NULL, 50.00, 1800.00, 'Good', NULL, NULL, '2028-06-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('cfc922f0-fe25-4fb5-a1eb-a27114c3741f', 'P/63062', 'NISSAN', 'UNKNOWN', NULL, 2020, 'JN8AT2MV5LW110335', NULL, 'Automatic', 'Petrol', 'WHITE', 'JN8AT2MV5LW110335', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Under Maintenance', 'Dubai', 'Al nahda', NULL, '2025-01-15', 25000.00, 20000.00, 'Owned', NULL, NULL, '2530004973', '2026-07-25', NULL, '2026-06-25', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-07-24', '2024-12-15', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{}', NULL, NULL, NULL, NULL, 60.00, 2000.00, 'Good', NULL, NULL, '2026-06-25', 'JAPAN', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('5026fc79-2de7-47ce-bb6f-88f2beed6685', 'U/61913', 'NISSAN', 'UNKNOWN', NULL, 2018, '5N1AT2MT9JC790860', NULL, 'Automatic', 'Petrol', 'BLACK', '5N1AT2MT9JC790860', 'Sedan', 100000, 'Manual', 5, 4, 'Economy', NULL, 'Sold', 'Dubai', 'Al nahda', NULL, '2024-02-24', 35000.00, 25000.00, 'Owned', NULL, NULL, '2530005028', '2026-06-27', NULL, '2026-07-27', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-05-25', '2024-05-24', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{}', NULL, NULL, NULL, NULL, 50.00, 1800.00, 'Good', NULL, NULL, NULL, 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('e4d7103a-79eb-48f1-baa7-685ce9867834', 'Q/38571', 'HONDA', 'CIVIC', NULL, 2020, '19XFC2F81LE007089', NULL, 'Automatic', 'Petrol', 'SILVER', '19XFC2F81LE007089', 'Sedan', 240000, 'Manual', 5, 4, 'Economy', NULL, 'Rented', 'Dubai', 'Al nahda', NULL, '2024-09-19', 40000.00, 35000.00, 'Owned', NULL, NULL, '2530005577', '2026-08-11', NULL, '2026-07-11', NULL, NULL, NULL, NULL, '2025-07-31', 10000, '2025-10-31', '2025-04-17', '2025-07-16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png}', NULL, NULL, NULL, NULL, 60.00, 2000.00, 'Good', NULL, NULL, '2014-07-25', 'AMERICA', 'MOHSIN ALI ZULIFQAR ALI', '2140113865', 'DUBAI', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: booking; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."booking" ("id", "customer_id", "vehicle_id", "booking_date", "start_date", "end_date", "pickup_location", "dropoff_location", "total_amount", "vat_amount", "final_amount", "status", "payment_status", "special_requests", "created_at", "updated_at") VALUES
	('9da97111-04eb-42dd-9210-febeb1dba276', '84454752-80ad-40eb-bfb5-0b6354c72b80', '3161a3dc-9abc-4d1b-a1c5-95de8e44cd60', '2025-08-27', '2025-08-27', '2025-08-29', 'Al nahda', 'Al nahda', 100.00, NULL, NULL, 'Completed', 'Partial', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4b71a451-a4fd-43c7-8bf9-ce648a1571c2', '67e74177-62b4-4f2a-bb6c-bf1ffc19c9fe', '9fca6371-1ece-4f72-ba2d-ba5de439df36', '2025-09-01', '2025-09-03', '2025-09-06', 'business bay', 'business bay', 300.00, NULL, NULL, 'Pending', 'Pending', 'fuel full', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('08e649f2-fe9c-48a0-9224-e124bf8c0a21', '381b1e79-a2a6-40f3-8de5-16c81cdd32b6', '9fca6371-1ece-4f72-ba2d-ba5de439df36', '2025-09-01', '2025-09-02', '2025-09-05', 'Airport terminal', 'Airport terminal', 300.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('edc26d63-4422-4386-b81c-887b8a4cba8a', '381b1e79-a2a6-40f3-8de5-16c81cdd32b6', '1c0ae19f-8b8b-441c-aea3-6f91705ac1a4', '2025-09-01', '2025-09-02', '2025-09-12', 'business bay', 'business bay', 1200.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b04a8d91-e1e4-42b2-8629-4b5f507ea3ad', '734fff24-2a40-4d2d-8da1-f362a91eb913', '1c0ae19f-8b8b-441c-aea3-6f91705ac1a4', '2025-09-01', '2025-09-03', '2025-09-12', 'business bay', 'business bay', 1080.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('90820a58-bf88-4b76-8b0d-b448fc51a51a', '39f090b8-0d29-4a5b-95e4-3957aaec30ba', '0195e12e-64a8-49d7-bfb1-529025f89375', '2025-09-01', '2025-09-02', '2025-10-02', 'business bay', 'business bay', 1800.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0602ec60-4b33-4df8-98a4-784b611d7278', '553008e2-8f6e-4731-8d91-7d6e387bd8b8', '0195e12e-64a8-49d7-bfb1-529025f89375', '2025-09-01', '2025-09-04', '2025-10-10', 'Airport terminal', 'Airport terminal', 2160.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6b1008c1-969f-4fdc-aeb0-8c43a61745bd', '804b8df4-850b-4ea6-bc32-96c3f4310ee7', '3161a3dc-9abc-4d1b-a1c5-95de8e44cd60', '2025-09-01', '2025-09-02', '2025-09-30', 'business bay', 'business bay', 1400.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('c4c549bd-9ec6-4642-ba0c-8ba1cb86fd6e', 'cde86c3e-ef33-471e-b04d-badb00ec344b', 'df61908f-3002-42a6-b55d-877b10cf6894', '2025-09-01', '2025-09-02', '2025-09-30', 'Airport terminal', 'Airport terminal', 2800.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6f1ac204-0c06-401b-9ac7-26f1ac0d65c3', 'aa8f6057-8fa1-44b3-bf9b-7eb860edd459', '3f5020bd-fd79-4889-b125-487f9cb98b2b', '2025-09-01', '2025-09-02', '2025-09-23', 'business bay', 'business bay', 1050.00, NULL, NULL, 'Pending', 'Pending', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('8f89e216-b2bf-4472-b04c-95d612d451f9', '4a8e72b3-fcaa-466d-b39d-a84b4a310c59', '1c0ae19f-8b8b-441c-aea3-6f91705ac1a4', '2025-08-27', '2025-08-29', '2025-08-30', 'Al qusais', 'Al nahda', 120.00, NULL, NULL, 'Pending', 'Partial', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-14 11:12:20.212737+00'),
	('d5c819d3-9fc4-4115-a650-044602391627', 'a5b35a6c-2269-440f-a733-0e1a569e9a3d', '9fca6371-1ece-4f72-ba2d-ba5de439df36', '2025-09-14', '2025-09-25', '2025-10-01', 'asdf', 'asdf', 600.00, NULL, NULL, 'Active', 'Pending', '', '2025-09-14 11:12:48.672352+00', '2025-09-14 11:12:55.638164+00');


--
-- Data for Name: agreement; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: ai_document_processing; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."ai_document_processing" ("id", "document_name", "file_url", "file_type", "document_type", "processing_status", "upload_date", "processed_date", "ai_extracted_data", "reviewed_data", "confidence_scores", "processing_notes", "is_reviewed", "error_message", "processed_by", "created_at", "updated_at") VALUES
	('8e89a857-0542-43cc-a367-9ab5333213fd', '2025-06-00815.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/18a7fe400_2025-06-00815.pdf', 'application/pdf', 'Invoice', 'Completed', '2025-08-30 08:45:56.947+00', '2025-08-30 08:46:28.542+00', '{"items": [{"total": 5500, "quantity": 1, "unit_price": 5500, "description": "Waterproofing of two layers."}, {"total": -150, "quantity": 1, "unit_price": -150, "description": "Inspection charge deduction"}, {"total": -2287.5, "quantity": 1, "unit_price": -2287.5, "description": "Advance amount received"}], "currency": "AED", "due_date": "26 Jun 2025", "tax_amount": 275, "vendor_name": "FUTURE MICRA Services LLC", "invoice_date": "26 Jun 2025", "total_amount": 3337.5, "invoice_number": "2025-06-00815"}', '{"items": [{"total": 5500, "quantity": 1, "unit_price": 5500, "description": "Waterproofing of two layers."}, {"total": -150, "quantity": 1, "unit_price": -150, "description": "Inspection charge deduction"}, {"total": -2287.5, "quantity": 1, "unit_price": -2287.5, "description": "Advance amount received"}], "currency": "AED", "due_date": "26 Jun 2025", "tax_amount": 275, "vendor_name": "FUTURE MICRA Services LLC", "invoice_date": "26 Jun 2025", "total_amount": 3337.5, "invoice_number": "2025-06-00815"}', '{"items": 0.7377776268445952, "currency": 0.7462278545932612, "due_date": 0.7424009182943934, "tax_amount": 0.9425398021026463, "vendor_name": 0.8750834120867277, "invoice_date": 0.9551784689304866, "total_amount": 0.7963484740426529, "invoice_number": 0.8173448487512891}', NULL, true, NULL, 'lalchempakathinal@gmail.com', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('9b620949-b334-43d5-9e9d-159a86502317', 'P 61550.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/96b8b054d_P61550.pdf', 'application/pdf', 'License', 'Completed', '2025-08-30 08:51:52.472+00', '2025-08-30 08:52:13.03+00', '{"issue_date": "25-JUN-26", "expiry_date": "25-JUN-26", "holder_name": "MOHSIN ALI ZULIFQAR ALI", "license_type": "Vehicle Registration Card", "restrictions": "Changes to vehicle or owner information must be notified to licensing authority", "license_number": "P/61550", "issuing_authority": "UNITED ARAB EMIRATES MINISTRY OF INTERIOR"}', '{"issue_date": "25-JUN-26", "expiry_date": "25-JUN-26", "holder_name": "MOHSIN ALI ZULIFQAR ALI", "license_type": "Vehicle Registration Card", "restrictions": "Changes to vehicle or owner information must be notified to licensing authority", "license_number": "P/61550", "issuing_authority": "UNITED ARAB EMIRATES MINISTRY OF INTERIOR"}', '{"issue_date": 0.9753953550164702, "expiry_date": 0.8739967729628069, "holder_name": 0.7952661625865582, "license_type": 0.9992436758753225, "restrictions": 0.7345941866291039, "license_number": 0.9825045132386544, "issuing_authority": 0.823447678059876}', NULL, true, NULL, 'lalchempakathinal@gmail.com', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('59e9a83e-da90-4330-b917-a4fd466a3133', 'Hithesh Jayawardana Resume - backend.pdf', 'https://xvozdbgsvzgfnrqgngfe.supabase.co/storage/v1/object/public/VehicleImages/uploads/1757859968841_96amrnlnsqi.pdf', 'application/pdf', 'ID Document', 'Uploaded', '2025-09-14 14:26:09.497+00', NULL, NULL, NULL, NULL, '', false, NULL, NULL, '2025-09-14 14:26:09.731321+00', '2025-09-14 14:26:09.731321+00');


--
-- Data for Name: asset; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."asset" ("id", "asset_name", "purchase_date", "purchase_cost", "depreciation_method", "lifespan_years", "depreciation_start_date", "created_at", "updated_at") VALUES
	('8dfc8ce2-6aea-4073-b4cc-025cdf567727', 'Nissan Pathfinder', '2024-10-24', 45000.00, 'Straight-Line', 5, '2025-07-24', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: shift; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."shift" ("id", "name", "start_time", "end_time", "duration_hours", "created_at", "updated_at") VALUES
	('4a43589f-0fdb-43ff-a220-279d4dc99bc0', 'Morning shift', '08:00', '17:30', 9.50, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('db2e8844-6ff0-4b73-91cb-c166e5a6bfba', 'Night shift', '17:00', '02:00', 9.00, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."attendance" ("id", "employee_id", "date", "check_in_time", "check_out_time", "shift_id", "status", "working_hours", "overtime_hours", "notes", "created_at", "updated_at") VALUES
	('e3f6dbd5-a9d5-439c-81b6-d3481ef140e0', 'a4080594-7414-4bd1-a777-5e35e55336d6', '2025-08-27', '2025-08-27 08:00:00+00', NULL, '4a43589f-0fdb-43ff-a220-279d4dc99bc0', 'Present', NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('93e9c13d-90bf-46b3-aacc-17b4a5f3ffc6', '4438cd42-caf6-437d-8c57-b0254d367f45', '2025-08-27', '2025-08-27 08:00:00+00', NULL, '4a43589f-0fdb-43ff-a220-279d4dc99bc0', 'Present', NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0457a8cd-c662-4591-b043-e1b96ddd676a', 'a4080594-7414-4bd1-a777-5e35e55336d6', '2025-08-26', '2025-08-26 08:00:00+00', '2025-08-26 17:30:00+00', '4a43589f-0fdb-43ff-a220-279d4dc99bc0', 'Present', NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('dc9548d5-1f4f-42dd-8307-f56efd26a0eb', '79fc1e96-2995-4e15-81e4-715fbb4246e4', '2025-08-27', '2025-08-27 07:00:00+00', NULL, '4a43589f-0fdb-43ff-a220-279d4dc99bc0', 'Present', NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('bfa3f58f-e79b-4e1d-bd12-1fb35506beb5', '79fc1e96-2995-4e15-81e4-715fbb4246e4', '2025-08-26', '2025-08-26 17:00:00+00', '2025-08-26 03:00:00+00', 'db2e8844-6ff0-4b73-91cb-c166e5a6bfba', 'Present', NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: car_image; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."car_image" ("id", "image_set_id", "model_tag", "color_tag", "image_url", "notes", "created_at", "updated_at") VALUES
	('8e1d6b06-860d-404e-a021-5240f9dacaa3', 'Toyota Camry', 'Toyota-Camry', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e3e46be48_ToyotaCamryWhite.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6b463cf6-6203-4f02-917a-3cc13efb4dd5', 'Mitsubish-Attrage', 'Mitsubish-Attrage', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d46adda3d_MitsubishiAttrage.jpg', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('d7ffc926-b17e-4707-b4de-8a9aa417ab33', 'Nissan-Sunny', 'Nissan-Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/124cc26bf_NissanSunny.jpg', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0e6ae4d8-ab64-48d2-a531-607d1e19304b', 'Hyundai-Elantra', 'Hyundai-Elantra', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c6bf2624b_Hyundai-Elentra.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('1d94f0b4-e4ff-4349-bdeb-b8ea5b1b7b4e', 'Hyundai-Sonata', 'Hyundai-Sonata', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4a7ee9d80_Hyundai-Sonata.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('ac456240-05fb-49e5-a8ae-d2e1d123767e', 'Ford Expedition', 'Ford Expedition', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/bce8ade62_FordExpedition.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('53bf08b1-6b4d-4c5f-81b8-c360e1e1750c', 'Ford Explorer', 'Ford Explorer', 'Black', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e094828e3_FordExplorerblack.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4e76db41-0b27-4f81-9892-bc19fef842bc', 'Nissan Sunny', 'Nissan Sunny', 'Red', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2ffffd361_NissanSunnyRed.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('40f53b57-9977-42f5-9327-fbab378e8d4a', 'Nissan Sunny', 'Nissan Sunny', 'Blue', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/e4773b108_NissanSunnyBlue.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('dca2b1f4-236e-4ae0-a637-9457c5aca085', 'Nissan Sunny', 'Nissan Sunny', 'Gray', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d28751524_NissanSunnyGray.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('8e1ddf2a-e9b6-4d0e-903a-eb44c2742c8f', 'Nissan Sunny', 'Nissan Sunny', 'White', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/7260b9382_NissanSunnyWhite.jpg', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('34f667de-c107-4218-90b4-4554b839193f', 'NISSAN-PATHFINDER', 'NISSAN PATHFINDER', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/c62a4cc50_NISSANPATHFINDERWHITE2020.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('7005aafd-6dea-4e99-a584-9f134fee8c53', 'NISSAN-VERSA', 'NISSAN-VERSA', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/92f8a652d_NISSANVERSASILVER2020.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('226cd806-e89e-4058-983a-21dc64e76542', 'LEXUS-RX 450 H', 'LEXUS-RX 450 H', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/5e30f8167_LEXUSRX450HBLACK2012.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4fba7ba5-0022-488d-86a4-379b851cc29c', 'HONDA-CIVIC', 'HONDA-CIVIC', 'SILVER', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/265137982_HONDACIVICSILVER2020.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('62bef697-7425-42f0-8d14-2b504c8fd3c0', 'Chevrolet-MALIBU', 'Chevrolet-MALIBU', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a2849f6c8_ChevroletMALIBUBLACK2019.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('5e9fb9a2-d5ea-4575-827b-37290b0a1478', 'Nissan-Altima SE', 'Nissan-Altima SE', 'ORANGE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/19782052b_NISSANALTIMASEORANGE2020.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('514622e8-1a55-4d58-97a2-3b84cc21735d', 'Nissan-Altima SE', 'Nissan-Altima SE', 'GREY', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1eb090ffa_NISSANALTIMASEGREY2014.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('87ca64eb-46b8-4d0c-a6a4-57010d38a6b2', 'Nissan-Altima SE', 'Nissan-Altima SE', 'WHITE', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/2c577068b_NISSANALTIMASEWHITE2020.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0ea906cd-1fda-4dee-98d5-5ecea60bc6d4', 'TOYOTA COROLA', 'TOYOTA COROLA', 'BLACK', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/b3ed69b79_TOYOTACOROLABLACK.png', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: corporate_client; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."corporate_client" ("id", "company_name", "account_manager_id", "billing_agreement", "contacts", "notes", "created_at", "updated_at") VALUES
	('73343f7f-bf6f-4490-b2e5-a2dee240fe40', 'Future micra', NULL, '1. Billing
The Client agrees to be billed for all rental charges and associated fees incurred by its authorized employees. Invoices will be issued monthly and are due within 20  days of the invoice date.

2. Payment
Payment will be made via  bank / credit card. Late payments may be subject to a late fee of  1.5% per month.', '[{"name": "Zhang Wei", "role": "Manager ", "email": "zhang.wei@example.com", "phone": "583214567"}]', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('ade28317-af8e-45e6-8ca6-4f9e465ec38a', 'Future micra', NULL, 'Test', '[{"name": "Test1", "role": "Manager test", "email": "test@example.ioae", "phone": "566552258"}]', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b9db159e-bce3-44cd-9b1a-2996482be92a', 'Emirates Tech Solutions', 'placeholder-user-id-1', 'Net 30 payment terms, monthly invoicing', '[{"name": "Ali Hassan Al Maktoum", "role": "Fleet Manager", "email": "ali.hassan@emiratestech.com", "phone": "+971 4 123 4567"}, {"name": "Sarah Johnson", "role": "Procurement Head", "email": "sarah.johnson@emiratestech.com", "phone": "+971 4 123 4568"}]', 'Premium corporate client, requires luxury vehicle fleet', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('fd7ce5bb-2f84-44b6-84cc-6112019dd597', 'Dubai Business Hub', 'placeholder-user-id-2', 'Quarterly payment, bulk discount applicable', '[{"name": "Mohammed Al Rashid", "role": "CEO", "email": "mohammed@dubaibiz.com", "phone": "+971 4 234 5678"}]', 'Long-term client since 2020', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: customer_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."customer_document" ("id", "customer_id", "document_type", "document_part", "file_name", "file_url", "expiry_date", "is_verified", "created_at", "updated_at") VALUES
	('7320a82e-9ecf-41af-aef7-fb1926e2c619', 'f7a597ad-5ec1-4b3b-85a5-5e1e1fc52490', 'Driving License', 'Front', 'DL Ahmed khalid al mansoori', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/64070d005_NISSANVERSASILVER2020.png', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('7f757594-cbdc-4496-9afe-83151ac40323', 'a5b35a6c-2269-440f-a733-0e1a569e9a3d', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/65d584b16_NISSANPATHFINDERWHITE2020.png', '2026-05-27', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('fea207c2-e9be-4f9e-bead-a90497950037', 'a5b35a6c-2269-440f-a733-0e1a569e9a3d', 'Emirates ID', 'Front', 'emirated ID', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/26bb110dd_ChevroletMALIBUBLACK2019.png', '2026-08-18', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('7399d3db-4757-4b97-ac74-6c64eaba1385', '4580c21b-69c6-4c4d-be99-81870977ef22', 'Driving License', 'Front', 'test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/d1b8e46aa_NISSANPATHFINDERWHITE2020.png', '2026-08-01', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('ab71b98b-4e4c-4753-a273-87e2713458af', '4580c21b-69c6-4c4d-be99-81870977ef22', 'Driving License', 'main', 'LEXUS RX 450 H  BLACK 2012', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d6441074_LEXUSRX450HBLACK2012.png', '2026-02-05', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: deduction; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: employee; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."employee" ("id", "employee_id", "name", "email", "phone", "date_of_birth", "nationality", "gender", "address", "department", "designation", "join_date", "employment_type", "reporting_manager_id", "status", "base_salary", "passport_copy_url", "visa_page_url", "emirates_id_url", "other_documents", "created_at", "updated_at") VALUES
	('a4080594-7414-4bd1-a777-5e35e55336d6', 'EMP1001', 'Omar Khalid Hassan', 'omar.hassan@example.com', '+971502345678', '1991-03-15', NULL, 'Male', 'Al Nahda, Dubai', 'Marketing', 'Sales executive', '2025-05-15', 'Full-time', NULL, 'Active', 4000.00, NULL, NULL, NULL, '{}', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4438cd42-caf6-437d-8c57-b0254d367f45', 'EMP1002', 'John Michael Smith', 'john.smith@example.com', '+971551239876', '1990-11-02', NULL, 'Male', NULL, 'Marketing', 'Sales executive', '2025-04-20', 'Full-time', NULL, 'Active', 4000.00, NULL, NULL, NULL, '{}', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('79fc1e96-2995-4e15-81e4-715fbb4246e4', 'EMP1005', 'Ahmed Raza Khan', 'ahmed.khan@example.com', '+971543219876', '1994-12-25', NULL, 'Male', 'Jumeirah Lake Towers, Dubai', 'Operations', 'Driver', '2025-08-11', 'Full-time', NULL, 'Active', 2500.00, NULL, NULL, NULL, '{}', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."expense" ("id", "expense_date", "category", "description", "amount", "paid_to", "payment_method", "project_client", "receipt_url", "created_at", "updated_at") VALUES
	('a925e75f-106f-4040-ac76-03459bf65685', '2025-08-27', 'Utilities', 'DEWA', 1000.00, 'DEWA', 'Company Account', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('d981b2da-0467-4216-a3aa-1a7cd96ba574', '2025-08-27', 'Maintenance', 'Breakdown', 300.00, 'AutoGarage', 'Bank Transfer', 'P/76403', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('95c3fd55-5a37-4526-84e9-7826d549ab5b', '2025-08-27', 'Salaries', 'Driver salary', 2500.00, 'Driver', 'Company Account', 'P/61550', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('89d43dcc-059e-48ca-86a1-b14349f50990', '2025-08-27', 'Marketing', 'Google ads', 400.00, 'Google', 'Company Account', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0f72ac2c-eb05-4941-86a3-e3a33296aaab', '2025-08-27', 'Travel', 'Staff travel allowance', 100.00, 'Staff', 'Cash', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: fine_log; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: incident_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."incident_log" ("id", "vehicle_id", "incident_date", "type", "severity", "description", "photo_urls", "responsible_user_id", "status", "created_at", "updated_at") VALUES
	('080baadb-67bf-4115-bf10-adc40d1f80d7', 'db2449e5-a071-410a-8a96-f9fb70584f16', '2025-08-27 09:41:00+00', 'Mechanical Issue', 'Medium', 'Breakdown', '{}', NULL, 'Resolved', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4ca07957-6138-4463-9edc-9251d89b3d59', 'db2449e5-a071-410a-8a96-f9fb70584f16', '2025-08-27 09:42:00+00', 'Mechanical Issue', 'Medium', 'Breakdown', '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/8f375d216_WhatsAppImage2025-08-22at21538PM.jpeg}', NULL, 'Resolved', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('ae634098-f330-416f-8ed9-dc10d6b862d9', 'c521a998-6c13-4cc3-a271-22d4576c4df3', '2025-08-27 09:57:00+00', 'Mechanical Issue', 'Low', 'Tyre puncture', '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/a1a9373d9_NISSANALTIMASEORANGE2020.png}', NULL, 'Under Review', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('00954270-4d72-4128-a804-a5a7dacceb06', '3f5020bd-fd79-4889-b125-487f9cb98b2b', '2025-08-29 00:00:00+00', 'Accident', 'Low', 'breakdown', '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/863242177_NISSANPATHFINDERWHITE2020.png}', NULL, 'Resolved', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('e511ec62-0180-4ede-8cd2-9ef367e75472', '3161a3dc-9abc-4d1b-a1c5-95de8e44cd60', '2025-08-29 16:00:00+00', 'Mechanical Issue', 'Critical', 'breakdown', '{https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cb4d94844_NISSANVERSASILVER2020.png}', NULL, 'Resolved', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: lead; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."lead" ("id", "name", "email", "phone", "source", "status", "assigned_to_id", "notes", "created_at", "updated_at") VALUES
	('ffb82b0d-145c-4989-af72-ec8fe3bac4ce', 'Zhang Wei', 'zhang.wei@example.com', '583214567', 'website', 'New', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('641fc93f-f055-448d-ac29-3fd36c378e48', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0a811698-df7d-4689-8f67-d76fe9e2ea19', 'Zhang Wei', 'zhang.wei@example.com', '567654321', 'website', 'New', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6208e266-5b40-469b-9495-7029653fecfc', 'Ahmed Khalid Al Mansoori', 'ahmed.mansoori@example.com', '583214567', 'Social media', 'Won', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: interaction_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."interaction_log" ("id", "customer_id", "lead_id", "type", "notes", "sales_rep_id", "date", "created_at", "updated_at") VALUES
	('f2023b4e-444b-4e3e-b8ee-159a5dd89959', '82408aa6-e6d2-49bb-a382-abf89d2364e6', NULL, 'Note', 'aa', '6891f57922e817b10a5d63fc', '2025-08-11 08:53:43.59+00', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('cad64c21-1301-42a2-a369-ba6f4ab482bf', '82408aa6-e6d2-49bb-a382-abf89d2364e6', NULL, 'Note', 'a
a
a
a
a
a
a', '6891f57922e817b10a5d63fc', '2025-08-11 08:53:36.249+00', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('0b863c99-b1eb-4247-9613-a08991bd1f6b', '82408aa6-e6d2-49bb-a382-abf89d2364e6', NULL, 'Note', 'aaa', '6891f57922e817b10a5d63fc', '2025-08-11 08:53:59.74+00', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: inventory_part; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."inventory_part" ("id", "item_name", "category", "unit_cost", "quantity_available", "reorder_level", "supplier", "created_at", "updated_at") VALUES
	('d3a68293-ad7f-4ba8-8da4-42044a2abce2', 'Michelin 225/65 R17', 'Tyres', 450.00, 15, 5, 'TyreCo Dubai', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('2b42b3c9-3b6a-4d65-90c4-4e0be4101335', 'Air Filter', 'Filters', 120.00, 10, 5, 'AutoParts UAE', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('7406b2ea-cfdd-4259-8aff-0306f45e9939', 'Oil filter Bosch', 'Filters', 90.00, 12, 10, 'Tyre & Parts Co', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('71ad3b33-746c-4c7b-8323-b82020a7614f', 'Brake Pads (Front) Brembo', 'Brakes', 350.00, 30, 25, 'SpeedParts Dubai', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('4eae4bfb-b370-40b7-94c5-81a574d45978', 'Brake Pads (Rear) ATE', 'Brakes', 300.00, 35, 25, 'SpeedParts Dubai', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('be8b49be-3ce9-4f77-9d31-05a73059ece7', 'Tyre 285/60 R18 Goodyear', 'Tyres', 900.00, 10, 15, 'Desert tyres', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('bcbb232c-a21f-44df-ad62-71a5e6adadb7', 'Semi-Synthetic 10W-40 Castrol', 'Engine Oil', 140.00, 40, 50, 'OilMaster UAE', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('e7d95e3b-ed4c-422d-a93e-c7d2d0230a82', 'Front Bumper Nissan OEM', 'Body Parts', 1200.00, 5, 5, 'AutoBody UAE', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: invoice; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."invoice" ("id", "invoice_number", "client_id", "client_name", "client_email", "client_phone", "client_address", "invoice_date", "due_date", "rental_amount", "salik_qty", "salik_rate", "salik_amount", "traffic_fines_qty", "traffic_fines_rate", "traffic_fines_amount", "other_charges_qty", "other_charges_rate", "other_charges_amount", "other_charges_description", "subtotal", "vat_enabled", "vat_rate", "vat_amount", "total_amount", "status", "payment_terms", "notes", "payment_id", "booking_id", "vehicle_details", "rental_period", "created_at", "updated_at") VALUES
	('c03b33ad-3993-44c0-af05-9fdfc0ba2e5e', 'INV-2025-21536', '84454752-80ad-40eb-bfb5-0b6354c72b80', 'Unknown Customer', NULL, NULL, NULL, '2025-08-27', '2025-08-28', 100.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 100.00, true, 5.00, 5.00, 105.00, 'Paid', 'Net 30', NULL, NULL, '9da97111-04eb-42dd-9210-febeb1dba276', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('1d21efb3-e886-4c1e-8da4-bd710383eca9', 'INV-2025-17091', '4a8e72b3-fcaa-466d-b39d-a84b4a310c59', 'Michael Andrew Smith', NULL, NULL, NULL, '2025-08-31', '2025-09-15', 120.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 120.00, true, 5.00, 5.00, 125.00, 'Sent', 'Net 30', 'Invoice for Booking #3D92EB71', NULL, '8f89e216-b2bf-4472-b04c-95d612d451f9', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6566b072-5343-4906-a496-268efa662c5d', 'INV-2025-63474', '67e74177-62b4-4f2a-bb6c-bf1ffc19c9fe', 'Lexus Auto LLC', NULL, NULL, NULL, '2025-09-01', '2025-09-16', 300.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 300.00, true, 5.00, 5.00, 305.00, 'Sent', 'Net 30', 'Invoice for Booking #14C1F384', NULL, '4b71a451-a4fd-43c7-8bf9-ce648a1571c2', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('74dc8afd-7a11-446c-ae87-5157a28bfb28', 'INV-2025-88026', '381b1e79-a2a6-40f3-8de5-16c81cdd32b6', 'Roosewalt Pereira', NULL, NULL, NULL, '2025-09-01', '2025-09-16', 300.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 300.00, true, 5.00, 5.00, 305.00, 'Sent', 'Net 30', 'Invoice for Booking #4CE0838C', NULL, '08e649f2-fe9c-48a0-9224-e124bf8c0a21', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b268401e-a888-4cf9-9e48-5b29096d4ecd', 'INV-1756730056527', '381b1e79-a2a6-40f3-8de5-16c81cdd32b6', 'Roosewalt Pereira', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Sent', 'Net 30', 'Invoice for Booking #EB0ECC82', NULL, 'edc26d63-4422-4386-b81c-887b8a4cba8a', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('772a07b6-a31b-460b-93bd-adf86735fec5', 'INV-1756736447807', '39f090b8-0d29-4a5b-95e4-3957aaec30ba', 'DDD trading LLC', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #9DB71405', NULL, '90820a58-bf88-4b76-8b0d-b448fc51a51a', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('e9c3cbc7-d1b5-48b9-a56b-cc310661808b', 'INV-1756737440787', '734fff24-2a40-4d2d-8da1-f362a91eb913', 'Amazon Corp', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #05390BFF', NULL, 'b04a8d91-e1e4-42b2-8629-4b5f507ea3ad', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('f16d2456-b732-49ee-aaf6-4ca6842a77dd', 'INV-1756737868373', '804b8df4-850b-4ea6-bc32-96c3f4310ee7', 'ABCD LLC', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #53356FBC', NULL, '6b1008c1-969f-4fdc-aeb0-8c43a61745bd', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('506c0185-c379-48a9-a917-58dec052e766', 'INV-1756738388091', '553008e2-8f6e-4731-8d91-7d6e387bd8b8', 'Google enterprises', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #E48F3F8B', NULL, '0602ec60-4b33-4df8-98a4-784b611d7278', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('b4c68517-5502-4f03-9d5f-463b87095a71', 'INV-1756739156014', 'cde86c3e-ef33-471e-b04d-badb00ec344b', 'Google enterprises', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #CACBE81B', NULL, 'c4c549bd-9ec6-4642-ba0c-8ba1cb86fd6e', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('96bec0bc-329e-4abd-baa2-d11f32ce7b10', 'INV-1756740683249', 'aa8f6057-8fa1-44b3-bf9b-7eb860edd459', 'Amazon Corp', NULL, NULL, NULL, '2025-09-01', '2025-10-01', 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, 0, 0.00, 0.00, NULL, 0.00, true, 5.00, 0.00, 0.00, 'Draft', 'Net 30', 'Invoice for Booking #BF49053F', NULL, '6f1ac204-0c06-401b-9ac7-26f1ac0d65c3', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: leave_request; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."leave_request" ("id", "employee_id", "leave_type", "start_date", "end_date", "reason", "status", "manager_comment", "hr_comment", "created_at", "updated_at") VALUES
	('23d412a3-0af3-4831-a791-b77ffc3bd06c', '4438cd42-caf6-437d-8c57-b0254d367f45', 'Sick', '2025-08-25', '2025-08-26', 'Fever', 'Approved', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('e91f7a7c-7cb4-4884-a069-12cbe260e2c2', '79fc1e96-2995-4e15-81e4-715fbb4246e4', 'Casual', '2025-08-30', '2025-08-30', 'emergency', 'Rejected', NULL, 'emergency', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('5f1f5add-e2a0-4764-b385-134b34129ab6', '4438cd42-caf6-437d-8c57-b0254d367f45', 'Sick', '2025-08-29', '2025-08-29', 'sick', 'Approved', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: legal_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."legal_document" ("id", "category", "document_type", "document_name", "file_url", "file_type", "upload_date", "expiry_date", "description", "is_critical", "renewal_reminder_days", "responsible_department", "is_verified", "created_at", "updated_at") VALUES
	('8eacc9f7-7339-4c0b-a707-9fd624cdf173', 'Legal', 'Trade License', 'trade license', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/4c11441eb_AlJisrCarRentals-CompleteAPISpecification.pdf', 'application/pdf', '2025-08-30', NULL, NULL, true, 30, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: maintenance_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."maintenance_log" ("id", "vehicle_id", "service_date", "odometer_reading", "service_type", "vendor", "cost", "report_url", "notes", "next_service_due_date", "status", "created_at", "updated_at") VALUES
	('a022f0d6-905f-4270-ab20-d38f696f4303', 'db2449e5-a071-410a-8a96-f9fb70584f16', '2025-08-27', 245015, 'Inspection', NULL, 250.00, NULL, NULL, '2025-10-31', 'Upcoming', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('34a30cc6-2079-4da2-af5a-9c8c22d9cee2', 'df61908f-3002-42a6-b55d-877b10cf6894', '2025-08-27', 125456, 'Repair', NULL, 300.00, NULL, NULL, '2025-08-27', 'Upcoming', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('57bde121-5117-443b-af8a-4754ad97ec63', '3f5020bd-fd79-4889-b125-487f9cb98b2b', '2025-09-04', 123, 'Repair', '', 12.00, NULL, '', '2025-09-06', 'Upcoming', '2025-09-14 14:35:27.304963+00', '2025-09-14 14:35:27.304963+00');


--
-- Data for Name: marketing_campaign; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: payment; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payment" ("id", "payment_date", "counterpart", "amount", "method", "reference_no", "remarks", "created_at", "updated_at") VALUES
	('7f2d0241-44f9-4913-95b8-5cbfc5432b7f', '2025-08-26', 'Customer', 2500.00, 'Cash', NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: payroll; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."payroll" ("id", "employee_id", "month", "year", "base_salary", "overtime_pay", "deductions", "net_pay", "status", "processing_date", "created_at", "updated_at") VALUES
	('e8296588-31aa-4599-9e79-80ef3be0c8b7', 'a4080594-7414-4bd1-a777-5e35e55336d6', 8, 2025, 4000.00, NULL, NULL, 4000.00, 'Processed', '2025-08-27', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('01dc5c26-e5a3-445b-af4b-555a6e51a103', '4438cd42-caf6-437d-8c57-b0254d367f45', 8, 2025, 4000.00, NULL, NULL, 4000.00, 'Processed', '2025-08-27', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6dc767fe-f64c-4f8b-803f-c5c90a6d2482', '79fc1e96-2995-4e15-81e4-715fbb4246e4', 8, 2025, 2500.00, NULL, NULL, 2500.00, 'Processed', '2025-08-27', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: quotation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."quotation" ("id", "customer_id", "lead_id", "vehicle_details", "daily_rate", "start_date", "end_date", "total_amount", "validity_date", "terms_and_conditions", "status", "sales_rep_id", "created_at", "updated_at") VALUES
	('a7371fe2-7589-4b2f-a41f-808be0caeb78', '410f8600-f778-4d3b-aba8-273fdd293211', NULL, 'Versa', 100.00, '2025-08-29', '2025-08-30', 200.00, '2025-08-31', 'Standard rental terms and conditions apply.', 'Draft', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('feb3c0d7-396b-457b-ad61-b5c3edfd28f4', '44ea7aa9-cb3a-4b75-8c05-5e6610ed6d5f', NULL, 'Versa', 150.00, '2025-08-29', '2025-08-30', 300.00, '2025-08-29', 'Standard rental terms and conditions apply.', 'Rejected', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('96664ff2-0de3-4d1b-b6ae-63d7fdae1680', '6243eb36-5f34-482d-b267-185ac847d25a', NULL, 'toyota', 100.00, '2025-08-29', '2025-08-29', 100.00, '2025-08-29', 'Standard rental terms and conditions apply.', 'Sent', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('49a051e9-74fe-413e-a7bc-07f66ad3cb1e', '6243eb36-5f34-482d-b267-185ac847d25a', NULL, 'toyota', 100.00, '2025-08-29', '2025-08-29', 100.00, '2025-08-29', 'Standard rental terms and conditions apply.', 'Accepted', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: staff_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."staff_document" ("id", "employee_id", "document_type", "document_name", "file_url", "file_type", "upload_date", "expiry_date", "description", "is_confidential", "is_verified", "created_at", "updated_at") VALUES
	('6837b5af-ff7a-4276-9375-0824d70aad20', '4438cd42-caf6-437d-8c57-b0254d367f45', 'Employment Contract', 'Contract test', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/798974d01_toclaideforsuggestions.docx', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '2025-08-30', NULL, NULL, true, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');


--
-- Data for Name: user_access; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."user_access" ("id", "user_email", "accessible_modules", "created_at", "updated_at", "role") VALUES
	('bae15a9d-38e2-4b85-b63f-31f514a29674', 'mohsin57ali@gmail.com', '{Dashboard,Bookings,MobileBooking,Inquiries,Quotes,SalesOrders,Customers,Products,PriceLists,Vehicles,Drivers,Maintenance,FuelLog,VehicleDocuments,Employees,Payroll,Attendance,LeaveManagement,Invoices,Payments,Expenses,Accounts,Reports,Documents,Templates,BusinessInfo,UserAccessRules,APISettings,Branches}', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00', 'Staff'),
	('128afab5-067e-40b2-b7d0-c52b0634735d', 'mohsin57ali@gmail.com', '{Dashboard,Bookings,MobileBooking,Inquiries,Quotes,SalesOrders,Customers,Products,PriceLists,Vehicles,Drivers,Maintenance,FuelLog,VehicleDocuments,Employees,Payroll,Attendance,LeaveManagement,Invoices,Payments,Expenses,Accounts,Reports,Documents,Templates,BusinessInfo,UserAccessRules,APISettings,Branches}', '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00', 'Staff'),
	('6a4adbb1-4cd9-4b6c-b93c-bf25ac0bf1ef', 'rayovihj@gmail.com', '{Dashboard}', '2025-09-04 08:56:41.989217+00', '2025-09-04 08:56:41.989217+00', 'Staff'),
	('127ee2e7-b520-4026-87f2-f991a672650c', 'hitheshtube@gmail.com', '{Dashboard}', '2025-09-04 09:40:33.884934+00', '2025-09-04 09:40:33.884934+00', 'Staff'),
	('e2ae9447-55c0-4b68-9876-b59363e59f76', 'blogger.pereira@gmail.com', '{Customers,Marketing,Leads,CorporateClients,Quotations,SalesPerformance,FleetStatus,SalikFines,HREmployees,HRLeaveRequests,HRAttendance,HRPayroll,FinanceOverview,Expenses,Depreciation,Invoices,Reports,Inventory,Payments,TaxVAT,VehicleImageLibrary,StaffDocuments,VehicleDocuments,LegalDocuments,CustomerDocuments,AIDocumentProcessing,UserAccessRules,BusinessInfo,Branches,FleetManagement,DamageLogs,GPSTracking,FleetHealth,Contracts,APISettings,Dashboard,Bookings,MobileBooking,Inquiries,Quotes,Products,SalesOrders,PriceLists,Maintenance}', '2025-09-03 07:14:56.551062+00', '2025-09-05 06:09:49.306412+00', 'Management'),
	('9c5a7f01-d5f2-4b89-889c-b7c48add683b', 'lalsebastian@live.in', '{Dashboard}', '2025-09-09 06:56:29.497827+00', '2025-09-09 06:56:29.497827+00', 'Staff'),
	('53efdc9d-5f1d-4ef7-bd9a-21a60ccc424b', 'lalchempakathinal@gmail.com', '{MobileBooking,Dashboard,Bookings,Customers,Leads,Quotations,Marketing,CorporateClients,SalesPerformance,FleetStatus,FleetManagement,FleetHealth,FleetAnalyst,DamageLogs,Contracts,SalikFines,GPSTracking,HREmployees,HRAttendance,HRPayroll,HRLeaveRequests,FinanceOverview,Invoices,Payments,Expenses,Reports,TaxVAT,Depreciation,Inventory,VehicleImageLibrary,VehicleDocuments,CustomerDocuments,StaffDocuments,LegalDocuments,AIDocumentProcessing,BusinessInfo,UserAccessRules,APISettings,Branches}', '2025-09-03 07:14:56.551062+00', '2025-09-09 07:06:18.003387+00', 'Management'),
	('4e4f7e13-8c0c-4e2f-bebf-988c36592668', 'roosewalt@gmail.com', '{MobileBooking,Dashboard,Bookings,Customers,Leads,Quotations,Marketing,CorporateClients,SalesPerformance,FleetStatus,FleetManagement,FleetHealth,FleetAnalyst,DamageLogs,Contracts,SalikFines,GPSTracking,HREmployees,HRAttendance,HRPayroll,HRLeaveRequests,FinanceOverview,Invoices,Payments,Expenses,Reports,TaxVAT,Depreciation,Inventory,VehicleImageLibrary,VehicleDocuments,CustomerDocuments,StaffDocuments,LegalDocuments,AIDocumentProcessing,BusinessInfo,UserAccessRules,APISettings,Branches}', '2025-09-05 06:22:32.803713+00', '2025-09-14 07:53:40.20316+00', 'Management'),
	('9bcb8b7a-e008-48a1-97d0-47f14ba6e2c5', 'hithesh0215@gmail.com', '{MobileBooking,Dashboard,Bookings,Customers,Leads,Quotations,Marketing,CorporateClients,SalesPerformance,FleetStatus,FleetManagement,FleetHealth,FleetAnalyst,DamageLogs,Contracts,SalikFines,GPSTracking,HREmployees,HRAttendance,HRPayroll,HRLeaveRequests,FinanceOverview,Invoices,Payments,Expenses,Reports,TaxVAT,Depreciation,Inventory,VehicleImageLibrary,VehicleDocuments,CustomerDocuments,StaffDocuments,LegalDocuments,AIDocumentProcessing,BusinessInfo,UserAccessRules,APISettings,Branches}', '2025-09-03 07:14:56.551062+00', '2025-09-14 07:53:43.795416+00', 'Management');


--
-- Data for Name: vehicle_contract; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."vehicle_contract" ("id", "vehicle_id", "customer_name", "start_date", "end_date", "contract_value", "payment_terms", "document_url", "status", "booking_id", "created_at", "updated_at") VALUES
	('897c1c79-df1e-4c87-8eab-534683854b83', '9fca6371-1ece-4f72-ba2d-ba5de439df36', 'Ahmed Khalid Al Mansoori', '2025-09-17', '2026-09-17', 2500.00, '50% advance', NULL, 'Active', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('32f163a8-b7f4-4e17-9f57-6e9836b92dac', '3f5020bd-fd79-4889-b125-487f9cb98b2b', 'Test booking', '2025-08-29', '2025-10-29', 3000.00, NULL, 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/83ad19a94_AlJisrCarRentals-CompleteAPISpecification.pdf', 'Expired', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('6e3cd5e6-77ee-4680-b5cf-042b4e8232d8', '9fca6371-1ece-4f72-ba2d-ba5de439df36', 'Ahmed Khalid Al Mansoori', '2025-08-27', '2025-09-17', 2500.00, '50% advance', NULL, 'Active', NULL, '2025-09-03 07:14:56.551062+00', '2025-09-14 14:39:41.236767+00');


--
-- Data for Name: vehicle_document; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."vehicle_document" ("id", "vehicle_id", "document_type", "document_name", "file_url", "file_type", "upload_date", "expiry_date", "extracted_data", "license_plate_number", "registration_expiry_date", "registration_date", "insurance_expiry_date", "insurance_policy_number", "tc_number", "owner_name", "model_year", "country_of_origin", "vehicle_type", "chassis_number", "number_of_passengers", "place_of_issue", "notes", "is_verified", "created_at", "updated_at") VALUES
	('f14b7f99-5acf-44b6-aee1-41078a4f2f90', 'db2449e5-a071-410a-8a96-f9fb70584f16', 'Mulkia', 'M 61477.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/3d5794d60_M61477.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('364a55a8-5812-407f-9d0a-de6630abd3e5', 'db2449e5-a071-410a-8a96-f9fb70584f16', 'Insurance', 'ContractorAccessPermit_12-06-2025_5254637.pdf', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/cf2b60e60_ContractorAccessPermit_12-06-2025_5254637.pdf', 'application/pdf', '2025-08-27', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00'),
	('2d1877f6-e870-4be4-b1c5-372d8cf443d6', '3f5020bd-fd79-4889-b125-487f9cb98b2b', 'Mulkia', 'mulikia', 'https://base44.app/api/apps/6891f57922e817b10a5d63fb/files/1b0ddd80b_F20428.pdf', 'pdf', '2025-08-29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-09-03 07:14:56.551062+00', '2025-09-03 07:14:56.551062+00');










--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

-- INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
-- 	('VehicleImages', 'VehicleImages', NULL, '2025-09-03 11:39:42.638177+00', '2025-09-03 11:39:42.638177+00', true, false, 10485760, '{image/jpeg,image/png,image/gif,image/webp,application/pdf,image/jpg}', NULL, 'STANDARD');



-- --
-- -- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --

-- INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") VALUES
-- 	('b85066f2-3977-45f4-9ae1-f0f7b36b4e05', 'VehicleImages', 'uploads/1757859968841_96amrnlnsqi.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00', '{"eTag": "\"2e585a492bb40daa4610308b6d19f1a5\"", "size": 450343, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:26:10.000Z", "contentLength": 450343, "httpStatusCode": 200}', '6e3ccf77-050d-4b8f-bc86-6d376fc04b4f', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2),
-- 	('3fb9d8f7-c75f-474c-a126-1a8a5aac4804', 'VehicleImages', 'uploads/1757860837847_d4sylcsqx3.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:40:38.766166+00', '2025-09-14 14:40:38.766166+00', '2025-09-14 14:40:38.766166+00', '{"eTag": "\"18f74db5fbacd260d093d0b5a0496db6\"", "size": 227284, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:40:39.000Z", "contentLength": 227284, "httpStatusCode": 200}', '6e98eb88-5ad3-46de-b5d7-7cf5de78aa52', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2),
-- 	('91ea5fb9-ba15-4e9a-8190-8418e66934eb', 'VehicleImages', 'maintenance-reports/1757860912328_1a659kdsuvy.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00', '{"eTag": "\"568da608e420f164fe4d05fe037ff16f\"", "size": 461775, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:41:54.000Z", "contentLength": 461775, "httpStatusCode": 200}', '63cf23f9-e8cd-4525-af4a-5f24d72c1ce2', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2);

-- --
-- -- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
-- --

-- INSERT INTO "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") VALUES
-- 	('VehicleImages', 'uploads', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00'),
-- 	('VehicleImages', 'maintenance-reports', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00');
--
-- PostgreSQL database dump complete
--

RESET ALL;
