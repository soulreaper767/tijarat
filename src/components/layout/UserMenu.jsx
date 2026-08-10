import { ChevronDown, LogOut, Settings, UserCircle } from 'lucide-react';
import Avatar from '../ui/Avatar';
import Dropdown from '../ui/Dropdown';

export default function UserMenu({ name = 'Nabeel Munawar', role = 'Admin' }) {
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
        { label: 'Profile', icon: UserCircle },
        { label: 'Settings', icon: Settings },
        { type: 'divider' },
        { label: 'Log out', icon: LogOut, danger: true },
      ]}
    />
  );
}
