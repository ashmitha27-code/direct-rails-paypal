import type { PurposeOption, TransferFormValues } from '@/types/transfer';

export const USD_TO_INR_RATE = 83.5;

export const IFSC_LENGTH = 11;
export const IFSC_PATTERN = /^[A-Z]{4}0[A-Z0-9]{6}$/;

export const ACCOUNT_NUMBER_MIN_DIGITS = 8;
export const ACCOUNT_NUMBER_MAX_DIGITS = 18;

export const PURPOSE_OPTIONS: PurposeOption[] = [
  { code: 'P1007', label: 'Family maintenance and support' },
  { code: 'P1301', label: 'Education and tuition' },
  { code: 'P0802', label: 'Software and IT services' },
  { code: 'P1099', label: 'Other personal remittance' },
];

export const EMPTY_TRANSFER_FORM: TransferFormValues = {
  recipientName: '',
  bankName: '',
  accountNumber: '',
  ifsc: '',
  amountUsd: '',
  purposeCode: '',
};

export const SAMPLE_TRANSFER_FORM: TransferFormValues = {
  recipientName: 'Priya Sharma',
  bankName: 'HDFC Bank',
  accountNumber: '50100123456789',
  ifsc: 'HDFC0001234',
  amountUsd: '250',
  purposeCode: 'P1007',
};
