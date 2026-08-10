import { Menu } from 'lucide-react';
import SearchField from '../forms/SearchField';
import NotificationMenu from './NotificationMenu';
import UserMenu from './UserMenu';

export default function Topbar({ onMenuClick }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-neutral-200 bg-white px-4 dark:border-neutral-800 dark:bg-neutral-900 sm:px-6">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800 lg:hidden"
      >
        <Menu size={20} />
      </button>

      <div className="max-w-sm flex-1">
        <SearchField placeholder="Search orders, distributors, products..." />
      </div>

      <div className="ml-auto flex items-center gap-1.5">
        <NotificationMenu />
        <UserMenu />
      </div>
    </header>
  );
}
