import { supabase } from '@/lib/railway-db';

// Simple data import utility for development
export async function importSampleVehicles() {
  console.log('Importing sample vehicles...');

  const sampleVehicles = [
    {
      id: 'a4b11003-89a8-4090-8d0f-92025fa29e66',
      license_plate: 'P/61550',
      make: 'NISSAN',
      model: 'PATHFINDER',
      year: 2020,
      vehicle_class: 'Economy',
      status: 'Available',
      daily_rate: 100.0,
      color: 'WHITE',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    },
    {
      id: '009f2121-4992-4677-835e-a49c17fe28a6',
      license_plate: 'F/20428',
      make: 'NISSAN',
      model: 'ALTIMA SE',
      year: 2019,
      vehicle_class: 'Economy',
      status: 'Available',
      daily_rate: 50.0,
      color: 'BLUE',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    },
    {
      id: '267e5554-7125-4157-a4bd-8d6e8dd9e3db',
      license_plate: 'E/36249',
      make: 'NISSAN',
      model: 'ALTIMA SE',
      year: 2020,
      vehicle_class: 'Economy',
      status: 'Available',
      daily_rate: 60.0,
      color: 'ORANGE',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    },
    {
      id: '42fb09a4-526f-4f22-ad6e-a0c5d0121edc',
      license_plate: 'U/59738',
      make: 'LEXUS',
      model: 'RX 450 H',
      year: 2012,
      vehicle_class: 'Luxury',
      status: 'Available',
      daily_rate: 120.0,
      color: 'BLACK',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    },
    {
      id: '78e0bedf-0fa0-494b-8ba9-bb3e5f3f6338',
      license_plate: 'P/76403',
      make: 'NISSAN',
      model: 'ALTIMA SE',
      year: 2014,
      vehicle_class: 'Economy',
      status: 'Available',
      daily_rate: 60.0,
      color: 'GRAY',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    },
    {
      id: '0ec9c4f2-853c-4749-b4a0-346d4d963c97',
      license_plate: 'P/56942',
      make: 'CHEVROLET',
      model: 'MALIBU',
      year: 2019,
      vehicle_class: 'Mid-Size Sedan',
      status: 'Available',
      daily_rate: 50.0,
      color: 'BLACK',
      fuel_type: 'Petrol',
      transmission_type: 'Automatic'
    }
  ];

  try {
    // Check if vehicles already exist
    const { data: existingVehicles } = await supabase
      .from('vehicle')
      .select('id')
      .limit(1);

    if (existingVehicles && existingVehicles.length > 0) {
      console.log('Vehicles already exist in database');
      return { success: true, message: 'Data already exists' };
    }

    // Insert sample vehicles
    const { data, error } = await supabase
      .from('vehicle')
      .insert(sampleVehicles)
      .select();

    if (error) {
      console.error('Error importing vehicles:', error);
      return { success: false, error };
    }

    console.log('Successfully imported', data.length, 'vehicles');
    return { success: true, data, message: `Imported ${data.length} vehicles` };

  } catch (error) {
    console.error('Import failed:', error);
    return { success: false, error };
  }
}

export async function importSampleCustomers() {
  console.log('Importing sample customers...');

  const sampleCustomers = [
    {
      id: '240e7ff0-20f5-4bc4-87a1-c1d990fa78cf',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+971-50-123-4567',
      customer_type: 'Individual',
      status: 'Active'
    },
    {
      id: 'a944ef5e-24f2-45f4-86b5-d2eb6ffceed6',
      name: 'Ahmed Al Mansouri',
      email: 'ahmed.almansouri@email.com',
      phone: '+971 50 123 4567',
      customer_type: 'Individual',
      status: 'Active'
    },
    {
      id: '5a27f8ec-9494-4239-9552-c32a09378e64',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      phone: '+971 55 234 5678',
      customer_type: 'Individual',
      status: 'Active'
    }
  ];

  try {
    // Check if customers already exist
    const { data: existingCustomers } = await supabase
      .from('customer')
      .select('id')
      .limit(1);

    if (existingCustomers && existingCustomers.length > 0) {
      console.log('Customers already exist in database');
      return { success: true, message: 'Data already exists' };
    }

    // Insert sample customers
    const { data, error } = await supabase
      .from('customer')
      .insert(sampleCustomers)
      .select();

    if (error) {
      console.error('Error importing customers:', error);
      return { success: false, error };
    }

    console.log('Successfully imported', data.length, 'customers');
    return { success: true, data, message: `Imported ${data.length} customers` };

  } catch (error) {
    console.error('Import failed:', error);
    return { success: false, error };
  }
}

export async function importAllSampleData() {
  console.log('Starting sample data import...');

  const vehicleResult = await importSampleVehicles();
  const customerResult = await importSampleCustomers();

  return {
    vehicles: vehicleResult,
    customers: customerResult,
    success: vehicleResult.success && customerResult.success
  };
}