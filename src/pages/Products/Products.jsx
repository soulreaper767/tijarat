import { Package } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Products() {
  usePageTitle('Products');
  return (
    <ComingSoon
      title="Products"
      description="Product catalog, categories, brands, price lists and SKUs."
      icon={Package}
      phase="Phase 6"
    />
  );
}
