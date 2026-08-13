import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, MapPin, PackageCheck } from 'lucide-react';

import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import DeviceFrame from '../../components/marketing/DeviceFrame';
import SectionHeading from '../../components/marketing/SectionHeading';
import FeatureCard from '../../components/marketing/FeatureCard';
import EcommerceFulfillmentMock from '../../components/marketing/EcommerceFulfillmentMock';
import { LOGISTICS_SERVICES, PLATFORM_APPS, PLATFORM_CAPABILITIES } from '../../data/marketing';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getPortalRegisterUrl } from '../../utils/portal';

function RetailerMock() {
  return (
    <div className="space-y-2.5">
      {[
        { name: 'Cola 500ml Crate', qty: 2, badge: 'In stock' },
        { name: 'Juice Pack 250ml', qty: 3, badge: 'In stock' },
        { name: 'Energy Drink Can', qty: 1, badge: 'Low stock' },
      ].map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2.5 dark:border-neutral-800"
        >
          <div>
            <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">{row.name}</p>
            <Badge variant={row.badge === 'In stock' ? 'success' : 'warning'} dot className="mt-1">
              {row.badge}
            </Badge>
          </div>
          <span className="rounded-md bg-neutral-100 px-2 py-1 text-xs font-semibold tabular-nums dark:bg-neutral-800">
            × {row.qty}
          </span>
        </div>
      ))}
    </div>
  );
}

function FieldOfficerMock() {
  return (
    <div className="space-y-3">
      <div className="flex h-24 items-center justify-center rounded-lg bg-[radial-gradient(circle,_var(--color-neutral-200)_1px,_transparent_1px)] [background-size:14px_14px] dark:bg-[radial-gradient(circle,_var(--color-neutral-700)_1px,_transparent_1px)]">
        <MapPin size={22} className="text-primary-500" />
      </div>
      {['ABC Store — visited', 'City Traders — next', 'Al-Noor Mart — pending'].map((v, i) => (
        <div key={v} className="flex items-center gap-2.5 text-sm">
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full ${
              i === 0
                ? 'bg-success-500 text-white'
                : 'border border-neutral-300 text-transparent dark:border-neutral-600'
            }`}
          >
            <Check size={11} />
          </span>
          <span className="text-neutral-600 dark:text-neutral-300">{v}</span>
        </div>
      ))}
    </div>
  );
}

function RiderMock() {
  return (
    <div className="space-y-2.5">
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
        <div className="h-full w-2/3 rounded-full bg-primary-600" />
      </div>
      {['Stop 1 · Al-Noor Mart · 0.8km', 'Stop 2 · City Traders · 1.4km', 'Stop 3 · ABC Store · 2.1km'].map(
        (s, i) => (
          <div key={s} className="flex items-center gap-2.5 text-sm">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
              {i + 1}
            </span>
            <span className="text-neutral-600 dark:text-neutral-300">{s}</span>
          </div>
        )
      )}
    </div>
  );
}

function DistributorMock() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { l: 'Sales', v: '2.4M' },
          { l: 'Orders', v: '84' },
          { l: 'Outstanding', v: '640K' },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-neutral-100 p-2.5 dark:border-neutral-800">
            <p className="text-[11px] text-neutral-400">{s.l}</p>
            <p className="text-sm font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">{s.v}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex h-16 items-end gap-1.5">
        {[40, 65, 50, 80, 60, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t bg-primary-500/70" style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}

function ManufacturerMock() {
  return (
    <div className="space-y-3">
      <p className="text-xs text-neutral-400">Sell-through by territory</p>
      {[
        { l: 'Lahore', v: 82 },
        { l: 'Karachi', v: 64 },
        { l: 'Islamabad', v: 48 },
      ].map((row) => (
        <div key={row.l}>
          <div className="mb-1 flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
            <span>{row.l}</span>
            <span className="tabular-nums">{row.v}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div className="h-full rounded-full bg-primary-600" style={{ width: `${row.v}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminMock() {
  return (
    <div className="space-y-2">
      {[
        { c: 'Lahore Distributors', s: 'Active', v: 'success' },
        { c: 'Karachi Trading Co.', s: 'Review', v: 'warning' },
        { c: 'Faisalabad Traders', s: 'Active', v: 'success' },
      ].map((row) => (
        <div
          key={row.c}
          className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2.5 text-sm dark:border-neutral-800"
        >
          <span className="text-neutral-700 dark:text-neutral-200">{row.c}</span>
          <Badge variant={row.v} dot>
            {row.s}
          </Badge>
        </div>
      ))}
    </div>
  );
}

function WarehousingMock() {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {[
        { bin: 'Rack A1', pct: 82 },
        { bin: 'Rack A2', pct: 45 },
        { bin: 'Cold B1', pct: 68 },
        { bin: 'Rack C3', pct: 20 },
      ].map((r) => (
        <div key={r.bin} className="rounded-lg border border-neutral-100 p-2.5 dark:border-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">{r.bin}</p>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
            <div className="h-full rounded-full bg-primary-500" style={{ width: `${r.pct}%` }} />
          </div>
          <p className="mt-1 text-xs font-medium tabular-nums text-neutral-700 dark:text-neutral-300">
            {r.pct}% full
          </p>
        </div>
      ))}
    </div>
  );
}

function DispatchMock() {
  return (
    <div className="space-y-2.5">
      {[
        { id: 'ORD-4821', via: 'Owned fleet' },
        { id: 'ORD-4822', via: 'Courier partner' },
        { id: 'ORD-4823', via: 'Owned fleet' },
      ].map((row) => (
        <div
          key={row.id}
          className="flex items-center justify-between rounded-lg border border-neutral-100 px-3 py-2.5 text-sm dark:border-neutral-800"
        >
          <span className="text-neutral-700 dark:text-neutral-200">{row.id}</span>
          <Badge variant={row.via === 'Owned fleet' ? 'primary' : 'info'}>{row.via}</Badge>
        </div>
      ))}
    </div>
  );
}

function DeliveryMock() {
  return (
    <div className="space-y-2.5">
      {[
        { name: 'ABC Store', amt: 'Rs 12,400' },
        { name: 'City Traders', amt: 'Rs 8,150' },
      ].map((row) => (
        <div key={row.name} className="rounded-lg border border-neutral-100 p-2.5 dark:border-neutral-800">
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-200">
              <PackageCheck size={14} className="text-success-500" />
              {row.name}
            </span>
            <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">{row.amt}</span>
          </div>
          <p className="mt-1 text-xs text-neutral-400">Cash collected · reconciled tonight</p>
        </div>
      ))}
    </div>
  );
}

function CourierNetworkMock() {
  return (
    <div className="space-y-2">
      {[
        { name: 'Swift Couriers', rate: 'Rs 180', best: true },
        { name: 'CityLink Express', rate: 'Rs 210', best: false },
        { name: 'RapidPost', rate: 'Rs 240', best: false },
      ].map((row) => (
        <div
          key={row.name}
          className={`flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm ${
            row.best
              ? 'border-primary-300 bg-primary-50 dark:border-primary-800 dark:bg-primary-500/10'
              : 'border-neutral-100 dark:border-neutral-800'
          }`}
        >
          <span className="text-neutral-700 dark:text-neutral-200">{row.name}</span>
          <span className="flex items-center gap-2">
            <span className="tabular-nums text-neutral-900 dark:text-neutral-100">{row.rate}</span>
            {row.best && <Badge variant="primary">Booked</Badge>}
          </span>
        </div>
      ))}
    </div>
  );
}

const NETWORK_MOCKS = {
  'retailer-app': RetailerMock,
  'field-officer-app': FieldOfficerMock,
  'rider-app': RiderMock,
  'distributor-console': DistributorMock,
  'manufacturer-portal': ManufacturerMock,
  'admin-console': AdminMock,
};

const LOGISTICS_MOCKS = {
  warehousing: WarehousingMock,
  dispatch: DispatchMock,
  delivery: DeliveryMock,
  'courier-network': CourierNetworkMock,
  'ecommerce-fulfillment': EcommerceFulfillmentMock,
};

function AlternatingSection({ item, index, mocks }) {
  const Mock = mocks[item.slug];
  const reversed = index % 2 === 1;

  return (
    <section id={item.slug} className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: reversed ? 24 : -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={reversed ? 'lg:order-2' : undefined}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
            <item.icon size={13} />
            {item.audience}
          </span>
          <h3 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            {item.name}
          </h3>
          <p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">{item.tagline}</p>
          <p className="mt-4 text-neutral-500 dark:text-neutral-400">{item.description}</p>

          <ul className="mt-6 space-y-2.5">
            {item.features.map((f) => (
              <li key={f} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-200">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                  <Check size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reversed ? -24 : 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className={reversed ? 'lg:order-1' : undefined}
        >
          <DeviceFrame className="mx-auto max-w-sm">
            <Mock />
          </DeviceFrame>
        </motion.div>
      </div>
    </section>
  );
}

export default function Services() {
  usePageTitle('Services');

  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-16 text-center sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Services"
          title="Everything it takes to move goods from factory floor to front door"
          description="Two things, done properly: connecting everyone in the trade chain, and running the warehousing and delivery that moves goods between them — including fulfillment for e-commerce brands."
        />
      </section>

      {/* The Network */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div id="network" className="scroll-mt-20 text-center">
          <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
            The Network
          </span>
          <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
            Manufacturers, distributors, wholesalers, traders and retailers — on one shared ledger
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-neutral-500 dark:text-neutral-400">
            One order, entered once, seen the same way by everyone downstream. No re-keying, no mismatched
            spreadsheets.
          </p>
        </div>
      </section>

      {PLATFORM_APPS.map((app, i) => (
        <AlternatingSection key={app.slug} item={app} index={i} mocks={NETWORK_MOCKS} />
      ))}

      {/* Logistics & Fulfillment */}
      <section className="bg-neutral-50 pt-16 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div id="logistics" className="scroll-mt-20 text-center">
            <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
              Logistics & Fulfillment
            </span>
            <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-3xl">
              We don't just connect the network — we move what's on it
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-neutral-500 dark:text-neutral-400">
              Warehousing, dispatch, last-mile delivery and a courier partner network — plus fulfillment for
              e-commerce businesses that need the same infrastructure without the trade network around it.
            </p>
          </div>
        </div>

        {LOGISTICS_SERVICES.map((service, i) => (
          <AlternatingSection key={service.slug} item={service} index={i} mocks={LOGISTICS_MOCKS} />
        ))}
      </section>

      {/* Capabilities */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What powers it"
            title="The layers underneath every service"
            description="Not extra apps to log into — capabilities woven through the network and the logistics that run underneath it."
          />

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {PLATFORM_CAPABILITIES.map((cap) => (
              <div key={cap.slug} id={cap.slug} className="scroll-mt-20">
                <FeatureCard icon={cap.icon} title={cap.name} description={cap.description} className="h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
          Trade network, logistics, or both — tell us what you need
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-neutral-500 dark:text-neutral-400">
          Register a business, or talk to us first — either way, we'll walk you through it.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={getPortalRegisterUrl()}>
            <Button size="lg" iconRight={ArrowRight}>
              Get started
            </Button>
          </a>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Talk to us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
