type Cell = "ok" | "standby" | "called" | "ncns" | "off";

const cellColor: Record<Cell, string> = {
  ok: "var(--color-ok)",
  standby: "var(--color-info)",
  called: "var(--color-warning)",
  ncns: "var(--color-danger)",
  off: "var(--color-inactive)",
};

const grid: Cell[] = [
  "ok","ok","ok","standby","ok","ok","ok","ok",
  "ok","ok","called","ok","ok","ok","ok","off",
  "ok","ncns","ok","ok","ok","ok","standby","ok",
  "ok","ok","ok","ok","ok","ok","ok","ok",
  "ok","ok","ok","ok","ok","ok","ok","ok",
];

export default function CheckInGrid() {
  return (
    <div className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="section-label">Check-ins · AM shift</span>
        <span className="font-mono text-[11px] text-[var(--color-muted)]">5:42 AM</span>
      </div>
      <div className="grid grid-cols-8 gap-1.5">
        {grid.map((cell, i) => (
          <span
            key={i}
            className={`aspect-square rounded-[3px] ${cell === "called" || cell === "ncns" ? "pulse-dot" : ""}`}
            style={{ background: cellColor[cell], opacity: cell === "off" ? 0.35 : 0.9 }}
          />
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-[var(--color-muted)]">
        <Legend color="var(--color-ok)" label="Present" />
        <Legend color="var(--color-info)" label="Standby" />
        <Legend color="var(--color-warning)" label="Called in" />
        <Legend color="var(--color-danger)" label="NCNS" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-2 w-2 rounded-[2px]" style={{ background: color }} />
      {label}
    </span>
  );
}
