import PageHeader from './PageHeader';
import EmptyState from '../ui/EmptyState';

export default function ComingSoon({ title, description, icon, phase }) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <div className="rounded-xl border border-dashed border-neutral-300 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <EmptyState
          icon={icon}
          title={`${title} is coming in ${phase}`}
          description="This section is scaffolded and wired into navigation. Full functionality lands in a later build phase."
        />
      </div>
    </>
  );
}
