import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Calendar, User, Car } from "lucide-react";

export default function AgreementForm({ booking, customer, vehicle, onSubmit, onCancel, isLoading }) {
  const [agreementData, setAgreementData] = useState({
    agreement_number: '',
    booking_id: booking?.id || '',
    customer_id: customer?.id || '',
    vehicle_id: vehicle?.id || '',
    
    // Renter Personal Information
    renter_full_name: customer?.name || '',
    nationality: '',
    passport_no: '',
    emirates_id_no: '',
    driving_license_no: customer?.license_number || '',
    issue_place: '',
    issue_date: '',
    expiry_date: '',
    email_address: customer?.email || '',
    mobile_no: customer?.phone || '',
    home_landline_no: '',
    work_landline_no: '',
    home_makani_no: '',
    object_of_rent: 'Personal Use',
    work_address: '',
    home_address: customer?.address || '',
    
    // Rental Car Details
    car_make: vehicle?.make || '',
    car_model_specs: `${vehicle?.model || ''} ${vehicle?.variant_trim || ''}`.trim(),
    plates_no: vehicle?.license_plate || '',
    made_year: vehicle?.year?.toString() || '',
    car_color: vehicle?.color || '',
    
    // Rent Duration and Value
    daily_rate: vehicle?.daily_rate || 0,
    weekly_rate: vehicle?.daily_rate ? vehicle.daily_rate * 7 : 0,
    monthly_rate: vehicle?.monthly_rate || 0,
    payment_method: '',
    discount_free_days: 0,
    
    // Date & Time OUT/IN
    out_date_time: booking?.start_date ? new Date(booking.start_date).toISOString().slice(0, 16) : '',
    out_km: vehicle?.odometer_reading || 0,
    in_date_time: booking?.end_date ? new Date(booking.end_date).toISOString().slice(0, 16) : '',
    in_km: 0,
    
    status: 'Draft'
  });

  useEffect(() => {
    // Generate agreement number
    const currentYear = new Date().getFullYear();
    const agreementNumber = `AJC-${currentYear}-${String(Math.floor(Math.random() * 9000) + 1000)}`;
    setAgreementData(prev => ({ ...prev, agreement_number: agreementNumber }));
  }, []);

  const handleInputChange = (field, value) => {
    setAgreementData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(agreementData);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center border-b pb-4">
        <h1 className="text-2xl font-bold">Vehicle Rent Agreement</h1>
        <h2 className="text-xl font-semibold text-right">عقد الجــسر لتأجير المركبات</h2>
        <div className="mt-4">
          <Label>Agreement No.</Label>
          <Input 
            value={agreementData.agreement_number}
            className="text-center text-xl font-bold text-red-600 border-2 max-w-xs mx-auto"
            readOnly
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rental Car Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="w-5 h-5" />
                Rental Car Details
                <span className="text-sm font-normal">بيانات السيارة المستأجرة</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Car Make: <span className="text-right">ماركة السيارة</span></Label>
                <Input 
                  value={agreementData.car_make}
                  onChange={(e) => handleInputChange('car_make', e.target.value)}
                />
              </div>
              <div>
                <Label>Car Model & Specs: <span className="text-right">نوع السيارة ومنها</span></Label>
                <Input 
                  value={agreementData.car_model_specs}
                  onChange={(e) => handleInputChange('car_model_specs', e.target.value)}
                />
              </div>
              <div>
                <Label>Plates No: <span className="text-right">رقم اللوحة</span></Label>
                <Input 
                  value={agreementData.plates_no}
                  onChange={(e) => handleInputChange('plates_no', e.target.value)}
                />
              </div>
              <div>
                <Label>Made Year: <span className="text-right">سنة الصنع</span></Label>
                <Input 
                  value={agreementData.made_year}
                  onChange={(e) => handleInputChange('made_year', e.target.value)}
                />
              </div>
              <div>
                <Label>Car Color: <span className="text-right">لون السيارة</span></Label>
                <Input 
                  value={agreementData.car_color}
                  onChange={(e) => handleInputChange('car_color', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Renter Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Renter Personal Information
                <span className="text-sm font-normal">بيانات المستأجر</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Renter Full Name: <span className="text-right">اسم المستأجر</span></Label>
                <Input 
                  value={agreementData.renter_full_name}
                  onChange={(e) => handleInputChange('renter_full_name', e.target.value)}
                />
              </div>
              <div>
                <Label>Nationality: <span className="text-right">الجنسية</span></Label>
                <Input 
                  value={agreementData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                />
              </div>
              <div>
                <Label>Passport No: <span className="text-right">رقم جواز السفر</span></Label>
                <Input 
                  value={agreementData.passport_no}
                  onChange={(e) => handleInputChange('passport_no', e.target.value)}
                />
              </div>
              <div>
                <Label>Emirates ID No: <span className="text-right">رقم الهوية</span></Label>
                <Input 
                  value={agreementData.emirates_id_no}
                  onChange={(e) => handleInputChange('emirates_id_no', e.target.value)}
                />
              </div>
              <div>
                <Label>Driving License No: <span className="text-right">رقم الرخصة</span></Label>
                <Input 
                  value={agreementData.driving_license_no}
                  onChange={(e) => handleInputChange('driving_license_no', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Personal Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Issue Place: <span className="text-right">مكان الإصدار</span></Label>
                <Input 
                  value={agreementData.issue_place}
                  onChange={(e) => handleInputChange('issue_place', e.target.value)}
                />
              </div>
              <div>
                <Label>Issue Date: <span className="text-right">تاريخ الإصدار</span></Label>
                <Input 
                  type="date"
                  value={agreementData.issue_date}
                  onChange={(e) => handleInputChange('issue_date', e.target.value)}
                />
              </div>
              <div>
                <Label>Expiry Date: <span className="text-right">تاريخ الانتهاء</span></Label>
                <Input 
                  type="date"
                  value={agreementData.expiry_date}
                  onChange={(e) => handleInputChange('expiry_date', e.target.value)}
                />
              </div>
              <div>
                <Label>E-mail Address: <span className="text-right">العنوان الإلكتروني</span></Label>
                <Input 
                  type="email"
                  value={agreementData.email_address}
                  onChange={(e) => handleInputChange('email_address', e.target.value)}
                />
              </div>
              <div>
                <Label>Mobile No: <span className="text-right">رقم الهاتف المتحرك</span></Label>
                <Input 
                  value={agreementData.mobile_no}
                  onChange={(e) => handleInputChange('mobile_no', e.target.value)}
                />
              </div>
              <div>
                <Label>Home Landline No: <span className="text-right">رقم الهاتف الثابت</span></Label>
                <Input 
                  value={agreementData.home_landline_no}
                  onChange={(e) => handleInputChange('home_landline_no', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rent Duration and Value */}
        <Card>
          <CardHeader>
            <CardTitle>Rent Duration and Value <span className="text-right">مدة الإيجار والقيمة</span></CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <Label>Daily <span className="text-right">يومي</span></Label>
                <Input 
                  type="number"
                  value={agreementData.daily_rate}
                  onChange={(e) => handleInputChange('daily_rate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Weekly <span className="text-right">أسبوعي</span></Label>
                <Input 
                  type="number"
                  value={agreementData.weekly_rate}
                  onChange={(e) => handleInputChange('weekly_rate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Monthly <span className="text-right">شهري</span></Label>
                <Input 
                  type="number"
                  value={agreementData.monthly_rate}
                  onChange={(e) => handleInputChange('monthly_rate', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <Label>Discount/Free days: <span className="text-right">خصم / أيام مجانية</span></Label>
                <Input 
                  type="number"
                  value={agreementData.discount_free_days}
                  onChange={(e) => handleInputChange('discount_free_days', parseInt(e.target.value) || 0)}
                />
              </div>
            </div>
            <div className="mt-4">
              <Label>Payment Method: <span className="text-right">طريقة الدفع</span></Label>
              <Input 
                value={agreementData.payment_method}
                onChange={(e) => handleInputChange('payment_method', e.target.value)}
                placeholder="Cash / Card / Bank Transfer"
              />
            </div>
          </CardContent>
        </Card>

        {/* Date & Time OUT/IN */}
        <Card>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-center">OUT <span className="text-right">خروج</span></h3>
                <div>
                  <Label>Date & Time <span className="text-right">تاريخ ووقت</span></Label>
                  <Input 
                    type="datetime-local"
                    value={agreementData.out_date_time}
                    onChange={(e) => handleInputChange('out_date_time', e.target.value)}
                  />
                </div>
                <div>
                  <Label>KM <span className="text-right">كيلومتر</span></Label>
                  <Input 
                    type="number"
                    value={agreementData.out_km}
                    onChange={(e) => handleInputChange('out_km', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-center">IN <span className="text-right">دخول</span></h3>
                <div>
                  <Label>Date & Time <span className="text-right">تاريخ ووقت</span></Label>
                  <Input 
                    type="datetime-local"
                    value={agreementData.in_date_time}
                    onChange={(e) => handleInputChange('in_date_time', e.target.value)}
                  />
                </div>
                <div>
                  <Label>KM <span className="text-right">كيلومتر</span></Label>
                  <Input 
                    type="number"
                    value={agreementData.in_km}
                    onChange={(e) => handleInputChange('in_km', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Fields */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <Label>The Object of Rent <span className="text-right">الغرض من استخدام المؤجرة</span></Label>
              <Input 
                value={agreementData.object_of_rent}
                onChange={(e) => handleInputChange('object_of_rent', e.target.value)}
              />
            </div>
            <div>
              <Label>Work Address: <span className="text-right">عنوان العمل</span></Label>
              <Textarea 
                value={agreementData.work_address}
                onChange={(e) => handleInputChange('work_address', e.target.value)}
              />
            </div>
            <div>
              <Label>Home Address: <span className="text-right">عنوان المنزل</span></Label>
              <Textarea 
                value={agreementData.home_address}
                onChange={(e) => handleInputChange('home_address', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="bg-green-600 hover:bg-green-700">
            {isLoading ? 'Processing...' : 'Save & Generate PDF'}
            <FileText className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}