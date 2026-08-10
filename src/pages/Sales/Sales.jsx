import { ShoppingCart } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Sales() {
  usePageTitle('Sales');
  return (
    <ComingSoon
      title="Sales"
      description="Orders, invoices, returns and sales analysis."
      icon={ShoppingCart}
      phase="Phase 4"
    />
  );
}
