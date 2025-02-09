import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 
    console.log(formId)

    const user = await currentUser();

    if (!formId) {
      return NextResponse.json({ error: "Form ID is required" }, { status: 400 });
    }

    // Fetch form from DB
    const fetchedForm = await db
      .select()
      .from(forms)
      .where(and(eq(forms.id, Number(formId)), eq(forms.ownerId, user?.id || "")))
      .execute();

    if (fetchedForm.length === 0) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    console.log(fetchedForm[0])

    return NextResponse.json({ success: true, form: fetchedForm[0] });
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
