import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, org, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  // In production, integrate with an email service, database, or CRM here.
  console.log("Contact form submission:", { name, email, org, message });

  return NextResponse.json({ success: true });
}
