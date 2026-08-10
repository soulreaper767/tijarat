import { LayoutDashboard } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Dashboard() {
  usePageTitle('Dashboard');
  return (
    <ComingSoon
      title="Dashboard"
      description="Sales, orders, collections and outstanding at a glance."
      icon={LayoutDashboard}
      phase="Phase 3"
    />
  );
}
