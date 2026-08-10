import { Truck } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Distributors() {
  usePageTitle('Distributors');
  return (
    <ComingSoon
      title="Distributors"
      description="Distributors, salesmen, territories and routes."
      icon={Truck}
      phase="Phase 5"
    />
  );
}
