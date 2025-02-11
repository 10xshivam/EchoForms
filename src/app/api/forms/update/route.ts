import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db"; // Import your Drizzle ORM instance
import { forms } from "@/db/schema"; // Import your forms schema
import { eq } from "drizzle-orm";

export async function PUT(req:NextRequest) {
  const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 

  if (!formId) {
    return NextResponse.json({ success: false, error: "Form ID is required" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { content } = body;

    if (!content) {
      return NextResponse.json({ success: false, error: "Content is required" }, { status: 400 });
    }

    await db.update(forms).set({ content }).where(eq(forms.id, Number(formId)));

    return NextResponse.json({ success: true, message: "Form updated successfully" });
  } catch (error) {
    console.error("Error updating form:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}