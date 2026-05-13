/**
 * ProjectsByAxy — Supabase Edge Function
 * Trigger: Database Webhook on contact_inquiries INSERT
 * Sends an email notification to the admin via Resend API.
 *
 * Setup:
 *  1. Deploy: npx supabase functions deploy notify-new-inquiry
 *  2. Set secrets:
 *       npx supabase secrets set RESEND_API_KEY=re_xxxx
 *       npx supabase secrets set NOTIFY_EMAIL=mail@projectsbyaxy.com
 *       npx supabase secrets set SITE_URL=https://projectsbyaxy.com
 *  3. Create Database Webhook in Supabase Dashboard:
 *       Table: contact_inquiries | Event: INSERT | Type: HTTP Request
 *       URL: https://<project-ref>.supabase.co/functions/v1/notify-new-inquiry
 *       Add header: Authorization: Bearer <service_role_key>
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY") ?? "re_hNTQtNaq_C7hkS5MDJj2vKrCMTFTZWxAN";
const NOTIFY_EMAIL   = Deno.env.get("NOTIFY_EMAIL") ?? "mail@projectsbyaxy.com";
const SITE_URL       = Deno.env.get("SITE_URL") ?? "https://projectsbyaxy.com";

serve(async (req: Request) => {
  try {
    const body = await req.json();
    // Supabase Database Webhook sends { type, table, record, old_record, schema }
    const record = body?.record;

    if (!record) {
      return new Response(JSON.stringify({ error: "No record in payload" }), { status: 400 });
    }

    if (!RESEND_API_KEY || !NOTIFY_EMAIL) {
      console.error("[AXY] Missing RESEND_API_KEY or NOTIFY_EMAIL secrets.");
      return new Response(JSON.stringify({ error: "Missing secrets" }), { status: 500 });
    }

    const receivedAt = new Date(record.created_at).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { margin: 0; padding: 0; background: #000; font-family: 'JetBrains Mono', 'Courier New', monospace; color: #f5f0e8; }
    .wrap { max-width: 560px; margin: 40px auto; }
    .header { border-bottom: 1px solid #1a1a1a; padding-bottom: 20px; margin-bottom: 28px; }
    .tag { font-size: 10px; color: #f97316; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 10px; }
    h1 { font-size: 22px; font-weight: 600; color: #f5f0e8; margin: 0; letter-spacing: 0.05em; text-transform: uppercase; }
    .row { display: flex; border-bottom: 1px solid #111; padding: 12px 0; }
    .label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase; color: #555; width: 110px; flex-shrink: 0; padding-top: 2px; }
    .value { font-size: 13px; color: #9a9188; flex: 1; }
    .msg-block { background: #0a0a0a; border: 1px solid #1a1a1a; padding: 16px; margin-top: 8px; font-size: 12px; color: #7a7270; line-height: 1.7; }
    .cta { display: block; margin-top: 28px; text-align: center; background: #fff; color: #000; text-decoration: none; padding: 14px 28px; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; font-weight: 700; }
    .footer { margin-top: 32px; font-size: 9px; color: #333; letter-spacing: 0.12em; text-transform: uppercase; text-align: center; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="header">
      <div class="tag">AX-INTAKE // New Inquiry Alert</div>
      <h1>New Lead Received</h1>
    </div>

    <div class="row"><div class="label">From</div><div class="value">${record.name}</div></div>
    <div class="row"><div class="label">Email</div><div class="value">${record.email}</div></div>
    <div class="row"><div class="label">Service</div><div class="value">${record.project_type ?? "Not specified"}</div></div>
    <div class="row"><div class="label">Received</div><div class="value">${receivedAt} IST</div></div>

    <div style="margin-top: 20px;">
      <div class="label" style="margin-bottom: 8px;">Message //</div>
      <div class="msg-block">${(record.message ?? "").replace(/\n/g, "<br>")}</div>
    </div>

    <a href="${SITE_URL}/#admin" class="cta">Open Admin Panel →</a>

    <div class="footer">ProjectsByAxy // Automated Notification // ${receivedAt} IST</div>
  </div>
</body>
</html>`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:    "ProjectsByAxy Alerts <onboarding@resend.dev>",
        to:      [NOTIFY_EMAIL],
        subject: `[AX-INTAKE] ${record.project_type ?? "New inquiry"} — ${record.name}`,
        html:    emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("[AXY] Resend error:", data);
      return new Response(JSON.stringify({ error: data }), { status: 500 });
    }

    console.log(`[AXY] Email sent to ${NOTIFY_EMAIL} for inquiry from ${record.name}`);
    return new Response(JSON.stringify({ ok: true, id: data.id }), { status: 200 });

  } catch (err) {
    console.error("[AXY] Edge function error:", err);
    return new Response(JSON.stringify({ error: String(err) }), { status: 500 });
  }
});
