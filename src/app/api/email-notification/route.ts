import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 
    if (!formId) {
      return NextResponse.json({ error: "Form id not find" });
    }

    const { enabled } = await req.json();

    await db
      .update(forms)
      .set({ receiveSubmissionEmails: enabled })
      .where(eq(forms.id,Number(formId)));

    return NextResponse.json({ success: true, message: "Preference updated" });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Failed to update preference" });
  }
}
