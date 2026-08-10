import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Package,
  TrendingUp,
  Truck,
  Wallet,
} from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import SalesChart from '../../components/charts/SalesChart';
import BarChart from '../../components/charts/BarChart';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';
import {
  KPIS_BY_RANGE,
  RANGE_OPTIONS,
  RECENT_ORDERS,
  SALES_TREND_BY_RANGE,
  TERRITORIES_BY_RANGE,
  TOP_DISTRIBUTORS_BY_RANGE,
  TOP_PRODUCTS_BY_RANGE,
  statusVariant,
} from '../../data/mock/dashboard';

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Paid', label: 'Paid' },
  { value: 'Processing', label: 'Processing' },
  { value: 'Pending', label: 'Pending' },
  { value: 'Overdue', label: 'Overdue' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const PAGE_SIZE = 8;

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

const ORDER_COLUMNS = [
  { key: 'id', header: 'Order', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.id}</span> },
  {
    key: 'distributor',
    header: 'Distributor',
    render: (r) => (
      <div>
        <p className="text-neutral-800 dark:text-neutral-100">{r.distributor}</p>
        <p className="text-xs text-neutral-400">{r.city}</p>
      </div>
    ),
  },
  { key: 'date', header: 'Date' },
  { key: 'items', header: 'Items', align: 'right' },
  { key: 'amount', header: 'Amount', align: 'right', render: (r) => formatCurrency(r.amount) },
  {
    key: 'status',
    header: 'Status',
    render: (r) => (
      <Badge variant={statusVariant(r.status)} dot>
        {r.status}
      </Badge>
    ),
  },
];

export default function Dashboard() {
  usePageTitle('Dashboard');

  const [range, setRange] = useState('30d');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  const kpis = KPIS_BY_RANGE[range];
  const salesTrend = SALES_TREND_BY_RANGE[range];
  const territories = TERRITORIES_BY_RANGE[range];
  const topDistributors = TOP_DISTRIBUTORS_BY_RANGE[range];
  const topProducts = TOP_PRODUCTS_BY_RANGE[range];

  const filteredOrders = useMemo(() => {
    return RECENT_ORDERS.filter((o) => {
      const matchesSearch =
        !search ||
        o.distributor.toLowerCase().includes(search.toLowerCase()) ||
        o.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  const pagedOrders = filteredOrders.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const updateSearch = (value) => {
    setSearch(value);
    setPage(1);
  };
  const updateStatus = (value) => {
    setStatus(value);
    setPage(1);
  };

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`${greeting()}, Nabeel — here's how the network is doing.`}
        actions={
          <Select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            options={RANGE_OPTIONS}
            className="w-40"
          />
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Sales"
          value={formatCurrency(kpis.sales.value)}
          delta={formatPercent(kpis.sales.delta)}
          trend={kpis.sales.trend}
          icon={TrendingUp}
        />
        <StatCard
          label="Orders"
          value={formatNumber(kpis.orders.value)}
          delta={formatPercent(kpis.orders.delta)}
          trend={kpis.orders.trend}
          icon={Package}
        />
        <StatCard
          label="Collections"
          value={formatCurrency(kpis.collections.value)}
          delta={formatPercent(kpis.collections.delta)}
          trend={kpis.collections.trend}
          icon={Wallet}
        />
        <StatCard
          label="Outstanding"
          value={formatCurrency(kpis.outstanding.value)}
          delta={formatPercent(kpis.outstanding.delta)}
          trend={kpis.outstanding.trend}
          icon={AlertTriangle}
        />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SalesChart data={salesTrend} className="lg:col-span-2" />
        <Card title="Sales by Territory" subtitle="Net sales this period">
          <BarChart data={territories} formatValue={formatCurrency} />
        </Card>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Top Distributors" subtitle="Ranked by net sales" padding={false}>
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
                    <p className="text-xs text-neutral-400">
                      {d.city} · {formatNumber(d.orders)} orders
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(d.value)}
                  </p>
                  <span
                    className={`inline-flex items-center gap-0.5 text-xs font-medium ${
                      d.trend === 'up'
                        ? 'text-success-600 dark:text-success-400'
                        : 'text-danger-600 dark:text-danger-400'
                    }`}
                  >
                    {d.trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {d.trend === 'up' ? 'Growing' : 'Slowing'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Top Products" subtitle="Ranked by units sold" padding={false}>
          <div className="divide-y divide-neutral-100 px-5 dark:divide-neutral-800">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between gap-3 py-3.5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-xs font-semibold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-neutral-900 dark:text-neutral-100">{p.name}</p>
                    <p className="text-xs text-neutral-400">{p.sku}</p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                    {formatCurrency(p.revenue)}
                  </p>
                  <p className="text-xs text-neutral-400">{formatNumber(p.units)} units</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6" padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Recent Orders"
            count={filteredOrders.length}
            searchValue={search}
            onSearchChange={updateSearch}
            searchPlaceholder="Search orders or distributors..."
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
          <DataTable columns={ORDER_COLUMNS} rows={pagedOrders} emptyLabel="No orders match your filters" />
        </div>

        <div className="px-5 pb-5">
          <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filteredOrders.length} onPageChange={setPage} />
        </div>
      </Card>
    </div>
  );
}
