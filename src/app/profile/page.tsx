import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Settings, CalendarDays, LogOut, Edit2 } from 'lucide-react';

// Mock user data
const userProfile = {
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  phone: '+91-98XXXXXX00',
  avatarUrl: 'https://picsum.photos/100/100?random=user',
  initials: 'AS',
  memberSince: 'January 2024',
};

export default function ProfilePage() {
  return (
    <div className="space-y-8 py-4 md:py-6"> {/* Adjusted padding */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 text-primary">My Profile</h2>
      </section>

      <Card className="shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 p-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={userProfile.avatarUrl} alt={userProfile.name} data-ai-hint="profile picture" />
            <AvatarFallback className="text-3xl">{userProfile.initials}</AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl">{userProfile.name}</CardTitle>
            <CardDescription className="text-md">{userProfile.email}</CardDescription>
            <CardDescription className="text-md">{userProfile.phone}</CardDescription>
            <p className="text-xs text-muted-foreground mt-1">Member since: {userProfile.memberSince}</p>
          </div>
          <Button variant="outline" size="sm" className="sm:ml-auto">
            <Edit2 className="mr-2 h-4 w-4" /> Edit Profile
          </Button>
        </CardHeader>
        
        <Separator />

        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <Button variant="ghost" className="w-full justify-start text-lg p-4 h-auto" disabled>
              <CalendarDays className="mr-3 h-5 w-5 text-primary" />
              My Bookings
              <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Coming Soon</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-lg p-4 h-auto" disabled>
              <Settings className="mr-3 h-5 w-5 text-primary" />
              Account Settings
              <span className="ml-auto text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">Coming Soon</span>
            </Button>
          </div>
          
          <Separator />

          <Button variant="destructive" className="w-full text-lg p-4 h-auto">
            <LogOut className="mr-3 h-5 w-5" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
