import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, Hospital, Store, Users, Star, Phone, Compass, CalendarDays } from 'lucide-react';
import type { MedicalFacility } from '@/types';

// Mock data for facilities, moved here and updated with distance
const mockFacilities: MedicalFacility[] = [
  {
    id: '1',
    type: 'hospital',
    name: 'Apollo Hospital',
    address: 'Bidhannagar, Kolkata - 700091',
    phone: '+91-123-4567890',
    imageUrl: 'https://picsum.photos/400/200?random=1',
    distance: '1.2 km away',
    services: ['General Checkup', 'Emergency Care', 'Maternity Ward'],
  },
  {
    id: '2',
    type: 'store',
    name: 'Asha Medical Store',
    address: 'Market Square, Rural Town',
    phone: '+91-987-6543210',
    imageUrl: 'https://picsum.photos/400/200?random=2',
    distance: '0.8 km away',
    operatingHours: '9 AM - 8 PM Daily',
  },
  {
    id: '3',
    type: 'hospital',
    name: 'Woodlands Hospital',
    address: 'Alipur, Kolkata - 700027',
    phone: '+91-111-2223330',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    distance: '2.5 km away',
    services: ['Surgery', 'Pediatrics', 'OPD'],
  },
  {
    id: '4',
    type: 'store',
    name: 'Suraksha Pharmacy',
    address: 'Main Street, Rural Village',
    phone: '+91-555-6667770',
    imageUrl: 'https://picsum.photos/400/200?random=4',
    distance: '3.1 km away',
    operatingHours: '8 AM - 9 PM, Sunday Closed',
  },
];


interface QuickActionCardProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({ title, href, icon }) => (
  <Link href={href} passHref legacyBehavior>
    <a className="block hover:no-underline">
      <Card className="bg-card hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full">
        <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 text-center h-full">
          <div className="bg-primary/10 p-3 rounded-full mb-2">
            {icon}
          </div>
          <span className="text-sm font-medium text-foreground">{title}</span>
        </CardContent>
      </Card>
    </a>
  </Link>
);

interface NearbyFacilityItemProps {
  facility: MedicalFacility;
}

const NearbyFacilityItem: React.FC<NearbyFacilityItemProps> = ({ facility }) => (
  <Card className="p-4 bg-card mb-3">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold text-md text-foreground">{facility.name}</h3>
        {facility.distance && <p className="text-sm text-muted-foreground">{facility.distance}</p>}
        <p className="text-xs text-muted-foreground">{facility.address}</p>
      </div>
      <Button variant="primary" size="icon" className="rounded-full shrink-0" asChild>
        <a href={`tel:${facility.phone}`}>
          <Phone className="h-5 w-5" />
        </a>
      </Button>
    </div>
  </Card>
);

export default function HomePage() {
  const quickActions = [
    { title: 'Find Hospitals', href: '/map', icon: <Hospital className="h-6 w-6 text-primary" /> },
    { title: 'Medical Stores', href: '/map?type=store', icon: <Store className="h-6 w-6 text-primary" /> },
    { title: 'Find Doctors', href: '/appointments', icon: <Users className="h-6 w-6 text-primary" /> },
    { title: 'Emergency', href: '#!', icon: <Star className="h-6 w-6 text-primary" /> }, // Placeholder for emergency
  ];

  const hospitals = mockFacilities.filter(f => f.type === 'hospital');
  const stores = mockFacilities.filter(f => f.type === 'store');

  return (
    <div className="space-y-6 p-4">
      {/* Location Section */}
      <section className="flex items-center space-x-2">
        <MapPin className="h-5 w-5 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">Your current location</p>
          <p className="font-semibold text-foreground">Kolkata, West Bengal</p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors or hospitals"
            className="pl-10 h-12 bg-card border-0 focus-visible:ring-primary"
          />
        </div>
      </section>

      {/* Quick Actions Grid Section */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {quickActions.map((action) => (
          <QuickActionCard key={action.title} {...action} />
        ))}
      </section>

      {/* Nearby Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Nearby You</h2>
          <Button variant="link" className="text-primary px-0" asChild>
            <Link href="/map">See All</Link>
          </Button>
        </div>

        <Tabs defaultValue="hospitals" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card p-1 h-auto">
            <TabsTrigger 
              value="hospitals" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-card data-[state=inactive]:text-muted-foreground py-2.5"
            >
              Hospitals
            </TabsTrigger>
            <TabsTrigger 
              value="stores"
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:bg-card data-[state=inactive]:text-muted-foreground py-2.5"
            >
              Medical Stores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hospitals" className="mt-4">
            {hospitals.length > 0 ? (
              hospitals.map((facility) => (
                <NearbyFacilityItem key={facility.id} facility={facility} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No hospitals found nearby.</p>
            )}
          </TabsContent>
          <TabsContent value="stores" className="mt-4">
             {stores.length > 0 ? (
              stores.map((facility) => (
                <NearbyFacilityItem key={facility.id} facility={facility} />
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No medical stores found nearby.</p>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
