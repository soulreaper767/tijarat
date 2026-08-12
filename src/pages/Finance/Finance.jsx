import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, Wallet } from 'lucide-react';

import PageHeader from '../../components/layout/PageHeader';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import Skeleton from '../../components/ui/Skeleton';
import DataTable from '../../components/tables/DataTable';
import TableToolbar from '../../components/tables/TableToolbar';
import Pagination from '../../components/tables/Pagination';
import { usePageTitle } from '../../hooks/usePageTitle';
import { listCustomers, listPaymentEntries, listSalesInvoices } from '../../services/api';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const PAGE_SIZE = 10;

const PAYMENT_COLUMNS = [
  { key: 'name', header: 'Entry', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.name}</span> },
  { key: 'party', header: 'Party' },
  { key: 'posting_date', header: 'Date' },
  { key: 'mode_of_payment', header: 'Mode' },
  { key: 'paid_amount', header: 'Amount', align: 'right', render: (r) => formatCurrency(r.paid_amount || 0) },
];

const AGING_COLUMNS = [
  { key: 'customer_name', header: 'Customer', render: (r) => <span className="font-medium text-neutral-900 dark:text-neutral-100">{r.customer_name}</span> },
  { key: 'territory', header: 'Territory' },
  {
    key: 'payment_overdue_days',
    header: 'Overdue',
    align: 'right',
    render: (r) => (
      <Badge variant={r.payment_overdue_days > 30 ? 'danger' : 'warning'} dot>
        {r.payment_overdue_days} days
      </Badge>
    ),
  },
];

export default function Finance() {
  usePageTitle('Finance');

  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [overdueCustomers, setOverdueCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([
      listSalesInvoices({ limit: 500 }),
      listPaymentEntries({ filters: [['payment_type', '=', 'Receive']], limit: 200 }),
      listCustomers({ filters: [['payment_overdue_days', '>', 0]], limit: 100 }),
    ])
      .then(([invoiceRows, paymentRows, overdueRows]) => {
        if (cancelled) return;
        setInvoices(invoiceRows);
        setPayments(paymentRows);
        setOverdueCustomers(overdueRows.sort((a, b) => (b.payment_overdue_days || 0) - (a.payment_overdue_days || 0)));
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

  const collections = useMemo(() => payments.reduce((sum, p) => sum + (p.paid_amount || 0), 0), [payments]);
  const outstanding = useMemo(() => invoices.reduce((sum, i) => sum + (i.outstanding_amount || 0), 0), [invoices]);
  const overdueTotal = overdueCustomers.length;

  const filteredPayments = useMemo(
    () =>
      payments.filter(
        (p) =>
          !search ||
          (p.party || '').toLowerCase().includes(search.toLowerCase()) ||
          (p.name || '').toLowerCase().includes(search.toLowerCase())
      ),
    [payments, search]
  );
  const pagedPayments = filteredPayments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <PageHeader title="Finance" description="Collections, outstanding balances, and overdue accounts across the network." />

      {error && (
        <Alert variant="danger" className="mb-6" onDismiss={() => setError('')}>
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-[124px] w-full" />)
        ) : (
          <>
            <StatCard label="Collections" value={formatCurrency(collections)} icon={ArrowDownCircle} />
            <StatCard label="Outstanding" value={formatCurrency(outstanding)} icon={ArrowUpCircle} />
            <StatCard label="Customers Overdue" value={formatNumber(overdueTotal)} icon={AlertTriangle} />
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card title="Overdue Accounts" subtitle="Oldest unpaid invoice per customer" padding={false}>
          {loading ? (
            <div className="space-y-2 p-5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : (
            <div className="px-5 pb-5">
              <DataTable columns={AGING_COLUMNS} rows={overdueCustomers} keyField="name" emptyLabel="No overdue accounts" />
            </div>
          )}
        </Card>

        <Card title="Ledger" subtitle="How aging is computed" >
          <div className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-300">
            <Wallet size={18} className="mt-0.5 shrink-0 text-primary-600 dark:text-primary-400" />
            <p>
              Each Distributor operates as its own Company with its own Chart of Accounts. Overdue
              days are refreshed daily from the oldest unpaid Sales Invoice per Customer — the same
              native Accounts Receivable data that drives reminders and BNPL eligibility checks.
            </p>
          </div>
        </Card>
      </div>

      <Card className="mt-6" padding={false}>
        <div className="p-5 pb-0">
          <TableToolbar
            title="Payment Entries"
            count={filteredPayments.length}
            searchValue={search}
            onSearchChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            searchPlaceholder="Search payments or parties..."
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
            <DataTable columns={PAYMENT_COLUMNS} rows={pagedPayments} keyField="name" emptyLabel="No payments recorded yet" />
          )}
        </div>

        {!loading && (
          <div className="px-5 pb-5">
            <Pagination page={page} pageSize={PAGE_SIZE} totalItems={filteredPayments.length} onPageChange={setPage} />
          </div>
        )}
      </Card>
    </div>
  );
}
