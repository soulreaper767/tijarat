import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldCheck, UserCircle } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../hooks/useAuth.jsx';

export default function Settings() {
  usePageTitle('Settings');
  const { user, roles, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login', { replace: true });
  };

  return (
    <div>
      <PageHeader title="Settings" description="Your account, role, and platform access." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Profile" padding={false}>
          <div className="flex items-center gap-4 p-5">
            <Avatar name={user?.full_name} size="lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {user?.full_name || user?.user}
              </p>
              <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">{user?.user}</p>
            </div>
          </div>

          <dl className="divide-y divide-neutral-100 border-t border-neutral-100 px-5 dark:divide-neutral-800 dark:border-neutral-800">
            {user?.customer && (
              <div className="flex justify-between py-2.5 text-sm">
                <dt className="text-neutral-500 dark:text-neutral-400">Linked Customer</dt>
                <dd className="font-medium text-neutral-900 dark:text-neutral-100">{user.customer}</dd>
              </div>
            )}
            {user?.supplier && (
              <div className="flex justify-between py-2.5 text-sm">
                <dt className="text-neutral-500 dark:text-neutral-400">Linked Supplier</dt>
                <dd className="font-medium text-neutral-900 dark:text-neutral-100">{user.supplier}</dd>
              </div>
            )}
          </dl>

          <div className="flex justify-end p-5 pt-4">
            <Button variant="outline" icon={LogOut} onClick={handleLogout}>
              Log out
            </Button>
          </div>
        </Card>

        <Card title="Roles & Access" subtitle="Assigned via Role Profile on the ERPNext side" padding={false}>
          <div className="flex flex-wrap gap-2 p-5">
            {roles.length ? (
              roles
                .filter((r) => r !== 'All')
                .map((role) => (
                  <Badge key={role} variant={isAdmin ? 'primary' : 'neutral'}>
                    {role}
                  </Badge>
                ))
            ) : (
              <p className="text-sm text-neutral-500 dark:text-neutral-400">No roles assigned yet.</p>
            )}
          </div>

          <div className="flex items-start gap-3 border-t border-neutral-100 p-5 text-sm text-neutral-600 dark:border-neutral-800 dark:text-neutral-300">
            {isAdmin ? (
              <>
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-400" />
                <p>
                  You have administrative access. User and Role Profile assignment for your team is
                  managed from the ERPNext desk (User list → Role Profile field) — every persona
                  (Field Officer, Warehouse Manager, Support Agent, etc.) already has a matching
                  Role Profile that bundles the right permissions in one click.
                </p>
              </>
            ) : (
              <>
                <UserCircle size={18} className="mt-0.5 shrink-0 text-neutral-400" />
                <p>Contact your Distributor Admin or the platform team to change your role or access.</p>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
