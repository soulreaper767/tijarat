import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

export default function AnimatedStat({ value, suffix = '', prefix = '', label, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div ref={ref} className={className}>
      <div className="text-4xl font-bold tabular-nums text-neutral-900 dark:text-neutral-50">
        {prefix}
        {display}
        {suffix}
      </div>
      <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{label}</p>
    </div>
  );
}
