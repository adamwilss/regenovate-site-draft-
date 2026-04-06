import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const TO = "Info@regenovate.com";
const FROM = "Regenovate Contact <contact@regenovate.co>";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, org, inquiry, message } = body;

  if (!name || !email || !inquiry) {
    return NextResponse.json(
      { error: "Name, email, and inquiry type are required." },
      { status: 400 }
    );
  }

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    replyTo: email,
    subject: `New enquiry — ${inquiry} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e">
        <div style="background:#0a1f44;padding:24px 32px;border-radius:8px 8px 0 0">
          <h1 style="color:#ffffff;font-size:20px;margin:0;font-weight:600">
            New Contact Form Submission
          </h1>
          <p style="color:#afc4e8;font-size:13px;margin:6px 0 0">Regenovate.co</p>
        </div>
        <div style="background:#f8fafc;padding:32px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 8px 8px">

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;width:140px;color:#64748b;font-size:13px;vertical-align:top">Name</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;font-weight:500;color:#1e293b">${name}</td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top">Email</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#1e293b">
                <a href="mailto:${email}" style="color:#1f5edc;text-decoration:none">${email}</a>
              </td>
            </tr>
            ${phone ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top">Phone</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#1e293b">${phone}</td>
            </tr>` : ""}
            ${org ? `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top">Organisation</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#1e293b">${org}</td>
            </tr>` : ""}
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;vertical-align:top">Enquiry type</td>
              <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;font-size:14px;color:#1e293b">
                <span style="background:#dbeafe;color:#1d4ed8;padding:2px 10px;border-radius:20px;font-size:12px;font-weight:600">${inquiry}</span>
              </td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding:10px 0;color:#64748b;font-size:13px;vertical-align:top">Message</td>
              <td style="padding:10px 0;font-size:14px;color:#1e293b;line-height:1.6">${message.replace(/\n/g, "<br>")}</td>
            </tr>` : ""}
          </table>

          <div style="margin-top:28px;padding:16px;background:#eff6ff;border-radius:6px;border-left:3px solid #1f5edc">
            <p style="margin:0;font-size:12px;color:#1d4ed8">
              Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        </div>
      </div>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
