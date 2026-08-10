import { Wallet } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Finance() {
  usePageTitle('Finance');
  return (
    <ComingSoon
      title="Finance"
      description="Receivables, collections, outstanding balances and distributor ledgers."
      icon={Wallet}
      phase="Phase 8"
    />
  );
}
