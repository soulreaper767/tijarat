import { useMemo, useState } from 'react';
import { useChartTheme } from './chartTheme';
import { cn } from '../../utils/cn';

export default function BarChart({ data, formatValue = (v) => v, className }) {
  const theme = useChartTheme();
  const [hoverIndex, setHoverIndex] = useState(null);
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <div className={cn('space-y-3.5', className)}>
      {data.map((row, i) => {
        const pct = maxValue === 0 ? 0 : (row.value / maxValue) * 100;
        const isHovered = hoverIndex === i;

        return (
          <div
            key={row.name}
            className={cn('-mx-2 rounded-lg px-2 py-1 transition-colors', isHovered && 'bg-neutral-50 dark:bg-neutral-800/60')}
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-neutral-700 dark:text-neutral-200">{row.name}</span>
              <span
                className={cn(
                  'font-medium tabular-nums transition-colors',
                  isHovered ? 'text-neutral-900 dark:text-neutral-50' : 'text-neutral-500 dark:text-neutral-400'
                )}
              >
                {formatValue(row.value)}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full" style={{ backgroundColor: theme.track }}>
              <div
                className="h-full rounded-full transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%`, backgroundColor: theme.sequential }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
