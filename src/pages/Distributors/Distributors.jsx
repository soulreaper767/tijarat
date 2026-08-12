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
import { listSuppliers } from '../../services/api';

const LIFECYCLE_VARIANT = {
  Registered: 'warning',
  Productive: 'success',
};

const TYPE_OPTIONS = [
  { value: '', label: 'All types' },
  { value: 'distributor', label: 'Distributor' },
  { value: 'manufacturer', label: 'Manufacturer / Brand Owner' },
];

const COLUMNS = [
  { key: 'supplier_name', header: 'Supplier', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.supplier_name}</span> },
  { key: 'supplier_group', header: 'Group' },
  {
    key: 'is_brand_owner',
    header: 'Type',
    render: (r) => (r.is_brand_owner ? 'Manufacturer' : 'Distributor'),
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
  { key: 'tijarat_score', header: 'Score', align: 'right', render: (r) => r.tijarat_score ?? '—' },
];

const PAGE_SIZE = 10;

export default function Distributors() {
  usePageTitle('Distributors');

  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    listSuppliers({ limit: 500 })
      .then((rows) => {
        if (!cancelled) setSuppliers(rows);
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
    return suppliers.filter((s) => {
      const matchesSearch =
        !search ||
        (s.supplier_name || '').toLowerCase().includes(search.toLowerCase()) ||
        (s.name || '').toLowerCase().includes(search.toLowerCase());
      const matchesType =
        !type || (type === 'manufacturer' ? !!s.is_brand_owner : !s.is_brand_owner);
      return matchesSearch && matchesType;
    });
  }, [suppliers, search, type]);

  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Distributors" description="Suppliers on the platform — distributors reselling into their territory and manufacturers who own the catalog." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Suppliers"
            count={filtered.length}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search suppliers..."
            actions={
              <Select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPage(1);
                }}
                options={TYPE_OPTIONS}
                className="w-56"
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
            <DataTable columns={COLUMNS} rows={paged} keyField="name" emptyLabel="No suppliers found" />
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
