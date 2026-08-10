import { useMemo, useRef, useState } from 'react';
import { useChartTheme } from './chartTheme';
import { cn } from '../../utils/cn';

const VB_WIDTH = 700;
const PADDING = { top: 16, right: 12, bottom: 28, left: 52 };

function niceTicks(max, count = 4) {
  if (max <= 0) return [0];
  const step = max / (count - 1);
  return Array.from({ length: count }, (_, i) => Math.round(step * i));
}

export default function LineChart({ data, height = 220, formatValue = (v) => v, className }) {
  const theme = useChartTheme();
  const containerRef = useRef(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const plotWidth = VB_WIDTH - PADDING.left - PADDING.right;
  const plotHeight = height - PADDING.top - PADDING.bottom;

  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)) * 1.15, [data]);
  const ticks = useMemo(() => niceTicks(maxValue), [maxValue]);

  const points = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        x: PADDING.left + (data.length === 1 ? 0 : (i / (data.length - 1)) * plotWidth),
        y: PADDING.top + plotHeight - (d.value / maxValue) * plotHeight,
      })),
    [data, plotWidth, plotHeight, maxValue]
  );

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${PADDING.top + plotHeight} L ${points[0].x} ${PADDING.top + plotHeight} Z`;

  const handleMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = rect.width / VB_WIDTH;
    const svgX = (e.clientX - rect.left) / scaleX;
    const ratio = Math.min(1, Math.max(0, (svgX - PADDING.left) / plotWidth));
    const index = Math.round(ratio * (data.length - 1));
    setHoverIndex(index);
    const point = points[index];
    setTooltipPos({ x: point.x * scaleX, y: point.y });
  };

  const active = hoverIndex !== null ? points[hoverIndex] : null;

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      onMouseMove={handleMove}
      onMouseLeave={() => setHoverIndex(null)}
    >
      <svg width="100%" height={height} viewBox={`0 0 ${VB_WIDTH} ${height}`} role="img" aria-label="Sales trend chart">
        {ticks.map((tick) => {
          const y = PADDING.top + plotHeight - (tick / maxValue) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={PADDING.left}
                x2={VB_WIDTH - PADDING.right}
                y1={y}
                y2={y}
                stroke={theme.grid}
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <text x={PADDING.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill={theme.text}>
                {formatValue(tick)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={theme.sequentialSoft} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke={theme.sequential}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {points.map((p, i) => (
          <text
            key={p.label}
            x={p.x}
            y={height - 6}
            textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
            fontSize="11"
            fill={theme.text}
          >
            {p.label}
          </text>
        ))}

        {active && (
          <line
            x1={active.x}
            x2={active.x}
            y1={PADDING.top}
            y2={PADDING.top + plotHeight}
            stroke={theme.axis}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        )}

        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r={4}
          fill={theme.sequential}
          stroke={theme.surface}
          strokeWidth={2}
        />
        {active && (
          <circle cx={active.x} cy={active.y} r={4} fill={theme.sequential} stroke={theme.surface} strokeWidth={2} />
        )}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
          style={{ left: tooltipPos.x, top: Math.max(0, active.y - 10) }}
        >
          <p className="font-semibold text-neutral-900 dark:text-neutral-100">{formatValue(active.value)}</p>
          <p className="text-neutral-500 dark:text-neutral-400">{active.label}</p>
        </div>
      )}
    </div>
  );
}
