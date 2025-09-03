### UserAccess table
user_email
(
email
, required
)
The email of the user whose access is being defined.

accessible_modules
(
array
, required
)
An array of page names (modules) the user can access.


### customer table
name
(
text
, required
)
Customer full name

email
(
email
, required
)
phone
(
text
, required
)
license_number
(
text
)
address
(
text
)
customer_type
(
text
)
Default: "Individual"
Options: Individual, Corporate
status
(
text
)
Default: "Active"
Options: Active, Inactive, Blocked
tags
(
array
)
residency_status
(
text
)
Customer's residency status

Options: Resident, Visitor
driving_license_url
(
text
)
URL for driving license

passport_url
(
text
)
URL for passport

emirates_id_url
(
text
)
URL for Emirates ID

### vehicle table 
license_plate
(
text
, required
)
Registration number

make
(
text
, required
)
Manufacturer (e.g., Toyota, Nissan)

model
(
text
, required
)
Model name (e.g., Corolla, Altima)

variant_trim
(
text
)
Optional, for detailed spec tracking

year
(
number
, required
)
Manufacturing year

vin
(
text
)
Vehicle Identification Number

engine_number
(
text
)
For official and mechanical records

transmission_type
(
text
)
Transmission type

Options: Automatic, Manual
fuel_type
(
text
)
Fuel type

Options: Petrol, Diesel, Electric, Hybrid
color
(
text
)
Exterior color

chassis_number
(
text
)
Additional verification field

body_type
(
text
)
Vehicle body type

Options: Sedan, SUV, Hatchback, Coupe, Convertible, Wagon, Pickup, Van
odometer_reading
(
number
)
Current kilometers or miles

odometer_source
(
text
)
Source of odometer reading

Options: Manual, API, Telematics
seating_capacity
(
number
)
Total seats

number_of_doors
(
number
)
Number of doors

vehicle_class
(
text
, required
)
Vehicle classification

Options: Economy, Hatch Back, Mid-Size Sedan, Luxury, SUV, Sports cars
gps_installed
(
boolean
)
GPS device installed

status
(
text
)
Current vehicle status

Default: "Available"
Options: Available, Rented, Under Maintenance, Sold, In Transit
location
(
text
)
Current parking/garage location

assigned_branch
(
text
)
Which branch or depot it belongs to

current_renter
(
text
)
Linked to rental/customer profile

purchase_date
(
date
)
Date vehicle was acquired

purchase_price
(
number
)
Cost to the company

current_market_value
(
number
)
Current market value

lease_owned
(
text
)
Ownership type

Options: Owned, Leased
leasing_company
(
text
)
If applicable

insurance_provider
(
text
)
Insurance company name

insurance_policy_number
(
text
)
For verification

insurance_expiry_date
(
date
)
Insurance expiry date

salik_tag_number
(
text
)
For toll tracking (UAE-specific)

registration_expiry_date
(
date
)
RTA registration renewal date

mortgage_loan_status
(
text
)
If vehicle is financed

sold_date
(
date
)
Date when sold

sold_value
(
number
)
Sale price

estimated_present_value
(
number
)
Current estimated value

last_service_date
(
date
)
Last service date

next_service_due_km
(
number
)
Next service due at this odometer reading

next_service_due_date
(
date
)
Next service due date

tyre_change_date
(
date
)
Last tyre change date

battery_replacement_date
(
date
)
Last battery replacement

service_provider
(
text
)
Garage name or internal team

service_notes
(
text
)
Maintenance work description

accident_history
(
text
)
Accident dates and brief notes

damage_notes
(
text
)
Current damages or scratches

registration_copy
(
text
)
Registration document URL

insurance_copy
(
text
)
Insurance document URL

emission_test
(
text
)
Emission test document URL

image_set_id
(
text
)
The ID linking to a set of images in the CarImage library.

vehicle_photos
(
array
)
Vehicle photo URLs. Can be populated from the image library or custom uploads.

real_time_location
(
text
)
GPS coordinates

fuel_level
(
number
)
Current fuel level percentage

Additional Properties:
minimum: 0
maximum: 100
engine_status
(
text
)
Engine status

Options: On, Off
battery_level
(
number
)
Battery level for electric cars

Additional Properties:
minimum: 0
maximum: 100
daily_rate
(
number
, required
)
Daily rental rate

monthly_rate
(
number
, required
)
Monthly rental rate

health_rating
(
text
)
Default: "Good"
Options: Good, Fair, Critical
live_latitude
(
number
)
live_longitude
(
number
)
registration_date
(
date
)
Date of first registration from Mulkia

country_of_origin
(
text
)
Country of origin from Mulkia

owner_name
(
text
)
Registered owner name from Mulkia

tc_number
(
text
)
Traffic Code Number from Mulkia

place_of_issue
(
text
)
Place of issue from Mulkia

### Booking table 
customer_id
(
text
, required
)
vehicle_id
(
text
, required
)
booking_date
(
date
)
start_date
(
date
, required
)
end_date
(
date
, required
)
pickup_location
(
text
)
dropoff_location
(
text
)
total_amount
(
number
, required
)
Base amount before tax

vat_amount
(
number
)
VAT amount (5%)

final_amount
(
number
)
Total amount including VAT

status
(
text
)
Default: "Pending"
Options: Pending, Confirmed, Active, Completed, Cancelled
payment_status
(
text
)
Default: "Pending"
Options: Pending, Paid, Partial, Refunded
special_requests
(
text
)

### vehicle document table
vehicle_id
(
text
)
Reference to vehicle

document_type
(
text
)
Type of document

Options: Insurance, Mulkia, Vehicle Pictures, Other
document_name
(
text
, required
)
Name or title of the document

file_url
(
text
, required
)
URL to the uploaded document file

file_type
(
text
)
File extension (jpg, png, pdf)

upload_date
(
date
)
Date when document was uploaded

expiry_date
(
date
)
Document expiry date

extracted_data
(
object
)
AI-extracted data from Mulkia documents

license_plate_number
(
text
)
registration_expiry_date
(
text
)
registration_date
(
text
)
insurance_expiry_date
(
text
)
insurance_policy_number
(
text
)
tc_number
(
text
)
owner_name
(
text
)
model_year
(
text
)
country_of_origin
(
text
)
vehicle_type
(
text
)
chassis_number
(
text
)
number_of_passengers
(
text
)
place_of_issue
(
text
)
notes
(
text
)
Additional notes about the document

is_verified
(
boolean
)
Whether extracted data has been verified

Default: false

### Employee table
employee_id
(
text
, required
)
Unique Employee ID

name
(
text
, required
)
Full Name

email
(
email
, required
)
phone
(
text
)
date_of_birth
(
date
)
nationality
(
text
)
gender
(
text
)
Options: Male, Female, Other
address
(
text
)
department
(
text
, required
)
e.g., Sales, Engineering

designation
(
text
, required
)
e.g., Software Engineer, HR Manager

join_date
(
date
, required
)
employment_type
(
text
)
Options: Full-time, Part-time, Contract
reporting_manager_id
(
text
)
Employee ID of the manager

status
(
text
, required
)
Default: "Active"
Options: Active, Inactive
base_salary
(
number
, required
)
Monthly base salary

passport_copy_url
(
text
)
URL for passport document

visa_page_url
(
text
)
URL for visa document

emirates_id_url
(
text
)
URL for Emirates ID document

other_documents
(
array
)
URLs for other documents

### Shift table
name
(
text
, required
)
e.g., Morning Shift

start_time
(
text
, required
)
end_time
(
text
, required
)
duration_hours
(
number
, required
)
Standard duration of the shift in hours

### Attendance table
employee_id
(
text
, required
)
date
(
date
, required
)
check_in_time
(
date-time
)
check_out_time
(
date-time
)
shift_id
(
text
)
status
(
text
, required
)
Options: Present, Absent, On Leave, Holiday
working_hours
(
number
)
overtime_hours
(
number
)
notes
(
text
)

### Payroll table
employee_id
(
text
, required
)
month
(
number
, required
)
Additional Properties:
minimum: 1
maximum: 12
year
(
number
, required
)
base_salary
(
number
)
overtime_pay
(
number
)
deductions
(
number
)
Sum of all deductions (advances, loans, fines)

net_pay
(
number
, required
)
status
(
text
)
Default: "Pending"
Options: Pending, Processed, Paid
processing_date
(
date
)

### LeaveRequest table
employee_id
(
text
, required
)
leave_type
(
text
, required
)
Options: Sick, Casual, Annual, Unpaid
start_date
(
date
, required
)
end_date
(
date
, required
)
reason
(
text
, required
)
status
(
text
)
Default: "Pending"
Options: Pending, Approved by Manager, Approved, Rejected
manager_comment
(
text
)
hr_comment
(
text
)

### Deduction table
employee_id
(
text
, required
)
date
(
date
, required
)
type
(
text
, required
)
Options: Advance, Loan, Fine, Other
amount
(
number
, required
)
reason
(
text
)
payroll_run_id
(
text
)
Optional: Links deduction to a specific payroll run

### Lead table
name
(
text
, required
)
Name of the lead

email
(
email
, required
)
Email of the lead

phone
(
text
)
Phone number of the lead

source
(
text
)
Source of the lead (e.g., Website, Referral)

status
(
text
, required
)
Default: "New"
Options: New, Contacted, Quoted, Follow-up, Won, Lost
assigned_to_id
(
text
)
ID of the sales executive this lead is assigned to (optional)

notes
(
text
)
General notes about the lead

### Quotation table
customer_id
(
text
, required
)
Link to the customer record

lead_id
(
text
)
Link to the lead record (optional)

vehicle_details
(
text
, required
)
Description of the vehicle or class quoted

daily_rate
(
number
)
start_date
(
date
)
end_date
(
date
)
total_amount
(
number
, required
)
validity_date
(
date
)
terms_and_conditions
(
text
)
status
(
text
, required
)
Default: "Draft"
Options: Draft, Sent, Accepted, Rejected
sales_rep_id
(
text
)
ID of the sales representative who created the quote (optional)

#### MarketingCampaign
name
(
text
, required
)
subject
(
text
, required
)
body
(
text
, required
)
HTML content of the email

audience_filters
(
object
)
Filters used to select the audience (e.g., {tags: ['vip']})

status
(
text
, required
)
Default: "Draft"
Options: Draft, Scheduled, Sent, Failed
scheduled_for
(
date-time
)
sent_date
(
date-time
)
stats
(
object
)
sent_count
(
number
)
Default: 0
open_count
(
number
)
Default: 0
click_count
(
number
)
Default: 0

### CoporateClient table
company_name
(
text
, required
)
account_manager_id
(
text
, required
)
Link to the User (sales executive)

billing_agreement
(
text
)
contacts
(
array
)
name
(
text
)
role
(
text
)
phone
(
text
)
email
(
email
)
notes
(
text
)

### InteractionLog
customer_id
(
text
)
lead_id
(
text
)
type
(
text
, required
)
Options: Call, Email, Meeting, Note
notes
(
text
, required
)
sales_rep_id
(
text
, required
)
date
(
date-time
, required
)

### Invoice table
invoice_number
(
text
, required
)
Auto-generated invoice number

client_id
(
text
)
ID of the customer

client_name
(
text
, required
)
client_email
(
email
)
client_phone
(
text
)
client_address
(
text
)
invoice_date
(
date
, required
)
due_date
(
date
, required
)
rental_amount
(
number
, required
)
Base rental amount

salik_qty
(
number
)
Salik quantity

Default: 0
salik_rate
(
number
)
Salik rate per unit

Default: 0
salik_amount
(
number
)
Salik total amount (qty * rate)

Default: 0
traffic_fines_qty
(
number
)
Traffic fines quantity

Default: 0
traffic_fines_rate
(
number
)
Traffic fines rate per unit

Default: 0
traffic_fines_amount
(
number
)
Traffic fines total amount (qty * rate)

Default: 0
other_charges_qty
(
number
)
Other charges quantity

Default: 0
other_charges_rate
(
number
)
Other charges rate per unit

Default: 0
other_charges_amount
(
number
)
Other charges total amount (qty * rate)

Default: 0
other_charges_description
(
text
)
Description of other charges

subtotal
(
number
, required
)
Subtotal before VAT

vat_enabled
(
boolean
)
Whether VAT is applied

Default: true
vat_rate
(
number
)
VAT percentage (fixed at 5%)

Default: 5
vat_amount
(
number
, required
)
VAT amount

total_amount
(
number
, required
)
Final total amount including VAT

status
(
text
)
Default: "Draft"
Options: Draft, Sent, Paid, Overdue, Cancelled
payment_terms
(
text
)
Default: "Net 30"
notes
(
text
)
payment_id
(
text
)
Optional link to a payment record

booking_id
(
text
)
Link to the booking record

vehicle_details
(
text
)
Vehicle information for the invoice

rental_period
(
text
)
Rental duration/period

### Payment table
payment_date
(
date
, required
)
counterpart
(
text
, required
)
From/To whom the payment was made

amount
(
number
, required
)
method
(
text
, required
)
Options: Cash, Bank Transfer, Card
reference_no
(
text
)
remarks
(
text
)

### Expense table
expense_date
(
date
, required
)
category
(
text
, required
)
Options: Salaries, Rent, Utilities, Marketing, Supplies, Maintenance, Travel, Other
description
(
text
, required
)
amount
(
number
, required
)
paid_to
(
text
, required
)
payment_method
(
text
)
Options: Cash, Bank Transfer, Card, Company Account
project_client
(
text
)
Associated project or client

receipt_url
(
text
)
URL of the uploaded receipt


### Asset table
asset_name
(
text
, required
)
purchase_date
(
date
, required
)
purchase_cost
(
number
, required
)
depreciation_method
(
text
)
Default: "Straight-Line"
lifespan_years
(
number
, required
)
depreciation_start_date
(
date
, required
)

### InventoryPart table
item_name
(
text
, required
)
category
(
text
, required
)
Options: Filters, Brakes, Tyres, Engine Oil, Batteries, Body Parts, Other
unit_cost
(
number
, required
)
quantity_available
(
number
, required
)
reorder_level
(
number
)
supplier
(
text
)

### MaintenanceLog table
vehicle_id
(
text
, required
)
Reference to the vehicle

service_date
(
date
, required
)
odometer_reading
(
number
)
service_type
(
text
, required
)
Options: Scheduled Service, Repair, Inspection, Oil Change, Tyre Change
vendor
(
text
)
Name of the service center or vendor

cost
(
number
, required
)
report_url
(
text
)
URL of the uploaded maintenance report

notes
(
text
)
next_service_due_date
(
date
)
status
(
text
)
Default: "Upcoming"
Options: Upcoming, Due, Completed, Overdue


### IncidentLog table
vehicle_id
(
text
, required
)
incident_date
(
date-time
, required
)
type
(
text
, required
)
Options: Damage, Theft, Accident, Mechanical Issue, Other
severity
(
text
, required
)
Options: Low, Medium, High, Critical
description
(
text
, required
)
photo_urls
(
array
)
responsible_user_id
(
text
)
User ID of the driver or responsible person

status
(
text
, required
)
Default: "Open"
Options: Open, Under Review, Resolved


### VehicleContract table
vehicle_id
(
text
, required
)
customer_name
(
text
, required
)
start_date
(
date
, required
)
end_date
(
date
, required
)
contract_value
(
number
, required
)
payment_terms
(
text
)
document_url
(
text
)
status
(
text
, required
)
Default: "Active"
Options: Active, Expired, Terminated
booking_id
(
text
)
Optional link to a booking record


### FineLog table
vehicle_id
(
text
, required
)
driver_user_id
(
text
)
fine_date
(
date
, required
)
type
(
text
, required
)
Options: Salik, Speeding, Parking, Miscellaneous
amount
(
number
, required
)
payment_status
(
text
, required
)
Default: "Unpaid"
Options: Paid, Unpaid, Disputed
reference_number
(
text
)
description
(
text
)


### CustomerDocument table
customer_id
(
text
, required
)
The ID of the customer this document belongs to.

document_type
(
text
, required
)
The type of document.

Options: Driving License, Emirates ID, Passport, Visa
document_part
(
text
)
Specific part of the document, e.g., 'front', 'back', 'page_1', 'visa_page'.

file_name
(
text
)
User-friendly name of the uploaded file.

file_url
(
text
, required
)
URL of the uploaded document file.

expiry_date
(
date
)
Optional expiry date for the document.

is_verified
(
boolean
)
Indicates if the document has been verified by an admin.

Default: false

## CarImage table
image_set_id
(
text
, required
)
A unique, user-defined ID to group images of the same car model and color (e.g., 'CAMRY-WHITE-2023').

model_tag
(
text
, required
)
The model of the car in the image (e.g., Camry).

color_tag
(
text
, required
)
The color of the car in the image (e.g., White).

image_url
(
text
, required
)
The URL of the uploaded image file.

notes
(
text
)
Optional notes about the image or set.


### Agreement table 
agreement_number
(
text
, required
)
Auto-generated agreement number (AJC-2024-001)

booking_id
(
text
, required
)
Reference to the booking

customer_id
(
text
, required
)
Reference to the customer

vehicle_id
(
text
, required
)
Reference to the vehicle

renter_full_name
(
text
, required
)
Renter's full name

nationality
(
text
)
Renter's nationality

passport_no
(
text
)
Passport number

emirates_id_no
(
text
)
Emirates ID number

driving_license_no
(
text
)
Driving license number

issue_place
(
text
)
License issue place

issue_date
(
date
)
License issue date

expiry_date
(
date
)
License expiry date

email_address
(
email
)
Email address

mobile_no
(
text
)
Mobile number

home_landline_no
(
text
)
Home landline number

work_landline_no
(
text
)
Work landline number

home_makani_no
(
text
)
Home Makani number

object_of_rent
(
text
)
Purpose of rental

work_address
(
text
)
Work address

home_address
(
text
)
Home address

car_make
(
text
)
Vehicle make

car_model_specs
(
text
)
Vehicle model and specifications

plates_no
(
text
)
License plate number

made_year
(
text
)
Manufacturing year

car_color
(
text
)
Vehicle color

daily_rate
(
number
)
Daily rental rate

weekly_rate
(
number
)
Weekly rental rate

monthly_rate
(
number
)
Monthly rental rate

payment_method
(
text
)
Payment method

discount_free_days
(
number
)
Number of discount/free days

out_date_time
(
date-time
)
Vehicle out date and time

out_km
(
number
)
Odometer reading at checkout

in_date_time
(
date-time
)
Vehicle return date and time

in_km
(
number
)
Odometer reading at return

status
(
text
)
Agreement status

Default: "Draft"
Options: Draft, Active, Completed, Cancelled
pdf_url
(
text
)
URL of generated PDF agreement


### StaffDocument table
employee_id
(
text
, required
)
The ID of the employee this document belongs to.

document_type
(
text
, required
)
The type of staff document.

Options: Employment Contract, ID Copy, Passport Copy, CV/Resume, Educational Certificate, Professional License, Performance Review, Training Record, Medical Certificate, Other
document_name
(
text
, required
)
User-friendly name of the uploaded file.

file_url
(
text
, required
)
URL of the uploaded document file.

file_type
(
text
)
File extension (jpg, png, pdf, doc, docx)

upload_date
(
date
)
Date when document was uploaded

expiry_date
(
date
)
Document expiry date (if applicable)

description
(
text
)
Additional notes or description about the document

is_confidential
(
boolean
)
Whether this document contains confidential/sensitive information

Default: false
is_verified
(
boolean
)
Whether the document has been verified by HR

Default: false


### LegalDocument table
category
(
text
, required
)
Document category/department

Options: Legal, Registration, Insurance, Compliance, Financial, Operational, HR
document_type
(
text
, required
)
Specific type of legal/company document

Options: Business License, Trade License, Legal Contract, Court Document, Company Registration, VAT Registration, Tax Registration, General Insurance, Vehicle Fleet Insurance, Liability Insurance, Compliance Certificate, Audit Report, Regulatory Approval, Tax Document, Bank Document, Financial Statement, Company Policy, Procedure, Operational Permit, HR Policy, Employment Law Document, Other
document_name
(
text
, required
)
User-friendly name of the uploaded file

file_url
(
text
, required
)
URL of the uploaded document file

file_type
(
text
)
File extension (jpg, png, pdf, doc, docx)

upload_date
(
date
)
Date when document was uploaded

expiry_date
(
date
)
Document expiry date (for licenses, registrations, certificates)

description
(
text
)
Additional notes or description about the document

is_critical
(
boolean
)
Whether this document is critical for business operations

Default: false
renewal_reminder_days
(
number
)
Days before expiry to send renewal reminder

Default: 30
responsible_department
(
text
)
Department responsible for maintaining this document

is_verified
(
boolean
)
Whether the document has been verified by management

Default: false


### AIDocumentProcessing table
document_name
(
text
, required
)
Original document filename

file_url
(
text
, required
)
URL of the uploaded document

file_type
(
text
)
File extension/type

document_type
(
text
, required
)
Type of document for AI processing

Options: Invoice, Contract, ID Document, License, Receipt, Insurance Document, Bank Statement, Business Card, Form, Other
processing_status
(
text
)
Current processing status

Default: "Uploaded"
Options: Uploaded, Processing, Completed, Error, Under Review
upload_date
(
date-time
, required
)
When document was uploaded

processed_date
(
date-time
)
When AI processing was completed

ai_extracted_data
(
object
)
Raw data extracted by AI

reviewed_data
(
object
)
Data after manual review and corrections

confidence_scores
(
object
)
AI confidence scores for extracted fields

processing_notes
(
text
)
Notes about processing or corrections made

is_reviewed
(
boolean
)
Whether human review has been completed

Default: false
error_message
(
text
)
Error details if processing failed

processed_by
(
text
)
User who reviewed/processed the document