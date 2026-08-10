import { Mic, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge';

export default function AIChatMock({ className }) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 ${className || ''}`}
    >
      <div className="flex items-center gap-2 border-b border-neutral-100 pb-3 dark:border-neutral-800">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-600 text-white">
          <Sparkles size={13} />
        </span>
        <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">Voice-to-order</span>
        <Badge variant="success" dot className="ml-auto">
          Parsed
        </Badge>
      </div>

      <div className="mt-4 flex items-start gap-2">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
          <Mic size={13} />
        </span>
        <p className="rounded-2xl rounded-tl-sm bg-neutral-100 px-3 py-2 text-sm text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200">
          "Do peti Cola, teen packet juice bhej dena ABC store ke liye."
        </p>
      </div>

      <div className="mt-3 space-y-2 rounded-xl border border-dashed border-neutral-200 p-3 dark:border-neutral-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Cola 500ml Crate</span>
          <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">× 2</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-500 dark:text-neutral-400">Juice Pack 250ml</span>
          <span className="font-medium tabular-nums text-neutral-900 dark:text-neutral-100">× 3</span>
        </div>
        <div className="flex items-center justify-between border-t border-neutral-100 pt-2 text-sm dark:border-neutral-800">
          <span className="text-neutral-500 dark:text-neutral-400">Deliver to</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">ABC Store</span>
        </div>
      </div>
    </div>
  );
}
