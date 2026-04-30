type Category = "assignment" | "status" | "note" | "inspection" | "alert";

type Props = {
  who: string;
  what: string;
  category: Category;
  time: string;
  pulsing?: boolean;
};

const dotColor: Record<Category, string> = {
  assignment: "var(--color-info)",
  status: "var(--color-warning)",
  note: "var(--color-accent)",
  inspection: "var(--color-ok)",
  alert: "var(--color-danger)",
};

export default function ActivityRow({ who, what, category, time, pulsing }: Props) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="relative mt-1.5 shrink-0">
        <span
          className={`block h-2.5 w-2.5 rounded-full ${pulsing ? "pulse-dot" : ""}`}
          style={{ background: dotColor[category] }}
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[13px] leading-tight text-[var(--color-fg)]">
          <span className="font-medium">{who}</span>{" "}
          <span className="text-[var(--color-muted)]">{what}</span>
        </div>
        <div className="mt-0.5 font-mono text-[11px] text-[var(--color-muted-dim)]">{time}</div>
      </div>
    </div>
  );
}
