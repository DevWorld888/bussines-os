type BadgeVariant = "new" | "contacted" | "quote-sent" | "won" | "lost";

const styles: Record<BadgeVariant, string> = {
  "new":        "bg-[#f2f2f2] text-[#0a0a0a]",
  "contacted":  "bg-[#f2f2f2] text-[#0a0a0a]",
  "quote-sent": "bg-[#171717] text-white",
  "won":        "bg-[#10c22b]/10 text-[#0a7a1b]",
  "lost":       "bg-[#c22b10]/10 text-[#9a2208]",
};

const labels: Record<BadgeVariant, string> = {
  "new":        "New",
  "contacted":  "Contacted",
  "quote-sent": "Quote Sent",
  "won":        "Won",
  "lost":       "Lost",
};

type BadgeProps = {
  status: BadgeVariant;
};

export default function Badge({ status }: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center px-2 py-0.5 rounded-[26px] text-[11px] font-medium whitespace-nowrap",
        styles[status],
      ].join(" ")}
    >
      {labels[status]}
    </span>
  );
}

export type { BadgeVariant };
