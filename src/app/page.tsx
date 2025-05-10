import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPinned, CalendarPlus, User, Stethoscope, ArrowRight, Clock, Users } from 'lucide-react';
import type { Doctor } from '@/types';

// Mock data for doctors to display on the home page
const mockDoctorsForHome: Doctor[] = [
  { id: 'doc1', name: 'Dr. Priya Sharma', specialty: 'General Physician', timings: 'Mon-Fri: 9 AM - 1 PM, 3 PM - 6 PM' },
  { id: 'doc2', name: 'Dr. Rahul Verma', specialty: 'Pediatrician', timings: 'Tue, Thu, Sat: 10 AM - 4 PM' },
  { id: 'doc3', name: 'Dr. Anjali Singh', specialty: 'Gynecologist', timings: 'Mon, Wed, Fri: 11 AM - 5 PM' },
];

export default function HomePage() {
  const features = [
    {
      title: 'Find Nearby',
      description: 'Locate hospitals & medical stores',
      href: '/map',
      icon: <MapPinned className="h-8 w-8 text-primary" />,
    },
    {
      title: 'Book Appointment',
      description: 'Schedule doctor visits',
      href: '/appointments',
      icon: <CalendarPlus className="h-8 w-8 text-primary" />,
    },
    {
      title: 'AI Provider Summary',
      description: 'Get quick doctor insights',
      href: '/provider-summary',
      icon: <Stethoscope className="h-8 w-8 text-primary" />,
    },
    {
      title: 'My Profile',
      description: 'Manage your account',
      href: '/profile',
      icon: <User className="h-8 w-8 text-primary" />,
    },
  ];

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-accent/50 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-primary">Welcome to SwasthyaKhoj!</h2>
        <p className="text-muted-foreground mt-2 text-lg">Your simple guide to healthcare access.</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature) => (
          <Link href={feature.href} key={feature.title} passHref legacyBehavior>
            <a className="block hover:no-underline">
              <Card className="h-full hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg sm:text-xl font-semibold">{feature.title}</CardTitle>
                  {feature.icon}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Button variant="link" className="px-0 pt-4 text-primary">
                    Go to {feature.title.toLowerCase()} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </a>
          </Link>
        ))}
      </section>

      <section>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="h-7 w-7 mr-3 text-primary" />
              Our Available Doctors
            </CardTitle>
            <CardDescription>
              Meet some of the specialists available for consultation. You can find more details and facilities on our map page.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockDoctorsForHome.map((doctor) => (
              <Card key={doctor.id} className="p-4 flex flex-col bg-background/80 hover:shadow-md transition-shadow">
                <CardTitle className="text-lg mb-2 text-primary">{doctor.name}</CardTitle>
                <div className="flex items-center text-sm text-foreground mb-1">
                  <Stethoscope className="h-4 w-4 mr-2 text-primary/80 flex-shrink-0" />
                  <span>{doctor.specialty}</span>
                </div>
                <div className="flex items-start text-sm text-foreground">
                  <Clock className="h-4 w-4 mr-2 mt-0.5 text-primary/80 flex-shrink-0" />
                  <span>{doctor.timings}</span>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
