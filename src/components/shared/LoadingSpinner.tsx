import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, className }) => {
  return (
    <Loader2 
      className={cn('animate-spin text-primary', className)} 
      style={{ width: size, height: size }} 
    />
  );
};

export default LoadingSpinner;
