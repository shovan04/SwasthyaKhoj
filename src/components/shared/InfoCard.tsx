import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Phone, MapPin, Hospital as HospitalIcon, Store as StoreIcon, Clock, Users, Info, CalendarPlus } from 'lucide-react';
import type { MedicalFacility, Doctor } from '@/types';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';

interface InfoCardProps {
  facility: MedicalFacility;
}

const InfoCard: React.FC<InfoCardProps> = ({ facility }) => {
  const Icon = facility.type === 'hospital' ? HospitalIcon : StoreIcon;
  const cardBorderColor = facility.type === 'hospital' ? 'border-primary' : 'border-green-600'; // Using primary for hospital

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className={cn("w-full shadow-lg hover:shadow-xl transition-shadow duration-200 cursor-pointer", cardBorderColor)}>
          <CardHeader className="pb-2">
            {facility.imageUrl && (
              <div className="relative h-40 w-full mb-4 rounded-t-md overflow-hidden">
                <Image
                  src={facility.imageUrl}
                  alt={facility.name}
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint={facility.type === 'hospital' ? "hospital building" : "store front"}
                />
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Icon className={cn("h-8 w-8", facility.type === 'hospital' ? 'text-primary' : 'text-green-600')} />
              <CardTitle className="text-xl">{facility.name}</CardTitle>
            </div>
            <CardDescription className="pt-1 text-sm">{facility.type === 'hospital' ? 'Hospital / Clinic' : 'Medical Store'}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground shrink-0" />
              <p className="line-clamp-2">{facility.address}</p>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-muted-foreground shrink-0" />
              <p>{facility.phone}</p>
            </div>
            {facility.type === 'hospital' && facility.services && (
              <p className="text-xs text-muted-foreground pt-1 line-clamp-1">
                Services: {facility.services.slice(0, 2).join(', ')}...
              </p>
            )}
            {facility.type === 'store' && facility.operatingHours && (
              <p className="text-xs text-muted-foreground pt-1">Hours: {facility.operatingHours}</p>
            )}
          </CardContent>
           <CardContent className="pt-2 pb-4">
             <Button variant="link" className="p-0 h-auto text-sm text-primary">View Details</Button>
           </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-2">
            <Icon className={cn("h-10 w-10", facility.type === 'hospital' ? 'text-primary' : 'text-green-600')} />
            <DialogTitle className="text-2xl">{facility.name}</DialogTitle>
          </div>
          <DialogDescription>{facility.type === 'hospital' ? 'Hospital / Clinic Details' : 'Medical Store Details'}</DialogDescription>
        </DialogHeader>

        {facility.imageUrl && (
          <div className="relative h-48 w-full my-4 rounded-md overflow-hidden">
            <Image
              src={facility.imageUrl}
              alt={facility.name}
              layout="fill"
              objectFit="cover"
              data-ai-hint={facility.type === 'hospital' ? "hospital building" : "store front"}
            />
          </div>
        )}

        <div className="space-y-4 py-2 text-sm">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-3 mt-0.5 text-primary shrink-0" />
            <p>{facility.address}</p>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-3 text-primary shrink-0" />
            <p>{facility.phone}</p>
          </div>

          {facility.type === 'hospital' ? (
            <>
              {facility.services && facility.services.length > 0 && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-md flex items-center"><Info className="h-5 w-5 mr-2 text-primary" /> Services Offered:</h4>
                  <ul className="list-disc list-inside pl-5 text-muted-foreground">
                    {facility.services.map(service => <li key={service}>{service}</li>)}
                  </ul>
                </div>
              )}
              <Separator className="my-3"/>
              {facility.doctors && facility.doctors.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-md flex items-center"><Users className="h-5 w-5 mr-2 text-primary" /> Available Doctors:</h4>
                  {facility.doctors.map((doctor: Doctor) => (
                    <div key={doctor.id} className="p-3 border rounded-md bg-secondary/30">
                      <p className="font-medium text-foreground">{doctor.name}</p>
                      <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <Clock className="h-3 w-3 mr-1.5" />
                        {doctor.timings}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <Separator className="my-3"/>
              {facility.appointmentBookingInfo && (
                <div className="space-y-1">
                  <h4 className="font-semibold text-md flex items-center"><CalendarPlus className="h-5 w-5 mr-2 text-primary" /> How to Book Appointment:</h4>
                  <p className="pl-5 text-muted-foreground">{facility.appointmentBookingInfo}</p>
                </div>
              )}
            </>
          ) : (
            facility.operatingHours && (
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-primary shrink-0" />
                <p>Operating Hours: {facility.operatingHours}</p>
              </div>
            )
          )}
        </div>

        <DialogFooter className="sm:justify-start gap-2 pt-4">
          <Button size="lg" asChild className="flex-1">
            <a
              href={`https://maps.google.com/?q=${facility.latitude || facility.address},${facility.longitude || ''}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MapPin className="mr-2 h-5 w-5" /> Get Directions
            </a>
          </Button>
           <Button size="lg" variant="outline" asChild  className="flex-1">
            <a href={`tel:${facility.phone}`}>
              <Phone className="mr-2 h-5 w-5" /> Call Now
            </a>
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="secondary" size="lg" className="flex-1 sm:flex-none">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InfoCard;
