import Breadcrumbs from './Breadcrumbs';

export default function PageHeader({ title, description, breadcrumbs, actions }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        {breadcrumbs && (
          <div className="mb-1.5">
            <Breadcrumbs items={breadcrumbs} />
          </div>
        )}
        <h1 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
