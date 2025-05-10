// @ts-nocheck
'use client';

import Link from 'next/link';
import { Hospital, MapPin, Loader2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import LocationDialog from '@/components/shared/LocationDialog';
import { useToast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

const Header = () => {
  const { toast } = useToast();
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [currentLocationDisplay, setCurrentLocationDisplay] = useState('Set your location');
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);


  const handleDetectLocation = useCallback(async () => {
    if (isDetecting) return; // Prevent re-entry
    
    setIsDetecting(true);
    setLocationError(null);
    setCurrentLocationDisplay("Detecting GPS...");

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocationDisplay("Fetching address...");

          try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); 

            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=en`, {
              signal: controller.signal,
              headers: {
                'User-Agent': 'SwasthyaKhojSimplified/1.0 (contact@swasthyakhoj.app)' 
              }
            });
            clearTimeout(timeoutId);

            if (!response.ok) {
              throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            
            let locationStr = "Unknown Location";
            if (data.address) {
              locationStr = data.address.town || data.address.village || data.address.city_district || data.address.county || data.address.city || data.address.suburb || data.address.state || data.display_name.split(',')[0].trim();
              if (locationStr === data.address.country && (data.address.town || data.address.village || data.address.city_district || data.address.suburb)) {
                 // Prefer more specific if country is also the most specific one found initially
                 locationStr = data.address.town || data.address.village || data.address.city_district || data.address.suburb;
              }
            } else if (data.display_name) {
                locationStr = data.display_name.split(',')[0].trim();
            }
            
            if (locationStr === "Unknown Location" || locationStr === data.address?.country || !locationStr ) {
                locationStr = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
            }
            
            setCurrentLocationDisplay(locationStr);
            localStorage.setItem('userLocation', locationStr); // Save to local storage
            toast({
              title: "Location Detected",
              description: `Your location updated to: ${locationStr}`,
            });
          } catch (apiError: any) {
            console.warn("Error fetching address:", apiError.name === 'AbortError' ? 'Nominatim API request timed out' : apiError.message, apiError);
            const fallbackLocationStr = `Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`;
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
            setIsDetecting(false);
            setIsLocationDialogOpen(false); 
          }
        },
        (error: GeolocationPositionError) => {
          if (error.code === error.POSITION_UNAVAILABLE) {
            console.warn(`Geolocation position unavailable: Code ${error.code}, Message: "${error.message}"`, error);
          } else {
            console.error(`Geolocation error - Code: ${error.code}, Message: "${error.message}"`, error);
          }
          
          let friendlyError = "Could not get location. Please ensure location services are enabled and permissions are granted.";
          switch(error.code) {
            case error.PERMISSION_DENIED:
              friendlyError = "Location permission denied. Please enable it in your browser settings.";
              break;
            case error.POSITION_UNAVAILABLE:
              friendlyError = "Location information is unavailable. Please check your device's location services, network/GPS signal, and try again.";
              break;
            case error.TIMEOUT:
              friendlyError = "The request to get user location timed out. Please try again.";
              break;
            default: 
              friendlyError = "An unknown error occurred while trying to get your location. Please try again.";
          }
          setLocationError(friendlyError);
          setCurrentLocationDisplay("Could not fetch GPS location"); 
          setIsDetecting(false);
          toast({
            title: "Location Error",
            description: friendlyError,
            variant: "destructive",
          });
        },
        { timeout: 20000, enableHighAccuracy: false, maximumAge: 60000 } 
      );
    } else {
      const errorMsg = "Geolocation is not supported by this browser.";
      setLocationError(errorMsg);
      setCurrentLocationDisplay("Geolocation not supported");
      setIsDetecting(false);
      toast({
        title: "Unsupported Feature",
        description: errorMsg,
        variant: "destructive",
      });
    }
  }, [toast, isDetecting]); 

  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      setCurrentLocationDisplay(savedLocation);
    } else if (currentLocationDisplay === 'Set your location' || (locationError && !isDetecting)) {
       // Only attempt to detect if no saved location and (initial state or there was an error and not currently detecting)
      handleDetectLocation();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleDetectLocation]); // Rerun if handleDetectLocation changes (it's memoized)


  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          
          <div
            className="flex items-center space-x-2 cursor-pointer hover:bg-secondary/30 p-2 rounded-md transition-colors max-w-[calc(100vw-150px)] sm:max-w-[calc(100vw-200px)] md:max-w-[300px] order-1"
            onClick={() => setIsLocationDialogOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsLocationDialogOpen(true);}}
            aria-label="Set your current location"
          >
            {isDetecting ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
            ) : (
                <MapPin className="h-5 w-5 text-primary shrink-0" />
            )}
            <div className="overflow-hidden flex-grow min-w-0">
              <p className="text-xs text-muted-foreground whitespace-nowrap">Your location</p>
              <p 
                className={cn(
                  "font-semibold text-sm truncate",
                  (currentLocationDisplay === 'Set your location' || locationError || currentLocationDisplay === "Could not fetch GPS location" || currentLocationDisplay === "Geolocation not supported" || currentLocationDisplay.startsWith("Lat:") ) ? "text-destructive" : "text-primary"
                )}
                title={currentLocationDisplay}
              >
                {currentLocationDisplay}
              </p>
            </div>
          </div>
          
          <Link href="/" className="flex items-center text-xl font-semibold text-primary hover:text-primary/90 transition-colors shrink-0 order-2 sm:order-2 mx-auto sm:mx-0">
            <Hospital className="h-6 w-6 mr-2 shrink-0" />
            <span>SwasthyaKhoj</span>
          </Link>
        </div>
      </header>
      <LocationDialog
        isOpen={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        onDetectLocation={handleDetectLocation}
        currentLocationText={currentLocationDisplay}
        isDetecting={isDetecting}
        detectionError={locationError}
      />
    </>
  );
};

export default Header;