export interface PurposeOption {
  code: string;
  label: string;
}

export interface TransferFormValues {
  recipientName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  amountUsd: string;
  purposeCode: string;
}

export interface TransferDetails {
  recipientName: string;
  bankName: string;
  accountNumber: string;
  ifsc: string;
  amountUsd: number;
  amountInr: number;
  exchangeRate: number;
  purpose: PurposeOption;
}

export type ValidationField = keyof TransferFormValues;

export interface ValidationIssue {
  field: ValidationField;
  message: string;
}

export interface PaymentReceipt {
  transactionId: string;
  completedAt: Date;
  transfer: TransferDetails;
}
