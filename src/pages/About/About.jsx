import { Link } from 'react-router-dom';
import { ArrowRight, Layers, ShieldHalf, Sparkles, Zap } from 'lucide-react';

import Button from '../../components/ui/Button';
import SectionHeading from '../../components/marketing/SectionHeading';
import FeatureCard from '../../components/marketing/FeatureCard';
import AnimatedStat from '../../components/marketing/AnimatedStat';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getPortalRegisterUrl } from '../../utils/portal';

const PRINCIPLES = [
  {
    icon: ShieldHalf,
    title: 'Sync only when it must block',
    description:
      'Credit limits, territory locks and MRP ceilings live as native rules — the only things allowed to stop a transaction outright.',
  },
  {
    icon: Zap,
    title: 'Automate without lock-in',
    description:
      'Notifications, courier bookings and reconciliation run as background workflows — cross-system logic that can be rebuilt, never logic a business depends on to function.',
  },
  {
    icon: Sparkles,
    title: 'AI as an assistant',
    description:
      'Our AI layer drafts, parses and summarizes at the edges of the platform — and never sits in the synchronous path of a sale.',
  },
  {
    icon: Layers,
    title: 'One system of record',
    description:
      'One core system holds the truth. Every other layer — automation, AI, the frontend — reads from it and writes back to it, never around it.',
  },
];

const STATS = [
  { value: 250, suffix: '+', label: 'Retailers & traders onboard' },
  { value: 40, suffix: '+', label: 'Distributors & wholesalers' },
  { value: 15, suffix: '+', label: 'Manufacturers & brands' },
  { value: 6, label: 'Cities covered' },
];

export default function About() {
  usePageTitle('About');

  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-16 text-center sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="About"
          title="Distribution shouldn't run on phone calls and paper ledgers"
          description="Tijarat is built by Sibyl Technologies to give manufacturers, distributors, wholesalers and retailers one shared, trustworthy view of the same business — and the warehousing and delivery network that moves goods between them."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How we build" title="Four rules that shape every decision" align="left" />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <FeatureCard key={p.title} icon={p.icon} title={p.title} description={p.description} />
          ))}
        </div>
      </section>

      <section className="bg-neutral-50 py-16 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="By the numbers" title="The network so far" align="left" />

          <div className="mt-10 grid grid-cols-2 gap-8 lg:grid-cols-4">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
          Building it with us is one form away
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={getPortalRegisterUrl()}>
            <Button size="lg" iconRight={ArrowRight}>
              Get started
            </Button>
          </a>
          <Link to="/contact">
            <Button size="lg" variant="outline">
              Contact us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
