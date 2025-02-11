import { NextResponse } from "next/server";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user) {
      return NextResponse.json({ error: "User not found" });
    }

    const userForms = await db
      .select()
      .from(forms)
      .where(eq(forms.ownerId, user.id));

    return NextResponse.json({
      success: true,
      forms: userForms,
    });
  } catch (error) {
    console.error("Error fetching user forms:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch user forms",
    });
  }
}
