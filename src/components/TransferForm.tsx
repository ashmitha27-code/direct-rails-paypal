import { ArrowRight, ChevronDown, MessageSquareText, Receipt, ShieldCheck } from 'lucide-react';
import FormField, { fieldInputClassName } from '@/components/FormField';
import IssueAlert from '@/components/IssueAlert';
import { formatInr } from '@/lib/format';
import { IFSC_LENGTH, PURPOSE_OPTIONS, USD_TO_INR_RATE } from '@/lib/transferRules';
import type { TransferFormValues, ValidationField, ValidationIssue } from '@/types/transfer';

interface TransferFormProps {
  values: TransferFormValues;
  issues: ValidationIssue[];
  onFieldChange: (field: keyof TransferFormValues, value: string) => void;
  onSubmit: () => void;
  onFillSample: () => void;
}

const HOW_IT_WORKS = [
  {
    icon: MessageSquareText,
    title: 'Enter the recipient',
    text: 'Add their name, bank, account number and IFSC code, then the amount in dollars.',
  },
  {
    icon: ShieldCheck,
    title: 'AI checks the rails',
    text: 'Bank routing and Indian regulatory purpose codes are validated before payment.',
  },
  {
    icon: Receipt,
    title: 'Pay with PayPal',
    text: 'Confirm once and receive a transaction ID and receipt instantly.',
  },
];

export default function TransferForm({
  values,
  issues,
  onFieldChange,
  onSubmit,
  onFillSample,
}: TransferFormProps) {
  const hasIssue = (field: ValidationField) => issues.some((issue) => issue.field === field);
  const ifscLength = values.ifsc.trim().length;
  const amountValue = Number(values.amountUsd.replace(/,/g, ''));
  const amountPreview =
    Number.isFinite(amountValue) && amountValue > 0
      ? `About ${formatInr(amountValue * USD_TO_INR_RATE)} for the recipient`
      : undefined;

  return (
    <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="animate-fade-up">
        <p className="text-sm font-semibold uppercase tracking-widest text-paypal-ocean">
          US to India transfers
        </p>
        <h1 className="mt-3 text-3xl font-semibold leading-[1.2] tracking-tight text-paypal-navy sm:text-4xl">
          Who are you sending money to today?
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          Enter the recipient's bank details and the amount. We check the Indian banking rules and
          prepare a transfer for your review.
        </p>

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          className="mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-paypal-blue/10 ring-1 ring-slate-200 sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField id="recipientName" label="Recipient full name" className="sm:col-span-2">
              <input
                id="recipientName"
                type="text"
                autoComplete="off"
                placeholder="e.g. Priya Sharma"
                value={values.recipientName}
                onChange={(event) => onFieldChange('recipientName', event.target.value)}
                className={fieldInputClassName(hasIssue('recipientName'))}
              />
            </FormField>

            <FormField id="bankName" label="Bank name">
              <input
                id="bankName"
                type="text"
                autoComplete="off"
                placeholder="e.g. HDFC Bank"
                value={values.bankName}
                onChange={(event) => onFieldChange('bankName', event.target.value)}
                className={fieldInputClassName(hasIssue('bankName'))}
              />
            </FormField>

            <FormField id="accountNumber" label="Account number">
              <input
                id="accountNumber"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="e.g. 50100123456789"
                value={values.accountNumber}
                onChange={(event) => onFieldChange('accountNumber', event.target.value)}
                className={`${fieldInputClassName(hasIssue('accountNumber'))} font-mono tracking-wide`}
              />
            </FormField>

            <FormField
              id="ifsc"
              label="IFSC code"
              hint={`${ifscLength} of ${IFSC_LENGTH} characters`}
            >
              <input
                id="ifsc"
                type="text"
                autoComplete="off"
                maxLength={20}
                placeholder="e.g. HDFC0001234"
                value={values.ifsc}
                onChange={(event) => onFieldChange('ifsc', event.target.value.toUpperCase())}
                className={`${fieldInputClassName(hasIssue('ifsc'))} font-mono uppercase tracking-wide`}
              />
            </FormField>

            <FormField
              id="amountUsd"
              label="Amount in USD"
              hint={amountPreview}
            >
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-base font-semibold text-slate-500">
                  $
                </span>
                <input
                  id="amountUsd"
                  type="text"
                  inputMode="decimal"
                  autoComplete="off"
                  placeholder="0.00"
                  value={values.amountUsd}
                  onChange={(event) => onFieldChange('amountUsd', event.target.value)}
                  className={fieldInputClassName(hasIssue('amountUsd'), 'pl-8 pr-4')}
                />
              </div>
            </FormField>

            <FormField id="purposeCode" label="Purpose of transfer" className="sm:col-span-2">
              <div className="relative">
                <select
                  id="purposeCode"
                  value={values.purposeCode}
                  onChange={(event) => onFieldChange('purposeCode', event.target.value)}
                  className={`${fieldInputClassName(hasIssue('purposeCode'), 'pl-4 pr-12')} appearance-none`}
                >
                  <option value="" disabled>
                    Select a purpose code
                  </option>
                  {PURPOSE_OPTIONS.map((option) => (
                    <option key={option.code} value={option.code}>
                      {option.code} · {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute inset-y-0 right-4 my-auto h-5 w-5 text-slate-500"
                  aria-hidden="true"
                />
              </div>
            </FormField>
          </div>

          {issues.length > 0 && (
            <div className="mt-6">
              <IssueAlert issues={issues} />
            </div>
          )}

          <div className="mt-8 flex flex-col-reverse gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={onFillSample}
              className="rounded-full text-sm font-semibold text-paypal-ocean transition hover:text-paypal-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/30"
            >
              Fill with sample details
            </button>
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-paypal-ocean px-7 py-3 text-base font-semibold text-white shadow-lg shadow-paypal-ocean/30 transition hover:bg-paypal-blue focus:outline-none focus-visible:ring-4 focus-visible:ring-paypal-sky/40"
            >
              Review Transfer
              <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>

      <aside className="animate-fade-up space-y-6">
        <div className="rounded-3xl bg-paypal-navy p-6 text-white shadow-xl shadow-paypal-navy/20">
          <p className="text-sm font-medium text-white/70">Indicative exchange rate</p>
          <p className="mt-2 text-3xl font-semibold tracking-tight">
            1 USD = {USD_TO_INR_RATE.toFixed(2)} INR
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Final rate is locked when you confirm the payment.
          </p>
        </div>

        <div className="rounded-3xl bg-white p-6 ring-1 ring-slate-200">
          <h2 className="text-base font-semibold text-paypal-navy">How it works</h2>
          <ol className="mt-5 space-y-5">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-paypal-ice text-paypal-blue">
                  <step.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {index + 1}. {step.title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </section>
  );
}
