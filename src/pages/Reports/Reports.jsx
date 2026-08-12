import { useEffect, useState } from 'react';
import { BarChart3, MapPin, Route, ShieldCheck, ShoppingBag, TrendingUp, Truck, Users } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import DataTable from '../../components/tables/DataTable';
import { usePageTitle } from '../../hooks/usePageTitle';
import { runReport } from '../../services/api';
import { cn } from '../../utils/cn';

const REPORTS = [
  {
    name: 'Item Listing Price Comparison',
    icon: ShoppingBag,
    description: 'Same item, every supplier and territory rate side by side.',
  },
  {
    name: 'GMV & Commission Summary',
    icon: TrendingUp,
    description: 'GMV and platform/referral commission by company.',
  },
  {
    name: 'Territory Performance',
    icon: MapPin,
    description: 'Orders and GMV per territory, with open exceptions.',
  },
  {
    name: 'Lifecycle Funnel',
    icon: Users,
    description: 'Registered vs. Productive, for both Customers and Suppliers.',
  },
  {
    name: 'PJP Compliance',
    icon: Route,
    description: 'Planned vs. completed field visits per Field Officer.',
  },
  {
    name: 'Courier Performance',
    icon: Truck,
    description: 'Delivered/failed/returned rate per courier partner.',
  },
  {
    name: 'Referral & Affiliate Commission',
    icon: ShieldCheck,
    description: 'Usage and commission earned per referral code.',
  },
];

const NUMERIC_TYPES = new Set(['Int', 'Float', 'Currency', 'Percent']);

function toColumns(reportColumns = []) {
  return reportColumns.map((col) => ({
    key: col.fieldname,
    header: col.label,
    align: NUMERIC_TYPES.has(col.fieldtype) ? 'right' : undefined,
  }));
}

export default function Reports() {
  usePageTitle('Reports');

  const [active, setActive] = useState(REPORTS[0].name);
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    runReport(active)
      .then((data) => {
        if (cancelled) return;
        setColumns(toColumns(data?.columns));
        // Report rows have no doctype-backed unique key (they're aggregates,
        // sometimes repeating a "name"-like column across rows) - stamp a
        // synthetic one so DataTable's React keys stay collision-free.
        setRows((data?.result || []).map((row, i) => ({ ...row, _row_id: i })));
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [active]);

  return (
    <div>
      <PageHeader title="Reports" description="Every operational report built into the platform, run live against current data." />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <Card padding={false}>
          <nav className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {REPORTS.map((report) => (
              <button
                key={report.name}
                type="button"
                onClick={() => setActive(report.name)}
                className={cn(
                  'flex w-full items-start gap-3 px-4 py-3 text-left transition-colors',
                  active === report.name
                    ? 'bg-primary-50 dark:bg-primary-500/10'
                    : 'hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
                )}
              >
                <span
                  className={cn(
                    'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
                    active === report.name
                      ? 'bg-primary-600 text-white'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                  )}
                >
                  <report.icon size={15} />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      'block truncate text-sm font-medium',
                      active === report.name
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-neutral-800 dark:text-neutral-100'
                    )}
                  >
                    {report.name}
                  </span>
                  <span className="mt-0.5 block text-xs text-neutral-500 dark:text-neutral-400">
                    {report.description}
                  </span>
                </span>
              </button>
            ))}
          </nav>
        </Card>

        <Card title={active} padding={false}>
          {error ? (
            <div className="p-5">
              <Alert variant="danger" onDismiss={() => setError('')}>
                {error}
              </Alert>
            </div>
          ) : loading ? (
            <div className="space-y-2 p-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : rows.length ? (
            <div className="p-5">
              <DataTable columns={columns} rows={rows} keyField="_row_id" emptyLabel="No data for this report yet" />
            </div>
          ) : (
            <EmptyState icon={BarChart3} title="No data yet" description="This report will populate once there's transaction history to summarize." />
          )}
        </Card>
      </div>
    </div>
  );
}
