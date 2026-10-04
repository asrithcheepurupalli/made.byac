import type { VercelRequest, VercelResponse } from "@vercel/node";

// Contact form delivery. An enquiry is emailed to the studio inbox through Resend.
//
// Rules this file keeps:
//  - It only answers "success" when the email provider accepted the message. If delivery is
//    not configured or fails, the visitor is told so and pointed at WhatsApp and email instead
//    of being shown a confirmation for a message that went nowhere.
//  - Nothing is stored. The enquiry lives in the studio mailbox, and nowhere else.
//
// Environment (set in Vercel):
//   RESEND_API_KEY   required
//   CONTACT_TO       optional, defaults to thebrain@made-by-ac.com
//   CONTACT_FROM     optional, defaults to Resend's onboarding sender, which can only deliver
//                    to the Resend account owner's own address. Verify made-by-ac.com in Resend
//                    and use e.g. "made. by ac <hello@made-by-ac.com>" to send to any inbox.
//   RESEND_API_URL   optional, for testing against a stub

const clean = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const digits = (s: string) => s.replace(/\D/g, "");

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const b = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: real visitors never fill this hidden field. Pretend it worked, send nothing.
  if (clean(b.website, 200)) {
    res.json({ success: true });
    return;
  }

  const name = clean(b.name, 120);
  const email = clean(b.email, 160);
  const phone = clean(b.phone, 40);
  const message = clean(b.message, 4000);

  if (!name || !message) {
    res.status(400).json({ error: "missing_fields", detail: "Name and message are required." });
    return;
  }
  const hasEmail = validEmail(email);
  const hasPhone = digits(phone).length >= 8;
  if (!hasEmail && !hasPhone) {
    res.status(400).json({ error: "no_contact", detail: "Add an email or a WhatsApp number so we can reply." });
    return;
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.error("[contact] RESEND_API_KEY is not set; enquiry from %s could not be delivered", name);
    res.status(503).json({ error: "not_configured" });
    return;
  }

  const to = process.env.CONTACT_TO || "thebrain@made-by-ac.com";
  const from = process.env.CONTACT_FROM || "made. by ac <onboarding@resend.dev>";
  const url = process.env.RESEND_API_URL || "https://api.resend.com/emails";

  const lines = [
    `Name: ${name}`,
    hasEmail ? `Email: ${email}` : null,
    hasPhone ? `WhatsApp / phone: ${phone}` : null,
    "",
    message,
    "",
    `Sent from made-by-ac.com at ${new Date().toISOString()}`,
  ].filter((l) => l !== null) as string[];

  const html =
    `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.55;color:#111">` +
    `<p><strong>${esc(name)}</strong><br>` +
    (hasEmail ? `<a href="mailto:${esc(email)}">${esc(email)}</a><br>` : "") +
    (hasPhone ? `<a href="https://wa.me/${digits(phone)}">${esc(phone)}</a> (WhatsApp / phone)` : "") +
    `</p><p style="white-space:pre-wrap">${esc(message)}</p>` +
    `<p style="color:#777;font-size:12px">Sent from made-by-ac.com</p></div>`;

  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        ...(hasEmail ? { reply_to: email } : {}),
        subject: `New enquiry from ${name}`,
        text: lines.join("\n"),
        html,
      }),
    });
    if (!r.ok) {
      console.error("[contact] provider rejected the message: %s %s", r.status, (await r.text()).slice(0, 300));
      res.status(502).json({ error: "delivery_failed" });
      return;
    }
    res.json({ success: true });
  } catch (err) {
    console.error("[contact] delivery error", err);
    res.status(502).json({ error: "delivery_failed" });
  }
}
