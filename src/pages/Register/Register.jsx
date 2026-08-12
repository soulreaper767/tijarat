import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Factory, Globe, Layers, PartyPopper, Store, Truck } from 'lucide-react';

import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Textarea from '../../components/ui/Textarea';
import Alert from '../../components/ui/Alert';
import { usePageTitle } from '../../hooks/usePageTitle';
import { cn } from '../../utils/cn';
import { registerTradeParty } from '../../services/api';

const ROLES = [
  {
    value: 'retailer',
    icon: Store,
    title: 'Retailer / Trader',
    description: 'I run a shop and want to order from distributors.',
  },
  {
    value: 'wholesaler',
    icon: Layers,
    title: 'Wholesaler',
    description: 'I buy in bulk and resell to retailers and traders.',
  },
  {
    value: 'distributor',
    icon: Truck,
    title: 'Distributor',
    description: 'I distribute products to retailers in my territory.',
  },
  {
    value: 'manufacturer',
    icon: Factory,
    title: 'Manufacturer',
    description: 'I make products and sell through distributors.',
  },
  {
    value: 'ecommerce',
    icon: Globe,
    title: 'E-commerce Business',
    description: 'I run an online store and need warehousing & fulfillment.',
  },
];

// Values must match Territory names exactly (case-sensitive) - the backend
// does a direct Territory lookup by this string, falling back to creating a
// new leaf Territory under the root if the city doesn't exist yet.
const CITY_OPTIONS = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar'].map((c) => ({
  value: c,
  label: c,
}));

const STEPS = ['Role', 'Business details', 'Review', 'Done'];

const initialForm = {
  businessName: '',
  ownerName: '',
  phone: '',
  email: '',
  city: '',
  address: '',
  detail: '',
  password: '',
  confirmPassword: '',
};

const ROLE_DETAIL = {
  retailer: { label: 'Shop type', placeholder: 'e.g. General store, Pharmacy, Grocery' },
  wholesaler: { label: 'Market you serve', placeholder: 'e.g. Lahore wholesale market' },
  distributor: { label: 'Territory you cover', placeholder: 'e.g. Lahore Cantt & surrounding areas' },
  manufacturer: { label: 'Brands / product categories', placeholder: 'e.g. Beverages, Snacks' },
  ecommerce: { label: 'Platform you sell on', placeholder: 'e.g. Shopify, Daraz, own website' },
};

function Stepper({ step }) {
  return (
    <div className="mx-auto mb-10 flex max-w-md items-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 items-center last:flex-none">
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors',
                i < step
                  ? 'bg-primary-600 text-white'
                  : i === step
                    ? 'border-2 border-primary-600 text-primary-600 dark:text-primary-400'
                    : 'border-2 border-neutral-200 text-neutral-400 dark:border-neutral-700'
              )}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="hidden text-[11px] font-medium text-neutral-400 sm:block">{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={cn('mx-2 h-0.5 flex-1', i < step ? 'bg-primary-600' : 'bg-neutral-200 dark:bg-neutral-800')} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function Register() {
  usePageTitle('Create your account');
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role');

  const [step, setStep] = useState(0);
  const [role, setRole] = useState(ROLES.some((r) => r.value === preselectedRole) ? preselectedRole : '');
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await registerTradeParty({
        party_name: form.businessName,
        contact_person: form.ownerName,
        mobile_no: form.phone,
        email: form.email || undefined,
        city: form.city,
        address: form.address,
        business_type: role,
        password: form.password,
        registration_channel: 'Self',
      });
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const roleInfo = ROLES.find((r) => r.value === role);
  const detail = ROLE_DETAIL[role];

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Create your Tijarat account
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Takes about two minutes. We'll verify your details before activating your account.
        </p>
      </div>

      <div className="mt-10">
        <Stepper step={step} />

        <motion.div
          key={step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === 0 && (
            <div>
              <h2 className="text-center text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                I am a...
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {ROLES.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setRole(r.value)}
                    className={cn(
                      'flex flex-col items-center gap-3 rounded-2xl border-2 p-6 text-center transition-colors',
                      role === r.value
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-500/10'
                        : 'border-neutral-200 hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700'
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-11 w-11 items-center justify-center rounded-xl',
                        role === r.value
                          ? 'bg-primary-600 text-white'
                          : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400'
                      )}
                    >
                      <r.icon size={20} />
                    </span>
                    <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{r.title}</span>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{r.description}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <Button disabled={!role} onClick={() => setStep(1)}>
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 1 && (
            <form
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="businessName"
                  name="businessName"
                  label="Business name"
                  required
                  value={form.businessName}
                  onChange={update('businessName')}
                />
                <Input
                  id="ownerName"
                  name="ownerName"
                  label="Owner name"
                  required
                  value={form.ownerName}
                  onChange={update('ownerName')}
                />
                <Input
                  id="phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={update('phone')}
                />
                <Input
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                />
                <Select
                  id="city"
                  name="city"
                  label="City"
                  placeholder="Select city"
                  required
                  options={CITY_OPTIONS}
                  value={form.city}
                  onChange={update('city')}
                />
                {detail && (
                  <Input
                    id="detail"
                    name="detail"
                    label={detail.label}
                    placeholder={detail.placeholder}
                    value={form.detail}
                    onChange={update('detail')}
                  />
                )}
              </div>

              <Textarea
                id="address"
                name="address"
                label="Address"
                required
                className="mt-4"
                value={form.address}
                onChange={update('address')}
              />

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  hint="At least 8 characters"
                  minLength={8}
                  required
                  value={form.password}
                  onChange={update('password')}
                />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={update('confirmPassword')}
                />
              </div>

              <div className="mt-6 flex justify-between">
                <Button type="button" variant="outline" onClick={() => setStep(0)}>
                  Back
                </Button>
                <Button type="submit">Continue</Button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">Review your details</h2>

              <dl className="mt-5 divide-y divide-neutral-100 dark:divide-neutral-800">
                {[
                  ['Registering as', roleInfo?.title],
                  ['Business name', form.businessName],
                  ['Owner name', form.ownerName],
                  ['Phone', form.phone],
                  ['Email', form.email],
                  ['City', CITY_OPTIONS.find((c) => c.value === form.city)?.label],
                  detail ? [detail.label, form.detail] : null,
                  ['Address', form.address],
                ]
                  .filter(Boolean)
                  .map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2.5 text-sm">
                      <dt className="text-neutral-500 dark:text-neutral-400">{label}</dt>
                      <dd className="font-medium text-neutral-900 dark:text-neutral-100">{value || '—'}</dd>
                    </div>
                  ))}
              </dl>

              <p className="mt-5 text-xs text-neutral-400 dark:text-neutral-500">
                By submitting, your details are sent for verification. A team member (or your field officer)
                will confirm your account before you can place your first order.
              </p>

              {error && (
                <Alert variant="danger" className="mt-4" onDismiss={() => setError('')}>
                  {error}
                </Alert>
              )}

              <div className="mt-6 flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={handleSubmit} loading={loading}>
                  Submit for verification
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-white px-6 py-14 text-center dark:border-neutral-800 dark:bg-neutral-900">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                <PartyPopper size={24} />
              </span>
              <h2 className="mt-4 text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                You're submitted for verification
              </h2>
              <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
                We've received {form.businessName || 'your business'}'s details. Once verified, you'll get
                login access to the {roleInfo?.title.toLowerCase()} app.
              </p>
              <Link to="/" className="mt-6">
                <Button variant="outline">Back to home</Button>
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
