import { useEffect, useMemo, useState } from 'react';
import { Layers, Store } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Tabs from '../../components/ui/Tabs';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { listItemListings, listItems } from '../../services/api';
import { formatCurrency } from '../../utils/formatters';

const PAGE_SIZE = 10;

const ITEM_COLUMNS = [
  { key: 'name', header: 'Item Code', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.name}</span> },
  { key: 'item_name', header: 'Item Name' },
  { key: 'item_group', header: 'Group' },
  {
    key: 'is_marketplace_item',
    header: 'Multi-Vendor',
    render: (r) => (r.is_marketplace_item ? <Badge variant="info">Marketplace</Badge> : '—'),
  },
  { key: 'mrp_ceiling', header: 'MRP Ceiling', align: 'right', render: (r) => (r.mrp_ceiling ? formatCurrency(r.mrp_ceiling) : '—') },
];

const LISTING_COLUMNS = [
  { key: 'item', header: 'Item' },
  { key: 'supplier', header: 'Supplier' },
  { key: 'territory', header: 'Territory', render: (r) => r.territory || 'All' },
  { key: 'rate', header: 'Rate', align: 'right', render: (r) => formatCurrency(r.rate || 0) },
  { key: 'stock_status', header: 'Stock' },
];

export default function Products() {
  usePageTitle('Products');

  const [tab, setTab] = useState('catalog');
  const [items, setItems] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([listItems({ limit: 500 }), listItemListings({ limit: 500 })])
      .then(([itemRows, listingRows]) => {
        if (cancelled) return;
        setItems(itemRows);
        setListings(listingRows);
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

  useEffect(() => {
    setPage(1);
  }, [tab, search]);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (i) =>
          !search ||
          (i.item_name || '').toLowerCase().includes(search.toLowerCase()) ||
          (i.name || '').toLowerCase().includes(search.toLowerCase())
      ),
    [items, search]
  );

  const filteredListings = useMemo(
    () =>
      listings.filter(
        (l) =>
          !search ||
          (l.item || '').toLowerCase().includes(search.toLowerCase()) ||
          (l.supplier || '').toLowerCase().includes(search.toLowerCase())
      ),
    [listings, search]
  );

  const rows = tab === 'catalog' ? filteredItems : filteredListings;
  const columns = tab === 'catalog' ? ITEM_COLUMNS : LISTING_COLUMNS;
  const paged = rows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Products" description="The shared catalog, and every supplier's listed rate for each item." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <Card padding={false}>
        <Tabs
          className="px-5 pt-2"
          value={tab}
          onChange={setTab}
          tabs={[
            { id: 'catalog', label: 'Catalog', icon: Layers, count: items.length || undefined },
            { id: 'listings', label: 'Price Comparison', icon: Store, count: listings.length || undefined },
          ]}
        />

        <div className="p-5 pb-0">
          <TableToolbar
            title={tab === 'catalog' ? 'Items' : 'Listings by Supplier'}
            count={rows.length}
            searchValue={search}
            onSearchChange={setSearch}
            searchPlaceholder={tab === 'catalog' ? 'Search items...' : 'Search items or suppliers...'}
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
              columns={columns}
              rows={paged}
              keyField="name"
              emptyLabel={tab === 'catalog' ? 'No items found' : 'No listings found — the same item will show once more than one supplier lists it'}
            />
          )}
        </div>

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination page={page} pageSize={PAGE_SIZE} totalItems={rows.length} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}
