import { useEffect, useMemo, useState } from 'react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import Drawer from '../../components/ui/Drawer';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { listCustomers } from '../../services/api';

const LIFECYCLE_VARIANT = {
  Registered: 'warning',
  Productive: 'success',
};

const LIFECYCLE_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Registered', label: 'Registered' },
  { value: 'Productive', label: 'Productive' },
];

const PAGE_SIZE = 10;

export default function Customers() {
  usePageTitle('Customers');

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [lifecycle, setLifecycle] = useState('');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listCustomers({ limit: 500 })
      .then((rows) => {
        if (!cancelled) setCustomers(rows);
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
  }, []);

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesSearch =
        !search ||
        (c.customer_name || '').toLowerCase().includes(search.toLowerCase()) ||
        (c.name || '').toLowerCase().includes(search.toLowerCase());
      const matchesLifecycle = !lifecycle || c.lifecycle_status === lifecycle;
      return matchesSearch && matchesLifecycle;
    });
  }, [customers, search, lifecycle]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const columns = [
    {
      key: 'customer_name',
      header: 'Customer',
      render: (r) => (
        <button
          type="button"
          className="font-medium text-primary-700 hover:underline dark:text-primary-400"
          onClick={() => setSelected(r)}
        >
          {r.customer_name}
        </button>
      ),
    },
    { key: 'customer_group', header: 'Group' },
    { key: 'territory', header: 'Territory' },
    { key: 'tijarat_score', header: 'Score', align: 'right', render: (r) => r.tijarat_score ?? '—' },
    {
      key: 'payment_overdue_days',
      header: 'Overdue',
      align: 'right',
      render: (r) => (r.payment_overdue_days ? `${r.payment_overdue_days}d` : '—'),
    },
    {
      key: 'lifecycle_status',
      header: 'Status',
      render: (r) => (
        <Badge variant={LIFECYCLE_VARIANT[r.lifecycle_status] || 'neutral'} dot>
          {r.lifecycle_status}
        </Badge>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Customers" description="Every retailer, wholesaler, and trade party registered on the platform." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Customers"
            count={filtered.length}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search customers..."
            actions={
              <Select
                value={lifecycle}
                onChange={(e) => {
                  setLifecycle(e.target.value);
                  setPage(1);
                }}
                options={LIFECYCLE_OPTIONS}
                className="w-48"
              />
            }
          />
        </div>

        <div className="mt-4 px-5">
          {loading ? (
            <div className="space-y-2 pb-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <DataTable columns={columns} rows={paged} keyField="name" emptyLabel="No customers found" />
          )}
        </div>

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} />
          </div>
        )}
      </Card>

      <Drawer open={!!selected} onClose={() => setSelected(null)} title={selected?.customer_name} description={selected?.name}>
        {selected && (
          <dl className="divide-y divide-neutral-100 dark:divide-neutral-800">
            {[
              ['Customer Group', selected.customer_group],
              ['Territory', selected.territory],
              ['Lifecycle Status', selected.lifecycle_status],
              ['Tijarat Score', selected.tijarat_score ?? '—'],
              ['Payment Overdue', selected.payment_overdue_days ? `${selected.payment_overdue_days} days` : 'Current'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2.5 text-sm">
                <dt className="text-neutral-500 dark:text-neutral-400">{label}</dt>
                <dd className="font-medium text-neutral-900 dark:text-neutral-100">{value || '—'}</dd>
              </div>
            ))}
          </dl>
        )}
      </Drawer>
    </div>
  );
}
