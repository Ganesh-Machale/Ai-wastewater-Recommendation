import React from 'react';
import { cn } from '../lib/utils';

/**
 * The authentic chaicode.com page background: one SVG with a warm glow and faint
 * hexagons, centred at the top, behind everything.
 * - In light mode, inverts with 180deg hue-rotate to stay warm rather than blue.
 * - Bottom mask ensures smooth fading into page background.
 */
export function Backdrop({ src = '/chaiui/background.svg', className }) {
  return (
    <img
      data-chai-backdrop=""
      src={src}
      alt=""
      aria-hidden="true"
      fetchPriority="high"
      decoding="async"
      className={cn(
        'pointer-events-none absolute top-0 left-1/2 -z-10 w-[2842px] max-w-none -translate-x-1/2 select-none',
        '[mask-image:linear-gradient(to_bottom,#000_55%,transparent)]',
        'invert hue-rotate-180 dark:invert-0 dark:hue-rotate-0',
        className
      )}
    />
  );
}

export default Backdrop;
