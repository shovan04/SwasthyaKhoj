import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CalendarCheck, Search } from 'lucide-react';

export default function AppointmentsPage() {
  return (
    <div className="space-y-8 py-4 md:py-6"> {/* Adjusted padding */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">Book an Appointment</h2>
      </section>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarCheck className="h-6 w-6 mr-2 text-primary" />
            Appointment System
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            The full appointment booking system is currently under development. 
            We are working hard to bring you a seamless experience.
          </p>
          <p className="text-muted-foreground">
            In the meantime, you can use our map feature to find contact details for nearby hospitals and clinics to schedule your appointments directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg" className="flex-1">
              <Link href="/map">
                <Search className="mr-2 h-5 w-5" />
                Find Facilities on Map
              </Link>
            </Button>
            {/* Placeholder for future search feature */}
            {/* 
            <Button variant="secondary" size="lg" className="flex-1" disabled>
              <Search className="mr-2 h-5 w-5" />
              Search Doctors (Coming Soon)
            </Button>
            */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
