import { Settings as SettingsIcon } from 'lucide-react';
import ComingSoon from '../../components/layout/ComingSoon';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function Settings() {
  usePageTitle('Settings');
  return (
    <ComingSoon
      title="Settings"
      description="Workspace, user and integration settings."
      icon={SettingsIcon}
      phase="a later phase"
    />
  );
}
