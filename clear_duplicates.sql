-- Clear all existing data to allow fresh import
BEGIN;

-- Delete in dependency order
DELETE FROM vehicle_document;
DELETE FROM vehicle_contract;
DELETE FROM fine_log;
DELETE FROM staff_document;
DELETE FROM quotation;
DELETE FROM payroll;
DELETE FROM payment;
DELETE FROM maintenance_log;
DELETE FROM legal_document;
DELETE FROM leave_request;
DELETE FROM invoice;
DELETE FROM inventory_part;
DELETE FROM interaction_log;
DELETE FROM lead;
DELETE FROM incident_log;
DELETE FROM expense;
DELETE FROM employee;
DELETE FROM customer_document;
DELETE FROM corporate_client;
DELETE FROM car_image;
DELETE FROM attendance;
DELETE FROM shift;
DELETE FROM asset;
DELETE FROM ai_document_processing;
DELETE FROM booking;
DELETE FROM vehicle;
DELETE FROM customer;
DELETE FROM user_access;

COMMIT;