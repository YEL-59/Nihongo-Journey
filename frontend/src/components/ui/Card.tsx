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
        'rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-6 shadow-sm',
        hoverEffect && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary-500/50',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
