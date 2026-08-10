export function formatCurrency(value) {
  const sign = value < 0 ? '-' : '';
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${sign}Rs ${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}Rs ${(abs / 1_000).toFixed(1)}K`;
  return `${sign}Rs ${abs.toLocaleString('en-US')}`;
}

export function formatNumber(value) {
  return value.toLocaleString('en-US');
}

export function formatCompactNumber(value) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return `${value}`;
}

export function formatPercent(value) {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}
