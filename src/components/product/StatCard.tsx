import { useInView, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Props = {
  label: string;
  value: number;
  unit?: string;
  delta?: { value: string; positive?: boolean };
  hero?: boolean;
};

export default function StatCard({ label, value, unit, delta, hero }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const spring = useSpring(0, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) spring.set(value);
  }, [inView, value, spring]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <div
      ref={ref}
      className="rounded-[10px] border border-[var(--color-border)] bg-[var(--color-surface)] p-4"
    >
      <div className="section-label mb-2">{label}</div>
      <div className="flex items-baseline gap-2">
        <span
          className="font-semibold tabular-nums"
          style={{
            fontSize: hero ? 32 : 24,
            letterSpacing: "-0.01em",
            color: "var(--color-fg)",
          }}
        >
          {display}
          {unit && <span className="text-[var(--color-muted)] ml-0.5 text-[0.5em] font-medium">{unit}</span>}
        </span>
        {delta && (
          <span
            className="text-[11px] font-medium tabular-nums"
            style={{ color: delta.positive ? "var(--color-ok)" : "var(--color-danger)" }}
          >
            {delta.positive ? "▲" : "▼"} {delta.value}
          </span>
        )}
      </div>
    </div>
  );
}
