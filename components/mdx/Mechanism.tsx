'use client';

import { useState } from 'react';
import type { MechanismStep } from '@/lib/types';

/**
 * The mechanism is the actual content of a thinker entry, so it is not a wall
 * of prose. The stepper advances one step at a time, and the full sequence
 * stays readable underneath it. A reader who never touches the buttons still
 * gets every step.
 */
export function Mechanism({ steps }: { steps: MechanismStep[] }) {
  const [active, setActive] = useState(0);

  if (!steps || steps.length === 0) return null;

  const step = steps[active];
  const last = steps.length - 1;

  return (
    <section className="mt-9 border border-rule-strong" aria-label="Trace the mechanism">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule bg-raised px-4 py-2.5">
        <h3 className="label">Trace the mechanism</h3>
        <p className="label" aria-live="polite">
          Step {active + 1} of {steps.length}
        </p>
      </div>

      <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 px-4 pt-5 pb-4">
        <span className="pt-1 font-mono text-small font-medium text-accent">
          {String(active + 1).padStart(2, '0')}
        </span>
        <div>
          <h4 className="font-display text-h3 leading-snug">{step.heading}</h4>
          <p className="mt-1.5">{step.body}</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-4 pb-4">
        <button
          type="button"
          onClick={() => setActive((value) => Math.max(0, value - 1))}
          disabled={active === 0}
          className="label border border-rule-strong px-3 py-1.5 enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-35"
        >
          Back
        </button>
        <button
          type="button"
          onClick={() => setActive((value) => Math.min(last, value + 1))}
          disabled={active === last}
          className="label border border-rule-strong px-3 py-1.5 enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-35"
        >
          {active === last ? 'End of mechanism' : 'Next step'}
        </button>
        <span className="ml-auto flex gap-1.5" aria-hidden="true">
          {steps.map((item, index) => (
            <span
              key={item.heading}
              className={`block h-0.5 w-5 ${index <= active ? 'bg-accent' : 'bg-rule-strong'}`}
            />
          ))}
        </span>
      </div>

      <div className="border-t border-rule px-4 py-4">
        <p className="label">The whole sequence</p>
        <ol className="mt-3 flex list-none flex-col gap-3 pl-0">
          {steps.map((item, index) => (
            <li key={item.heading}>
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`grid w-full grid-cols-[2rem_minmax(0,1fr)] gap-x-3 border-l-2 py-1 pl-3 text-left ${
                  index === active ? 'border-accent' : 'border-transparent hover:border-rule-strong'
                }`}
              >
                <span className="font-mono text-label text-muted">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className={index === active ? 'font-medium' : ''}>{item.heading}</span>
                  <span className="mt-1 block text-small leading-normal text-muted">
                    {item.body}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
