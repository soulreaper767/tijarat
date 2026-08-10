import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Menu, Moon, Sun, X } from 'lucide-react';
import { LOGISTICS_SERVICES, PLATFORM_APPS, PLATFORM_CAPABILITIES } from '../../data/marketing';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';

const ABOUT_LINK = { to: '/about', label: 'About' };
const NAV_LINKS = [
  { to: '/how-it-works', label: 'How it works' },
  { to: '/contact', label: 'Contact' },
];

const navLinkClass = ({ isActive }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'text-primary-600 dark:text-primary-400'
      : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100'
  );

export default function MarketingNavbar({ onRequestDemo }) {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const openMenu = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-colors duration-300',
        scrolled
          ? 'border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80'
          : 'border-b border-transparent bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            T
          </span>
          <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
            Tijarat
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          <NavLink to={ABOUT_LINK.to} className={navLinkClass}>
            {ABOUT_LINK.label}
          </NavLink>

          <div className="relative" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
            >
              Services
              <ChevronDown size={14} className={cn('transition-transform', servicesOpen && 'rotate-180')} />
            </button>

            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-[720px] rounded-2xl border border-neutral-200 bg-white p-5 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="mb-1.5 px-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        The Network
                      </p>
                      {PLATFORM_APPS.map((app) => (
                        <Link
                          key={app.slug}
                          to={`/services#${app.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                          <app.icon size={15} className="shrink-0 text-primary-500" />
                          {app.name}
                        </Link>
                      ))}
                    </div>

                    <div>
                      <p className="mb-1.5 px-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                        Logistics & Fulfillment
                      </p>
                      {LOGISTICS_SERVICES.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services#${service.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center gap-2.5 rounded-lg p-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-200 dark:hover:bg-neutral-800"
                        >
                          <service.icon size={15} className="shrink-0 text-primary-500" />
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-4 border-t border-neutral-200 pt-3 dark:border-neutral-800">
                    {PLATFORM_CAPABILITIES.map((cap) => (
                      <Link
                        key={cap.slug}
                        to={`/services#${cap.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-medium text-neutral-500 hover:text-primary-600 dark:text-neutral-400 dark:hover:text-primary-400"
                      >
                        <cap.icon size={13} />
                        {cap.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <Button variant="ghost" size="sm" onClick={onRequestDemo}>
            Request a demo
          </Button>
          <Link to="/login">
            <Button variant="outline" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button size="sm">Get started</Button>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="ml-auto rounded-lg p-2 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 lg:hidden"
        >
          <Menu size={22} />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-neutral-900/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="ml-auto flex h-full w-72 flex-col bg-white p-5 dark:bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">Menu</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <Link
                  to={ABOUT_LINK.to}
                  onClick={() => setMobileOpen(false)}
                  className="mb-1 block rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                >
                  {ABOUT_LINK.label}
                </Link>

                <p className="mb-1.5 mt-3 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  The Network
                </p>
                {PLATFORM_APPS.map((app) => (
                  <Link
                    key={app.slug}
                    to={`/services#${app.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <app.icon size={16} className="text-neutral-400" />
                    {app.name}
                  </Link>
                ))}

                <p className="mb-1.5 mt-4 px-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                  Logistics & Fulfillment
                </p>
                {LOGISTICS_SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    to={`/services#${service.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    <service.icon size={16} className="text-neutral-400" />
                    {service.name}
                  </Link>
                ))}

                <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex shrink-0 flex-col gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth>
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button fullWidth>Get started</Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
