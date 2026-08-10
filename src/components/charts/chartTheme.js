import { useTheme } from '../../hooks/useTheme';

const LIGHT = {
  categorical: ['#4f46e5', '#059669', '#f59e0b', '#0ea5e9'],
  sequential: '#4f46e5',
  sequentialSoft: 'rgba(79, 70, 229, 0.12)',
  grid: '#e2e8f0',
  axis: '#cbd5e1',
  text: '#64748b',
  surface: '#ffffff',
  track: '#f1f5f9',
};

const DARK = {
  categorical: ['#6366f1', '#047857', '#d97706', '#0369a1'],
  sequential: '#6366f1',
  sequentialSoft: 'rgba(99, 102, 241, 0.16)',
  grid: '#1e293b',
  axis: '#334155',
  text: '#94a3b8',
  surface: '#0f172a',
  track: '#1e293b',
};

export function useChartTheme() {
  const { theme } = useTheme();
  return theme === 'dark' ? DARK : LIGHT;
}
