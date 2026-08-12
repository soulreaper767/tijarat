import { useEffect, useMemo, useState } from 'react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { listBins } from '../../services/api';
import { formatNumber } from '../../utils/formatters';

const PAGE_SIZE = 12;

const COLUMNS = [
  { key: 'item_code', header: 'Item', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.item_code}</span> },
  { key: 'warehouse', header: 'Warehouse' },
  { key: 'actual_qty', header: 'On Hand', align: 'right', render: (r) => formatNumber(r.actual_qty || 0) },
  { key: 'reserved_qty', header: 'Reserved', align: 'right', render: (r) => formatNumber(r.reserved_qty || 0) },
  {
    key: 'projected_qty',
    header: 'Projected',
    align: 'right',
    render: (r) => formatNumber(r.projected_qty || 0),
  },
  {
    key: 'status',
    header: 'Status',
    render: (r) =>
      r.actual_qty <= 0 ? (
        <Badge variant="danger" dot>
          Out of Stock
        </Badge>
      ) : r.actual_qty <= r.reserved_qty ? (
        <Badge variant="warning" dot>
          Low Stock
        </Badge>
      ) : (
        <Badge variant="success" dot>
          In Stock
        </Badge>
      ),
  },
];

export default function Inventory() {
  usePageTitle('Inventory');

  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listBins({ limit: 500 })
      .then((rows) => {
        if (!cancelled) setBins(rows.filter((b) => (b.actual_qty || 0) !== 0 || (b.reserved_qty || 0) !== 0));
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

  const filtered = useMemo(
    () =>
      bins.filter(
        (b) =>
          !search ||
          (b.item_code || '').toLowerCase().includes(search.toLowerCase()) ||
          (b.warehouse || '').toLowerCase().includes(search.toLowerCase())
      ),
    [bins, search]
  );

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Inventory" description="Stock on hand across every warehouse, including shared warehousing-as-a-service facilities." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Stock by Warehouse"
            count={filtered.length}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search items or warehouses..."
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
            <DataTable columns={COLUMNS} rows={paged} keyField="name" emptyLabel="No stock movements yet" />
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
