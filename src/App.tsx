import { useEffect, useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ProcessingScreen from '@/components/ProcessingScreen';
import TransferForm from '@/components/TransferForm';
import TransferReceipt from '@/components/TransferReceipt';
import TransferReview from '@/components/TransferReview';
import { payWithPaypal, saveTransferRequest } from '@/lib/paypal';
import { EMPTY_TRANSFER_FORM, SAMPLE_TRANSFER_FORM } from '@/lib/transferRules';
import { validateTransferForm } from '@/lib/validateTransferForm';
import type {
  PaymentReceipt,
  TransferDetails,
  TransferFormValues,
  ValidationIssue,
} from '@/types/transfer';

type Stage = 'input' | 'validating' | 'review' | 'paying' | 'receipt';

const VALIDATION_DURATION_MS = 4400;

const VALIDATION_MESSAGE =
  'AI is validating banking rails and checking Indian regulatory compliance...';
const VALIDATION_STEPS = [
  'Validating IFSC and bank routing',
  'Checking Indian regulatory compliance',
  'Verifying RBI purpose code',
  'Preparing your transfer',
];

const PAYMENT_MESSAGE = 'Confirming your payment with PayPal...';
const PAYMENT_STEPS = [
  'Authorising PayPal payment',
  'Converting to Indian rupees',
  'Recording your transfer',
];

export default function App() {
  const [stage, setStage] = useState<Stage>('input');
  const [form, setForm] = useState<TransferFormValues>(EMPTY_TRANSFER_FORM);
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [transfer, setTransfer] = useState<TransferDetails | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (stage !== 'validating') return;
    const timer = window.setTimeout(() => setStage('review'), VALIDATION_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [stage]);

  function handleFieldChange(field: keyof TransferFormValues, value: string) {
    setForm((previous) => ({ ...previous, [field]: value }));
    setIssues([]);
  }

  function handleReview() {
    const result = validateTransferForm(form);
    if (!result.ok) {
      setIssues(result.issues);
      return;
    }
    setIssues([]);
    setPaymentError(null);
    setTransfer(result.transfer);
    setStage('validating');
  }

  async function handleConfirm() {
    if (!transfer) return;
    setPaymentError(null);
    setStage('paying');
    try {
      const transactionId = await payWithPaypal();
      await saveTransferRequest(transfer, transactionId);
      setReceipt({ transactionId, completedAt: new Date(), transfer });
      setStage('receipt');
    } catch {
      setPaymentError('We could not complete your transfer. Please try again.');
      setStage('review');
    }
  }

  function handleNewTransfer() {
    setForm(EMPTY_TRANSFER_FORM);
    setIssues([]);
    setTransfer(null);
    setReceipt(null);
    setPaymentError(null);
    setStage('input');
  }

  return (
    <div className="flex min-h-screen flex-col bg-paypal-mist font-sans text-slate-900">
      <AppHeader />

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-12">
        {stage === 'input' && (
          <TransferForm
            values={form}
            issues={issues}
            onFieldChange={handleFieldChange}
            onSubmit={handleReview}
            onFillSample={() => {
              setForm(SAMPLE_TRANSFER_FORM);
              setIssues([]);
            }}
          />
        )}

        {stage === 'validating' && (
          <ProcessingScreen key="validating" message={VALIDATION_MESSAGE} steps={VALIDATION_STEPS} />
        )}

        {stage === 'review' && transfer && (
          <TransferReview
            transfer={transfer}
            errorMessage={paymentError}
            onEdit={() => setStage('input')}
            onConfirm={handleConfirm}
          />
        )}

        {stage === 'paying' && (
          <ProcessingScreen key="paying" message={PAYMENT_MESSAGE} steps={PAYMENT_STEPS} />
        )}

        {stage === 'receipt' && receipt && (
          <TransferReceipt receipt={receipt} onNewTransfer={handleNewTransfer} />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-6 text-center text-sm text-slate-500">
        Demonstration build. Payments and transaction IDs are simulated.
      </footer>
    </div>
  );
}
