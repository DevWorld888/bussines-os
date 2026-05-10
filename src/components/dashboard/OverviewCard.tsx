type OverviewCardProps = {
  label: string;
  value: string;
  note?: string;
};

export default function OverviewCard({ label, value, note }: OverviewCardProps) {
  return (
    <div className="card-elevated flex flex-col gap-2">
      <span className="t-caption text-[#737373] font-medium uppercase tracking-widest">
        {label}
      </span>
      <span
        className="text-[32px] font-semibold text-[#000000] leading-none"
        style={{ letterSpacing: "-0.5px" }}
      >
        {value}
      </span>
      {note && (
        <span className="t-caption text-[#737373]">{note}</span>
      )}
    </div>
  );
}
