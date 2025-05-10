import InfoCard from '@/components/shared/InfoCard';
import type { MedicalFacility } from '@/types';

const mockFacilities: MedicalFacility[] = [
  {
    id: '1',
    type: 'hospital',
    name: 'Community Health Center',
    address: '123 Village Road, Rural District, State',
    phone: '+91-123-4567890',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    latitude: 28.6139, // Example coordinates
    longitude: 77.2090,
    services: ['General Checkup', 'Emergency Care', 'Maternity Ward'],
  },
  {
    id: '2',
    type: 'store',
    name: 'Asha Medical Store',
    address: '45 Market Square, Near Bus Stand, Rural Town',
    phone: '+91-987-6543210',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    latitude: 28.6150,
    longitude: 77.2100,
    operatingHours: '9 AM - 8 PM',
  },
  {
    id: '3',
    type: 'hospital',
    name: 'District General Hospital',
    address: '789 Highway Connect, Rural District, State',
    phone: '+91-111-2223330',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    latitude: 28.6100,
    longitude: 77.2000,
    services: ['Surgery', 'Pediatrics', 'OPD'],
  },
  {
    id: '4',
    type: 'store',
    name: 'Suraksha Pharmacy',
    address: 'Main Street, Rural Village, State',
    phone: '+91-555-6667770',
    imageUrl: 'https://picsum.photos/400/200?random=4',
    latitude: 28.6000,
    longitude: 77.1900,
    operatingHours: '8 AM - 9 PM, Sunday Closed',
  },
];

export default function MapPage() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Nearby Medical Facilities</h2>
        <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center text-muted-foreground shadow-inner">
          <p className="text-lg">Interactive map will be displayed here.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Facilities List</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockFacilities.map((facility) => (
            <InfoCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>
    </div>
  );
}
