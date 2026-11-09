import { supabase } from '@/lib/supabase';
import type { TransferDetails } from '@/types/transfer';

const TRANSACTION_ID_LENGTH = 17;
const TRANSACTION_ID_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';

function createMockTransactionId(): string {
  return Array.from(
    { length: TRANSACTION_ID_LENGTH },
    () => TRANSACTION_ID_CHARS[Math.floor(Math.random() * TRANSACTION_ID_CHARS.length)]
  ).join('');
}

export async function payWithPaypal(): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return createMockTransactionId();
}

export async function saveTransferRequest(
  transfer: TransferDetails,
  paypalTransactionId: string
): Promise<void> {
  const { error } = await supabase.from('transfer_requests').insert({
    recipient_name: transfer.recipientName,
    bank_name: transfer.bankName,
    account_last4: transfer.accountNumber.slice(-4),
    ifsc: transfer.ifsc,
    amount_usd: transfer.amountUsd,
    amount_inr: transfer.amountInr,
    purpose_code: transfer.purpose.code,
    paypal_transaction_id: paypalTransactionId,
  });

  if (error) {
    throw new Error(error.message);
  }
}
