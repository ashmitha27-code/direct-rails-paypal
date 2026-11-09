import { AlertTriangle } from 'lucide-react';
import type { ValidationIssue } from '@/types/transfer';

interface IssueAlertProps {
  issues: ValidationIssue[];
}

export default function IssueAlert({ issues }: IssueAlertProps) {
  return (
    <div
      role="alert"
      className="animate-fade-up flex gap-4 rounded-2xl border border-red-200 bg-red-50 p-5"
    >
      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
      <div>
        <p className="font-semibold text-red-800">
          Please fix {issues.length === 1 ? 'this' : 'these'} before we review
        </p>
        <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-red-700">
          {issues.map((issue) => (
            <li key={issue.field}>{issue.message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
