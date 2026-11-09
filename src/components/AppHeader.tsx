import { ArrowRightLeft, ShieldCheck } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-paypal-navy text-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-paypal-blue">
            <ArrowRightLeft className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Direct Rails</span>
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-sm font-medium text-white sm:flex">
          <ShieldCheck className="h-4 w-4 text-paypal-sky" aria-hidden="true" />
          Secured by PayPal
        </div>
      </div>
    </header>
  );
}
