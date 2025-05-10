import { getFacilityById } from '@/lib/data';
import type { MedicalFacility, Doctor } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Phone, MapPin, Hospital as HospitalIcon, Store as StoreIcon, Clock, Users, Info, CalendarPlus } from 'lucide-react';
import { cn } from '@/lib/utils';

export async function generateStaticParams() {
  // In a real app, fetch all facility IDs here
  // For now, using mock data IDs.
  // This is optional for server-side rendering but good for build-time generation.
  // const facilities = getAllFacilities();
  // return facilities.map((facility) => ({ id: facility.id }));
  return []; // For now, rely on dynamic rendering
}

export default async function FacilityDetailPage({ params }: { params: { id: string } }) {
  const facility: MedicalFacility | undefined = getFacilityById(params.id);

  if (!facility) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl font-bold text-destructive mb-4">Facility Not Found</h1>
        <p className="text-muted-foreground mb-6">The facility you are looking for does not exist or may have been removed.</p>
        <Button asChild>
          <Link href="/map">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Link>
        </Button>
      </div>
    );
  }

  const FacilityTypeIcon = facility.type === 'hospital' ? HospitalIcon : StoreIcon;

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/map">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Map
          </Link>
        </Button>
        <h1 className="text-2xl font-bold text-primary text-center sr-only">{facility.name}</h1> {/* Screen reader only title */}
      </div>

      <Card className="shadow-xl overflow-hidden">
        {facility.imageUrl && (
          <div className="relative h-48 sm:h-64 w-full">
            <Image
              src={facility.imageUrl}
              alt={facility.name}
              layout="fill"
              objectFit="cover"
              priority // Prioritize loading image for LCP
              data-ai-hint={facility.type === 'hospital' ? "hospital building exterior" : "store pharmacy interior"}
            />
          </div>
        )}
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <FacilityTypeIcon className={cn("h-12 w-12 sm:h-16 sm:w-16 mb-2 sm:mb-0 shrink-0", facility.type === 'hospital' ? 'text-primary' : 'text-green-600')} />
            <div>
              <CardTitle className="text-2xl sm:text-3xl">{facility.name}</CardTitle>
              <CardDescription className="text-md sm:text-lg">{facility.type === 'hospital' ? 'Hospital / Clinic' : 'Medical Store'}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 space-y-4">
          <div className="space-y-3 text-base">
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-3 mt-1 text-primary shrink-0" />
              <p>{facility.address}</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 mr-3 text-primary shrink-0" />
              <p>{facility.phone}</p>
            </div>
            {facility.type === 'store' && facility.operatingHours && (
              <div className="flex items-center">
                <Clock className="h-6 w-6 mr-3 text-primary shrink-0" />
                <p>Operating Hours: {facility.operatingHours}</p>
              </div>
            )}
          </div>

          {facility.type === 'hospital' && (
            <>
              {facility.services && facility.services.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl flex items-center"><Info className="h-5 w-5 mr-2 text-primary" /> Services Offered</h3>
                    <ul className="list-disc list-inside pl-5 space-y-1 text-muted-foreground">
                      {facility.services.map(service => <li key={service}>{service}</li>)}
                    </ul>
                  </div>
                </>
              )}
              {facility.doctors && facility.doctors.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <h3 className="font-semibold text-xl flex items-center"><Users className="h-5 w-5 mr-2 text-primary" /> Available Doctors</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {facility.doctors.map((doctor: Doctor) => (
                        <Card key={doctor.id} className="p-3 bg-card/50 shadow-sm">
                          <p className="font-medium text-lg text-foreground">{doctor.name}</p>
                          <p className="text-sm text-primary">{doctor.specialty}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <Clock className="h-4 w-4 mr-1.5" />
                            {doctor.timings}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {facility.appointmentBookingInfo && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <h3 className="font-semibold text-xl flex items-center"><CalendarPlus className="h-5 w-5 mr-2 text-primary" /> How to Book Appointment</h3>
                    <p className="pl-1 text-muted-foreground whitespace-pre-line">{facility.appointmentBookingInfo}</p>
                  </div>
                </>
              )}
            </>
          )}
          <Separator className="my-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <Button size="lg" asChild className="w-full">
              <a
                href={`https://maps.google.com/?q=${facility.latitude || facility.address}${facility.longitude ? ','+facility.longitude : ''}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="mr-2 h-5 w-5" /> Get Directions
              </a>
            </Button>
             <Button size="lg" variant="outline" asChild  className="w-full">
              <a href={`tel:${facility.phone}`}>
                <Phone className="mr-2 h-5 w-5" /> Call Now
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
