'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, CalendarDays, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Explore', icon: Compass }, // 'অনুসন্ধান' can mean search/explore
  { href: '/appointments', label: 'Booking', icon: CalendarDays }, // 'বুকিং'
  { href: '/profile', label: 'Profile', icon: User }, // 'প্রোফাইল'
];

const BottomNav = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-t-md z-50">
      <div className="container mx-auto flex justify-around items-center h-16 max-w-md"> {/* Constrain width for better mobile look */}
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/map" && pathname.startsWith("/map")); // Highlight Explore for /map too
          return (
            <Link href={item.href} key={item.label} legacyBehavior>
              <a
                className={cn(
                  'flex flex-col items-center justify-center text-xs font-medium p-2 rounded-md transition-colors w-1/4', // Ensure equal width
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground',
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className={cn("h-6 w-6 mb-0.5", isActive ? "text-primary" : "text-muted-foreground")} />
                <span>{item.label}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
