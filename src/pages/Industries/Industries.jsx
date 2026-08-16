import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import SectionHeading from '../../components/marketing/SectionHeading';
import { INDUSTRIES } from '../../data/marketing';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getPortalRegisterUrl } from '../../utils/portal';

function IndustryCard({ category, index }) {
  return (
    <motion.div
      id={category.slug}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.05 }}
      className="scroll-mt-24 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
        <category.icon size={20} />
      </span>
      <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-50">{category.name}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {category.items.map((item) => (
          <Badge key={item} variant="neutral">
            {item}
          </Badge>
        ))}
      </div>
    </motion.div>
  );
}

export default function Industries() {
  usePageTitle('Industries');

  return (
    <div>
      <section className="mx-auto max-w-4xl px-4 pb-8 pt-16 text-center sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Industries"
          title="Built for every industry that moves goods through Pakistan's trade chain"
          description="From FMCG and pharma to textiles, hardware and e-commerce — the same network, warehousing and delivery infrastructure adapts to how each industry actually sells."
        />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((category, i) => (
            <IndustryCard key={category.slug} category={category} index={i} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
          Don't see your industry? Chances are, we still cover it.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-neutral-500 dark:text-neutral-400">
          The network, warehousing and delivery infrastructure is industry-agnostic — tell us what you distribute
          and we'll show you how it fits.
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
