import { Inbox } from 'lucide-react';
import EmptyState from '../ui/EmptyState';
import { cn } from '../../utils/cn';

export default function DataTable({ columns, rows, keyField = 'id', emptyLabel = 'No results found' }) {
  if (rows.length === 0) {
    return <EmptyState icon={Inbox} title={emptyLabel} description="Try adjusting your search or filters." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-neutral-200 dark:border-neutral-800">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'whitespace-nowrap px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-neutral-400',
                  col.align === 'right' && 'text-right',
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row[keyField]}
              className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 dark:border-neutral-800/60 dark:hover:bg-neutral-800/40"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    'whitespace-nowrap px-3 py-3 text-neutral-700 dark:text-neutral-200',
                    col.align === 'right' && 'text-right tabular-nums',
                    col.className
                  )}
                >
                  {col.render ? col.render(row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
