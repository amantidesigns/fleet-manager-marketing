type Props = {
  routeNumber: string;
  district: "anoka" | "northsp" | "southsp" | "wbl" | "cst";
  driver: string;
  vehicle: string;
  status: "Covered" | "Open" | "At-risk";
};

const districtColor: Record<Props["district"], string> = {
  anoka: "var(--color-route-anoka)",
  northsp: "var(--color-route-northsp)",
  southsp: "var(--color-route-southsp)",
  wbl: "var(--color-route-wbl)",
  cst: "var(--color-route-cst)",
};

const statusColor: Record<Props["status"], string> = {
  Covered: "var(--color-ok)",
  "At-risk": "var(--color-warning)",
  Open: "var(--color-danger)",
};

export default function RouteCard({ routeNumber, district, driver, vehicle, status }: Props) {
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4 pl-5">
      <span
        className="absolute left-0 top-0 h-full w-1"
        style={{ background: districtColor[district] }}
      />
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--color-muted-dim)]">
            Route
          </div>
          <div className="mt-0.5 text-[18px] font-semibold tracking-tight text-[var(--color-fg)]">
            {routeNumber}
          </div>
        </div>
        <span
          className="rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
          style={{
            background: `color-mix(in srgb, ${statusColor[status]} 14%, transparent)`,
            color: statusColor[status],
          }}
        >
          {status}
        </span>
      </div>
      <div className="mt-3 space-y-1 text-[13px]">
        <div className="flex justify-between">
          <span className="text-[var(--color-muted)]">Driver</span>
          <span className="text-[var(--color-fg-dim)]">{driver}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-muted)]">Vehicle</span>
          <span className="font-mono text-[var(--color-fg-dim)]">{vehicle}</span>
        </div>
      </div>
    </div>
  );
}
