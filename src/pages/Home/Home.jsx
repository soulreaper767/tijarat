import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  MapPin,
  MapPinned,
  MessageCircle,
  Radar,
  ShoppingBag,
  Sparkles,
  Truck,
} from 'lucide-react';

import Button from '../../components/ui/Button';
import Hero3D from '../../components/marketing/Hero3D';
import SectionHeading from '../../components/marketing/SectionHeading';
import AnimatedStat from '../../components/marketing/AnimatedStat';
import FeatureCard from '../../components/marketing/FeatureCard';
import Carousel from '../../components/marketing/Carousel';
import TrustScoreGauge from '../../components/marketing/TrustScoreGauge';
import AIChatMock from '../../components/marketing/AIChatMock';
import EcommerceFulfillmentMock from '../../components/marketing/EcommerceFulfillmentMock';
import {
  HOW_IT_WORKS_STEPS,
  LOGISTICS_SERVICES,
  PLATFORM_APPS,
  PLATFORM_CAPABILITIES,
} from '../../data/marketing';
import { usePageTitle } from '../../hooks/usePageTitle';

const COVERAGE_CITIES = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Multan', 'Peshawar'];

const FLOAT_BADGES = [
  { icon: MapPinned, label: 'Territory-locked pricing', className: 'left-[-1rem] top-10 lg:left-4' },
  { icon: Radar, label: 'Real-time dispatch', className: 'right-[-0.5rem] top-1/2 lg:right-2' },
  { icon: Sparkles, label: 'AI-assisted ordering', className: 'bottom-6 left-8' },
];

const STATS = [
  { value: 250, suffix: '+', label: 'Retailers & traders onboard' },
  { value: 40, suffix: '+', label: 'Distributors & wholesalers' },
  { value: 15, suffix: '+', label: 'Manufacturers & brands' },
  { value: 6, label: 'Cities covered' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  usePageTitle('Tijarat — The operating system for modern distribution');
  const { openDemo } = useOutletContext();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary-200/40 blur-3xl dark:bg-primary-500/10" />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:pb-28 lg:pt-24">
          <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ duration: 0.6 }}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-xs font-medium text-neutral-600 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              <Sparkles size={12} className="text-primary-500" />
              Built by Sibyl Technologies
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-5xl lg:text-[3.4rem]">
              The operating system for <span className="text-primary-600 dark:text-primary-400">modern distribution</span>
            </h1>

            <p className="mt-5 max-w-lg text-lg text-neutral-500 dark:text-neutral-400">
              Tijarat connects manufacturers, distributors, wholesalers, traders and retailers on one shared
              network — and runs the warehousing, dispatch and delivery that moves goods between them,
              including fulfillment for e-commerce brands.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/register">
                <Button size="lg" iconRight={ArrowRight}>
                  Get started
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={openDemo}>
                Request a demo
              </Button>
            </div>

            <p className="mt-4 text-xs text-neutral-400 dark:text-neutral-500">
              No credit card required · Assisted onboarding available
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mx-auto aspect-square w-full max-w-md"
          >
            <Hero3D className="h-full w-full" />

            {FLOAT_BADGES.map((badge, i) => (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: [0, -8, 0] }}
                transition={{
                  opacity: { duration: 0.5, delay: 0.6 + i * 0.15 },
                  y: { duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 },
                }}
                className={`absolute flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-neutral-700 shadow-lg backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90 dark:text-neutral-200 ${badge.className}`}
              >
                <badge.icon size={13} className="text-primary-500" />
                {badge.label}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Coverage marquee */}
        <div className="relative overflow-hidden border-y border-neutral-200 bg-neutral-50/60 py-5 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="flex w-max animate-marquee items-center gap-12">
            {[...COVERAGE_CITIES, ...COVERAGE_CITIES].map((city, i) => (
              <span
                key={i}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-neutral-400 dark:text-neutral-600"
              >
                <MapPin size={14} />
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {STATS.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      {/* The Network */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="The Network"
          title="Manufacturers, distributors, wholesalers, traders and retailers — connected"
          description="One order, entered once, seen the same way by everyone downstream. Six purpose-built apps, one shared core."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PLATFORM_APPS.map((app) => (
            <motion.div key={app.slug} variants={fadeUp} transition={{ duration: 0.45 }}>
              <FeatureCard
                icon={app.icon}
                eyebrow={app.audience}
                title={app.name}
                description={app.tagline}
                href={`/services#${app.slug}`}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Logistics & Fulfillment */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Logistics & Fulfillment"
          title="Warehousing, dispatch, delivery and courier — under the same roof"
          description="We don't just connect the network — we move what's on it. And for e-commerce brands, the same infrastructure runs as fulfillment-as-a-service."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ staggerChildren: 0.08 }}
          className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {LOGISTICS_SERVICES.map((service) => (
            <motion.div key={service.slug} variants={fadeUp} transition={{ duration: 0.45 }}>
              <FeatureCard
                icon={service.icon}
                eyebrow={service.audience}
                title={service.name}
                description={service.tagline}
                href={`/services#${service.slug}`}
                className="h-full"
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* E-commerce Fulfillment spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
              <ShoppingBag size={13} />
              E-commerce Fulfillment
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              Not on the trade network? We'll still run your warehouse floor
            </h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">
              Online sellers don't need distributors, wholesalers or territories — they need orders picked,
              packed and shipped, fast. Fulfillment runs on the same warehousing and delivery infrastructure
              as the rest of Tijarat, sold on its own as fulfillment-as-a-service.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Plug in Shopify, Daraz, or your own storefront',
                'Same-day pick, pack & ship cutoffs',
                'Real-time inventory across every warehouse',
                'Returns handled through the same network',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                    <Check size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/register?role=ecommerce">
                <Button iconRight={ArrowRight}>Get started as an online seller</Button>
              </Link>
              <Link
                to="/services#ecommerce-fulfillment"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
              >
                See how it works
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                Today's fulfillment queue
              </p>
              <EcommerceFulfillmentMock />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-neutral-50 py-16 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="What powers it"
            title="Trust, automation and AI — built in, not bolted on"
            description="The same three layers sit behind the network and the logistics that run underneath it."
          />

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.1 }}
            className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
          >
            {PLATFORM_CAPABILITIES.map((cap) => (
              <motion.div key={cap.slug} variants={fadeUp} transition={{ duration: 0.45 }}>
                <FeatureCard
                  icon={cap.icon}
                  title={cap.name}
                  description={cap.description}
                  href={`/services#${cap.slug}`}
                  className="h-full"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Trust Intelligence spotlight */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
              <BadgeCheck size={13} />
              Trust Intelligence
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              One score, reused everywhere it matters
            </h2>
            <p className="mt-4 text-neutral-500 dark:text-neutral-400">
              The Tijarat Score reads order frequency, repayment timeliness, dispute rate and delivery
              acceptance from real transaction history — then feeds four decisions that used to be made
              separately, and inconsistently.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Credit facility for qualified distributors & retailers',
                'BNPL eligibility at retailer checkout',
                'Insurance pricing from the partner API',
                'Dispatch priority when capacity is tight',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                    <BadgeCheck size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-neutral-400 dark:text-neutral-500">
              Credit facility subject to eligibility review — available to qualified businesses only.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="flex justify-center"
          >
            <div className="rounded-3xl border border-neutral-200 bg-white p-10 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
              <TrustScoreGauge score={82} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI layer spotlight */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <AIChatMock className="mx-auto max-w-sm" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                <Sparkles size={13} />
                AI Layer
              </span>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                An assistant, never a black box
              </h2>
              <p className="mt-4 text-neutral-500 dark:text-neutral-400">
                Our AI layer sits at the edges of the platform — parsing orders, triaging tickets, writing
                narratives — and is never in the synchronous path of anything that has to block a sale.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  'Voice ordering in Urdu & Punjabi for field officers',
                  'Natural-language WhatsApp ordering for retailers',
                  'Support ticket triage and resolution suggestions',
                  '"Ask your data" panel for admins and distributors',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-200">
                    <MessageCircle size={14} className="shrink-0 text-primary-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it works snapshot */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Flow"
          title="From registration to trust score, in six steps"
          description="Every order — whatever channel it started on — moves through the same, predictable flow."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {HOW_IT_WORKS_STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="rounded-2xl border border-neutral-200 p-5 dark:border-neutral-800"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mt-3 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/how-it-works">
            <Button variant="outline" iconRight={ArrowRight}>
              See the full flow
            </Button>
          </Link>
        </div>
      </section>

      {/* Built for every role — carousel */}
      <section className="bg-neutral-50 py-20 dark:bg-neutral-900/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Every role"
            title="Built for who actually uses it"
            description="Not a single generic dashboard — a purpose-built app for each seat at the table."
          />

          <Carousel className="mt-12" autoplay>
            {PLATFORM_APPS.map((app) => (
              <div key={app.slug} className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
                <div className="flex h-full flex-col rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
                    <app.icon size={18} />
                  </span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-400">
                    {app.audience}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {app.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-500 dark:text-neutral-400">{app.description}</p>
                  <Link
                    to={`/services#${app.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-600 hover:gap-1.5 dark:text-primary-400"
                  >
                    See what's inside <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative mx-auto max-w-7xl overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary-600 px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="relative flex items-center justify-center gap-2 text-primary-100">
            <Truck size={16} />
            <span className="text-sm font-medium">Manufacturers · Distributors · Wholesalers · Retailers</span>
          </div>
          <h2 className="relative mt-4 text-3xl font-bold text-white sm:text-4xl">
            Ready to modernize your distribution network?
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-primary-100">
            Get started in minutes, or talk to us first — either way, someone from the team is one click
            away.
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Get started
              </Button>
            </Link>
            <Button size="lg" variant="inverse" onClick={openDemo}>
              Request a demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
