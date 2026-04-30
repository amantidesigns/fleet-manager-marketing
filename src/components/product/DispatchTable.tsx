type Status = "Present" | "Standby" | "Called In" | "NCNS" | "Off";

const statusColor: Record<Status, string> = {
  Present: "var(--color-ok)",
  Standby: "var(--color-info)",
  "Called In": "var(--color-warning)",
  NCNS: "var(--color-danger)",
  Off: "var(--color-inactive)",
};

const sample: { driver: string; route: string; status: Status; pulse?: boolean }[] = [
  { driver: "Kathy R.", route: "AH-12", status: "Present" },
  { driver: "Marcus T.", route: "NSP-04", status: "Standby" },
  { driver: "Janelle B.", route: "WBL-21", status: "Called In", pulse: true },
  { driver: "Devin O.", route: "SSP-09", status: "Present" },
  { driver: "Priya N.", route: "CST-02", status: "NCNS", pulse: true },
];

export default function DispatchTable() {
  return (
    <div className="overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-[var(--color-border)] px-4 py-2.5 section-label">
        <span>Driver</span>
        <span>Route</span>
        <span>Status</span>
      </div>
      {sample.map((row) => (
        <div
          key={row.driver}
          className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 border-b border-[var(--color-border)] px-4 py-2.5 text-[13px] last:border-b-0 hover:bg-[var(--color-surface-2)]"
        >
          <span className="text-[var(--color-fg)]">{row.driver}</span>
          <span className="font-mono text-[var(--color-muted)]">{row.route}</span>
          <span className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${row.pulse ? "pulse-dot" : ""}`}
              style={{ background: statusColor[row.status] }}
            />
            <span className="text-[var(--color-fg-dim)]">{row.status}</span>
          </span>
        </div>
      ))}
    </div>
  );
}
