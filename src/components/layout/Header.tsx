import Link from 'next/link';
import { Hospital } from 'lucide-react'; 

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link href="/" className="flex items-center text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
          <Hospital className="h-6 w-6 mr-2" />
          SwasthyaKhoj Simplified
        </Link>
        {/* Placeholder for future header actions like search or profile icon */}
      </div>
    </header>
  );
};

export default Header;
