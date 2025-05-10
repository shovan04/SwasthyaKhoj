import InfoCard from '@/components/shared/InfoCard';
import { getAllFacilities } from '@/lib/data'; // Updated import
import type { MedicalFacility } from '@/types';

export default function MapPage() {
  const facilities: MedicalFacility[] = getAllFacilities();

  return (
    <div className="space-y-8 py-4 md:py-6"> {/* Adjusted padding */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Nearby Medical Facilities</h2>
        <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center text-muted-foreground shadow-inner">
          {/* Placeholder for future interactive map */}
          <p className="text-lg text-center">Interactive map feature is under development. <br/>Please use the list below to find facilities.</p>
        </div>
      </section>

      <section>
        <h3 className="text-xl font-semibold mb-4 text-foreground">Facilities List</h3>
        {facilities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((facility) => (
              <InfoCard key={facility.id} facility={facility} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-4">No medical facilities found.</p>
        )}
      </section>
    </div>
  );
}
