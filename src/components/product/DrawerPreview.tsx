import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function DrawerPreview() {
  const [open, setOpen] = useState(true);
  return (
    <div className="relative h-[360px] w-full overflow-hidden rounded-[10px] border border-[var(--color-border)] bg-[var(--color-bg-2)]">
      {/* Faux dispatch board behind */}
      <div className="absolute inset-0 grid grid-cols-3 gap-2 p-3 opacity-60">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-8 rounded border border-[var(--color-border)] bg-[var(--color-surface)]"
          />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 h-full w-[60%] border-l border-[var(--color-border-2)] bg-[var(--color-bg-2)] p-4 shadow-[-4px_0_24px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="section-label">Driver</div>
                <div className="mt-1 text-[18px] font-semibold tracking-tight">Janelle B.</div>
                <div className="mt-0.5 font-mono text-[11px] text-[var(--color-muted)]">Route WBL-21</div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded p-1 text-[var(--color-muted)] hover:bg-[var(--color-surface-2)]"
                aria-label="Close drawer"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-2 text-[12px]">
              <Row label="Status" value="Called in" tone="warning" />
              <Row label="Standby" value="Marcus T." tone="info" />
              <Row label="Last check-in" value="5:38 AM" />
              <Row label="Vehicle" value="V-114" mono />
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="absolute bottom-3 right-3 rounded border border-[var(--color-border-2)] bg-[var(--color-surface)] px-3 py-1.5 text-[12px] hover:bg-[var(--color-surface-2)]"
        >
          Open drawer
        </button>
      )}
    </div>
  );
}

function Row({ label, value, tone, mono }: { label: string; value: string; tone?: "warning" | "info"; mono?: boolean }) {
  const color =
    tone === "warning" ? "var(--color-warning)" : tone === "info" ? "var(--color-info)" : "var(--color-fg)";
  return (
    <div className="flex justify-between border-b border-[var(--color-border)] py-1.5 last:border-b-0">
      <span className="text-[var(--color-muted)]">{label}</span>
      <span className={mono ? "font-mono" : ""} style={{ color }}>
        {value}
      </span>
    </div>
  );
}
