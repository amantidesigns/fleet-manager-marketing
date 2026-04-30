import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  let email: string | undefined;
  try {
    const body = await request.json();
    email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : undefined;
  } catch {
    return json({ error: "Invalid request body." }, 400);
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: "Please enter a valid email address." }, 400);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.WAITLIST_TO_EMAIL ?? "amantidesigns@gmail.com";

  if (!apiKey) {
    console.warn("[waitlist] RESEND_API_KEY missing — logging signup only:", email);
    return json({ ok: true, dev: true });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: "Fleet Manager <waitlist@fleet-manager.dev>",
    to,
    subject: `[Fleet Manager] New waitlist signup: ${email}`,
    text: `New waitlist signup\n\nEmail: ${email}\nUser-Agent: ${request.headers.get("user-agent") ?? "unknown"}\nReferer: ${request.headers.get("referer") ?? "unknown"}\nTime: ${new Date().toISOString()}`,
  });

  if (error) {
    console.error("[waitlist] Resend error:", error);
    return json({ error: "Could not send signup. Please try again." }, 500);
  }

  return json({ ok: true });
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
