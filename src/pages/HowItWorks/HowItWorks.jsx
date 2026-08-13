import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Button from '../../components/ui/Button';
import SectionHeading from '../../components/marketing/SectionHeading';
import { HOW_IT_WORKS_STEPS } from '../../data/marketing';
import { usePageTitle } from '../../hooks/usePageTitle';
import { getPortalRegisterUrl } from '../../utils/portal';

export default function HowItWorks() {
  usePageTitle('How it works');

  return (
    <div>
      <section className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="One flow, whichever door you walk in through"
          description="A field officer's voice order and a retailer's WhatsApp message both land in the same place — and move through the same six steps."
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="relative">
          <div className="absolute left-6 top-2 bottom-2 w-px bg-neutral-200 dark:bg-neutral-800 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-12">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-start gap-6 sm:items-center ${
                    reversed ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-600 text-white shadow-md dark:border-neutral-950">
                    <step.icon size={18} />
                  </div>

                  <div
                    className={`flex-1 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:max-w-[calc(50%-3rem)] ${
                      reversed ? 'sm:text-right' : ''
                    }`}
                  >
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary-500">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
          Want to see it on your own data?
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={getPortalRegisterUrl()}>
            <Button size="lg" iconRight={ArrowRight}>
              Get started
            </Button>
          </a>
          <Link to="/services">
            <Button size="lg" variant="outline">
              Explore our services
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
