import { BarChart3 } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Reports() {
  usePageTitle('Reports');
  return (
    <ComingSoon
      title="Reports"
      description="Sales, distribution, product, territory, customer, inventory and finance reports."
      icon={BarChart3}
      phase="Phase 9"
    />
  );
}
