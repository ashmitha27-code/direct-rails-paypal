/*
# Create transfer_requests table (insert-only audit log)

1. New Tables
- `transfer_requests`
  - `id` (uuid, primary key)
  - `created_at` (timestamp)
  - `recipient_name` (text)
  - `bank_name` (text)
  - `account_last4` (text): only the last 4 digits of the account number are stored
  - `ifsc` (text)
  - `amount_usd` (numeric)
  - `amount_inr` (numeric)
  - `purpose_code` (text)
  - `paypal_transaction_id` (text)

2. Security
- Enable RLS on `transfer_requests`.
- Grant INSERT only to `anon` and `authenticated`. No SELECT grant, so no visitor can read back other transfers.
- Single INSERT policy for `anon` and `authenticated`.

3. Important notes
- Full account numbers are never written to this table; the app masks them before saving.
*/

CREATE TABLE IF NOT EXISTS transfer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  recipient_name text NOT NULL,
  bank_name text NOT NULL,
  account_last4 text NOT NULL,
  ifsc text NOT NULL,
  amount_usd numeric(12,2) NOT NULL,
  amount_inr numeric(14,2) NOT NULL,
  purpose_code text NOT NULL,
  paypal_transaction_id text NOT NULL
);

ALTER TABLE transfer_requests ENABLE ROW LEVEL SECURITY;

GRANT INSERT ON transfer_requests TO anon, authenticated;

DROP POLICY IF EXISTS "anon_insert_transfer_requests" ON transfer_requests;
CREATE POLICY "anon_insert_transfer_requests" ON transfer_requests FOR INSERT
TO anon, authenticated
WITH CHECK (true);
