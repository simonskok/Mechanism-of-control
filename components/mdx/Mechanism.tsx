'use client';

import { useState } from 'react';
import type { MechanismStep } from '@/lib/types';

/**
 * The mechanism is the actual content of a thinker entry, so it is not a wall
 * of prose. The stepper advances one step at a time, and the full sequence
 * stays readable underneath it. A reader who never touches the buttons still
 * gets every step.
 *
 * Test mode exists because of the illusion of explanatory depth: people believe
 * they understand a mechanism until they are asked to produce it, and reading
 * fluently feels like knowing. Predicting a step before seeing it, and writing
 * the sequence back at the end, is the cheapest available correction.
 *
 * Nothing typed here is stored, sent or counted. The attempt is the point, and
 * grading it would turn a tool into a measurement, which is the mechanism this
 * site documents on the bureaucracy page.
 */
export function Mechanism({ steps }: { steps: MechanismStep[] }) {
  const [active, setActive] = useState(0);
  const [testing, setTesting] = useState(false);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [recall, setRecall] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);

  if (!steps || steps.length === 0) return null;

  const step = steps[active];
  const last = steps.length - 1;
  const isRevealed = !testing || revealed.includes(active);
  const allRevealed = steps.every((_, index) => revealed.includes(index));

  function enterTestMode(next: boolean) {
    setTesting(next);
    setActive(0);
    setRevealed([]);
    setRecall('');
    setShowAnswer(false);
  }

  return (
    <section className="mt-9 border border-rule-strong" aria-label="Trace the mechanism">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-rule bg-raised px-4 py-2.5">
        <h3 className="label">Trace the mechanism</h3>
        <div className="flex items-baseline gap-3">
          <p className="label" aria-live="polite">
            Step {active + 1} of {steps.length}
          </p>
          <button
            type="button"
            onClick={() => enterTestMode(!testing)}
            className="label border border-rule-strong px-2 py-1 hover:border-accent hover:text-accent"
            aria-pressed={testing}
          >
            {testing ? 'Just read it' : 'Test yourself'}
          </button>
        </div>
      </div>

      {testing ? (
        <p className="border-b border-rule px-4 py-3 text-small text-muted">
          Each step stays hidden until you have tried to say what it is. Reading this fluently
          feels like understanding it, and the two are not the same. Nothing you type is saved
          or sent.
        </p>
      ) : null}

      <div className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-3 px-4 pt-5 pb-4">
        <span className="pt-1 font-mono text-small font-medium text-accent">
          {String(active + 1).padStart(2, '0')}
        </span>
        <div>
          <h4 className="font-display text-h3 leading-snug">{step.heading}</h4>
          {isRevealed ? (
            <p className="mt-1.5">{step.body}</p>
          ) : (
            <div className="mt-2">
              <p className="text-small text-muted">
                Before you read it: what do you think happens at this step, and why does it
                follow from the one before?
              </p>
              <button
                type="button"
                onClick={() => setRevealed((value) => [...value, active])}
                className="label mt-3 border border-rule-strong px-3 py-1.5 hover:border-accent hover:text-accent"
              >
                I have an answer, show me the step
              </button>
            </div>
          )}
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
          disabled={active === last || !isRevealed}
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

      {testing && allRevealed ? (
        <div className="border-t border-rule px-4 py-5">
          <p className="label">Now say it back</p>
          <p className="mt-2 text-small text-muted">
            Write the mechanism in your own words, without looking. If you cannot get past step
            two, that is the useful result, and it is the normal one.
          </p>
          <textarea
            value={recall}
            onChange={(event) => setRecall(event.target.value)}
            rows={6}
            placeholder="It starts with..."
            className="mt-3 w-full border border-rule-strong bg-transparent px-3 py-2 text-small leading-relaxed focus:border-accent focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setShowAnswer((value) => !value)}
            className="label mt-3 border border-rule-strong px-3 py-1.5 hover:border-accent hover:text-accent"
          >
            {showAnswer ? 'Hide the sequence' : 'Compare with the sequence'}
          </button>
        </div>
      ) : null}

      <div className={`border-t border-rule px-4 py-4 ${testing && !showAnswer ? 'hidden' : ''}`}>
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
