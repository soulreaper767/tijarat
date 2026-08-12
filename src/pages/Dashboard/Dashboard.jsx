import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Inbox, Package, TrendingUp, Truck, Wallet } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import EmptyState from '../../components/ui/EmptyState';
import SalesChart from '../../components/charts/SalesChart';
import BarChart from '../../components/charts/BarChart';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { useAuth } from '../../hooks/useAuth.jsx';
import { getDashboardSummary } from '../../services/api';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const RANGE_OPTIONS = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];

const STATUS_VARIANT = {
  Paid: 'success',
  Overdue: 'danger',
  Unpaid: 'warning',
  'Partly Paid': 'info',
  Draft: 'neutral',
  Cancelled: 'neutral',
  Return: 'neutral',
};

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Partly Paid', label: 'Partly Paid' },
  { value: 'Overdue', label: 'Overdue' },
];

const PAGE_SIZE = 8;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const ORDER_COLUMNS = [
  { key: 'name', header: 'Invoice', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.name}</span> },
  { key: 'customer', header: 'Customer' },
  { key: 'posting_date', header: 'Date' },
  { key: 'grand_total', header: 'Amount', align: 'right', render: (r) => formatCurrency(r.grand_total || 0) },
  {
    key: 'status',
    header: 'Status',
    render: (r) => (
      <Badge variant={STATUS_VARIANT[r.status] || 'neutral'} dot>
        {r.status}
      </Badge>
    ),
  },
];

export default function Dashboard() {
  usePageTitle('Dashboard');
  const { user } = useAuth();

  const [range, setRange] = useState('30d');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError('');
    getDashboardSummary(range)
      .then((data) => {
        if (!cancelled) setSummary(data);
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
  }, [range]);

  const filteredOrders = useMemo(() => {
    const recentOrders = summary?.recent_orders || [];
    return recentOrders.filter((o) => {
      const matchesSearch =
        !search ||
        (o.customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (o.name || '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [summary, search, status]);

  const pagedOrders = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };
  const updateStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  const kpis = summary?.kpis;
  const salesTrend = summary?.sales_trend || [];
  const territories = summary?.territories || [];
  const topDistributors = summary?.top_distributors || [];

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`${greeting()}${user?.full_name ? `, ${user.full_name}` : ''} — here's how the network is doing.`}
        actions={
          <Select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            options={RANGE_OPTIONS}
            className="w-40"
          />
        }
      />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-[124px] w-full" />)
        ) : (
          <>
            <StatCard label="Sales" value={formatCurrency(kpis?.sales || 0)} icon={TrendingUp} />
            <StatCard label="Orders" value={formatNumber(kpis?.orders || 0)} icon={Package} />
            <StatCard label="Collections" value={formatCurrency(kpis?.collections || 0)} icon={Wallet} />
            <StatCard label="Outstanding" value={formatCurrency(kpis?.outstanding || 0)} icon={AlertTriangle} />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {loading ? (
          <>
            <Skeleton className="h-72 w-full lg:col-span-2" />
            <Skeleton className="h-72 w-full" />
          </>
        ) : (
          <>
            <SalesChart data={salesTrend} className="lg:col-span-2" />
            <Card title="Sales by Territory" subtitle="Net sales this period">
              {territories.length ? (
                <BarChart data={territories} formatValue={formatCurrency} />
              ) : (
                <EmptyState icon={Inbox} title="No territory data yet" description="Submitted invoices with a customer territory will show up here." />
              )}
            </Card>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        {loading ? (
          <Skeleton className="h-64 w-full" />
        ) : (
          <Card title="Top Distributors" subtitle="Ranked by net sales this period" padding={false}>
            {topDistributors.length ? (
              <div className="divide-y divide-neutral-100 px-5 dark:divide-neutral-800">
                {topDistributors.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between gap-3 py-3.5">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                        {i + 1}
                      </span>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                        <Truck size={16} />
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{d.name}</p>
                        <p className="text-xs text-neutral-400">{formatNumber(d.orders)} orders</p>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                      {formatCurrency(d.value)}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={Inbox} title="No orders yet" description="Submitted Sales Orders will be ranked here by company." />
            )}
          </Card>
        )}
      </div>

      <Card className="mt-6" padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Recent Invoices"
            count={filteredOrders.length}
            searchValue={search}
            onSearchChange={updateSearch}
            searchPlaceholder="Search invoices or customers..."
            actions={
              <Select
                value={status}
                onChange={(e) => updateStatus(e.target.value)}
                options={STATUS_OPTIONS}
                className="w-40"
              />
            }
          />
        </div>

        <div className="mt-4 px-5">
          {loading ? (
            <div className="space-y-2 pb-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <DataTable columns={ORDER_COLUMNS} rows={pagedOrders} keyField="name" emptyLabel="No invoices match your filters" />
          )}
        </div>

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filteredOrders.length} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}
