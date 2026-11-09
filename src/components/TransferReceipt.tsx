import { CheckCircle2, Printer, Send } from 'lucide-react';
import DetailRow from '@/components/DetailRow';
import { formatInr, formatUsd, maskAccountNumber } from '@/lib/format';
import type { PaymentReceipt } from '@/types/transfer';

interface TransferReceiptProps {
  receipt: PaymentReceipt;
  onNewTransfer: () => void;
}

export default function TransferReceipt({ receipt, onNewTransfer }: TransferReceiptProps) {
  const { transfer, transactionId, completedAt } = receipt;

  return (
    <section className="mx-auto max-w-3xl animate-fade-up">
      <div className="flex flex-col items-center text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-paypal-navy">Payment successful</h1>
        <p className="mt-2 max-w-xl text-base leading-relaxed text-slate-600">
          {formatUsd(transfer.amountUsd)} is on its way to {transfer.recipientName} as{' '}
          {formatInr(transfer.amountInr)}.
        </p>
      </div>

      <div className="mt-10 overflow-hidden rounded-3xl bg-white shadow-xl shadow-paypal-blue/10 ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 bg-paypal-navy p-8 text-white sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white/70">PayPal transaction ID</p>
            <p className="mt-1 break-all font-mono text-lg font-semibold tracking-wide">{transactionId}</p>
          </div>
          <span className="inline-flex w-fit items-center rounded-full bg-emerald-400/20 px-3 py-1 text-sm font-semibold text-emerald-200">
            Completed
          </span>
        </div>

        <div className="p-8">
          <dl className="grid gap-6 sm:grid-cols-2">
            <DetailRow label="Date and time" value={completedAt.toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} />
            <DetailRow label="Recipient name" value={transfer.recipientName} />
            <DetailRow label="Bank name" value={transfer.bankName} />
            <DetailRow label="Account number" value={maskAccountNumber(transfer.accountNumber)} mono />
            <DetailRow label="IFSC code" value={transfer.ifsc} mono />
            <DetailRow label="Purpose code" value={`${transfer.purpose.code} · ${transfer.purpose.label}`} />
            <DetailRow label="Amount sent" value={formatUsd(transfer.amountUsd)} />
            <DetailRow label="Amount received" value={formatInr(transfer.amountInr)} />
          </dl>
          <p className="mt-8 border-t border-dashed border-slate-200 pt-6 text-sm text-slate-500">
            Exchange rate: 1 USD = {transfer.exchangeRate.toFixed(2)} INR (indicative).
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3.5 text-base font-semibold text-paypal-blue transition hover:border-paypal-ocean focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/30"
        >
          <Printer className="h-5 w-5" aria-hidden="true" />
          Print receipt
        </button>
        <button
          type="button"
          onClick={onNewTransfer}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-paypal-ocean px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-paypal-ocean/30 transition hover:bg-paypal-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/40"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          Send another transfer
        </button>
      </div>
    </section>
  );
}
