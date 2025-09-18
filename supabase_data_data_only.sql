
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
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', 'f01d75e9-5248-43e5-a5b7-24b6c400f0ec', '{"action":"user_confirmation_requested","actor_id":"0f5d41bd-9671-4f0b-a1ac-b9b88e584160","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 08:37:05.382403+00', ''),
	('00000000-0000-0000-0000-000000000000', '9f8121e0-8820-4d45-8ee5-18b59071d7da', '{"action":"user_confirmation_requested","actor_id":"0f5d41bd-9671-4f0b-a1ac-b9b88e584160","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 08:43:42.438393+00', ''),
	('00000000-0000-0000-0000-000000000000', '12532fbe-e537-4468-a908-b476e7f2cfa0', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hithesh0215@gmail.com","user_id":"0f5d41bd-9671-4f0b-a1ac-b9b88e584160","user_phone":""}}', '2025-09-03 08:43:57.536994+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a4c4098-d51b-4c37-97a7-2e2b18674e58', '{"action":"user_confirmation_requested","actor_id":"bd003193-c4ef-4eaa-bdad-ce298ecf07f9","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 08:44:09.578512+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e545ec5-736d-4fc6-a06b-2905e84d90db', '{"action":"user_confirmation_requested","actor_id":"bd003193-c4ef-4eaa-bdad-ce298ecf07f9","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 09:04:28.691957+00', ''),
	('00000000-0000-0000-0000-000000000000', '087c2f46-a101-47c1-815b-443e4b7d21f0', '{"action":"user_confirmation_requested","actor_id":"bd003193-c4ef-4eaa-bdad-ce298ecf07f9","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 09:05:43.822888+00', ''),
	('00000000-0000-0000-0000-000000000000', '14d6fc89-4109-4691-8be9-cad0d130c6c0', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hithesh0215@gmail.com","user_id":"bd003193-c4ef-4eaa-bdad-ce298ecf07f9","user_phone":""}}', '2025-09-03 09:08:03.553259+00', ''),
	('00000000-0000-0000-0000-000000000000', '682241dd-b88f-4e45-abe8-71a5bad792fe', '{"action":"user_confirmation_requested","actor_id":"d7ebb844-fd47-4085-ab69-89e184b36243","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 09:08:14.184824+00', ''),
	('00000000-0000-0000-0000-000000000000', '4aac2f84-9e55-4ad4-b628-bbd34706cd41', '{"action":"user_confirmation_requested","actor_id":"ff53191c-3c1a-4b39-bf5a-1fd901320998","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 09:09:20.684004+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a08cda39-c164-44e7-a7be-affcaab0e9e2', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hitheshtube@gmail.com","user_id":"ff53191c-3c1a-4b39-bf5a-1fd901320998","user_phone":""}}', '2025-09-03 10:01:53.735758+00', ''),
	('00000000-0000-0000-0000-000000000000', '05f7ce2d-89aa-4049-bdba-26d043daaa95', '{"action":"user_confirmation_requested","actor_id":"cf3d210a-f48b-41cd-9aea-3520c54df7dd","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 10:03:25.123656+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d79e25d-b4f1-432b-a533-a58251e922dc', '{"action":"user_signedup","actor_id":"cf3d210a-f48b-41cd-9aea-3520c54df7dd","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-03 10:03:39.724779+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aa0b7905-2b60-4267-b92d-76c2bac71842', '{"action":"user_confirmation_requested","actor_id":"64288611-392d-4d0d-9fb2-45bb20651832","actor_username":"zendymelania@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 10:16:23.647815+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ab0ba82-097b-4a7f-ae82-10e36670e030', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hithesh0215@gmail.com","user_id":"d7ebb844-fd47-4085-ab69-89e184b36243","user_phone":""}}', '2025-09-03 11:09:56.695717+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0453f66-fb82-4291-95c3-132402866ac0', '{"action":"user_confirmation_requested","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-03 11:10:12.687434+00', ''),
	('00000000-0000-0000-0000-000000000000', '73204152-a776-4076-a564-b78106543760', '{"action":"user_signedup","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-03 11:10:25.189152+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd9711adb-5fb3-4b01-9c3c-65d25ce83877', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-03 11:12:18.870675+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b2ee7107-8ddd-4a9a-8542-33fca9d37579', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-03 11:18:32.337791+00', ''),
	('00000000-0000-0000-0000-000000000000', '3c0531e2-f580-4a7d-bf6c-7de270a5a845', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-03 13:19:18.73316+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb64a467-554c-4351-81a8-20d653adb39b', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 05:10:52.358267+00', ''),
	('00000000-0000-0000-0000-000000000000', '27dc4c32-42bb-48a9-a84b-247656503686', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 05:10:52.359614+00', ''),
	('00000000-0000-0000-0000-000000000000', '119ef16b-e234-4470-8fad-1f19ebed5078', '{"action":"user_repeated_signup","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 05:11:33.846958+00', ''),
	('00000000-0000-0000-0000-000000000000', '2cf8ef96-cf71-4b24-a5f7-a32803947112', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 05:12:03.231432+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aec960aa-8265-498d-a515-9b737860864f', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 05:14:31.57532+00', ''),
	('00000000-0000-0000-0000-000000000000', '05bdff29-7dcd-4c4f-96e6-0349cbe75172', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hitheshtube@gmail.com","user_id":"cf3d210a-f48b-41cd-9aea-3520c54df7dd","user_phone":""}}', '2025-09-04 05:15:15.684698+00', ''),
	('00000000-0000-0000-0000-000000000000', '0739a4ac-eb2a-4aeb-a472-921492aac776', '{"action":"user_confirmation_requested","actor_id":"0497a39c-55b6-4c46-b28b-1bcce1219f67","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 05:16:27.425252+00', ''),
	('00000000-0000-0000-0000-000000000000', '46feb5e0-f6eb-4119-97c5-cc9b5c72f9df', '{"action":"user_confirmation_requested","actor_id":"0497a39c-55b6-4c46-b28b-1bcce1219f67","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 05:17:30.290867+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f56c48a6-555e-4308-837b-607bb353b82c', '{"action":"user_signedup","actor_id":"0497a39c-55b6-4c46-b28b-1bcce1219f67","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 05:17:44.990108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9945c17-5ad2-48bf-be95-b8e95023c52d', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 05:20:51.683966+00', ''),
	('00000000-0000-0000-0000-000000000000', '1fac4d61-6fcc-4c8f-8bbf-f5b3137a4f90', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 05:20:51.685008+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a1691179-8136-410e-8c37-96ae46b210d5', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hitheshtube@gmail.com","user_id":"0497a39c-55b6-4c46-b28b-1bcce1219f67","user_phone":""}}', '2025-09-04 05:21:26.058803+00', ''),
	('00000000-0000-0000-0000-000000000000', '4d2f6460-89b4-4ae5-9c31-0bc6776433ce', '{"action":"user_confirmation_requested","actor_id":"6f75d25c-5579-436c-a411-da6bb250aa97","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 05:22:21.793589+00', ''),
	('00000000-0000-0000-0000-000000000000', '3fd0033c-ad93-4cb7-9db5-3c11adfdcea9', '{"action":"user_signedup","actor_id":"6f75d25c-5579-436c-a411-da6bb250aa97","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 05:22:38.104395+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b33ee23-1f17-4372-b054-2a39ca3b2d7d', '{"action":"login","actor_id":"6f75d25c-5579-436c-a411-da6bb250aa97","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 05:22:49.984362+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f379842f-f697-47d1-a26a-236d1b919601', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 05:25:32.182284+00', ''),
	('00000000-0000-0000-0000-000000000000', 'baeabd46-2e0d-4052-bb67-21d37dbe5d86', '{"action":"user_confirmation_requested","actor_id":"5121b50d-4418-4e86-82c4-22fa6e08edab","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 05:32:17.435889+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4f2b466-5641-4747-a6e2-5f0cb0a9c426', '{"action":"user_signedup","actor_id":"5121b50d-4418-4e86-82c4-22fa6e08edab","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 05:32:29.005204+00', ''),
	('00000000-0000-0000-0000-000000000000', '8702f54f-d414-4926-ace8-978000e106ee', '{"action":"user_confirmation_requested","actor_id":"ef0f2b8a-0257-4ad6-8378-e68b9d12c10b","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 06:10:02.206778+00', ''),
	('00000000-0000-0000-0000-000000000000', '0455f65c-fedd-4ed2-a105-429bed67c667', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:21:50.883708+00', ''),
	('00000000-0000-0000-0000-000000000000', '57e41d6a-5da4-45cc-97ad-14cf46b8e080', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:25:10.590205+00', ''),
	('00000000-0000-0000-0000-000000000000', '4e2a4c29-1fa0-45db-9182-c9d6940f14ca', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:33:27.874694+00', ''),
	('00000000-0000-0000-0000-000000000000', '3f6551f2-7eb1-4797-8d94-9f92e88a972d', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:36:15.221036+00', ''),
	('00000000-0000-0000-0000-000000000000', '417e0ff5-3144-4df7-8ed7-c07dba8f6267', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:37:32.139065+00', ''),
	('00000000-0000-0000-0000-000000000000', '64135980-2744-4c7a-9b07-70269d10452e', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 06:40:52.279774+00', ''),
	('00000000-0000-0000-0000-000000000000', '0021e95f-0f2c-4295-870e-9a92b824fd2f', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"roosewalt@gmail.com","user_id":"ef0f2b8a-0257-4ad6-8378-e68b9d12c10b","user_phone":""}}', '2025-09-04 06:42:25.78043+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ea3f7d00-d5cc-4db8-8ab1-852960af95b0', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 07:05:03.738364+00', ''),
	('00000000-0000-0000-0000-000000000000', 'acf1fc91-cb40-4a1a-9012-445e3f457bf2', '{"action":"user_confirmation_requested","actor_id":"46815288-307e-44ae-920c-42333268e4e4","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 07:18:29.737739+00', ''),
	('00000000-0000-0000-0000-000000000000', '35f51f15-a220-4759-a7e8-881b0eb2b74f', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"roosewalt@gmail.com","user_id":"46815288-307e-44ae-920c-42333268e4e4","user_phone":""}}', '2025-09-04 07:18:51.559087+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb775231-1a71-406b-ada3-041792c9c8fa', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 07:21:56.850646+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e8ba4d88-4b40-4127-b284-2cd3f0ccaa46', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hitheshtube@gmail.com","user_id":"6f75d25c-5579-436c-a411-da6bb250aa97","user_phone":""}}', '2025-09-04 07:22:25.037505+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bacf1991-3611-4ba1-9929-efa17e92546a', '{"action":"user_confirmation_requested","actor_id":"519f14fe-ff56-4a26-8585-c3540ca9843d","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 07:22:33.994668+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e759030e-b705-4a3e-95c6-ffafcb3a6305', '{"action":"user_signedup","actor_id":"519f14fe-ff56-4a26-8585-c3540ca9843d","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 07:23:12.506495+00', ''),
	('00000000-0000-0000-0000-000000000000', '0998f927-8356-45f4-a74a-973b6603f3bf', '{"action":"user_confirmation_requested","actor_id":"e93a2d3b-bae9-45d6-9b07-5aa62921545f","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 07:52:31.213207+00', ''),
	('00000000-0000-0000-0000-000000000000', '30fd2d0f-93a6-4555-969f-dd0ed3091913', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"roosewalt@gmail.com","user_id":"e93a2d3b-bae9-45d6-9b07-5aa62921545f","user_phone":""}}', '2025-09-04 07:54:57.154689+00', ''),
	('00000000-0000-0000-0000-000000000000', '76e1fd81-010d-4c9a-bea5-6ef9ac0a7dcd', '{"action":"user_confirmation_requested","actor_id":"461681b5-87b3-4b5a-8e98-943f6b31be37","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 07:55:05.020895+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4978d58-a211-44e4-be1a-3405cd0c840b', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmail.com","user_id":"5121b50d-4418-4e86-82c4-22fa6e08edab","user_phone":""}}', '2025-09-04 07:55:25.874587+00', ''),
	('00000000-0000-0000-0000-000000000000', '383e49a2-0b81-4840-b153-8b4f3d3b3430', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"zendymelania@gmail.com","user_id":"64288611-392d-4d0d-9fb2-45bb20651832","user_phone":""}}', '2025-09-04 07:55:25.897332+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c84ecdb8-1eba-42ed-8d52-70ef70a3e328', '{"action":"user_confirmation_requested","actor_id":"785240e3-426c-4c51-afd3-02ce817f1485","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 07:55:45.413364+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fecc2437-f269-47e4-878d-804500ece20a', '{"action":"user_signedup","actor_id":"785240e3-426c-4c51-afd3-02ce817f1485","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 07:55:57.257908+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ee7eebaf-9d0e-4093-a6ed-a5e8818e9ff9', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 07:58:19.632826+00', ''),
	('00000000-0000-0000-0000-000000000000', '036d3629-1a1a-452c-a414-cda889275635', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmail.com","user_id":"785240e3-426c-4c51-afd3-02ce817f1485","user_phone":""}}', '2025-09-04 08:24:14.509772+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a85d8e55-bdbe-4d30-9d53-65bbb8e6fa82', '{"action":"user_confirmation_requested","actor_id":"e2ba6738-d9d7-44f9-a170-d71f698ab6d3","actor_username":"rayovihj@gmai.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 08:24:31.589291+00', ''),
	('00000000-0000-0000-0000-000000000000', '89a63cf9-1b2d-4c38-92b8-28a2b8508861', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"roosewalt@gmail.com","user_id":"461681b5-87b3-4b5a-8e98-943f6b31be37","user_phone":""}}', '2025-09-04 08:26:14.914189+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f0c4616-e09e-4995-8178-73a84761d766', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmai.com","user_id":"e2ba6738-d9d7-44f9-a170-d71f698ab6d3","user_phone":""}}', '2025-09-04 08:26:49.149514+00', ''),
	('00000000-0000-0000-0000-000000000000', '3d5d0a68-bc61-4381-890a-652e472dca81', '{"action":"user_confirmation_requested","actor_id":"e440cb7a-0700-411f-9c8b-9a051f34d492","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 08:27:06.576013+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b57ce122-b879-49c0-af5a-0fa0c039f5aa', '{"action":"user_signedup","actor_id":"e440cb7a-0700-411f-9c8b-9a051f34d492","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 08:27:48.531463+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b81732f-363d-4387-817c-3032d5ae744b', '{"action":"login","actor_id":"e440cb7a-0700-411f-9c8b-9a051f34d492","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 08:28:25.05446+00', ''),
	('00000000-0000-0000-0000-000000000000', '4dc44ea7-1ab1-47d8-b07b-f3dd18081c02', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmail.com","user_id":"e440cb7a-0700-411f-9c8b-9a051f34d492","user_phone":""}}', '2025-09-04 08:43:01.755126+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb5a153d-1d3d-4580-800c-e0c5ca22cc21', '{"action":"user_confirmation_requested","actor_id":"0e1de6f2-4264-4235-b083-57f046954308","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 08:43:26.20537+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aac51932-9cd0-4014-bcfd-5c3283a789b6', '{"action":"user_signedup","actor_id":"0e1de6f2-4264-4235-b083-57f046954308","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 08:46:52.260801+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ca8ffc7b-c4d5-4e86-9207-825023a9bf46', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmail.com","user_id":"0e1de6f2-4264-4235-b083-57f046954308","user_phone":""}}', '2025-09-04 08:50:40.488359+00', ''),
	('00000000-0000-0000-0000-000000000000', '8db3b46f-90af-4fc9-be76-070e9713474c', '{"action":"user_confirmation_requested","actor_id":"690dec63-2885-47c0-8b10-a3d757d1d621","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 08:51:32.115525+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c3f55c8b-59a1-47d7-9f17-14a1631bdc93', '{"action":"user_signedup","actor_id":"690dec63-2885-47c0-8b10-a3d757d1d621","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 08:51:43.357618+00', ''),
	('00000000-0000-0000-0000-000000000000', '5e126217-fa23-4f88-95d8-4e60820b1397', '{"action":"login","actor_id":"690dec63-2885-47c0-8b10-a3d757d1d621","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 08:51:54.860486+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c34cfe99-fc0c-4da0-a8aa-a7289d3e0489', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"rayovihj@gmail.com","user_id":"690dec63-2885-47c0-8b10-a3d757d1d621","user_phone":""}}', '2025-09-04 08:55:36.222338+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e9c6ebb-60e6-4c03-9f30-397c0c40cdcb', '{"action":"user_confirmation_requested","actor_id":"5a439cc3-022e-4c60-9522-2b6cd086dc1b","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 08:56:17.777374+00', ''),
	('00000000-0000-0000-0000-000000000000', 'af544993-9834-4beb-89d9-a47a875fd895', '{"action":"user_signedup","actor_id":"5a439cc3-022e-4c60-9522-2b6cd086dc1b","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 08:56:32.72969+00', ''),
	('00000000-0000-0000-0000-000000000000', '9bcee33a-d351-486d-ad0c-f8baba202a89', '{"action":"login","actor_id":"5a439cc3-022e-4c60-9522-2b6cd086dc1b","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 08:56:41.612221+00', ''),
	('00000000-0000-0000-0000-000000000000', '6d607d81-c0a6-404e-891d-2e45a6e8fa4d', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 08:58:22.100586+00', ''),
	('00000000-0000-0000-0000-000000000000', '61618fdc-8200-4895-aa46-b4a07b8eb210', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-04 08:58:22.102176+00', ''),
	('00000000-0000-0000-0000-000000000000', '6e4b4587-4988-42e7-9459-6be783295d8b', '{"action":"login","actor_id":"5a439cc3-022e-4c60-9522-2b6cd086dc1b","actor_username":"rayovihj@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 09:14:06.139869+00', ''),
	('00000000-0000-0000-0000-000000000000', '29c4ed4e-c7c9-4ac6-9c20-f81ef0ab5bee', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 09:15:30.372885+00', ''),
	('00000000-0000-0000-0000-000000000000', '96fb8231-d7da-4fc8-b827-662ca14bd7fe', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 09:36:36.664689+00', ''),
	('00000000-0000-0000-0000-000000000000', '45b57eb4-0f1c-4da8-9e63-99d17ed54b09', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"hitheshtube@gmail.com","user_id":"519f14fe-ff56-4a26-8585-c3540ca9843d","user_phone":""}}', '2025-09-04 09:36:59.564303+00', ''),
	('00000000-0000-0000-0000-000000000000', '9ec80e7d-17bd-49ae-a26e-1e9a3b8b0da8', '{"action":"user_confirmation_requested","actor_id":"dd123875-127d-4b03-8c65-5ae3e2f61689","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-04 09:40:01.051823+00', ''),
	('00000000-0000-0000-0000-000000000000', '45ea9182-038d-4dd3-94f6-4321cd3b1d23', '{"action":"user_signedup","actor_id":"dd123875-127d-4b03-8c65-5ae3e2f61689","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-04 09:40:19.62775+00', ''),
	('00000000-0000-0000-0000-000000000000', '264aa0cb-9160-4e5c-b1db-b0f41c7ca183', '{"action":"login","actor_id":"dd123875-127d-4b03-8c65-5ae3e2f61689","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-04 09:40:33.470678+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2083c54-9600-4147-b176-7514cd824ec6', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"roosewalt@gmail.com","user_id":"12655669-ee10-411f-8d12-a7070288a670","user_phone":""}}', '2025-09-04 16:11:49.290737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a4bb169f-be3f-41f3-bd5e-68b1bd0b295b', '{"action":"user_recovery_requested","actor_id":"12655669-ee10-411f-8d12-a7070288a670","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user"}', '2025-09-05 03:35:06.142006+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1f03773-630a-4a7a-bea0-3f907f5f83e8', '{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"info@ansearly.io","user_id":"8fbbdfb6-9d55-487a-9414-5b94c1824eb7"}}', '2025-09-05 03:59:27.112779+00', ''),
	('00000000-0000-0000-0000-000000000000', '894a5b00-73e7-4cb2-9f25-807052cd43ab', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"info@ansearly.io","user_id":"8fbbdfb6-9d55-487a-9414-5b94c1824eb7","user_phone":""}}', '2025-09-05 04:03:26.993652+00', ''),
	('00000000-0000-0000-0000-000000000000', '5db8e1f7-ece4-4a73-b463-210be8a36e77', '{"action":"user_invited","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"info@ansearly.io","user_id":"42c9cbe5-c608-4c15-8d8f-06ec5e5e4dcb"}}', '2025-09-05 04:03:36.516642+00', ''),
	('00000000-0000-0000-0000-000000000000', '85396fa1-3618-48c0-be77-18f2c333cfd1', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"info@ansearly.io","user_id":"42c9cbe5-c608-4c15-8d8f-06ec5e5e4dcb","user_phone":""}}', '2025-09-05 05:20:56.413271+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd6782f80-d154-4f69-a550-1af6333e13cf', '{"action":"user_deleted","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"user_email":"roosewalt@gmail.com","user_id":"12655669-ee10-411f-8d12-a7070288a670","user_phone":""}}', '2025-09-05 05:21:04.113411+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ed72cd9-851e-4520-bd91-d278ece32dec', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 05:44:28.892702+00', ''),
	('00000000-0000-0000-0000-000000000000', '1d58290b-1e95-49a2-b13d-02dc76350e24', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 05:44:28.894652+00', ''),
	('00000000-0000-0000-0000-000000000000', 'adf070a9-bc64-4776-a9eb-2047ee52fc02', '{"action":"user_signedup","actor_id":"00000000-0000-0000-0000-000000000000","actor_username":"service_role","actor_via_sso":false,"log_type":"team","traits":{"provider":"email","user_email":"blogger.pereira@gmail.com","user_id":"b58df48b-a460-469e-b539-333706ed62b8","user_phone":""}}', '2025-09-05 06:12:45.009107+00', ''),
	('00000000-0000-0000-0000-000000000000', '1ac9abfb-ab68-4942-bad4-0d79899717e9', '{"action":"token_refreshed","actor_id":"dd123875-127d-4b03-8c65-5ae3e2f61689","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 06:21:06.857086+00', ''),
	('00000000-0000-0000-0000-000000000000', '4760f61f-6183-4619-b790-f6946b0d67f2', '{"action":"token_revoked","actor_id":"dd123875-127d-4b03-8c65-5ae3e2f61689","actor_username":"hitheshtube@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 06:21:06.858651+00', ''),
	('00000000-0000-0000-0000-000000000000', '73131c29-cba1-41ae-8b93-e9b2c16a815c', '{"action":"user_confirmation_requested","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-05 06:22:00.412412+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3c28a12-1125-4928-a112-83eebb2fee0a', '{"action":"user_signedup","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-05 06:22:24.154852+00', ''),
	('00000000-0000-0000-0000-000000000000', '3a5ce7b1-ac4c-4196-8310-0865b087aa68', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-05 06:22:32.439487+00', ''),
	('00000000-0000-0000-0000-000000000000', '5ecd24a9-68d8-4445-8bc2-59721da6f123', '{"action":"user_repeated_signup","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-05 07:22:12.451766+00', ''),
	('00000000-0000-0000-0000-000000000000', '2b5ad325-9db5-40ee-815c-2efa733cfbfd', '{"action":"user_confirmation_requested","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-05 07:23:23.808011+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c05cafc3-5436-4c51-a05a-efb90d246e77', '{"action":"user_signedup","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-05 07:24:05.589342+00', ''),
	('00000000-0000-0000-0000-000000000000', '9c272977-c5fa-419b-be95-a6d9f71eae31', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-05 07:24:08.094102+00', ''),
	('00000000-0000-0000-0000-000000000000', '2476c61b-5b43-4003-9c76-2483a94e1d53', '{"action":"login","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-05 07:24:14.952236+00', ''),
	('00000000-0000-0000-0000-000000000000', '03b8d839-532d-4b3d-bef7-f6df8b45e643', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 08:25:02.137038+00', ''),
	('00000000-0000-0000-0000-000000000000', 'beca13e0-3c20-4585-9db2-ed53fe9932a2', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 08:25:02.139106+00', ''),
	('00000000-0000-0000-0000-000000000000', '2e88e990-3d91-49e4-8a54-ae3a9ef03987', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 09:33:20.122658+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a3cb325b-6586-45cd-b128-22118073a914', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 09:33:20.125036+00', ''),
	('00000000-0000-0000-0000-000000000000', '8f12cf22-f2d6-492a-b72c-4a33c8087f41', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 15:25:59.291102+00', ''),
	('00000000-0000-0000-0000-000000000000', '0a3f51fb-da3d-43a6-a673-fad74cd189bd', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-05 15:25:59.293465+00', ''),
	('00000000-0000-0000-0000-000000000000', '73a696ed-2611-4f80-8c0d-cf6166b45f27', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-06 06:32:40.570809+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a133aaa4-ccab-46f8-af16-36daf33b3972', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-06 06:32:40.572017+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd728b38d-320c-4ae8-9acf-e3fb36e55351', '{"action":"user_repeated_signup","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-09 06:50:36.005725+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ebbf07c-31f1-46f7-989e-5f3be3e51ed0', '{"action":"user_confirmation_requested","actor_id":"ce4346f3-480d-41e7-b3e7-5b877c551f49","actor_username":"lalsebastian@live.in","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-09 06:54:52.611466+00', ''),
	('00000000-0000-0000-0000-000000000000', '2d278497-86f9-4ad3-947b-a9893ca9fcdd', '{"action":"user_signedup","actor_id":"ce4346f3-480d-41e7-b3e7-5b877c551f49","actor_username":"lalsebastian@live.in","actor_via_sso":false,"log_type":"team","traits":{"provider":"email"}}', '2025-09-09 06:56:06.468714+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fa85ba02-1b65-471e-aad8-37ad6d257553', '{"action":"login","actor_id":"ce4346f3-480d-41e7-b3e7-5b877c551f49","actor_username":"lalsebastian@live.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-09 06:56:23.906226+00', ''),
	('00000000-0000-0000-0000-000000000000', '39e21b4d-8aab-407d-bd98-302d347337cb', '{"action":"login","actor_id":"ce4346f3-480d-41e7-b3e7-5b877c551f49","actor_username":"lalsebastian@live.in","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-09 07:02:11.595778+00', ''),
	('00000000-0000-0000-0000-000000000000', '93aa7cff-5ab1-4dc2-81d8-ee8b30fc91a1', '{"action":"user_repeated_signup","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-09 07:07:45.831141+00', ''),
	('00000000-0000-0000-0000-000000000000', '37557e0c-2587-49bf-b0cd-631a9cc50cf3', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 07:08:22.710902+00', ''),
	('00000000-0000-0000-0000-000000000000', '315eb84a-ac5a-4b21-840d-4df5980fbff7', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 07:08:22.712023+00', ''),
	('00000000-0000-0000-0000-000000000000', '4ccc3b3a-7ef1-439a-b02d-4bd6db28f351', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-09 07:09:55.996716+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7c40fac-69fe-4a39-86d1-e23a28e1a8cb', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-09 07:12:20.161799+00', ''),
	('00000000-0000-0000-0000-000000000000', '232a01a2-5f3b-4f36-a98c-b768c4e0e3e0', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 08:11:14.630505+00', ''),
	('00000000-0000-0000-0000-000000000000', '06116557-a8cf-46bb-865d-9d92eed62de8', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 08:11:14.632743+00', ''),
	('00000000-0000-0000-0000-000000000000', '326ebef9-d62a-4a91-80d2-79d343160e55', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 09:09:31.382345+00', ''),
	('00000000-0000-0000-0000-000000000000', '913e9d18-f871-4e72-a074-6b5bebe32675', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-09 09:09:31.383351+00', ''),
	('00000000-0000-0000-0000-000000000000', '487ff828-72fe-4131-b8b6-93a79dfdcf84', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-12 06:49:50.009557+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f327335b-5f27-4966-990b-9e2d06606030', '{"action":"user_repeated_signup","actor_id":"ce4346f3-480d-41e7-b3e7-5b877c551f49","actor_username":"lalsebastian@live.in","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2025-09-12 07:08:29.641515+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b93ebeba-626e-438a-af9a-1519db61c92c', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-12 08:08:45.930948+00', ''),
	('00000000-0000-0000-0000-000000000000', '7a996fbe-be82-48c7-920f-26c943e474cc', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-12 08:08:45.932202+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bd75f0d8-049c-4041-af25-19e74575460c', '{"action":"user_recovery_requested","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"user"}', '2025-09-12 08:16:56.623699+00', ''),
	('00000000-0000-0000-0000-000000000000', '10922a54-74f3-4020-b101-9a237bcd966a', '{"action":"login","actor_id":"c04b9881-2763-4e69-ad0a-5a886b921a72","actor_username":"lalchempakathinal@gmail.com","actor_via_sso":false,"log_type":"account"}', '2025-09-12 08:17:51.970078+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2e44e4c-30d8-4248-a4e8-dbf42fd31b1b', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-12 08:30:43.467172+00', ''),
	('00000000-0000-0000-0000-000000000000', '85f8d17f-a85b-4be2-9887-1f4d30ce1420', '{"action":"login","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-12 08:32:22.032104+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6e3654d-cdf1-499d-83fa-bc587c700e38', '{"action":"token_refreshed","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-12 09:35:53.926163+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0d6fd3c-86a8-4f94-91b2-a97321c659e5', '{"action":"token_revoked","actor_id":"a0e89c20-e2da-44fd-9fac-92937d4243c0","actor_username":"roosewalt@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-12 09:35:53.929+00', ''),
	('00000000-0000-0000-0000-000000000000', '68ed433b-96ad-4f9d-b2e6-b17fe5bbfbd3', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-12 09:36:06.04248+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fbe1137c-d7f6-49ef-a283-2ecc18cec76b', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 05:42:25.186081+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbe44aa0-84c9-4fc4-920f-20ed1a5e7a54', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 05:42:25.187389+00', ''),
	('00000000-0000-0000-0000-000000000000', '2738c570-5227-4872-84d8-e5ed2b1a5bac', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-14 06:20:24.831469+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a6a2c5bf-38ea-46cf-832a-2b3e55934d21', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-14 06:49:36.486668+00', ''),
	('00000000-0000-0000-0000-000000000000', '08f5f0fa-daeb-40fb-b2dd-8082fdc74a48', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-14 06:52:11.077878+00', ''),
	('00000000-0000-0000-0000-000000000000', '773d3951-3a18-45bd-ba7d-6e42603b7e51', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 07:52:54.45767+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2830208-e6b2-4b40-8b9f-562546b33cc8', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 07:52:54.458691+00', ''),
	('00000000-0000-0000-0000-000000000000', '47c27b0c-1924-4e2d-a342-71793ccdf0eb', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 09:42:19.686424+00', ''),
	('00000000-0000-0000-0000-000000000000', '0752441b-718a-44c1-b5ab-4102ff0c3006', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 09:42:19.687465+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bb6564c4-e3d6-4d0a-8795-03d787bd569a', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 10:11:31.51777+00', ''),
	('00000000-0000-0000-0000-000000000000', '6ddd6b3b-8a31-498b-85d9-2ff01d1e7f70', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 10:11:31.518797+00', ''),
	('00000000-0000-0000-0000-000000000000', '05f6e0ca-3a82-4c88-a81a-86fafb85ac28', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 10:41:25.213732+00', ''),
	('00000000-0000-0000-0000-000000000000', '5b13a1e1-e011-4cfe-8f07-99cc79ac6367', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 10:41:25.214785+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a8806a0e-b709-42b2-914f-0432a867d561', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 13:06:07.776229+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ac1ecade-bc3d-48eb-9568-e2e20980fe17', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 13:06:07.777613+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f1e14275-9ea9-4b41-beab-b2cf266c67f0', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 14:25:55.973468+00', ''),
	('00000000-0000-0000-0000-000000000000', '725e4420-cf4a-4c0c-9082-1ec9ca5e18cc', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 14:25:55.974787+00', ''),
	('00000000-0000-0000-0000-000000000000', '9a7524ba-108e-48a2-a855-26289a60270c', '{"action":"login","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2025-09-14 14:43:15.359803+00', ''),
	('00000000-0000-0000-0000-000000000000', '356a0b83-8dcc-40fc-8b1d-8b500dea273f', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 14:54:21.839392+00', ''),
	('00000000-0000-0000-0000-000000000000', 'bbdb469f-adbd-4234-8f62-84ef7dc8d2af', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-14 14:54:21.840595+00', ''),
	('00000000-0000-0000-0000-000000000000', '9dd05241-1897-4152-b392-45890b92c324', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 04:23:37.366404+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e403b71e-66ef-458e-9bdd-eeff72a437df', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 04:23:37.371747+00', ''),
	('00000000-0000-0000-0000-000000000000', '28e0354f-fc35-4aef-a487-2817c7b03ef2', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 05:56:21.461704+00', ''),
	('00000000-0000-0000-0000-000000000000', '0801ebdb-fcf6-4aa7-8e33-52aa00ff02cf', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 05:56:21.465018+00', ''),
	('00000000-0000-0000-0000-000000000000', '3bc8533a-f75b-42f7-aa49-9f1557ef24db', '{"action":"token_refreshed","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 06:55:06.223212+00', ''),
	('00000000-0000-0000-0000-000000000000', '61081894-1f0a-4e73-8f69-74424533c267', '{"action":"token_revoked","actor_id":"a42b0485-f52d-4735-a34d-e329650a08d3","actor_username":"hithesh0215@gmail.com","actor_via_sso":false,"log_type":"token"}', '2025-09-18 06:55:06.224263+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at", "is_anonymous") VALUES
	('00000000-0000-0000-0000-000000000000', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', 'authenticated', 'authenticated', 'rayovihj@gmail.com', '$2a$10$7i4EeNBrYzAG75X.MS1SbuUsVTP/MTAVAeawupLWZ1nJThUTsn6y.', '2025-09-04 08:56:32.730525+00', NULL, '', '2025-09-04 08:56:17.778484+00', '', NULL, '', '', NULL, '2025-09-04 09:14:06.141468+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "5a439cc3-022e-4c60-9522-2b6cd086dc1b", "email": "rayovihj@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-04 08:56:17.769739+00', '2025-09-04 09:14:06.14584+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', 'authenticated', 'authenticated', 'lalsebastian@live.in', '$2a$10$dGyKHI/ZnuxOzvSPWfH3/.mGXthAzaBgLOZcm33ZMyeHpZSH1ZmIW', '2025-09-09 06:56:06.469705+00', NULL, '', '2025-09-09 06:54:52.61257+00', '', NULL, '', '', NULL, '2025-09-09 07:02:11.597001+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "ce4346f3-480d-41e7-b3e7-5b877c551f49", "email": "lalsebastian@live.in", "email_verified": true, "phone_verified": false}', NULL, '2025-09-09 06:54:52.603265+00', '2025-09-09 07:02:11.600127+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'c04b9881-2763-4e69-ad0a-5a886b921a72', 'authenticated', 'authenticated', 'lalchempakathinal@gmail.com', '$2a$10$1F2.fkggdBFVy2hOSS1XyOtkJMjYokYLLAioKlLLngJAtnpup.zJq', '2025-09-05 07:24:05.590449+00', NULL, '', '2025-09-05 07:23:23.808894+00', '', '2025-09-12 08:16:56.625244+00', '', '', NULL, '2025-09-12 08:17:51.976752+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "c04b9881-2763-4e69-ad0a-5a886b921a72", "email": "lalchempakathinal@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-05 07:23:23.801121+00', '2025-09-12 08:17:51.983352+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'b58df48b-a460-469e-b539-333706ed62b8', 'authenticated', 'authenticated', 'blogger.pereira@gmail.com', '$2a$10$bVOyFa6cosmLuxgj5l8GGuFE.BIcDIe4C5alRMXjrs8E4yIyLd6Ue', '2025-09-05 06:12:45.018238+00', NULL, '', NULL, '', NULL, '', '', NULL, NULL, '{"provider": "email", "providers": ["email"]}', '{"email_verified": true}', NULL, '2025-09-05 06:12:45.005139+00', '2025-09-05 06:12:45.02347+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'dd123875-127d-4b03-8c65-5ae3e2f61689', 'authenticated', 'authenticated', 'hitheshtube@gmail.com', '$2a$10$2lF7Cwr9NdDPrrhwjHBUGuWRVXMfJE/qTEGXrsczpiZnBNeWs1QdK', '2025-09-04 09:40:19.628725+00', NULL, '', '2025-09-04 09:40:01.053201+00', '', NULL, '', '', NULL, '2025-09-04 09:40:33.472387+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "dd123875-127d-4b03-8c65-5ae3e2f61689", "email": "hitheshtube@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-04 09:40:01.03948+00', '2025-09-05 06:21:06.862702+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a42b0485-f52d-4735-a34d-e329650a08d3', 'authenticated', 'authenticated', 'hithesh0215@gmail.com', '$2a$10$g9rUQ75b./YWIIGVRcpdUOq203X8LORHa1ElHaeFAfjkDRVV9nOpu', '2025-09-03 11:10:25.190399+00', NULL, '', '2025-09-03 11:10:12.6883+00', '', NULL, '', '', NULL, '2025-09-14 14:43:15.361491+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a42b0485-f52d-4735-a34d-e329650a08d3", "email": "hithesh0215@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-03 11:10:12.676397+00', '2025-09-18 06:55:06.227626+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false),
	('00000000-0000-0000-0000-000000000000', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', 'authenticated', 'authenticated', 'roosewalt@gmail.com', '$2a$10$W0peN5xXRfEB9Xa3LZCRy.F.LNVYEVpbtiUM5BwOjWxotMO9oMRTi', '2025-09-05 06:22:24.156333+00', NULL, '', '2025-09-05 06:22:00.431775+00', '', NULL, '', '', NULL, '2025-09-12 08:32:22.033657+00', '{"provider": "email", "providers": ["email"]}', '{"sub": "a0e89c20-e2da-44fd-9fac-92937d4243c0", "email": "roosewalt@gmail.com", "email_verified": true, "phone_verified": false}', NULL, '2025-09-05 06:22:00.395854+00', '2025-09-12 09:35:53.934137+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL, false);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('a42b0485-f52d-4735-a34d-e329650a08d3', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{"sub": "a42b0485-f52d-4735-a34d-e329650a08d3", "email": "hithesh0215@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-09-03 11:10:12.682876+00', '2025-09-03 11:10:12.682943+00', '2025-09-03 11:10:12.682943+00', 'a326ad96-c8bb-426e-b15d-bfb363729d97'),
	('5a439cc3-022e-4c60-9522-2b6cd086dc1b', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', '{"sub": "5a439cc3-022e-4c60-9522-2b6cd086dc1b", "email": "rayovihj@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-09-04 08:56:17.773884+00', '2025-09-04 08:56:17.773934+00', '2025-09-04 08:56:17.773934+00', 'd9f3c2d3-8b46-45e4-bd15-092a245f4c66'),
	('dd123875-127d-4b03-8c65-5ae3e2f61689', 'dd123875-127d-4b03-8c65-5ae3e2f61689', '{"sub": "dd123875-127d-4b03-8c65-5ae3e2f61689", "email": "hitheshtube@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-09-04 09:40:01.045416+00', '2025-09-04 09:40:01.045494+00', '2025-09-04 09:40:01.045494+00', 'e1b48f5a-3cd8-46a2-a082-f386213d0448'),
	('b58df48b-a460-469e-b539-333706ed62b8', 'b58df48b-a460-469e-b539-333706ed62b8', '{"sub": "b58df48b-a460-469e-b539-333706ed62b8", "email": "blogger.pereira@gmail.com", "email_verified": false, "phone_verified": false}', 'email', '2025-09-05 06:12:45.007422+00', '2025-09-05 06:12:45.007491+00', '2025-09-05 06:12:45.007491+00', 'fe7d33ae-421b-4ef3-a1e1-43ed3cc2e852'),
	('a0e89c20-e2da-44fd-9fac-92937d4243c0', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '{"sub": "a0e89c20-e2da-44fd-9fac-92937d4243c0", "email": "roosewalt@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-09-05 06:22:00.400191+00', '2025-09-05 06:22:00.400255+00', '2025-09-05 06:22:00.400255+00', '2ecd2bb2-cb28-4b65-8020-c99a3a7b28c4'),
	('c04b9881-2763-4e69-ad0a-5a886b921a72', 'c04b9881-2763-4e69-ad0a-5a886b921a72', '{"sub": "c04b9881-2763-4e69-ad0a-5a886b921a72", "email": "lalchempakathinal@gmail.com", "email_verified": true, "phone_verified": false}', 'email', '2025-09-05 07:23:23.804975+00', '2025-09-05 07:23:23.80504+00', '2025-09-05 07:23:23.80504+00', '4277096c-47f7-437b-8cbb-f70b735dda89'),
	('ce4346f3-480d-41e7-b3e7-5b877c551f49', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', '{"sub": "ce4346f3-480d-41e7-b3e7-5b877c551f49", "email": "lalsebastian@live.in", "email_verified": true, "phone_verified": false}', 'email', '2025-09-09 06:54:52.608277+00', '2025-09-09 06:54:52.608333+00', '2025-09-09 06:54:52.608333+00', '44a7b308-b83e-46dc-b628-2dedec1172ff');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('f45b6860-7c89-480e-b9d8-c2696db7f702', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-03 11:10:25.196348+00', '2025-09-03 11:10:25.196348+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.151.127', NULL),
	('77aa34c6-6527-4de6-b3ef-3474a3c523ba', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-03 11:12:18.872678+00', '2025-09-03 11:12:18.872678+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.151.127', NULL),
	('a9587d47-6663-4616-943d-49a8e3f3d710', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-03 13:19:18.735018+00', '2025-09-04 05:10:52.364632+00', NULL, 'aal1', NULL, '2025-09-04 05:10:52.364533', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('89f487bc-bd52-4212-bf32-58d592b348a5', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 05:12:03.232628+00', '2025-09-04 05:12:03.232628+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('461833e4-31af-46fc-8639-69754db93720', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 05:14:31.577187+00', '2025-09-04 05:14:31.577187+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('b9b8de39-da67-43af-9f7a-19c9ff9bc3b8', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-03 11:18:32.339162+00', '2025-09-04 05:20:51.690146+00', NULL, 'aal1', NULL, '2025-09-04 05:20:51.69007', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('ee26dd81-bdef-4b5b-a386-7ff0aa00cb93', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 05:25:32.183485+00', '2025-09-04 05:25:32.183485+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('3679da9c-8db9-49b1-944e-43047290956a', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:21:50.885189+00', '2025-09-04 06:21:50.885189+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('6997f795-7b2f-4bd3-a573-99d3c5d8a0e4', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:25:10.591344+00', '2025-09-04 06:25:10.591344+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('f8a5e60c-8ad1-4219-b88b-894e3898b067', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:33:27.87604+00', '2025-09-04 06:33:27.87604+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('8ec591e9-62f9-429f-a764-730a90416b3c', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:36:15.226578+00', '2025-09-04 06:36:15.226578+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('e7cf7ec8-3644-4c50-97f1-0793cb042ca7', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:37:32.14096+00', '2025-09-04 06:37:32.14096+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('164fc709-8d0e-471b-8b21-48c9b4fb1ab3', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 06:40:52.281337+00', '2025-09-04 06:40:52.281337+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('117dda5c-feaf-4afc-9a1f-5b8b2daad331', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 07:05:03.73958+00', '2025-09-04 07:05:03.73958+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('a4676b8e-b6bc-4830-8991-95adec8a847c', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 07:21:56.85237+00', '2025-09-04 07:21:56.85237+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('da175270-6886-4fdc-8069-c44fbd8cfc58', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', '2025-09-04 08:56:32.735925+00', '2025-09-04 08:56:32.735925+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('5dd5d9b2-3c20-46cf-bba9-2061c136be83', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', '2025-09-04 08:56:41.613108+00', '2025-09-04 08:56:41.613108+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('537ee476-ea25-40ec-8639-980c072e3a59', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 07:58:19.634705+00', '2025-09-04 08:58:22.107118+00', NULL, 'aal1', NULL, '2025-09-04 08:58:22.107043', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('0cd4027f-c6ca-4e78-a846-9e5a9cd4acc2', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', '2025-09-04 09:14:06.141573+00', '2025-09-04 09:14:06.141573+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('6a291af8-8d40-4f5d-b738-e1a977b7ed96', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 09:36:36.665863+00', '2025-09-04 09:36:36.665863+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('766763a0-9c00-4868-a897-98f1fcc95de4', 'dd123875-127d-4b03-8c65-5ae3e2f61689', '2025-09-04 09:40:19.635941+00', '2025-09-04 09:40:19.635941+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.144.244', NULL),
	('ed3515af-cd2a-4fc6-ad3e-090474c4cb27', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-04 09:15:30.374132+00', '2025-09-05 05:44:28.90425+00', NULL, 'aal1', NULL, '2025-09-05 05:44:28.904161', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.148.10', NULL),
	('09159e73-0ee1-4f03-b1e6-4b1fa961ef49', 'dd123875-127d-4b03-8c65-5ae3e2f61689', '2025-09-04 09:40:33.472545+00', '2025-09-05 06:21:06.864328+00', NULL, 'aal1', NULL, '2025-09-05 06:21:06.864239', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.148.10', NULL),
	('abc9cd39-ef5f-4a69-a9e2-9b9494945da3', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-05 06:22:24.160674+00', '2025-09-05 06:22:24.160674+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.148.10', NULL),
	('ebdcadfc-c4db-4166-be6c-d534b3a1bc30', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-05 06:22:32.440858+00', '2025-09-05 06:22:32.440858+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '112.134.148.10', NULL),
	('bf27d0fe-bde4-472a-8d63-d92fa19e65fd', 'c04b9881-2763-4e69-ad0a-5a886b921a72', '2025-09-05 07:24:05.595647+00', '2025-09-05 07:24:05.595647+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', '91.195.99.175', NULL),
	('7da55a5f-54c6-43cb-8d26-8fd9101b1897', 'c04b9881-2763-4e69-ad0a-5a886b921a72', '2025-09-05 07:24:14.953405+00', '2025-09-05 07:24:14.953405+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', '91.195.99.175', NULL),
	('5258d2a2-c040-4daa-b60f-433f3968307f', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', '2025-09-09 06:56:06.474969+00', '2025-09-09 06:56:06.474969+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.133', NULL),
	('80c2e662-0fca-4897-8458-4a726ae33c4c', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', '2025-09-09 06:56:23.907961+00', '2025-09-09 06:56:23.907961+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.133', NULL),
	('db400524-e96e-42f1-9287-741eabf1d824', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', '2025-09-09 07:02:11.597084+00', '2025-09-09 07:02:11.597084+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.133', NULL),
	('549beef6-adbb-48a6-b12e-47be8714bcbc', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-05 07:24:08.095332+00', '2025-09-09 07:08:22.718566+00', NULL, 'aal1', NULL, '2025-09-09 07:08:22.718486', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '31.13.189.174', NULL),
	('11f6f123-6f0d-4639-af45-378e40f19dc9', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-09 07:09:55.998316+00', '2025-09-09 07:09:55.998316+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36', '31.13.189.174', NULL),
	('94ea898f-1c37-4b60-87da-3362a8736b0f', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-09 07:12:20.163065+00', '2025-09-09 09:09:31.387558+00', NULL, 'aal1', NULL, '2025-09-09 09:09:31.387483', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.125', NULL),
	('da2adc9d-67d7-4123-ac2c-265abe030940', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-12 06:49:50.015415+00', '2025-09-12 08:08:45.939236+00', NULL, 'aal1', NULL, '2025-09-12 08:08:45.939161', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.229', NULL),
	('f3b1bd96-b8bb-46a8-b351-f9270ee32db8', 'c04b9881-2763-4e69-ad0a-5a886b921a72', '2025-09-12 08:17:51.97687+00', '2025-09-12 08:17:51.97687+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36', '91.195.98.151', NULL),
	('7fde36eb-ed8e-4f21-bc98-bf4e3f9d9c06', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-12 08:30:43.469545+00', '2025-09-12 08:30:43.469545+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.101', NULL),
	('5842e7ee-76c8-461a-93e6-6fd7a4c210bb', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', '2025-09-12 08:32:22.033761+00', '2025-09-12 09:35:53.936926+00', NULL, 'aal1', NULL, '2025-09-12 09:35:53.936828', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '216.247.106.7', NULL),
	('53b6d78c-39bf-4376-a500-f463d710c6a9', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-12 09:36:06.043539+00', '2025-09-14 05:42:25.197053+00', NULL, 'aal1', NULL, '2025-09-14 05:42:25.196976', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', '112.134.150.176', NULL),
	('fff4d1d1-0e40-4152-ab42-896341a8529d', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 06:20:24.833469+00', '2025-09-14 10:11:31.523281+00', NULL, 'aal1', NULL, '2025-09-14 10:11:31.523202', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', '112.134.150.176', NULL),
	('d9553c49-b542-46c1-b588-5620a3513c76', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 06:52:11.079306+00', '2025-09-14 14:25:55.979326+00', NULL, 'aal1', NULL, '2025-09-14 14:25:55.978564', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', '112.134.145.86', NULL),
	('6d1cd773-448a-495c-8d57-002c6afc4a29', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:43:15.361574+00', '2025-09-14 14:43:15.361574+00', NULL, 'aal1', NULL, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', '112.134.145.86', NULL),
	('d4f5c0d1-0995-4fa5-b3ca-905a466e3ca7', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 06:49:36.488262+00', '2025-09-18 06:55:06.229233+00', NULL, 'aal1', NULL, '2025-09-18 06:55:06.229156', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', '167.172.94.219', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('f45b6860-7c89-480e-b9d8-c2696db7f702', '2025-09-03 11:10:25.19994+00', '2025-09-03 11:10:25.19994+00', 'otp', '5ea7aa90-1e38-4432-8c2e-45cfb3e504f9'),
	('77aa34c6-6527-4de6-b3ef-3474a3c523ba', '2025-09-03 11:12:18.879246+00', '2025-09-03 11:12:18.879246+00', 'password', '11e48372-b48a-4929-90f4-251bb093f027'),
	('b9b8de39-da67-43af-9f7a-19c9ff9bc3b8', '2025-09-03 11:18:32.343914+00', '2025-09-03 11:18:32.343914+00', 'password', '85a0c54e-b3b2-463f-8ebe-ac0159359f0d'),
	('a9587d47-6663-4616-943d-49a8e3f3d710', '2025-09-03 13:19:18.741474+00', '2025-09-03 13:19:18.741474+00', 'password', '1fe6b488-7415-4a5c-9496-7948565b73dd'),
	('89f487bc-bd52-4212-bf32-58d592b348a5', '2025-09-04 05:12:03.234988+00', '2025-09-04 05:12:03.234988+00', 'password', '98f38d07-d281-423f-8448-413deaea742e'),
	('461833e4-31af-46fc-8639-69754db93720', '2025-09-04 05:14:31.582775+00', '2025-09-04 05:14:31.582775+00', 'password', 'a8e100a2-a95b-4cb3-980b-6c4d9225f4a2'),
	('ee26dd81-bdef-4b5b-a386-7ff0aa00cb93', '2025-09-04 05:25:32.187342+00', '2025-09-04 05:25:32.187342+00', 'password', 'f89879a4-e616-43e1-ac1c-213f099e1e6c'),
	('3679da9c-8db9-49b1-944e-43047290956a', '2025-09-04 06:21:50.889829+00', '2025-09-04 06:21:50.889829+00', 'password', '0f0f3239-473f-44ba-82eb-13a803262c60'),
	('6997f795-7b2f-4bd3-a573-99d3c5d8a0e4', '2025-09-04 06:25:10.59495+00', '2025-09-04 06:25:10.59495+00', 'password', '471c88f7-7669-4e9c-b634-f1df5d7fac87'),
	('f8a5e60c-8ad1-4219-b88b-894e3898b067', '2025-09-04 06:33:27.879821+00', '2025-09-04 06:33:27.879821+00', 'password', 'ec4526e6-706f-4efd-8a67-b078a77c1256'),
	('8ec591e9-62f9-429f-a764-730a90416b3c', '2025-09-04 06:36:15.233315+00', '2025-09-04 06:36:15.233315+00', 'password', '94a34b93-d85b-4c1d-8be2-e87d90b9b8d3'),
	('e7cf7ec8-3644-4c50-97f1-0793cb042ca7', '2025-09-04 06:37:32.146924+00', '2025-09-04 06:37:32.146924+00', 'password', '6a3aba20-086b-432e-9d29-78b9408de58e'),
	('164fc709-8d0e-471b-8b21-48c9b4fb1ab3', '2025-09-04 06:40:52.28648+00', '2025-09-04 06:40:52.28648+00', 'password', '81da64ac-9537-45d8-9191-531dc36dc426'),
	('117dda5c-feaf-4afc-9a1f-5b8b2daad331', '2025-09-04 07:05:03.743052+00', '2025-09-04 07:05:03.743052+00', 'password', '3074bfc5-45c4-4f9a-b1d4-20c2c405c44a'),
	('a4676b8e-b6bc-4830-8991-95adec8a847c', '2025-09-04 07:21:56.858309+00', '2025-09-04 07:21:56.858309+00', 'password', '12058d8f-f7ab-4889-a6d0-d23159de6983'),
	('537ee476-ea25-40ec-8639-980c072e3a59', '2025-09-04 07:58:19.639359+00', '2025-09-04 07:58:19.639359+00', 'password', 'e47d1a86-f61d-49a1-807a-bb313074d9e1'),
	('da175270-6886-4fdc-8069-c44fbd8cfc58', '2025-09-04 08:56:32.739502+00', '2025-09-04 08:56:32.739502+00', 'otp', '177f9015-84c8-464b-952d-aa3d749e8a41'),
	('5dd5d9b2-3c20-46cf-bba9-2061c136be83', '2025-09-04 08:56:41.615426+00', '2025-09-04 08:56:41.615426+00', 'password', '4ad2a50a-3ca8-4bc9-9115-26641771220e'),
	('0cd4027f-c6ca-4e78-a846-9e5a9cd4acc2', '2025-09-04 09:14:06.14672+00', '2025-09-04 09:14:06.14672+00', 'password', '7d431ea0-436b-41c2-b3ff-495483596eae'),
	('ed3515af-cd2a-4fc6-ad3e-090474c4cb27', '2025-09-04 09:15:30.377677+00', '2025-09-04 09:15:30.377677+00', 'password', '1b4ac58e-9aab-48a1-9147-c6dc4b58c180'),
	('6a291af8-8d40-4f5d-b738-e1a977b7ed96', '2025-09-04 09:36:36.669276+00', '2025-09-04 09:36:36.669276+00', 'password', '28a8cb67-3290-4a25-89b6-8c0759e020ab'),
	('766763a0-9c00-4868-a897-98f1fcc95de4', '2025-09-04 09:40:19.641408+00', '2025-09-04 09:40:19.641408+00', 'otp', '642bd3dc-6191-4dfa-8d5f-a17c47b67617'),
	('09159e73-0ee1-4f03-b1e6-4b1fa961ef49', '2025-09-04 09:40:33.476249+00', '2025-09-04 09:40:33.476249+00', 'password', '7e528ada-67e4-458b-a5f6-18e6e69eb3c1'),
	('abc9cd39-ef5f-4a69-a9e2-9b9494945da3', '2025-09-05 06:22:24.163373+00', '2025-09-05 06:22:24.163373+00', 'otp', 'daf416a6-0b3f-4a3f-acee-c4440945529f'),
	('ebdcadfc-c4db-4166-be6c-d534b3a1bc30', '2025-09-05 06:22:32.445204+00', '2025-09-05 06:22:32.445204+00', 'password', 'f0340447-71af-4320-b4da-b711ac95c24b'),
	('bf27d0fe-bde4-472a-8d63-d92fa19e65fd', '2025-09-05 07:24:05.599961+00', '2025-09-05 07:24:05.599961+00', 'otp', '6bbd4091-9cb5-4f0b-91d5-6d4435e7623f'),
	('549beef6-adbb-48a6-b12e-47be8714bcbc', '2025-09-05 07:24:08.097763+00', '2025-09-05 07:24:08.097763+00', 'password', '7af1ea1c-f935-4591-ae3e-90ae2a410bdf'),
	('7da55a5f-54c6-43cb-8d26-8fd9101b1897', '2025-09-05 07:24:14.955573+00', '2025-09-05 07:24:14.955573+00', 'password', '5c1a55c7-dcf0-4e3f-a037-f1335b1f821d'),
	('5258d2a2-c040-4daa-b60f-433f3968307f', '2025-09-09 06:56:06.481967+00', '2025-09-09 06:56:06.481967+00', 'otp', '64d5af80-49bf-4974-ae73-9e87c86a0f98'),
	('80c2e662-0fca-4897-8458-4a726ae33c4c', '2025-09-09 06:56:23.910737+00', '2025-09-09 06:56:23.910737+00', 'password', 'e6af5f6b-6b89-4b4e-b18e-90d7e320d161'),
	('db400524-e96e-42f1-9287-741eabf1d824', '2025-09-09 07:02:11.600845+00', '2025-09-09 07:02:11.600845+00', 'password', '86d86083-7a0d-46c7-98a1-94617d77fcff'),
	('11f6f123-6f0d-4639-af45-378e40f19dc9', '2025-09-09 07:09:56.001897+00', '2025-09-09 07:09:56.001897+00', 'password', '2069724d-f437-44ee-8904-9d06a7854ae3'),
	('94ea898f-1c37-4b60-87da-3362a8736b0f', '2025-09-09 07:12:20.167011+00', '2025-09-09 07:12:20.167011+00', 'password', 'f0af9d2e-ebb2-49b9-bfdd-edd88468f2ec'),
	('da2adc9d-67d7-4123-ac2c-265abe030940', '2025-09-12 06:49:50.030307+00', '2025-09-12 06:49:50.030307+00', 'password', '6d1487f5-56fd-43ed-a19b-8d759c1868f5'),
	('f3b1bd96-b8bb-46a8-b351-f9270ee32db8', '2025-09-12 08:17:51.984139+00', '2025-09-12 08:17:51.984139+00', 'otp', '3e5b0d96-77f3-4c94-9d70-7fd1eb68b3f4'),
	('7fde36eb-ed8e-4f21-bc98-bf4e3f9d9c06', '2025-09-12 08:30:43.476348+00', '2025-09-12 08:30:43.476348+00', 'password', 'c6fa29a9-2ac5-4d5c-baca-e908b8b44f36'),
	('5842e7ee-76c8-461a-93e6-6fd7a4c210bb', '2025-09-12 08:32:22.042467+00', '2025-09-12 08:32:22.042467+00', 'password', '10252216-8f8f-41c3-90ef-ae4ba127984b'),
	('53b6d78c-39bf-4376-a500-f463d710c6a9', '2025-09-12 09:36:06.045703+00', '2025-09-12 09:36:06.045703+00', 'password', '28716fe1-7aaa-42f2-8738-d3fec1129308'),
	('fff4d1d1-0e40-4152-ab42-896341a8529d', '2025-09-14 06:20:24.838085+00', '2025-09-14 06:20:24.838085+00', 'password', '01a89939-81cb-4589-86f1-7790fb2c668b'),
	('d4f5c0d1-0995-4fa5-b3ca-905a466e3ca7', '2025-09-14 06:49:36.493376+00', '2025-09-14 06:49:36.493376+00', 'password', 'bc0d0234-2f38-4fa7-bf26-d1e6bca3adbf'),
	('d9553c49-b542-46c1-b588-5620a3513c76', '2025-09-14 06:52:11.083154+00', '2025-09-14 06:52:11.083154+00', 'password', '44d67140-0a5c-4ddc-a69a-19798957edfc'),
	('6d1cd773-448a-495c-8d57-002c6afc4a29', '2025-09-14 14:43:15.36554+00', '2025-09-14 14:43:15.36554+00', 'password', 'a28db300-b926-4586-86e9-b656d7494e80');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 2, 'vdoch4mvcnvh', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-03 11:10:25.197572+00', '2025-09-03 11:10:25.197572+00', NULL, 'f45b6860-7c89-480e-b9d8-c2696db7f702'),
	('00000000-0000-0000-0000-000000000000', 3, 'h3dn6ldzw2tl', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-03 11:12:18.875305+00', '2025-09-03 11:12:18.875305+00', NULL, '77aa34c6-6527-4de6-b3ef-3474a3c523ba'),
	('00000000-0000-0000-0000-000000000000', 5, 'vip7hjjzrkmq', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-03 13:19:18.737126+00', '2025-09-04 05:10:52.360272+00', NULL, 'a9587d47-6663-4616-943d-49a8e3f3d710'),
	('00000000-0000-0000-0000-000000000000', 6, 'cm4y77wq6ekw', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 05:10:52.361954+00', '2025-09-04 05:10:52.361954+00', 'vip7hjjzrkmq', 'a9587d47-6663-4616-943d-49a8e3f3d710'),
	('00000000-0000-0000-0000-000000000000', 7, '5kcb4qcbcbbs', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 05:12:03.233623+00', '2025-09-04 05:12:03.233623+00', NULL, '89f487bc-bd52-4212-bf32-58d592b348a5'),
	('00000000-0000-0000-0000-000000000000', 8, 'wlmiczvkvmqc', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 05:14:31.579074+00', '2025-09-04 05:14:31.579074+00', NULL, '461833e4-31af-46fc-8639-69754db93720'),
	('00000000-0000-0000-0000-000000000000', 4, 'qaueop547v2h', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-03 11:18:32.340875+00', '2025-09-04 05:20:51.685943+00', NULL, 'b9b8de39-da67-43af-9f7a-19c9ff9bc3b8'),
	('00000000-0000-0000-0000-000000000000', 10, 'nhqd2or2hohi', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 05:20:51.686735+00', '2025-09-04 05:20:51.686735+00', 'qaueop547v2h', 'b9b8de39-da67-43af-9f7a-19c9ff9bc3b8'),
	('00000000-0000-0000-0000-000000000000', 13, 'tdrlmb5wkufc', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 05:25:32.184808+00', '2025-09-04 05:25:32.184808+00', NULL, 'ee26dd81-bdef-4b5b-a386-7ff0aa00cb93'),
	('00000000-0000-0000-0000-000000000000', 15, 'p6fqsmla6o4t', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:21:50.886862+00', '2025-09-04 06:21:50.886862+00', NULL, '3679da9c-8db9-49b1-944e-43047290956a'),
	('00000000-0000-0000-0000-000000000000', 16, 'oo72ofs6xqaj', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:25:10.592645+00', '2025-09-04 06:25:10.592645+00', NULL, '6997f795-7b2f-4bd3-a573-99d3c5d8a0e4'),
	('00000000-0000-0000-0000-000000000000', 17, 'i4lcfynpxqti', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:33:27.877391+00', '2025-09-04 06:33:27.877391+00', NULL, 'f8a5e60c-8ad1-4219-b88b-894e3898b067'),
	('00000000-0000-0000-0000-000000000000', 18, '2yrtgplwl2p2', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:36:15.228551+00', '2025-09-04 06:36:15.228551+00', NULL, '8ec591e9-62f9-429f-a764-730a90416b3c'),
	('00000000-0000-0000-0000-000000000000', 19, 'ld5c46dq3nmc', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:37:32.143201+00', '2025-09-04 06:37:32.143201+00', NULL, 'e7cf7ec8-3644-4c50-97f1-0793cb042ca7'),
	('00000000-0000-0000-0000-000000000000', 20, 'nukwkktfgx3j', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 06:40:52.282907+00', '2025-09-04 06:40:52.282907+00', NULL, '164fc709-8d0e-471b-8b21-48c9b4fb1ab3'),
	('00000000-0000-0000-0000-000000000000', 21, '6ffpkkqpfyu3', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 07:05:03.740855+00', '2025-09-04 07:05:03.740855+00', NULL, '117dda5c-feaf-4afc-9a1f-5b8b2daad331'),
	('00000000-0000-0000-0000-000000000000', 22, 'zput5hljejmj', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 07:21:56.854633+00', '2025-09-04 07:21:56.854633+00', NULL, 'a4676b8e-b6bc-4830-8991-95adec8a847c'),
	('00000000-0000-0000-0000-000000000000', 31, 'cacgpegos67d', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', false, '2025-09-04 08:56:32.737091+00', '2025-09-04 08:56:32.737091+00', NULL, 'da175270-6886-4fdc-8069-c44fbd8cfc58'),
	('00000000-0000-0000-0000-000000000000', 32, 'ensjx2idfqha', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', false, '2025-09-04 08:56:41.61398+00', '2025-09-04 08:56:41.61398+00', NULL, '5dd5d9b2-3c20-46cf-bba9-2061c136be83'),
	('00000000-0000-0000-0000-000000000000', 25, 'hnheyyh5iinl', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-04 07:58:19.636386+00', '2025-09-04 08:58:22.102917+00', NULL, '537ee476-ea25-40ec-8639-980c072e3a59'),
	('00000000-0000-0000-0000-000000000000', 33, 'rsywui36uyyd', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 08:58:22.103742+00', '2025-09-04 08:58:22.103742+00', 'hnheyyh5iinl', '537ee476-ea25-40ec-8639-980c072e3a59'),
	('00000000-0000-0000-0000-000000000000', 34, 'y6a7erlzhqmb', '5a439cc3-022e-4c60-9522-2b6cd086dc1b', false, '2025-09-04 09:14:06.143446+00', '2025-09-04 09:14:06.143446+00', NULL, '0cd4027f-c6ca-4e78-a846-9e5a9cd4acc2'),
	('00000000-0000-0000-0000-000000000000', 36, 'hdjic6cjhge6', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-04 09:36:36.667138+00', '2025-09-04 09:36:36.667138+00', NULL, '6a291af8-8d40-4f5d-b738-e1a977b7ed96'),
	('00000000-0000-0000-0000-000000000000', 37, 'cxn5bc4xszmw', 'dd123875-127d-4b03-8c65-5ae3e2f61689', false, '2025-09-04 09:40:19.638036+00', '2025-09-04 09:40:19.638036+00', NULL, '766763a0-9c00-4868-a897-98f1fcc95de4'),
	('00000000-0000-0000-0000-000000000000', 35, 'ar3ouzr6hzuf', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-04 09:15:30.375477+00', '2025-09-05 05:44:28.895499+00', NULL, 'ed3515af-cd2a-4fc6-ad3e-090474c4cb27'),
	('00000000-0000-0000-0000-000000000000', 39, 'dy3nsse3slpd', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-05 05:44:28.899993+00', '2025-09-05 05:44:28.899993+00', 'ar3ouzr6hzuf', 'ed3515af-cd2a-4fc6-ad3e-090474c4cb27'),
	('00000000-0000-0000-0000-000000000000', 38, 'du3f4q6o7sik', 'dd123875-127d-4b03-8c65-5ae3e2f61689', true, '2025-09-04 09:40:33.473975+00', '2025-09-05 06:21:06.859361+00', NULL, '09159e73-0ee1-4f03-b1e6-4b1fa961ef49'),
	('00000000-0000-0000-0000-000000000000', 40, 'pllzul2nipsy', 'dd123875-127d-4b03-8c65-5ae3e2f61689', false, '2025-09-05 06:21:06.860359+00', '2025-09-05 06:21:06.860359+00', 'du3f4q6o7sik', '09159e73-0ee1-4f03-b1e6-4b1fa961ef49'),
	('00000000-0000-0000-0000-000000000000', 41, 'pdfjmjxh4sez', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-05 06:22:24.161772+00', '2025-09-05 06:22:24.161772+00', NULL, 'abc9cd39-ef5f-4a69-a9e2-9b9494945da3'),
	('00000000-0000-0000-0000-000000000000', 42, 'x56vsin2phfp', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-05 06:22:32.442239+00', '2025-09-05 06:22:32.442239+00', NULL, 'ebdcadfc-c4db-4166-be6c-d534b3a1bc30'),
	('00000000-0000-0000-0000-000000000000', 43, '2cwgphzwstnc', 'c04b9881-2763-4e69-ad0a-5a886b921a72', false, '2025-09-05 07:24:05.597169+00', '2025-09-05 07:24:05.597169+00', NULL, 'bf27d0fe-bde4-472a-8d63-d92fa19e65fd'),
	('00000000-0000-0000-0000-000000000000', 45, 'd3iuprdvjt6r', 'c04b9881-2763-4e69-ad0a-5a886b921a72', false, '2025-09-05 07:24:14.954284+00', '2025-09-05 07:24:14.954284+00', NULL, '7da55a5f-54c6-43cb-8d26-8fd9101b1897'),
	('00000000-0000-0000-0000-000000000000', 44, 'ov3dqfsoubug', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-05 07:24:08.096168+00', '2025-09-05 08:25:02.140216+00', NULL, '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 46, '3t6hwmilttvs', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-05 08:25:02.141498+00', '2025-09-05 09:33:20.126493+00', 'ov3dqfsoubug', '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 47, 'wud7g4ktz4tp', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-05 09:33:20.128425+00', '2025-09-05 15:25:59.294649+00', '3t6hwmilttvs', '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 48, 'zhwd4r5n2uzg', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-05 15:25:59.296251+00', '2025-09-06 06:32:40.572864+00', 'wud7g4ktz4tp', '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 50, 'u7ayufsjdxa7', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', false, '2025-09-09 06:56:06.479129+00', '2025-09-09 06:56:06.479129+00', NULL, '5258d2a2-c040-4daa-b60f-433f3968307f'),
	('00000000-0000-0000-0000-000000000000', 51, 'd5ow4kc5q6xg', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', false, '2025-09-09 06:56:23.909133+00', '2025-09-09 06:56:23.909133+00', NULL, '80c2e662-0fca-4897-8458-4a726ae33c4c'),
	('00000000-0000-0000-0000-000000000000', 52, '6b6eyss66hye', 'ce4346f3-480d-41e7-b3e7-5b877c551f49', false, '2025-09-09 07:02:11.598435+00', '2025-09-09 07:02:11.598435+00', NULL, 'db400524-e96e-42f1-9287-741eabf1d824'),
	('00000000-0000-0000-0000-000000000000', 49, 'dxkyt4eapjyt', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-06 06:32:40.57386+00', '2025-09-09 07:08:22.713041+00', 'zhwd4r5n2uzg', '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 53, '65ig5a2vqkxw', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-09 07:08:22.714206+00', '2025-09-09 07:08:22.714206+00', 'dxkyt4eapjyt', '549beef6-adbb-48a6-b12e-47be8714bcbc'),
	('00000000-0000-0000-0000-000000000000', 54, '3az5hq4dnith', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-09 07:09:55.999577+00', '2025-09-09 07:09:55.999577+00', NULL, '11f6f123-6f0d-4639-af45-378e40f19dc9'),
	('00000000-0000-0000-0000-000000000000', 55, 'k5o44vvqhuc3', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-09 07:12:20.164512+00', '2025-09-09 08:11:14.633677+00', NULL, '94ea898f-1c37-4b60-87da-3362a8736b0f'),
	('00000000-0000-0000-0000-000000000000', 56, 'jy4p2t2epk5q', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-09 08:11:14.635188+00', '2025-09-09 09:09:31.384043+00', 'k5o44vvqhuc3', '94ea898f-1c37-4b60-87da-3362a8736b0f'),
	('00000000-0000-0000-0000-000000000000', 57, '2c3uhpiusong', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-09 09:09:31.384788+00', '2025-09-09 09:09:31.384788+00', 'jy4p2t2epk5q', '94ea898f-1c37-4b60-87da-3362a8736b0f'),
	('00000000-0000-0000-0000-000000000000', 58, 'wa6wn2cflb23', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-12 06:49:50.023013+00', '2025-09-12 08:08:45.933727+00', NULL, 'da2adc9d-67d7-4123-ac2c-265abe030940'),
	('00000000-0000-0000-0000-000000000000', 59, 'qige336fgbhw', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-12 08:08:45.936214+00', '2025-09-12 08:08:45.936214+00', 'wa6wn2cflb23', 'da2adc9d-67d7-4123-ac2c-265abe030940'),
	('00000000-0000-0000-0000-000000000000', 60, 'xtd43xhmvuu4', 'c04b9881-2763-4e69-ad0a-5a886b921a72', false, '2025-09-12 08:17:51.979535+00', '2025-09-12 08:17:51.979535+00', NULL, 'f3b1bd96-b8bb-46a8-b351-f9270ee32db8'),
	('00000000-0000-0000-0000-000000000000', 61, 'jonvsnmqofwk', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-12 08:30:43.471713+00', '2025-09-12 08:30:43.471713+00', NULL, '7fde36eb-ed8e-4f21-bc98-bf4e3f9d9c06'),
	('00000000-0000-0000-0000-000000000000', 62, 'zrhd6w4quba2', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', true, '2025-09-12 08:32:22.039352+00', '2025-09-12 09:35:53.929905+00', NULL, '5842e7ee-76c8-461a-93e6-6fd7a4c210bb'),
	('00000000-0000-0000-0000-000000000000', 63, 'otcaoozcwrb2', 'a0e89c20-e2da-44fd-9fac-92937d4243c0', false, '2025-09-12 09:35:53.932367+00', '2025-09-12 09:35:53.932367+00', 'zrhd6w4quba2', '5842e7ee-76c8-461a-93e6-6fd7a4c210bb'),
	('00000000-0000-0000-0000-000000000000', 64, 'imtj4qxy7xqv', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-12 09:36:06.044471+00', '2025-09-14 05:42:25.188121+00', NULL, '53b6d78c-39bf-4376-a500-f463d710c6a9'),
	('00000000-0000-0000-0000-000000000000', 65, 'veqon67whdta', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-14 05:42:25.190169+00', '2025-09-14 05:42:25.190169+00', 'imtj4qxy7xqv', '53b6d78c-39bf-4376-a500-f463d710c6a9'),
	('00000000-0000-0000-0000-000000000000', 68, 'gwu4fnzr6hdu', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 06:52:11.080702+00', '2025-09-14 07:52:54.459359+00', NULL, 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 69, 'ngjfb65ppteu', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 07:52:54.460151+00', '2025-09-14 09:42:19.688126+00', 'gwu4fnzr6hdu', 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 66, '4baixm5do5wk', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 06:20:24.835557+00', '2025-09-14 10:11:31.51943+00', NULL, 'fff4d1d1-0e40-4152-ab42-896341a8529d'),
	('00000000-0000-0000-0000-000000000000', 71, 'jeroui4g2ksk', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-14 10:11:31.520258+00', '2025-09-14 10:11:31.520258+00', '4baixm5do5wk', 'fff4d1d1-0e40-4152-ab42-896341a8529d'),
	('00000000-0000-0000-0000-000000000000', 70, 'uf5elkzavaqv', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 09:42:19.688947+00', '2025-09-14 10:41:25.215422+00', 'ngjfb65ppteu', 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 72, 'pqskn6qqfmfv', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 10:41:25.216298+00', '2025-09-14 13:06:07.778206+00', 'uf5elkzavaqv', 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 73, 'cgoupuwkorug', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 13:06:07.779026+00', '2025-09-14 14:25:55.975382+00', 'pqskn6qqfmfv', 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 74, 'c74u4tnnlsjh', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-14 14:25:55.976135+00', '2025-09-14 14:25:55.976135+00', 'cgoupuwkorug', 'd9553c49-b542-46c1-b588-5620a3513c76'),
	('00000000-0000-0000-0000-000000000000', 75, 'erdtulacqg4p', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-14 14:43:15.36342+00', '2025-09-14 14:43:15.36342+00', NULL, '6d1cd773-448a-495c-8d57-002c6afc4a29'),
	('00000000-0000-0000-0000-000000000000', 67, 'xy5iynjxvbwt', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 06:49:36.490089+00', '2025-09-14 14:54:21.841356+00', NULL, 'd4f5c0d1-0995-4fa5-b3ca-905a466e3ca7'),
	('00000000-0000-0000-0000-000000000000', 76, 'p6co5r7mcfjk', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-14 14:54:21.842373+00', '2025-09-18 04:23:37.372589+00', 'xy5iynjxvbwt', 'd4f5c0d1-0995-4fa5-b3ca-905a466e3ca7'),
	('00000000-0000-0000-0000-000000000000', 77, 'wdbe7omyjul6', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-18 04:23:37.375327+00', '2025-09-18 05:56:21.466135+00', 'p6co5r7mcfjk', 'd4f5c0d1-0995-4fa5-b3ca-905a466e3ca7'),
	('00000000-0000-0000-0000-000000000000', 78, '3yw3tjrq3rqy', 'a42b0485-f52d-4735-a34d-e329650a08d3', true, '2025-09-18 05:56:21.46717+00', '2025-09-18 06:55:06.224884+00', 'wdbe7omyjul6', 'd4f5c0d1-0995-4fa5-b3ca-905a466e3ca7'),
	('00000000-0000-0000-0000-000000000000', 79, 'uy5z7g3f32ds', 'a42b0485-f52d-4735-a34d-e329650a08d3', false, '2025-09-18 06:55:06.225696+00', '2025-09-18 06:55:06.225696+00', '3yw3tjrq3rqy', 'd4f5c0d1-0995-4fa5-b3ca-905a466e3ca7');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



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

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('VehicleImages', 'VehicleImages', NULL, '2025-09-03 11:39:42.638177+00', '2025-09-03 11:39:42.638177+00', true, false, 10485760, '{image/jpeg,image/png,image/gif,image/webp,application/pdf,image/jpg}', NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata", "level") VALUES
	('b85066f2-3977-45f4-9ae1-f0f7b36b4e05', 'VehicleImages', 'uploads/1757859968841_96amrnlnsqi.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00', '{"eTag": "\"2e585a492bb40daa4610308b6d19f1a5\"", "size": 450343, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:26:10.000Z", "contentLength": 450343, "httpStatusCode": 200}', '6e3ccf77-050d-4b8f-bc86-6d376fc04b4f', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2),
	('3fb9d8f7-c75f-474c-a126-1a8a5aac4804', 'VehicleImages', 'uploads/1757860837847_d4sylcsqx3.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:40:38.766166+00', '2025-09-14 14:40:38.766166+00', '2025-09-14 14:40:38.766166+00', '{"eTag": "\"18f74db5fbacd260d093d0b5a0496db6\"", "size": 227284, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:40:39.000Z", "contentLength": 227284, "httpStatusCode": 200}', '6e98eb88-5ad3-46de-b5d7-7cf5de78aa52', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2),
	('91ea5fb9-ba15-4e9a-8190-8418e66934eb', 'VehicleImages', 'maintenance-reports/1757860912328_1a659kdsuvy.pdf', 'a42b0485-f52d-4735-a34d-e329650a08d3', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00', '{"eTag": "\"568da608e420f164fe4d05fe037ff16f\"", "size": 461775, "mimetype": "application/pdf", "cacheControl": "max-age=3600", "lastModified": "2025-09-14T14:41:54.000Z", "contentLength": 461775, "httpStatusCode": 200}', '63cf23f9-e8cd-4525-af4a-5f24d72c1ce2', 'a42b0485-f52d-4735-a34d-e329650a08d3', '{}', 2);


--
-- Data for Name: prefixes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."prefixes" ("bucket_id", "name", "created_at", "updated_at") VALUES
	('VehicleImages', 'uploads', '2025-09-14 14:26:09.604874+00', '2025-09-14 14:26:09.604874+00'),
	('VehicleImages', 'maintenance-reports', '2025-09-14 14:41:53.127946+00', '2025-09-14 14:41:53.127946+00');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 79, true);


--
-- PostgreSQL database dump complete
--

RESET ALL;
