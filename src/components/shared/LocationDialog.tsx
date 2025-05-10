// @ts-nocheck
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2, MapPin } from 'lucide-react';
import React from 'react';

interface LocationDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onDetectLocation: () => void;
  currentLocationText: string;
  isDetecting: boolean;
  detectionError: string | null;
}

const LocationDialog: React.FC<LocationDialogProps> = ({
  isOpen,
  onOpenChange,
  onDetectLocation,
  currentLocationText,
  isDetecting,
  detectionError,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card border-border shadow-xl rounded-lg">
        <DialogHeader className="p-6">
          <DialogTitle className="text-2xl font-semibold text-foreground flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-primary" />
            Set Your Location
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-1">
            Allow us to detect your current location for personalized results or set it manually (manual setting is a future feature).
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-6 py-4 space-y-4">
          <Button 
            onClick={onDetectLocation} 
            disabled={isDetecting} 
            className="w-full text-lg py-6"
            size="lg"
          >
            {isDetecting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Detecting Location...
              </>
            ) : (
              "Auto-detect My Location"
            )}
          </Button>
          
          {detectionError && (
            <p className="text-sm text-destructive text-center pt-2">{detectionError}</p>
          )}
          
          {!isDetecting && !detectionError && currentLocationText && (
            <div className="text-sm text-muted-foreground text-center pt-2">
              <p>Current set location:</p>
              <p className="font-medium text-foreground">{currentLocationText}</p>
            </div>
          )}
        </div>
        
        <DialogFooter className="p-6 pt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LocationDialog;
