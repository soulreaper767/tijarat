import { useState } from 'react';
import {
  DollarSign,
  Download,
  Inbox,
  Moon,
  MoreVertical,
  Package,
  Pencil,
  Plus,
  Search,
  Sun,
  Trash2,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Badge from '../../components/ui/Badge';
import Card from '../../components/ui/Card';
import StatCard from '../../components/ui/StatCard';
import Tabs from '../../components/ui/Tabs';
import Modal from '../../components/ui/Modal';
import Drawer from '../../components/ui/Drawer';
import Dropdown from '../../components/ui/Dropdown';
import Tooltip from '../../components/ui/Tooltip';
import Alert from '../../components/ui/Alert';
import EmptyState from '../../components/ui/EmptyState';
import Spinner from '../../components/ui/Spinner';
import Skeleton from '../../components/ui/Skeleton';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import DatePicker from '../../components/ui/DatePicker';
import { useToast } from '../../components/ui/Toast';
import { useTheme } from '../../hooks/useTheme';

const fullScale = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const semanticScale = [50, 100, 500, 600, 700];

const colorSwatches = [
  { name: 'primary', label: 'Primary', shades: fullScale },
  { name: 'neutral', label: 'Neutral', shades: fullScale },
  { name: 'success', label: 'Success', shades: semanticScale },
  { name: 'warning', label: 'Warning', shades: semanticScale },
  { name: 'danger', label: 'Danger', shades: semanticScale },
  { name: 'info', label: 'Info', shades: semanticScale },
];

function Section({ title, description, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default function DesignSystem() {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  const [tab, setTab] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [date, setDate] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
            Tijarat Design System
          </h1>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Phase 1 — brand tokens & core UI components, previewed in isolation.
          </p>
        </div>
        <Button variant="outline" icon={theme === 'dark' ? Sun : Moon} onClick={toggleTheme}>
          {theme === 'dark' ? 'Light mode' : 'Dark mode'}
        </Button>
      </div>

      <Section title="Colors" description="Semantic color scales driving every component.">
        <div className="space-y-3">
          {colorSwatches.map((c) => (
            <div key={c.name} className="flex items-center gap-3">
              <span className="w-20 shrink-0 text-sm font-medium text-neutral-600 dark:text-neutral-300">
                {c.label}
              </span>
              <div className="flex flex-1 overflow-hidden rounded-lg">
                {c.shades.map((s) => (
                  <div
                    key={s}
                    className="h-9 flex-1"
                    style={{ backgroundColor: `var(--color-${c.name}-${s}, transparent)` }}
                    title={`${c.name}-${s}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-50">Heading 1 — Inter Bold</h1>
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-50">Heading 2 — Inter Semibold</h2>
          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50">Heading 3</h3>
          <p className="text-base text-neutral-700 dark:text-neutral-300">Body text — Rs 12,450,000 in outstanding receivables across 84 distributors.</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Small / caption text used for hints and metadata.</p>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger" icon={Trash2}>Delete</Button>
          <Button variant="primary" icon={Plus}>New Order</Button>
          <Button variant="outline" iconRight={Download}>Export</Button>
          <Button variant="primary" loading={loading} onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 1500); }}>
            {loading ? 'Saving' : 'Trigger loading'}
          </Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Form fields">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Distributor name" placeholder="ABC Distributors" icon={Search} />
          <Input label="Password" type="password" placeholder="••••••••" />
          <Input label="Email" placeholder="you@tijarat.com" error="Please enter a valid email" />
          <Select
            label="Territory"
            placeholder="Select territory"
            options={[
              { value: 'lahore', label: 'Lahore' },
              { value: 'karachi', label: 'Karachi' },
              { value: 'islamabad', label: 'Islamabad' },
            ]}
          />
          <DatePicker label="Order date" value={date} onChange={setDate} hint="Used for sales analysis" />
          <Input label="Disabled" placeholder="Not editable" disabled />
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="neutral">Draft</Badge>
          <Badge variant="primary" dot>Processing</Badge>
          <Badge variant="success" dot>Paid</Badge>
          <Badge variant="warning" dot>Pending</Badge>
          <Badge variant="danger" dot>Overdue</Badge>
          <Badge variant="info">New</Badge>
        </div>
      </Section>

      <Section title="Stat cards">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Sales" value="Rs 12.4M" delta="12.5%" trend="up" icon={TrendingUp} />
          <StatCard label="Orders" value="1,284" delta="8.2%" trend="up" icon={Package} />
          <StatCard label="Collections" value="Rs 8.2M" delta="14.1%" trend="up" icon={DollarSign} />
          <StatCard label="Outstanding" value="Rs 18.7M" delta="3.2%" trend="down" icon={Users} />
        </div>
      </Section>

      <Section
        title="Cards & Tabs"
        description="Comparative cards stay locked to the same height regardless of how much content each holds."
      >
        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-2">
          <Card
            title="Top Distributors"
            subtitle="By net sales this month"
            actions={
              <Dropdown
                align="right"
                trigger={
                  <button className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800">
                    <MoreVertical size={16} />
                  </button>
                }
                items={[
                  { label: 'Edit', icon: Pencil, onClick: () => addToast({ variant: 'info', title: 'Edit clicked' }) },
                  { type: 'divider' },
                  { label: 'Delete', icon: Trash2, danger: true, onClick: () => setConfirmOpen(true) },
                ]}
              />
            }
          >
            <Tabs
              className="mb-4"
              tabs={[
                { id: 'overview', label: 'Overview' },
                { id: 'orders', label: 'Orders', count: 12 },
                { id: 'ledger', label: 'Ledger' },
              ]}
              value={tab}
              onChange={setTab}
            />
            {[
              { name: 'ABC Distributors', value: 'Rs 2.4M' },
              { name: 'XYZ Traders', value: 'Rs 1.9M' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between border-b border-neutral-100 py-2.5 text-sm last:border-0 dark:border-neutral-800"
              >
                <span className="flex items-center gap-2 text-neutral-700 dark:text-neutral-200">
                  <Truck size={15} className="text-neutral-400" /> {row.name}
                </span>
                <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {row.value}
                </span>
              </div>
            ))}
          </Card>

          <Card title="Top Products">
            {[
              { name: 'Cola 500ml Crate', value: '4,820 units' },
              { name: 'Juice Pack 250ml', value: '3,920 units' },
              { name: 'Water 1.5L Bottle', value: '3,110 units' },
              { name: 'Energy Drink 250ml Can', value: '2,405 units' },
            ].map((row) => (
              <div
                key={row.name}
                className="flex items-center justify-between border-b border-neutral-100 py-2.5 text-sm last:border-0 dark:border-neutral-800"
              >
                <span className="truncate pr-3 text-neutral-700 dark:text-neutral-200">{row.name}</span>
                <span className="shrink-0 font-medium tabular-nums text-neutral-900 dark:text-neutral-100">
                  {row.value}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </Section>

      <Section title="Alerts">
        <div className="space-y-3">
          <Alert variant="info" title="Heads up">This distributor's credit limit is close to being reached.</Alert>
          <Alert variant="success" title="Payment recorded">Rs 450,000 collected from ABC Distributors.</Alert>
          <Alert variant="warning" title="Low stock">3 SKUs are below reorder threshold.</Alert>
          <Alert variant="danger" title="Overdue" onDismiss={() => {}}>Invoice #INV-2291 is 15 days overdue.</Alert>
        </div>
      </Section>

      <Section title="Overlays: Modal, Drawer, Confirm, Toast">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="secondary" onClick={() => setDrawerOpen(true)}>Open drawer</Button>
          <Button variant="danger" onClick={() => setConfirmOpen(true)}>Delete distributor</Button>
          <Button variant="outline" onClick={() => addToast({ variant: 'success', title: 'Saved', description: 'Changes saved successfully.' })}>
            Show toast
          </Button>
          <Tooltip content="Tooltips explain icon-only actions">
            <span className="inline-flex h-10 items-center rounded-lg border border-neutral-300 px-4 text-sm dark:border-neutral-700">
              Hover me
            </span>
          </Tooltip>
        </div>
      </Section>

      <Section title="Loading & empty states">
        <div className="flex flex-wrap items-center gap-8">
          <Spinner size="lg" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700">
          <EmptyState
            icon={Inbox}
            title="No orders yet"
            description="Orders placed by this distributor will show up here."
            action={<Button icon={Plus}>Create order</Button>}
          />
        </div>
      </Section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New sales order"
        description="Create an order for a distributor."
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Create order</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Select
            label="Distributor"
            placeholder="Select distributor"
            options={[{ value: 'abc', label: 'ABC Distributors' }]}
          />
          <Input label="Order value" placeholder="Rs 0" />
        </div>
      </Modal>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="ABC Distributors"
        description="Lahore · Active"
        footer={<Button fullWidth onClick={() => setDrawerOpen(false)}>Close</Button>}
      >
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="Sales" value="Rs 24.5M" />
          <StatCard label="Outstanding" value="Rs 8.2M" />
          <StatCard label="Collection" value="Rs 16.3M" />
        </div>
      </Drawer>

      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          addToast({ variant: 'danger', title: 'Distributor deleted' });
        }}
        title="Delete distributor?"
        description="This will permanently remove ABC Distributors and all associated records."
        confirmLabel="Delete"
        variant="danger"
      />
    </div>
  );
}
