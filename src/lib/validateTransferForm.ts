import {
  ACCOUNT_NUMBER_MAX_DIGITS,
  ACCOUNT_NUMBER_MIN_DIGITS,
  IFSC_LENGTH,
  IFSC_PATTERN,
  PURPOSE_OPTIONS,
  USD_TO_INR_RATE,
} from '@/lib/transferRules';
import type { TransferDetails, TransferFormValues, ValidationIssue } from '@/types/transfer';

export type ValidationResult =
  | { ok: true; transfer: TransferDetails }
  | { ok: false; issues: ValidationIssue[] };

export function validateTransferForm(values: TransferFormValues): ValidationResult {
  const recipientName = values.recipientName.trim().replace(/\s+/g, ' ');
  const bankName = values.bankName.trim();
  const accountNumber = values.accountNumber.replace(/[\s-]/g, '');
  const ifsc = values.ifsc.trim().toUpperCase();
  const amountUsd = Number(values.amountUsd.replace(/,/g, '').trim());
  const purpose = PURPOSE_OPTIONS.find((option) => option.code === values.purposeCode);

  const issues: ValidationIssue[] = [];

  if (!recipientName) {
    issues.push({
      field: 'recipientName',
      message: "Enter the recipient's full name as it appears on their bank account.",
    });
  }

  if (!bankName) {
    issues.push({ field: 'bankName', message: "Enter the name of the recipient's bank." });
  }

  if (!/^\d+$/.test(accountNumber)) {
    issues.push({
      field: 'accountNumber',
      message: 'The account number should contain digits only.',
    });
  } else if (
    accountNumber.length < ACCOUNT_NUMBER_MIN_DIGITS ||
    accountNumber.length > ACCOUNT_NUMBER_MAX_DIGITS
  ) {
    issues.push({
      field: 'accountNumber',
      message: `Indian account numbers are usually ${ACCOUNT_NUMBER_MIN_DIGITS} to ${ACCOUNT_NUMBER_MAX_DIGITS} digits. This one has ${accountNumber.length}.`,
    });
  }

  if (!ifsc) {
    issues.push({
      field: 'ifsc',
      message: "Enter the IFSC code. It is 11 characters, for example HDFC0001234.",
    });
  } else if (ifsc.length !== IFSC_LENGTH) {
    issues.push({
      field: 'ifsc',
      message: `The IFSC code must be exactly 11 characters, but "${ifsc}" has ${ifsc.length}. Check for a missing or extra character. A valid code looks like HDFC0001234: 4 letters, a zero, then 6 letters or digits.`,
    });
  } else if (!IFSC_PATTERN.test(ifsc)) {
    issues.push({
      field: 'ifsc',
      message: `"${ifsc}" is 11 characters but does not follow the IFSC format: 4 letters, a zero, then 6 letters or digits.`,
    });
  }

  if (!Number.isFinite(amountUsd) || amountUsd <= 0) {
    issues.push({
      field: 'amountUsd',
      message: 'Enter an amount in US dollars greater than zero.',
    });
  }

  if (!purpose) {
    issues.push({ field: 'purposeCode', message: 'Choose a purpose for this transfer.' });
  }

  if (issues.length > 0 || !purpose) {
    return { ok: false, issues };
  }

  return {
    ok: true,
    transfer: {
      recipientName,
      bankName,
      accountNumber,
      ifsc,
      amountUsd,
      amountInr: Math.round(amountUsd * USD_TO_INR_RATE * 100) / 100,
      exchangeRate: USD_TO_INR_RATE,
      purpose,
    },
  };
}
