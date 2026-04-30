type Row = {
  driver: string;
  yesterday: "Pass" | "Fail" | "Skipped";
  today: "Pass" | "Fail" | "Skipped" | "Pending";
  defect?: string;
};

const rows: Row[] = [
  { driver: "Kathy R.", yesterday: "Pass", today: "Pass" },
  { driver: "Marcus T.", yesterday: "Pass", today: "Pass" },
  { driver: "Janelle B.", yesterday: "Pass", today: "Fail", defect: "Brake light L. — replaced" },
  { driver: "Devin O.", yesterday: "Skipped", today: "Pass" },
  { driver: "Priya N.", yesterday: "Pass", today: "Pending" },
];

const tone = {
  Pass: { fg: "var(--color-ok)", bg: "rgba(34, 197, 94, 0.10)" },
  Fail: { fg: "var(--color-danger)", bg: "rgba(239, 68, 68, 0.10)" },
  Skipped: { fg: "var(--color-muted)", bg: "rgba(160, 160, 166, 0.08)" },
  Pending: { fg: "var(--color-warning)", bg: "rgba(234, 179, 8, 0.10)" },
};

export default function ComplianceDiff() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] font-mono text-[12px]">
      <div className="grid grid-cols-[1.3fr_1fr_1fr_1.6fr] border-b border-[var(--color-border)] px-4 py-2 section-label">
        <span>Driver</span>
        <span>Yesterday</span>
        <span>Today</span>
        <span>Note</span>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.driver}
          className="grid grid-cols-[1.3fr_1fr_1fr_1.6fr] items-center gap-2 border-b border-[var(--color-border)] px-4 py-2 last:border-b-0"
          style={{
            background:
              r.today === "Fail"
                ? "rgba(239, 68, 68, 0.04)"
                : r.today === "Pending"
                ? "rgba(234, 179, 8, 0.04)"
                : "transparent",
          }}
        >
          <span className="text-[var(--color-fg)]">{r.driver}</span>
          <Pill value={r.yesterday} />
          <Pill value={r.today} />
          <span className="truncate text-[var(--color-muted)]">
            {r.defect ?? <span className="text-[var(--color-muted-dim)]">—</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

function Pill({ value }: { value: keyof typeof tone }) {
  return (
    <span
      className="inline-flex w-fit items-center rounded px-1.5 py-0.5 text-[11px]"
      style={{ color: tone[value].fg, background: tone[value].bg }}
    >
      {value}
    </span>
  );
}
