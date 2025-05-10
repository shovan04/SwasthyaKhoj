import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Hospital as HospitalIcon, Store as StoreIcon } from 'lucide-react';
import type { MedicalFacility } from '@/types';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  facility: MedicalFacility;
}

const InfoCard: React.FC<InfoCardProps> = ({ facility }) => {
  const Icon = facility.type === 'hospital' ? HospitalIcon : StoreIcon;
  const cardBorderColor = facility.type === 'hospital' ? 'border-blue-500' : 'border-green-500';

  return (
    <Card className={cn("w-full shadow-lg hover:shadow-xl transition-shadow duration-200", cardBorderColor)}>
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
          <Icon className={cn("h-8 w-8", facility.type === 'hospital' ? 'text-blue-600' : 'text-green-600')} />
          <CardTitle className="text-xl">{facility.name}</CardTitle>
        </div>
        <CardDescription className="pt-1 text-sm">{facility.type === 'hospital' ? 'Hospital' : 'Medical Store'}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-start">
          <MapPin className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground shrink-0" />
          <p>{facility.address}</p>
        </div>
        <div className="flex items-center">
          <Phone className="h-5 w-5 mr-2 text-muted-foreground shrink-0" />
          <p>{facility.phone}</p>
        </div>
        {facility.type === 'hospital' && facility.services && (
          <div>
            <h4 className="font-medium mt-2">Services:</h4>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              {facility.services.slice(0, 3).map(service => <li key={service}>{service}</li>)}
            </ul>
          </div>
        )}
        {facility.type === 'store' && facility.operatingHours && (
          <p className="text-xs text-muted-foreground">Hours: {facility.operatingHours}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" size="sm" asChild>
          <a href={`tel:${facility.phone}`}>
            <Phone className="mr-2 h-4 w-4" /> Call
          </a>
        </Button>
        <Button size="sm" asChild>
          <a 
            href={`https://maps.google.com/?q=${facility.latitude || facility.address},${facility.longitude || ''}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <MapPin className="mr-2 h-4 w-4" /> Directions
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default InfoCard;
