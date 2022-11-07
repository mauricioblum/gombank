import { useTransition } from '@remix-run/react';
import { useEffect, useRef } from 'react';

export function useProgress() {
  const el = useRef<HTMLDivElement>(null);
  const timeout = useRef<NodeJS.Timeout>();
  const { location } = useTransition();

  useEffect(() => {
    if (!location || !el.current) {
      return;
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    const current = el.current;

    current.style.width = `0%`;

    let updateWidth = (ms: number) => {
      timeout.current = setTimeout(() => {
        if (current) {
          let width = parseFloat(current.style.width);
          let percent = !isNaN(width) ? 10 + 0.9 * width : 0;

          current.style.width = `${percent}%`;

          updateWidth(100);
        }
      }, ms);
    };

    updateWidth(300);

    return () => {
      clearTimeout(timeout.current);

      if (current?.style.width === `0%`) {
        return;
      }

      if (current) {
        current.style.width = `100%`;
      }

      timeout.current = setTimeout(() => {
        if (current?.style.width !== '100%') {
          return;
        }

        current.style.width = ``;
      }, 200);
    };
  }, [location]);

  return el;
}

export function Progress() {
  const progress = useProgress();

  return (
    <div className="fixed top-0 left-0 right-0 flex h-1">
      <div
        ref={progress}
        className="bg-gradient-to-r from-lime-400/50 via-lime-500 to-lime-800 transition-all duration-200 ease-out"
      />
    </div>
  );
}
