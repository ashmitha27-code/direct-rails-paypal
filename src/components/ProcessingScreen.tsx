import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

const STEP_INTERVAL_MS = 1100;

interface ProcessingScreenProps {
  message: string;
  steps: string[];
}

export default function ProcessingScreen({ message, steps }: ProcessingScreenProps) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCompletedSteps((count) => Math.min(count + 1, steps.length));
    }, STEP_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [steps.length]);

  const progress = (completedSteps / steps.length) * 100;

  return (
    <section className="mx-auto flex max-w-xl flex-col items-center py-12 text-center animate-fade-up">
      <div className="relative flex h-40 w-40 items-center justify-center">
        <span className="absolute inset-0 animate-pulse-soft rounded-full bg-paypal-sky/25" />
        <span className="absolute inset-4 rounded-full border-4 border-paypal-ice" />
        <span className="absolute inset-4 animate-spin rounded-full border-4 border-transparent border-t-paypal-ocean" />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-paypal-blue text-white shadow-lg shadow-paypal-blue/30">
          <ShieldCheck className="h-8 w-8" aria-hidden="true" />
        </span>
      </div>

      <h1
        role="status"
        aria-live="polite"
        className="mt-10 text-2xl font-semibold leading-snug tracking-tight text-paypal-navy"
      >
        {message}
      </h1>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-paypal-ice">
        <div
          className="h-full rounded-full bg-gradient-to-r from-paypal-ocean to-paypal-sky transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <ul className="mt-8 w-full space-y-3 text-left">
        {steps.map((step, index) => {
          const isDone = index < completedSteps;
          const isActive = index === completedSteps;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isDone
                  ? 'bg-emerald-50 text-emerald-800'
                  : isActive
                    ? 'bg-paypal-ice text-paypal-blue'
                    : 'bg-slate-50 text-slate-400'
              }`}
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  isDone ? 'bg-emerald-500' : isActive ? 'animate-pulse bg-paypal-ocean' : 'bg-slate-300'
                }`}
                aria-hidden="true"
              />
              {step}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
