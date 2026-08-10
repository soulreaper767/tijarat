import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  if (items.length === 0) return null;

  return (
    <nav className="flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="text-neutral-300 dark:text-neutral-600" />}
            {item.to && !isLast ? (
              <Link to={item.to} className="hover:text-neutral-800 dark:hover:text-neutral-200">
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-neutral-700 dark:text-neutral-200' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
