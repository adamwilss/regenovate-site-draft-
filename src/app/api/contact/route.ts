import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, org, inquiry, message } = body;

  if (!name || !email || !inquiry) {
    return NextResponse.json(
      { error: "Name, email, and inquiry type are required." },
      { status: 400 }
    );
  }

  // In production, integrate with an email service, database, or CRM here.
  console.log("Contact form submission:", { name, email, phone, org, inquiry, message });

  return NextResponse.json({ success: true });
}
