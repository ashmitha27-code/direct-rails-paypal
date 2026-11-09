import type { ReactNode } from 'react';

export function fieldInputClassName(hasError: boolean, padding = 'pl-4 pr-4') {
  return `w-full rounded-xl border bg-white py-3 ${padding} text-base text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 ${
    hasError
      ? 'border-red-400 focus:ring-red-100'
      : 'border-slate-300 focus:border-paypal-ocean focus:ring-paypal-sky/20'
  }`;
}

interface FormFieldProps {
  id: string;
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export default function FormField({ id, label, hint, className = '', children }: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block text-sm font-semibold text-slate-700">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
