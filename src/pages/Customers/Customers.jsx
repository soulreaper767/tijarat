import { Users } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Customers() {
  usePageTitle('Customers');
  return (
    <ComingSoon
      title="Customers"
      description="Retailers and wholesalers served across your distribution network."
      icon={Users}
      phase="Phase 5"
    />
  );
}
