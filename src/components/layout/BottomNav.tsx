'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MapPinned, CalendarPlus, User, Stethoscope } from 'lucide-react'; // Added Stethoscope for provider summary
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Map', icon: MapPinned },
  { href: '/appointments', label: 'Book', icon: CalendarPlus },
  { href: '/provider-summary', label: 'Summary', icon: Stethoscope },
  { href: '/profile', label: 'Profile', icon: User },
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border shadow-t-md z-50">
      <div className="container mx-auto flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label} legacyBehavior>
              <a
                className={cn(
                  'flex flex-col items-center justify-center text-sm font-medium p-2 rounded-md transition-colors',
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className={cn("h-6 w-6 mb-0.5", isActive ? "text-primary" : "")} />
                <span className="text-xs">{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
