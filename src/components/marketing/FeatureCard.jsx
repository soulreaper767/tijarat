import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export default function FeatureCard({ icon: Icon, eyebrow, title, description, href, className }) {
  const ref = useRef(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(220px circle at ${glowX}% ${glowY}%, rgb(99 102 241 / 0.12), transparent 70%)`;

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 14);
    rotateX.set((0.5 - py) * 14);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const CardTag = href ? motion.a : motion.div;

  return (
    <CardTag
      href={href}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg',
        'dark:border-neutral-800 dark:bg-neutral-900',
        className
      )}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background: glow }} />

      <div className="relative">
        {Icon && (
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white dark:bg-primary-500/15 dark:text-primary-400">
            <Icon size={20} />
          </span>
        )}

        {eyebrow && (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            {eyebrow}
          </p>
        )}

        <h3 className="mt-1 flex items-center gap-1.5 text-lg font-semibold text-neutral-900 dark:text-neutral-50">
          {title}
          {href && (
            <ArrowUpRight
              size={16}
              className="text-neutral-300 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-neutral-600"
            />
          )}
        </h3>

        <p className="mt-2 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{description}</p>
      </div>
    </CardTag>
  );
}
