// @ts-nocheck
'use client';

import Link from 'next/link';
import { Hospital, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import LocationDialog from '@/components/shared/LocationDialog';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const Header = () => {
  const { toast } = useToast();
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [currentLocationDisplay, setCurrentLocationDisplay] = useState('Set your location');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // Effect to try and get location on initial load if permission was previously granted
  // This is a common pattern, but for now, we stick to manual trigger via dialog.
  // You might want to add a check for persisted location preference here in a real app.

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    setLocationError(null);
    setCurrentLocationDisplay("Detecting GPS...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocationDisplay("Fetching address...");

          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            if (!response.ok) {
              throw new Error(`Nominatim API error: ${response.status}`);
            }
            const data = await response.json();
            
            const locationStr = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            setCurrentLocationDisplay(locationStr);
            toast({
              title: "Location Detected",
              description: `Your location has been updated to: ${locationStr}`,
            });
          } catch (apiError) {
            console.error("Error fetching address:", apiError);
            const fallbackLocationStr = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            setCurrentLocationDisplay(fallbackLocationStr);
            setLocationError("Could not fetch address. Showing coordinates.");
            toast({
              title: "Address Fetch Error",
              description: `Could not get address details. Using coordinates: ${fallbackLocationStr}`,
              variant: "destructive",
            });
          } finally {
            setIsDetectingLocation(false);
            setIsLocationDialogOpen(false); 
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          const friendlyError = "Could not get location. Please ensure location services are enabled and permissions are granted.";
          setLocationError(friendlyError);
          setCurrentLocationDisplay("Could not fetch GPS location");
          setIsDetectingLocation(false);
          toast({
            title: "Location Error",
            description: friendlyError,
            variant: "destructive",
          });
        },
        { timeout: 10000 } 
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      setLocationError(errorMsg);
      setCurrentLocationDisplay("Geolocation not supported");
      setIsDetectingLocation(false);
      toast({
        title: "Unsupported Feature",
        description: errorMsg,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          {/* Location display/trigger on the left */}
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/30 p-2 rounded-md transition-colors"
            onClick={() => setIsLocationDialogOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsLocationDialogOpen(true);}}
            aria-label="Set your current location"
          >
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <div className="overflow-hidden">
              <p className="text-xs text-muted-foreground">Your location</p>
              <p className={cn(
                "font-semibold text-foreground text-sm truncate",
                currentLocationDisplay === 'Set your location' || locationError ? "text-muted-foreground" : "text-primary"
                )}
                style={{maxWidth: 'calc(100vw - 250px)'}} // Dynamic max width
              >
                {currentLocationDisplay}
              </p>
            </div>
          </div>

          {/* App title on the right */}
          <Link href="/" className="flex items-center text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
            <Hospital className="h-6 w-6 mr-2 shrink-0" />
            <span className="hidden sm:inline">SwasthyaKhoj</span>
            <span className="sm:hidden">SK</span> {/* Shorter name for mobile */}
          </Link>
        </div>
      </header>
      <LocationDialog
        isOpen={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        onDetectLocation={handleDetectLocation}
        currentLocationText={currentLocationDisplay}
        isDetecting={isDetectingLocation}
        detectionError={locationError}
      />
    </>
  );
};

export default Header;
