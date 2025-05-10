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
            // Using a timeout for the fetch request
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
              signal: controller.signal
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            
            const locationStr = data.display_name || `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            setCurrentLocationDisplay(locationStr);
            toast({
              title: "Location Detected",
              description: `Your location has been updated to: ${locationStr.substring(0, 100)}${locationStr.length > 100 ? '...' : ''}`,
            });
          } catch (apiError: any) {
            console.warn("Error fetching address:", apiError.name === 'AbortError' ? 'Nominatim API request timed out' : apiError); // Changed to warn
            const fallbackLocationStr = `Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)}`;
            setCurrentLocationDisplay(fallbackLocationStr);
            
            let userFriendlyApiError = "Could not fetch address details.";
            if (apiError.name === 'AbortError') {
              userFriendlyApiError = "Could not fetch address details: The request timed out.";
            }
            
            setLocationError(userFriendlyApiError + " Showing coordinates.");
            toast({
              title: "Address Fetch Error",
              description: `${userFriendlyApiError} Using coordinates: ${fallbackLocationStr}`,
              variant: "destructive",
            });
          } finally {
            setIsDetectingLocation(false);
            setIsLocationDialogOpen(false); 
          }
        },
        (error: GeolocationPositionError) => {
          // Changed from console.error to console.warn as it's a handled error condition
          console.warn(`Geolocation API error (handled): Code ${error.code} - ${error.message}`, error);
          let friendlyError = "Could not get location. Please ensure location services are enabled and permissions are granted.";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              friendlyError = "Location permission denied. Please enable it in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              friendlyError = "Location information is unavailable.";
              break;
            case error.TIMEOUT:
              friendlyError = "The request to get user location timed out.";
              break;
            default:
              friendlyError = "An unknown error occurred while trying to get your location.";
          }
          setLocationError(friendlyError);
          // Update display to show the specific friendly error
          setCurrentLocationDisplay(friendlyError); 
          setIsDetectingLocation(false);
          toast({
            title: "Location Error",
            description: friendlyError,
            variant: "destructive",
          });
        },
        { timeout: 10000, enableHighAccuracy: true } 
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      setLocationError(errorMsg);
      setCurrentLocationDisplay("Geolocation not supported"); // Or errorMsg
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
            {isDetectingLocation ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
            ) : (
                <MapPin className="h-5 w-5 text-primary shrink-0" />
            )}
            <div className="overflow-hidden flex-grow min-w-0">
              <p className="text-xs text-muted-foreground whitespace-nowrap">Your location</p>
              <p 
                className={cn(
                  "font-semibold text-sm truncate",
                  (currentLocationDisplay === 'Set your location' || locationError || currentLocationDisplay === "Location information is unavailable." || currentLocationDisplay === "Geolocation not supported" || currentLocationDisplay === "Location permission denied. Please enable it in your browser settings." || currentLocationDisplay === "The request to get user location timed out.") ? "text-destructive" : "text-primary"
                )}
                style={{maxWidth: 'calc(100vw - 200px)'}} 
              >
                {currentLocationDisplay}
              </p>
            </div>
          </div>

          {/* App title on the right */}
          <Link href="/" className="flex items-center text-xl font-semibold text-primary hover:text-primary/90 transition-colors ml-auto shrink-0 text-right">
            <span className="hidden sm:inline">SwasthyaKhoj</span>
            <span className="sm:hidden">SK</span>
            <Hospital className="h-6 w-6 ml-2 shrink-0" />
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

