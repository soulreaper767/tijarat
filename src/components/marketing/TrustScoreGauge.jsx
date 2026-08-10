import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function TrustScoreGauge({ score = 82, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const angle = isInView ? (score / 100) * 360 : 0;

  return (
    <div ref={ref} className={className}>
      <div
        className="relative flex h-44 w-44 items-center justify-center rounded-full transition-[background] duration-[1200ms] ease-out"
        style={{
          background: `conic-gradient(var(--color-primary-500) ${angle}deg, rgb(100 116 139 / 0.18) ${angle}deg)`,
        }}
      >
        <div className="absolute inset-2 rounded-full bg-white dark:bg-neutral-900" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="relative flex flex-col items-center"
        >
          <span className="text-4xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">{score}</span>
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">Tijarat Score</span>
        </motion.div>
      </div>
    </div>
  );
}
