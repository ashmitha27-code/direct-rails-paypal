const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const inrFormatter = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' });

export function formatUsd(amount: number): string {
  return usdFormatter.format(amount);
}

export function formatInr(amount: number): string {
  return inrFormatter.format(amount);
}

export function maskAccountNumber(accountNumber: string): string {
  return `•••• ${accountNumber.slice(-4)}`;
}
