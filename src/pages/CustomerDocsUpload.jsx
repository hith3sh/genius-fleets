
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, FileText, User, Phone, Mail, CheckCircle, AlertTriangle, UserCheck, MapPin, Edit2 } from 'lucide-react';
import { UploadFile } from '@/api/integrations';
import { Vehicle } from '@/api/entities';
import { Customer } from '@/api/entities';
import { Booking } from '@/api/entities';
import { createPageUrl } from '@/utils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

// DocumentUploadItem component
// Modified to accept 'docType' and pass 'e' (event) and 'docType' to 'onUpload'.
// Also, made 'description' and 'icon' rendering conditional as they might not always be passed.
const DocumentUploadItem = ({ title, description, docType, onUpload, documentUrl, isUploading, isDisabled, icon: Icon }) => {
  const fileInputRef = useRef(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative p-6 border-2 rounded-xl transition-all duration-300 ${
        isDisabled
          ? 'bg-gray-50 border-gray-200 filter blur-sm pointer-events-none opacity-60'
          : documentUrl
          ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md'
          : 'bg-white border-gray-200 hover:border-teal-300 hover:shadow-lg cursor-pointer'
      }`}
      onClick={() => !isDisabled && !isUploading && fileInputRef.current?.click()}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${
            documentUrl
              ? 'bg-green-100'
              : isDisabled
              ? 'bg-gray-100'
              : 'bg-teal-100'
          }`}>
            {Icon && <Icon className={`w-6 h-6 ${
              documentUrl
                ? 'text-green-600'
                : isDisabled
                ? 'text-gray-400'
                : 'text-teal-600'
            }`} />}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
            {description && <p className="text-sm text-gray-600">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {documentUrl ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-2 text-green-600 bg-green-100 px-3 py-2 rounded-full"
            >
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Uploaded</span>
            </motion.div>
          ) : (
            <Button
              type="button"
              variant={isDisabled ? "secondary" : "default"}
              className={`${
                isDisabled
                  ? 'bg-gray-200 text-gray-500'
                  : 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700'
              }`}
              onClick={(e) => {
                e.stopPropagation();
                if (!isDisabled && !isUploading) fileInputRef.current?.click();
              }}
              disabled={isUploading || isDisabled}
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Uploading...' : 'Choose File'}
            </Button>
          )}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={(e) => onUpload(e, docType)} // Pass the event and docType
        accept="image/jpeg,image/png,application/pdf"
      />

      {documentUrl && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-green-200"
        >
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
            className="text-teal-600 border-teal-200 hover:bg-teal-50"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Replace File
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function CustomerDocsUpload() {
  const [pendingBooking, setPendingBooking] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', residencyStatus: 'Resident' });
  const [documentUrls, setDocumentUrls] = useState({ driving_license_url: '', passport_url: '', visa_page_url: '', emirates_id_url: '' });
  const [locationDetails, setLocationDetails] = useState({ pickup_location: '', dropoff_location: '', special_requests: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isUploading, setIsUploading] = useState({ driving_license_url: false, passport_url: false, visa_page_url: false, emirates_id_url: false });

  useEffect(() => {
    const pendingData = localStorage.getItem('pendingBooking');
    if (pendingData) {
      setPendingBooking(JSON.parse(pendingData));
    } else {
      window.location.href = createPageUrl('MobileBooking');
      return;
    }

    const signupData = localStorage.getItem('customerSignupInfo');
    if (signupData) {
        const parsedSignupData = JSON.parse(signupData);
        // Merge with existing formData, but ensure residencyStatus default is preserved if not in parsedSignupData
        setFormData(prev => ({...prev, ...parsedSignupData, residencyStatus: parsedSignupData.residencyStatus || prev.residencyStatus }));
        setIsSignedUp(true);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleResidencyChange = (value) => {
    setFormData(prev => ({ ...prev, residencyStatus: value }));
    // Clear relevant document URLs when residency status changes
    setDocumentUrls(prev => {
      if (value === 'Visitor') {
        return { ...prev, emirates_id_url: '' }; // Clear Emirates ID if switching to Visitor
      } else { // Resident
        return { ...prev, passport_url: '', visa_page_url: '' }; // Clear Passport/Visa if switching to Resident
      }
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails(prev => ({...prev, [name]: value}));
  };

  const handleFileUpload = async (e, docType) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(prev => ({ ...prev, [docType]: true }));
    try {
      const { file_url } = await UploadFile({ file });
      setDocumentUrls(prev => ({ ...prev, [docType]: file_url }));
    } catch (error) {
      console.error(`Error uploading ${docType}:`, error);
      alert('File upload failed. Please try again.');
    } finally {
      setIsUploading(prev => ({ ...prev, [docType]: false }));
    }
  };

  const validateSignUp = () => {
    return formData.name && formData.email && formData.phone;
  };

  const isFormValid = () => {
    if (formData.residencyStatus === 'Resident') {
      return !!documentUrls.driving_license_url && !!documentUrls.emirates_id_url;
    } else if (formData.residencyStatus === 'Visitor') {
      return !!documentUrls.driving_license_url && !!documentUrls.passport_url && !!documentUrls.visa_page_url;
    }
    return false;
  };

  const handleSignUp = async () => {
    if (!validateSignUp()) {
      alert('Please fill in all required fields (Name, Email, Phone).');
      return;
    }

    // This function will now only handle the UI transition and data persistence in the browser.
    // It will NOT interact with the User entity.
    setIsLoading(true);
    try {
      // Persist signup info in localStorage for this session. This is the key change.
      localStorage.setItem('customerSignupInfo', JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          residencyStatus: formData.residencyStatus // Store current residency status
      }));

      setIsSignedUp(true);
      alert('✅ Details saved! Please upload the required documents to complete your booking.');

    } catch (error) {
      console.error('Error during sign-up step:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCompleteBooking = async () => {
    if (!isFormValid()) {
      alert('Please upload all the required documents based on your residency status to proceed.');
      return;
    }

    setIsLoading(true);
    try {
      if (!pendingBooking || !pendingBooking.vehicleId || !pendingBooking.startDate || !pendingBooking.endDate) {
        throw new Error('Missing essential booking details. Please start a new booking process.');
      }

      const vehicle = await Vehicle.get(pendingBooking.vehicleId);
      if (!vehicle) {
        throw new Error("Vehicle not found.");
      }

      const startDate = new Date(pendingBooking.startDate);
      const endDate = new Date(pendingBooking.endDate);
      const days = Math.max(1, Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

      const totalAmount = days * vehicle.daily_rate;
      const vatAmount = totalAmount * 0.05;
      const finalAmount = totalAmount + vatAmount;

      // Retrieve customer info from localStorage
      const signupInfo = JSON.parse(localStorage.getItem('customerSignupInfo')) || {};

      const allBookingData = {
        ...pendingBooking,
        customerName: signupInfo.name,
        customerEmail: signupInfo.email,
        customerPhone: signupInfo.phone,
        residencyStatus: formData.residencyStatus,
        documents: documentUrls,
        locationDetails: locationDetails,
        vehicleDetails: {
          id: vehicle.id,
          make: vehicle.make,
          model: vehicle.model,
          daily_rate: vehicle.daily_rate,
          license_plate: vehicle.license_plate,
          vehicle_photos: vehicle.vehicle_photos
        },
        costs: { days, totalAmount, vatAmount, finalAmount }
      };

      // Pass all collected data to the review page
      localStorage.setItem('completedBookingData', JSON.stringify(allBookingData));
      
      // Clean up only the pending booking part, leave signup info for now
      localStorage.removeItem('pendingBooking');

      window.location.href = createPageUrl('BookingReview');

    } catch (error) {
      console.error('Error preparing booking review:', error);
      alert('An error occurred while preparing your booking. Please try again. Error: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!pendingBooking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-orange-50 text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="bg-white p-8 rounded-2xl shadow-xl"
        >
          <AlertTriangle className="w-16 h-16 text-orange-500 mb-4 mx-auto" />
          <h1 className="text-2xl font-bold mb-2">No Pending Booking Found</h1>
          <p className="text-gray-600 mb-6">Please start a new search to make a booking.</p>
          <Button
            onClick={() => window.location.href = createPageUrl('MobileBooking')}
            className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700"
          >
            Back to Booking Page
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 p-4 sm:p-8 flex items-center justify-center">
      <Card className="w-full max-w-3xl mx-auto shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <UserCheck className="w-6 h-6 text-blue-600" />
            Almost There! Complete Your Booking
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-8">
          {!isSignedUp ? (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-center text-gray-700">First, let's get your details</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2"><User className="w-4 h-4" /> Full Name</Label>
                  <Input id="name" name="name" placeholder="Enter your full name" value={formData.name} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2"><Mail className="w-4 h-4" /> Email Address</Label>
                  <Input id="email" name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2"><Phone className="w-4 h-4" /> Phone Number</Label>
                  <Input id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              <Button onClick={handleSignUp} className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white" disabled={isLoading || !validateSignUp()}>
                {isLoading ? 'Saving Details...' : 'Save Details & Continue'}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4 flex items-center gap-4">
                    <CheckCircle className="w-8 h-8 text-green-600"/>
                    <div>
                        <h4 className="font-semibold text-green-800">Welcome, {formData.name}!</h4>
                        <p className="text-sm text-green-700">Please upload your documents to finalize the booking.</p>
                    </div>
                </CardContent>
              </Card>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select Your Residency Status</h3>
                <RadioGroup value={formData.residencyStatus} onValueChange={handleResidencyChange} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Resident" id="resident" />
                    <Label htmlFor="resident">Resident (with Emirates ID)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Visitor" id="visitor" />
                    <Label htmlFor="visitor">Tourist/Visitor</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Required Documents</h3>
                <DocumentUploadItem
                  title="Driving License (Front & Back)"
                  docType="driving_license_url"
                  onUpload={handleFileUpload}
                  documentUrl={documentUrls.driving_license_url}
                  isUploading={isUploading.driving_license_url}
                  icon={FileText} // Added icon prop for consistency with original DocumentUploadItem
                />
                <DocumentUploadItem
                  title="Emirates ID (Front & Back)"
                  docType="emirates_id_url"
                  onUpload={handleFileUpload}
                  documentUrl={documentUrls.emirates_id_url}
                  isUploading={isUploading.emirates_id_url}
                  isDisabled={formData.residencyStatus === 'Visitor'}
                  icon={FileText} // Added icon prop
                />
                <DocumentUploadItem
                  title="Passport"
                  docType="passport_url"
                  onUpload={handleFileUpload}
                  documentUrl={documentUrls.passport_url}
                  isUploading={isUploading.passport_url}
                  isDisabled={formData.residencyStatus === 'Resident'}
                  icon={FileText} // Added icon prop
                />
                <DocumentUploadItem
                  title="Visa Page"
                  docType="visa_page_url"
                  onUpload={handleFileUpload}
                  documentUrl={documentUrls.visa_page_url}
                  isUploading={isUploading.visa_page_url}
                  isDisabled={formData.residencyStatus === 'Resident'}
                  icon={FileText} // Added icon prop
                />
              </div>

              <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2"><MapPin className="w-5 h-5"/>Pickup & Drop-off (Optional)</h3>
                  <Input name="pickup_location" placeholder="Enter pickup location (e.g., Airport Terminal 3)" value={locationDetails.pickup_location} onChange={handleLocationChange} />
                  <Input name="dropoff_location" placeholder="Enter drop-off location" value={locationDetails.dropoff_location} onChange={handleLocationChange} />
                  <Textarea name="special_requests" placeholder="Any special requests? (e.g., specific time, car features)" value={locationDetails.special_requests} onChange={handleLocationChange} rows={3} />
              </div>

              <Button onClick={handleCompleteBooking} className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white" disabled={isLoading || !isFormValid()}>
                {isLoading ? 'Processing...' : 'Complete Booking & Continue to Review'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
