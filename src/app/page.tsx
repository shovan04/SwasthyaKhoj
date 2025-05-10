// @ts-nocheck
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Search, Hospital, Store, Users, Star, Compass, Loader2, Clock } from 'lucide-react';
import type { MedicalFacility, Doctor } from '@/types';
import { getAllFacilities } from '@/lib/data';
import React, { useState, useEffect } from 'react';
// LocationDialog is no longer imported or used here
// useToast might not be needed if all toasts related to location are in Header
// const { toast } = useToast(); // Potentially remove if not used for other purposes

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
  <Link href={`/facility/${facility.id}`} passHref legacyBehavior>
    <a className="block hover:no-underline group">
      <Card className="p-4 bg-card mb-3 group-hover:shadow-md transition-shadow duration-200">
        <div className="flex items-start justify-between">
          <div className="flex-1 overflow-hidden">
            <h3 className="font-semibold text-md text-foreground truncate">{facility.name}</h3>
            {facility.distance && <p className="text-sm text-muted-foreground">{facility.distance}</p>}
            <p className="text-xs text-muted-foreground truncate">{facility.address}</p>
          </div>
          <Compass className="h-6 w-6 text-primary ml-2 shrink-0 group-hover:animate-pulse" />
        </div>
         {facility.type === 'hospital' && facility.doctors && facility.doctors.length > 0 && (
          <div className="mt-2 pt-2 border-t border-border/50">
            <h4 className="text-xs font-semibold text-muted-foreground mb-1">Available Doctors:</h4>
            {facility.doctors.slice(0, 1).map((doctor: Doctor) => ( // Show only first doctor for brevity
              <div key={doctor.id} className="text-xs">
                <p className="font-medium text-foreground truncate">{doctor.name} ({doctor.specialty})</p>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="truncate">{doctor.timings}</span>
                </div>
              </div>
            ))}
            {facility.doctors.length > 1 && <p className="text-xs text-primary mt-1">View all doctors...</p>}
          </div>
        )}
      </Card>
    </a>
  </Link>
);

export default function HomePage() {
  // Removed location-related state and functions:
  // const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  // const [currentLocationDisplay, setCurrentLocationDisplay] = useState('Set your location');
  // const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  // const [locationError, setLocationError] = useState<string | null>(null);
  // const handleDetectLocation = async () => { ... };

  const quickActions = [
    { title: 'Find Hospitals', href: '/map?type=hospital', icon: <Hospital className="h-6 w-6 text-primary" /> },
    { title: 'Medical Stores', href: '/map?type=store', icon: <Store className="h-6 w-6 text-primary" /> },
    { title: 'Find Doctors', href: '/appointments', icon: <Users className="h-6 w-6 text-primary" /> },
    { title: 'Emergency', href: '#!', icon: <Star className="h-6 w-6 text-primary" /> }, 
  ];

  const allFacilities = getAllFacilities();
  // Add some randomization or better logic for "nearby" if actual location is available via Header
  const homePageFacilities = allFacilities.sort(() => 0.5 - Math.random()).slice(0, 4); 
  const hospitals = homePageFacilities.filter(f => f.type === 'hospital');
  const stores = homePageFacilities.filter(f => f.type === 'store');


  return (
    <div className="space-y-6 p-4">
      {/* Location Section Removed - Now in Header */}
      
      {/* Search Bar Section */}
      <section>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors, hospitals, stores..."
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

      {/* LocationDialog instance Removed - Now in Header */}
    </div>
  );
}
