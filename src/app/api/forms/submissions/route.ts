import { db } from "@/db"; 
import { submissions } from "@/db/schema"; 
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 

    if (!formId || isNaN(Number(formId))) {
      return NextResponse.json({ success: false, message: "Invalid Form ID" });
    }

    const responses = await db.select().from(submissions).where(eq(submissions.formId, Number(formId)));

    return NextResponse.json({ success: true, data: responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}
