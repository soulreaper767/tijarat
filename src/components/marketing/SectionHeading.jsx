import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function SectionHeading({ eyebrow, title, description, align = 'center', className }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
      className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}
    >
      {eyebrow && (
        <span className="inline-flex items-center rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base text-neutral-500 dark:text-neutral-400">{description}</p>
      )}
    </motion.div>
  );
}
