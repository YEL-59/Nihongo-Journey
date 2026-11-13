import React from 'react';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  hoverEffect = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        'rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900/80 p-6 shadow-soft transition-all duration-200',
        hoverEffect &&
          'hover:shadow-xl hover:-translate-y-0.5 hover:border-brand-500/50 dark:hover:border-brand-500/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
