import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const { formId, updatedFields, formTitle, formHeading } = await req.json();

    await db
      .update(forms)
      .set({
        content: JSON.stringify({ formTitle, formHeading, formFields: updatedFields }),
      })
      .where(eq(forms.id, formId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ success: false, error: "Failed to update form" });
  }
}