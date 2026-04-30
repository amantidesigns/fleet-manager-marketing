import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function WaitlistForm({ compact }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Something went wrong.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-[10px] border border-[var(--color-border-2)] bg-[var(--color-surface)] p-4 ${
          compact ? "max-w-md" : "max-w-lg"
        }`}
      >
        <div className="text-[13px] font-medium text-[var(--color-fg)]">You're on the list.</div>
        <div className="mt-1 text-[13px] text-[var(--color-muted)]">
          We'll reach out as we open seats. New signups are paused while we work directly with our first customers.
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`flex w-full flex-col gap-2 sm:flex-row ${compact ? "max-w-md" : "max-w-lg"}`}>
      <input
        type="email"
        required
        autoComplete="email"
        placeholder="you@yourcompany.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 rounded-full border border-[var(--color-border-2)] bg-[var(--color-surface)] px-4 py-2.5 text-[13px] text-[var(--color-fg)] placeholder-[var(--color-muted-dim)] outline-none transition focus:border-[var(--color-accent)]"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="rounded-full bg-[var(--color-fg)] px-5 py-2.5 text-[13px] font-medium text-[var(--color-bg)] transition hover:bg-white disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Request access"}
      </button>
      {error && <span className="text-[12px] text-[var(--color-danger)]">{error}</span>}
    </form>
  );
}
