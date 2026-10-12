import React from 'react';
import { cn } from '../lib/utils';

/**
 * ChaiUI animated badge with the signature 1px border orange glint.
 */
export function AnimatedBadge({ children, className }) {
  return (
    <span className={cn('relative inline-flex w-fit items-center justify-center overflow-hidden rounded-full p-px', className)}>
      <span
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 h-5 w-[300px] rounded-full bg-gradient-to-r from-transparent via-transparent to-orange-500 motion-safe:animate-[chai-spin_4s_linear_infinite]"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <span className="relative z-10 rounded-full bg-neutral-100 px-4 py-1.5 text-xs sm:text-sm font-medium text-neutral-800 dark:bg-stone-900 dark:text-neutral-100">
        {children}
      </span>
    </span>
  );
}

export default AnimatedBadge;
