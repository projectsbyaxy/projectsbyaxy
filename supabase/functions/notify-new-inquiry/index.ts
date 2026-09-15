/**
 * ProjectsByAxy — Supabase Edge Function
 * Trigger: Direct POST from frontend on form submit (also works as DB Webhook fallback)
 * Sends TWO emails via Resend:
 *   1. Admin notification  → mail@projectsbyaxy.com
 *   2. Confirmation email  → enquirer's email
 *
 * Setup:
 *  1. Deploy: npx supabase functions deploy notify-new-inquiry
 *  2. Set secrets:
 *       npx supabase secrets set RESEND_API_KEY=re_xxxx
 *       npx supabase secrets set NOTIFY_EMAIL=mail@projectsbyaxy.com
 *       npx supabase secrets set SITE_URL=https://projectsbyaxy.com
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const NOTIFY_EMAIL   = Deno.env.get("NOTIFY_EMAIL") ?? "mail@projectsbyaxy.com";
const SITE_URL       = Deno.env.get("SITE_URL") ?? "https://projectsbyaxy.com";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

async function sendEmail(payload: object): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(`Resend error: ${JSON.stringify(err)}`);
  }
}

serve(async (req: Request) => {
  /* CORS preflight */
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: CORS });
  }

  try {
    if (!RESEND_API_KEY) {
      console.error("[AXY] RESEND_API_KEY secret is not configured.");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const body   = await req.json();
    /* Support both direct call { record: {...} } and DB webhook format */
    const record = body?.record ?? body;

    if (!record?.name || !record?.email) {
      return new Response(JSON.stringify({ error: "Missing name or email in payload" }), {
        status: 400, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const receivedAt = new Date(record.created_at ?? Date.now()).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short",
    });

    const services        = record.project_type    ?? "Not specified";
    const selectedPackage = record.selected_package ?? "Not specified";

    /* ─────────────────────────────────────────────
       EMAIL 1 — Admin notification
    ───────────────────────────────────────────── */
    const adminHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin:0; padding:0; background:#000; font-family:'JetBrains Mono','Courier New',monospace; color:#f5f0e8; }
    .wrap { max-width:560px; margin:40px auto; }
    .header { border-bottom:1px solid #1a1a1a; padding-bottom:20px; margin-bottom:28px; }
    .tag { font-size:10px; color:#f97316; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:10px; }
    h1 { font-size:22px; font-weight:600; color:#f5f0e8; margin:0; letter-spacing:0.05em; text-transform:uppercase; }
    .row { display:flex; border-bottom:1px solid #111; padding:12px 0; }
    .label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#555; width:130px; flex-shrink:0; padding-top:2px; }
    .value { font-size:13px; color:#9a9188; flex:1; }
    .pkg-badge { display:inline-block; padding:3px 10px; background:#f97316; color:#000; font-size:10px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; }
    .msg-block { background:#0a0a0a; border:1px solid #1a1a1a; padding:16px; margin-top:8px; font-size:12px; color:#7a7270; line-height:1.7; }
    .cta { display:block; margin-top:28px; text-align:center; background:#fff; color:#000; text-decoration:none; padding:14px 28px; font-size:10px; letter-spacing:0.3em; text-transform:uppercase; font-weight:700; }
    .footer { margin-top:32px; font-size:9px; color:#333; letter-spacing:0.12em; text-transform:uppercase; text-align:center; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="tag">AX-INTAKE // New Lead Received</div>
      <h1>Incoming Inquiry</h1>
    </div>
    <div class="row"><div class="label">From</div><div class="value">${record.name}</div></div>
    <div class="row"><div class="label">Email</div><div class="value">${record.email}</div></div>
    <div class="row"><div class="label">Services</div><div class="value">${services}</div></div>
    <div class="row">
      <div class="label">Package</div>
      <div class="value">
        ${selectedPackage !== "Not specified"
          ? `<span class="pkg-badge">${selectedPackage}</span>`
          : `<span style="color:#444">Not specified</span>`}
      </div>
    </div>
    <div class="row"><div class="label">Received</div><div class="value">${receivedAt} IST</div></div>
    <div style="margin-top:20px;">
      <div class="label" style="margin-bottom:8px;">Message //</div>
      <div class="msg-block">${(record.message ?? "").replace(/\n/g, "<br>")}</div>
    </div>
    <a href="${SITE_URL}/#admin" class="cta">Open Admin Panel →</a>
    <div class="footer">ProjectsByAxy // Automated Alert // ${receivedAt} IST</div>
  </div>
</body>
</html>`;

    /* ─────────────────────────────────────────────
       EMAIL 2 — Confirmation to enquirer (cyberpunk)
    ───────────────────────────────────────────── */
    const confirmHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin:0; padding:0; background:#000; font-family:'JetBrains Mono','Courier New',monospace; color:#f5f0e8; }
    .wrap { max-width:560px; margin:40px auto; }
    .topbar { height:2px; background:linear-gradient(90deg,#f97316,#fb923c,#000); margin-bottom:32px; }
    .tag { font-size:10px; color:#f97316; letter-spacing:0.25em; text-transform:uppercase; margin-bottom:12px; }
    h1 { font-size:20px; font-weight:600; color:#f5f0e8; margin:0 0 6px 0; letter-spacing:0.08em; text-transform:uppercase; }
    .sub { font-size:11px; color:#555; letter-spacing:0.1em; margin-bottom:28px; }
    .block { border:1px solid #1a1a1a; padding:20px; margin-bottom:16px; background:#0a0a0a; }
    .block-tag { font-size:9px; color:#f97316; letter-spacing:0.2em; text-transform:uppercase; margin-bottom:12px; }
    .row { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #111; padding:10px 0; }
    .row:last-child { border-bottom:none; }
    .rlabel { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:#444; }
    .rval { font-size:12px; color:#9a9188; text-align:right; max-width:280px; }
    .pkg-badge { display:inline-block; padding:3px 10px; background:#f97316; color:#000; font-size:10px; font-weight:700; letter-spacing:0.15em; text-transform:uppercase; }
    .msg-preview { font-size:11px; color:#555; line-height:1.7; font-style:italic; border-left:2px solid #1a1a1a; padding-left:14px; margin-top:4px; }
    .status-row { display:flex; align-items:center; gap:10px; margin-bottom:10px; }
    .dot { width:7px; height:7px; border-radius:50%; background:#4ade80; box-shadow:0 0 8px rgba(74,222,128,0.6); flex-shrink:0; }
    .footer { font-size:9px; color:#2a2a2a; letter-spacing:0.12em; text-transform:uppercase; text-align:center; padding-top:16px; border-top:1px solid #0f0f0f; }
    a { color:#f97316; text-decoration:none; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="topbar"></div>
    <div class="tag">AX-CONFIRM // Transmission Acknowledged</div>
    <h1>Request Received, ${record.name.split(" ")[0]}.</h1>
    <div class="sub">Your signal reached us. We're on it.</div>

    <div class="block">
      <div class="block-tag">Intake Summary //</div>
      <div class="row">
        <span class="rlabel">Operator</span>
        <span class="rval">${record.name}</span>
      </div>
      <div class="row">
        <span class="rlabel">Services Requested</span>
        <span class="rval">${services}</span>
      </div>
      ${selectedPackage !== "Not specified" ? `
      <div class="row">
        <span class="rlabel">Package</span>
        <span class="rval"><span class="pkg-badge">${selectedPackage}</span></span>
      </div>` : ""}
      <div class="row">
        <span class="rlabel">Logged At</span>
        <span class="rval">${receivedAt} IST</span>
      </div>
      ${record.message ? `
      <div style="padding-top:14px;">
        <div class="rlabel" style="margin-bottom:8px;">Your Brief //</div>
        <div class="msg-preview">${(record.message ?? "").replace(/\n/g, "<br>")}</div>
      </div>` : ""}
    </div>

    <div class="block">
      <div class="block-tag">Protocol Status //</div>
      <div class="status-row"><div class="dot"></div><span style="font-size:10px;color:#4ade80;letter-spacing:0.15em;text-transform:uppercase;">Signal received &amp; logged</span></div>
      <div class="status-row" style="opacity:0.4"><div class="dot" style="background:#555;box-shadow:none"></div><span style="font-size:10px;color:#555;letter-spacing:0.15em;text-transform:uppercase;">Under review by AXY team</span></div>
      <div class="status-row" style="opacity:0.4"><div class="dot" style="background:#555;box-shadow:none"></div><span style="font-size:10px;color:#555;letter-spacing:0.15em;text-transform:uppercase;">Response within 24hrs</span></div>
    </div>

    <div style="font-size:11px; color:#444; line-height:2; margin-bottom:24px;">
      Need to reach us directly?<br>
      <a href="mailto:${NOTIFY_EMAIL}">${NOTIFY_EMAIL}</a> &nbsp;|&nbsp;
      <a href="https://wa.me/919966402288">WhatsApp +91-9966402288</a><br>
      <a href="${SITE_URL}">${SITE_URL}</a>
    </div>

    <div class="footer">
      ProjectsByAxy // Gachibowli, Hyderabad // Automated Confirmation<br>
      This is a system-generated message. Do not reply to this email.
    </div>
  </div>
</body>
</html>`;

    /* ── Fire both emails in parallel ── */
    await Promise.all([
      sendEmail({
        from:    "ProjectsByAxy Alerts <onboarding@resend.dev>",
        to:      [NOTIFY_EMAIL],
        subject: `[AX-INTAKE] ${services} — ${record.name}`,
        html:    adminHtml,
      }),
      sendEmail({
        from:    "ProjectsByAxy <onboarding@resend.dev>",
        to:      [record.email],
        subject: `[AX-CONFIRM] Request received — We'll be in touch, ${record.name.split(" ")[0]}.`,
        html:    confirmHtml,
      }),
    ]);

    console.log(`[AXY] Emails sent — admin: ${NOTIFY_EMAIL}, confirm: ${record.email}`);
    return new Response(JSON.stringify({ ok: true }), {
      status: 200, headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[AXY] Edge function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
