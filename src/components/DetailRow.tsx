interface DetailRowProps {
  label: string;
  value: string;
  mono?: boolean;
}

export default function DetailRow({ label, value, mono = false }: DetailRowProps) {
  return (
    <div className="space-y-1">
      <dt className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</dt>
      <dd className={`text-base font-semibold text-slate-900 ${mono ? 'font-mono tracking-wide' : ''}`}>
        {value}
      </dd>
    </div>
  );
}
