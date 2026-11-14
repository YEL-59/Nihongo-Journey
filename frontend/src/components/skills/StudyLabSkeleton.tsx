interface StudyLabSkeletonProps {
  cards?: number;
}

export default function StudyLabSkeleton({ cards = 3 }: StudyLabSkeletonProps) {
  return (
    <div className="mx-auto w-full max-w-7xl animate-pulse space-y-6 px-4 py-8 sm:px-6 lg:px-8" aria-label="Loading study lab">
      <div className="h-36 rounded-3xl bg-slate-200 dark:bg-slate-800" />
      <div className="h-14 rounded-2xl bg-slate-200 dark:bg-slate-800" />
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: cards }, (_, index) => <div key={index} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800" />)}
      </div>
    </div>
  );
}
