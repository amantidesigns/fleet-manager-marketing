/**
 * DriverTablet — landscape product replica of the in-van companion app.
 * Read-only static UI for the marketing site. Mirrors the actual driver
 * Today screen: route card, primary actions, today's activity feed.
 */
export default function DriverTablet() {
  return (
    <div className="relative mx-auto w-full">
      {/* Tablet bezel */}
      <div className="aspect-[16/10] rounded-[18px] border border-[var(--color-border-2)] bg-[var(--color-bg-2)] p-2.5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_0_0_1px_rgba(255,255,255,0.04)]">
        {/* Inner screen */}
        <div className="grid h-full grid-cols-[1fr_1fr] gap-3 overflow-hidden rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg)] p-4">
          {/* Left: action panel */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="section-label">Today · Tue Apr 30</div>
                <div className="mt-0.5 text-[13px] font-semibold tracking-tight">Marcus T.</div>
              </div>
              <span className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--color-muted-dim)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--color-ok)]"></span>
                Live
              </span>
            </div>

            {/* Big route card */}
            <div className="relative overflow-hidden rounded-[8px] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 pl-4">
              <span className="absolute left-0 top-0 h-full w-1" style={{ background: "var(--color-route-wbl)" }} />
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--color-muted-dim)]">Route</span>
                <span className="text-[9px] font-medium uppercase tracking-wider" style={{ color: "var(--color-ok)" }}>
                  On time
                </span>
              </div>
              <div className="mt-1 flex items-baseline justify-between">
                <span className="text-[22px] font-semibold tracking-tight">WBL-21</span>
                <span className="font-mono text-[11px] text-[var(--color-muted)]">V-114</span>
              </div>
            </div>

            {/* Primary actions */}
            <div className="grid grid-cols-3 gap-1.5">
              <button className="rounded-[6px] bg-[var(--color-fg)] py-2 text-[11px] font-medium text-[var(--color-bg)]">
                Check in
              </button>
              <button className="rounded-[6px] border border-[var(--color-border-2)] bg-[var(--color-surface)] py-2 text-[11px]">
                Pre-trip
              </button>
              <button className="rounded-[6px] border border-[var(--color-border)] bg-transparent py-2 text-[11px] text-[var(--color-muted)]">
                Clear
              </button>
            </div>

            {/* Spare van banner */}
            <div className="rounded-[6px] border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-[11px]">
              <div className="font-mono text-[9px] uppercase tracking-wider text-[var(--color-muted-dim)]">Spare van</div>
              <div className="mt-0.5 flex items-center gap-2">
                <span className="font-mono font-semibold" style={{ color: "var(--color-danger)" }}>
                  V-09
                </span>
                <span className="text-[var(--color-muted)]">V-114 in shop</span>
              </div>
            </div>
          </div>

          {/* Right: today feed */}
          <div className="flex flex-col gap-2 border-l border-[var(--color-border)] pl-3">
            <div className="section-label">Today</div>

            <Row dot="ok" title="Pre-trip submitted" sub="5:42 AM · 33 / 33 pass" />
            <Row dot="warning" title="Defect reported" sub="5:39 AM · brake light L" />
            <Row dot="info" title="Relay from Karl" sub="Skip stop 12 — student absent">
              <button className="mt-1 rounded border border-[var(--color-border-2)] px-2 py-0.5 text-[9px] uppercase tracking-wider">
                Acknowledged
              </button>
            </Row>
            <Row dot="accent" title="Standby assigned" sub="4:58 AM · WBL-21" />

            <div className="mt-auto flex items-center justify-between font-mono text-[9px] text-[var(--color-muted-dim)]">
              <span>Synced 5:42 AM</span>
              <span>5 / 8 routes done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

type Dot = "ok" | "warning" | "info" | "accent";
const dotColor: Record<Dot, string> = {
  ok: "var(--color-ok)",
  warning: "var(--color-warning)",
  info: "var(--color-info)",
  accent: "var(--color-accent)",
};

function Row({ dot, title, sub, children }: { dot: Dot; title: string; sub: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 text-[11px]">
      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: dotColor[dot] }} />
      <div className="min-w-0">
        <div className="truncate text-[var(--color-fg)]">{title}</div>
        <div className="mt-0.5 truncate font-mono text-[9px] text-[var(--color-muted-dim)]">{sub}</div>
        {children}
      </div>
    </div>
  );
}
