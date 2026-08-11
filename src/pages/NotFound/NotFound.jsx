import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../../components/ui/Button';
import { usePageTitle } from '../../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page not found');

  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400">
        <Compass size={24} />
      </span>
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-400">
        404
      </p>
      <h1 className="mt-2 text-2xl font-bold text-neutral-900 dark:text-neutral-50 sm:text-3xl">
        This page doesn't exist
      </h1>
      <p className="mt-3 max-w-sm text-neutral-500 dark:text-neutral-400">
        The page you're looking for may have moved or never existed. Let's get you back on track.
      </p>
      <Link to="/" className="mt-8">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
}
