export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  timings: string; // e.g., "Mon-Fri: 9 AM - 5 PM"
}

export interface MedicalFacility {
  id: string;
  type: 'hospital' | 'store';
  name: string;
  address: string;
  phone: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
  services?: string[]; // For hospitals
  operatingHours?: string; // For stores
  doctors?: Doctor[]; // For hospitals
  appointmentBookingInfo?: string; // For hospitals, e.g., "Call 123-456 or visit website.com/appointments"
  distance?: string; // e.g., "1.2 km away"
}
