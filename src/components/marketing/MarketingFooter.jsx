import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle, Send } from 'lucide-react';
import { LOGISTICS_SERVICES, PLATFORM_APPS } from '../../data/marketing';
import Input from '../ui/Input';
import Button from '../ui/Button';
import TijaratMark from '../ui/TijaratMark';
import { useToast } from '../ui/Toast';
import { sendFormSubmission } from '../../services/forms';

const COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Get started',
    links: [
      { label: 'Create an account', to: '/register' },
      { label: 'Log in', to: '/login' },
      { label: 'Request a demo', to: '/contact' },
    ],
  },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

export default function MarketingFooter() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await sendFormSubmission({ subject: 'New newsletter signup', email });
      addToast({ variant: 'success', title: 'Subscribed', description: 'We’ll keep you posted on Tijarat updates.' });
      setEmail('');
    } catch (err) {
      addToast({ variant: 'danger', title: 'Could not subscribe', description: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
                <TijaratMark className="h-5 w-5" />
              </span>
              <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Tijarat
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
              The operating system for modern distribution — connecting manufacturers, distributors,
              wholesalers and retailers, and running the warehousing and delivery between them.
            </p>
            <div className="mt-4 flex items-center gap-2">
              {[Globe, MessageCircle, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Network</p>
            <ul className="mt-3 space-y-2.5">
              {PLATFORM_APPS.map((app) => (
                <li key={app.slug}>
                  <Link
                    to={`/services#${app.slug}`}
                    className="text-sm text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {app.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Services</p>
            <ul className="mt-3 space-y-2.5">
              {LOGISTICS_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services#${service.slug}`}
                    className="text-sm text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{col.title}</p>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-neutral-800">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              © {new Date().getFullYear()} Sibyl Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-xs text-neutral-400 hover:text-primary-600 dark:text-neutral-500 dark:hover:text-primary-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full max-w-sm items-center gap-2">
            <Input
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              containerClassName="flex-1"
              aria-label="Email address"
            />
            <Button type="submit" size="md" icon={Send} aria-label="Subscribe" loading={loading} />
          </form>
        </div>
      </div>
    </footer>
  );
}
