import { useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';
import { useAuth } from '../../hooks/useAuth.jsx';
import { getPortalLoginUrl } from '../../utils/portal';

export default function UserMenu() {
  const { user, roles, logout } = useAuth();
  const navigate = useNavigate();

  const name = user?.full_name || user?.user || 'Account';
  const role = roles[0] || 'User';

  const handleLogout = async () => {
    await logout();
    window.location.href = getPortalLoginUrl();
  };

  return (
    <Dropdown
      align="right"
      trigger={
        <button className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <Avatar name={name} size="sm" />
          <span className="hidden text-left sm:block">
            <span className="block text-sm font-medium leading-tight text-neutral-900 dark:text-neutral-100">
              {name}
            </span>
            <span className="block text-xs leading-tight text-neutral-500 dark:text-neutral-400">{role}</span>
          </span>
          <ChevronDown size={15} className="hidden text-neutral-400 sm:block" />
        </button>
      }
      items={[
        { label: 'Profile', icon: UserCircle, onClick: () => navigate('/app/settings') },
        { label: 'Settings', icon: Settings, onClick: () => navigate('/app/settings') },
        { type: 'divider' },
        { label: 'Log out', icon: LogOut, danger: true, onClick: handleLogout },
      ]}
    />
  );
}
