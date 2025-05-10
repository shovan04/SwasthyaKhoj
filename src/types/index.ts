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
}
