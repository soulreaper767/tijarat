import { Warehouse } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Inventory() {
  usePageTitle('Inventory');
  return (
    <ComingSoon
      title="Inventory"
      description="Stock overview, warehouses, stock movement and low-stock alerts."
      icon={Warehouse}
      phase="Phase 7"
    />
  );
}
