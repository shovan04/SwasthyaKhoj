import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MapPin, Hospital as HospitalIcon, Store as StoreIcon } from 'lucide-react';
import type { MedicalFacility } from '@/types';
import { cn } from '@/lib/utils';

interface InfoCardProps {
  facility: MedicalFacility;
}

const InfoCard: React.FC<InfoCardProps> = ({ facility }) => {
  const Icon = facility.type === 'hospital' ? HospitalIcon : StoreIcon;
  const cardBorderColor = facility.type === 'hospital' ? 'border-primary/50' : 'border-green-600/50';

  return (
    <Link href={`/facility/${facility.id}`} passHref legacyBehavior>
      <a className="block hover:no-underline group">
        <Card className={cn(
          "w-full shadow-lg group-hover:shadow-xl transition-shadow duration-200 cursor-pointer overflow-hidden",
          "border-2", // Add a default border thickness
          cardBorderColor,
          `group-hover:${facility.type === 'hospital' ? 'border-primary' : 'border-green-600'}` // Darken border on hover
        )}>
          <CardHeader className="pb-2">
            {facility.imageUrl && (
              <div className="relative h-40 w-full mb-4 rounded-t-md overflow-hidden">
                <Image
                  src={facility.imageUrl}
                  alt={facility.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={facility.type === 'hospital' ? "hospital building" : "store front"}
                />
              </div>
            )}
            <div className="flex items-center space-x-3">
              <Icon className={cn("h-8 w-8", facility.type === 'hospital' ? 'text-primary' : 'text-green-600')} />
              <CardTitle className="text-xl truncate">{facility.name}</CardTitle>
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
             <Button variant="link" className="p-0 h-auto text-sm text-primary group-hover:underline">View Details</Button>
           </CardContent>
        </Card>
      </a>
    </Link>
  );
};

export default InfoCard;
