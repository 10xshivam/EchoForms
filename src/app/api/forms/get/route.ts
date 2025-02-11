import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shareId = searchParams.get("shareableLink");

    if (!shareId) {
      return NextResponse.json({ success: false, error: "No link provided" });
    }

    const form = await db.select().from(forms).where(eq(forms.shareUrl, shareId)).limit(1);

    if (form.length === 0) {
      return NextResponse.json({ success: false, error: "Form not found" });
    }

    return NextResponse.json({ success: true, form: form[0] });
  } catch (error) {
    console.log("Error fetching with shareurl",error)
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
