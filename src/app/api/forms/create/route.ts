import { db } from "@/db";
import { forms, users } from "@/db/schema";
import { generateAIContent } from "@/lib/generator";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();
    console.log(description);

    const _user = await currentUser();
    if (!_user) {
      return NextResponse.json({ error: "User not found" });
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, _user.id))
      .limit(1);
    if (!user[0])
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    const isPro = user[0].plan === "pro";
    const createdForms = user[0].createdForms ?? 0;

    if (!isPro && createdForms >= 5) {
      return NextResponse.json(
        { error: "Free plan limit reached. Upgrade to Pro!" },
        { status: 403 }
      );
    }

    const formContent = await generateAIContent(description);
    if (!formContent) {
      return NextResponse.json({ error: "Unable to generate form" });
    }
    console.log(formContent);

    const form = await db
      .insert(forms)
      .values({
        ownerId: user[0].id,
        content: formContent,
      })
      .returning();

    await db
      .update(users)
      .set({ createdForms: createdForms + 1 })
      .where(eq(users.id, user[0].id));

    return NextResponse.json({
      success: true,
      message: "Form generated successfully.",
      formId: form[0].id,
    });
  } catch (error) {
    console.error("Error generating form", error);
    return NextResponse.json({
      success: false,
      error: "An error occurred while generating the form",
    });
  }
}
