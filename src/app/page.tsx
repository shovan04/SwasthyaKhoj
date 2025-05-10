import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinned, CalendarPlus, User, Stethoscope, ArrowRight } from 'lucide-react';

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
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
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
    </div>
  );
}
