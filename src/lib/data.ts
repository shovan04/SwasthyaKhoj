import type { MedicalFacility, Doctor } from '@/types';

export const mockDoctors: Doctor[] = [
  { id: 'doc1', name: 'Dr. Priya Sharma', specialty: 'General Physician', timings: 'Mon-Fri: 9 AM - 1 PM, 3 PM - 6 PM' },
  { id: 'doc2', name: 'Dr. Rahul Verma', specialty: 'Pediatrician', timings: 'Tue, Thu, Sat: 10 AM - 4 PM' },
  { id: 'doc3', name: 'Dr. Anjali Singh', specialty: 'Gynecologist', timings: 'Mon, Wed, Fri: 11 AM - 5 PM' },
  { id: 'doc4', name: 'Dr. Alok Gupta', specialty: 'Cardiologist', timings: 'Mon-Sat: 10 AM - 2 PM' },
  { id: 'doc5', name: 'Dr. Sunita Reddy', specialty: 'Orthopedic Surgeon', timings: 'Tue, Thu: 4 PM - 7 PM' },
];

export const mockFacilitiesData: MedicalFacility[] = [
  {
    id: '1',
    type: 'hospital',
    name: 'Community Health Center',
    address: '123 Village Road, Rural District, State',
    phone: '+91-123-4567890',
    imageUrl: 'https://picsum.photos/400/300?random=1',
    latitude: 28.6139,
    longitude: 77.2090,
    services: ['General Checkup', 'Emergency Care', 'Maternity Ward', 'Minor Procedures', 'Vaccinations'],
    doctors: [mockDoctors[0], mockDoctors[1]],
    appointmentBookingInfo: 'Call +91-123-4567890 during working hours (9AM-5PM). Walk-ins accepted for emergencies. Online booking via SwasthyaKhoj app coming soon!',
    distance: '1.2 km away',
  },
  {
    id: '2',
    type: 'store',
    name: 'Asha Medical Store',
    address: '45 Market Square, Near Bus Stand, Rural Town',
    phone: '+91-987-6543210',
    imageUrl: 'https://picsum.photos/400/300?random=2',
    latitude: 28.6150,
    longitude: 77.2100,
    operatingHours: '9 AM - 8 PM Daily. Sunday: 10 AM - 2 PM',
    distance: '0.8 km away',
  },
  {
    id: '3',
    type: 'hospital',
    name: 'District General Hospital',
    address: '789 Highway Connect, Rural District, State',
    phone: '+91-111-2223330',
    imageUrl: 'https://picsum.photos/400/300?random=3',
    latitude: 28.6100,
    longitude: 77.2000,
    services: ['Specialist OPDs', 'Advanced Surgery', 'Pediatrics Unit', 'Cardiology Dept.', 'Orthopedics Wing', 'Diagnostics Lab'],
    doctors: [mockDoctors[0], mockDoctors[1], mockDoctors[2], mockDoctors[3], mockDoctors[4]],
    appointmentBookingInfo: 'Appointments preferred. Call +91-111-2223330 or visit our reception. Limited online slots available on our website: dghospital.example.org.',
    distance: '2.5 km away',
  },
  {
    id: '4',
    type: 'store',
    name: 'Suraksha Pharmacy',
    address: 'Main Street, Rural Village, State',
    phone: '+91-555-6667770',
    imageUrl: 'https://picsum.photos/400/300?random=4',
    latitude: 28.6000,
    longitude: 77.1900,
    operatingHours: '8 AM - 9 PM. Sunday Closed.',
    distance: '3.1 km away',
  },
   {
    id: '5',
    type: 'hospital',
    name: 'City Central Hospital',
    address: '1 Inner Ring Road, Metro City, State',
    phone: '+91-222-3334440',
    imageUrl: 'https://picsum.photos/400/300?random=5',
    latitude: 28.6120,
    longitude: 77.2050,
    services: ['Multi-specialty Care', '24/7 Emergency', 'ICU', 'NICU', 'Robotic Surgery'],
    doctors: [mockDoctors[0], mockDoctors[2], mockDoctors[3]],
    appointmentBookingInfo: 'Book online at citycentral.example.com or call our helpline +91-222-3334440. Priority for emergency cases.',
    distance: '5.0 km away',
  },
];

export function getFacilityById(id: string): MedicalFacility | undefined {
  return mockFacilitiesData.find(facility => facility.id === id);
}

export function getAllFacilities(): MedicalFacility[] {
  return mockFacilitiesData;
}
