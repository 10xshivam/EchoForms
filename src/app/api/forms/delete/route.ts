import { db } from "@/db"; 
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export default async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 

    if (!formId) {
      return NextResponse.json({ success: false, message: "Invalid Form ID" });
    }

   
    const existingForm = await db.select().from(forms).where(eq(forms.id, Number(formId)));

    if (existingForm.length === 0) {
      return NextResponse.json({ success: false, message: "Form not found" });
    }

    await db.delete(forms).where(eq(forms.id, Number(formId)));

    return NextResponse.json({ success: true, message: "Form deleted successfully" });
  } catch (error) {
    console.error("Error deleting form:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
