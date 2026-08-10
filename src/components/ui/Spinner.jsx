import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const sizes = {
  sm: 14,
  md: 20,
  lg: 28,
};

export default function Spinner({ size = 'md', className }) {
  return (
    <Loader2
      size={sizes[size]}
      className={cn('animate-spin text-primary-600 dark:text-primary-400', className)}
    />
  );
}
