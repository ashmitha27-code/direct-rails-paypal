import { AlertTriangle, ArrowLeft, Lock } from 'lucide-react';
import DetailRow from '@/components/DetailRow';
import { formatInr, formatUsd } from '@/lib/format';
import type { TransferDetails } from '@/types/transfer';

interface TransferReviewProps {
  transfer: TransferDetails;
  errorMessage: string | null;
  onEdit: () => void;
  onConfirm: () => void;
}

export default function TransferReview({ transfer, errorMessage, onEdit, onConfirm }: TransferReviewProps) {
  return (
    <section className="mx-auto max-w-3xl animate-fade-up">
      <button
        type="button"
        onClick={onEdit}
        className="inline-flex items-center gap-2 rounded-full text-sm font-medium text-paypal-ocean transition hover:text-paypal-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/30"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Edit details
      </button>

      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-paypal-navy">Review your transfer</h1>
      <p className="mt-2 text-base leading-relaxed text-slate-600">
        Check every detail. Your money moves only after you confirm.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-xl shadow-paypal-blue/10 ring-1 ring-slate-200">
        <div className="p-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-paypal-ocean">Recipient</h2>
          <dl className="mt-5 grid gap-6 sm:grid-cols-2">
            <DetailRow label="Recipient name" value={transfer.recipientName} />
            <DetailRow label="Bank name" value={transfer.bankName} />
            <DetailRow label="Account number" value={transfer.accountNumber} mono />
            <DetailRow label="IFSC code" value={transfer.ifsc} mono />
          </dl>
        </div>

        <div className="border-t border-slate-100 bg-paypal-mist p-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-paypal-ocean">Amount</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <p className="text-sm font-medium text-slate-500">Amount in USD</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                {formatUsd(transfer.amountUsd)}
              </p>
              <p className="mt-2 text-sm text-slate-500">You send</p>
            </div>
            <div className="rounded-2xl bg-paypal-blue p-6 text-white shadow-lg shadow-paypal-blue/20">
              <p className="text-sm font-medium text-white/75">Converted amount in INR</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight">{formatInr(transfer.amountInr)}</p>
              <p className="mt-2 text-sm text-white/75">
                They receive, at {transfer.exchangeRate.toFixed(2)} INR per USD
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 p-8">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-paypal-ocean">Purpose</h2>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-paypal-ice px-3 py-1 font-mono text-sm font-semibold text-paypal-blue">
              {transfer.purpose.code}
            </span>
            <span className="text-base font-medium text-slate-800">{transfer.purpose.label}</span>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div role="alert" className="mt-6 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          {errorMessage}
        </div>
      )}

      <button
        type="button"
        onClick={onConfirm}
        className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-full bg-paypal-ocean px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-paypal-ocean/30 transition hover:-translate-y-0.5 hover:bg-paypal-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/40"
      >
        <Lock className="h-5 w-5" aria-hidden="true" />
        Confirm and pay via PayPal
      </button>
    </section>
  );
}
