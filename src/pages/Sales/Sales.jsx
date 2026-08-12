import { useEffect, useMemo, useState } from 'react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Select from '../../components/ui/Select';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { listSalesOrders } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

const STATUS_VARIANT = {
  Draft: 'neutral',
  'To Deliver and Bill': 'info',
  'To Bill': 'info',
  'To Deliver': 'info',
  Completed: 'success',
  Cancelled: 'danger',
  Closed: 'neutral',
};

const STATUS_OPTIONS = [
  { value: '', label: 'All statuses' },
  { value: 'Draft', label: 'Draft' },
  { value: 'To Deliver and Bill', label: 'To Deliver and Bill' },
  { value: 'To Bill', label: 'To Bill' },
  { value: 'To Deliver', label: 'To Deliver' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Cancelled', label: 'Cancelled' },
];

const COLUMNS = [
  { key: 'name', header: 'Order', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.name}</span> },
  { key: 'customer', header: 'Customer' },
  { key: 'transaction_date', header: 'Order Date' },
  { key: 'delivery_date', header: 'Delivery Date' },
  { key: 'booking_channel', header: 'Channel' },
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

const PAGE_SIZE = 10;

export default function Sales() {
  usePageTitle('Sales');

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listSalesOrders({ limit: 500 })
      .then((rows) => {
        if (!cancelled) setOrders(rows);
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
    return orders.filter((o) => {
      const matchesSearch =
        !search ||
        (o.customer || '').toLowerCase().includes(search.toLowerCase()) ||
        (o.name || '').toLowerCase().includes(search.toLowerCase());
      const matchesStatus = !status || o.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [orders, search, status]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Sales" description="Orders booked across every territory and distributor company." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Sales Orders"
            count={filtered.length}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search orders or customers..."
            actions={
              <Select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                options={STATUS_OPTIONS}
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
            <DataTable
              columns={COLUMNS}
              rows={paged}
              keyField="name"
              emptyLabel="No sales orders yet"
            />
          )}
        </div>

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filtered.length} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}
