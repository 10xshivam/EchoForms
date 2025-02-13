import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submissions, forms, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import path from "path";
import { currentUser } from "@clerk/nextjs/server";

interface SubmissionContent {
  [key: string]: string | null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const { searchParams } = new URL(req.url);
    const shareId = searchParams.get("shareId");

    if (!shareId) {
      return NextResponse.json({ success: false, error: "Missing form link" });
    }

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
    const totalSubmissions = user[0].totalSubmissions ?? 0;

    if (!isPro && totalSubmissions >= 100) {
      return NextResponse.json(
        { error: "Free plan submission limit reached. Upgrade to Pro!" },
        { status: 403 }
      );
    }

    const form = await db
      .select()
      .from(forms)
      .where(eq(forms.shareUrl, shareId))
      .limit(1);
    if (form.length === 0) {
      return NextResponse.json({ success: false, error: "Form not found" });
    }

    const submissionContent: SubmissionContent = {};

    for (const [key, value] of formData.entries()) {
      if (key === "formFields") continue;
      if (value instanceof Blob) {
        const fileName = `${Date.now()}_${value.name}`;
        const filePath = `/temp/${fileName}`;
        const savePath = path.join(process.cwd(), "public/temp", fileName);

        await writeFile(savePath, Buffer.from(await value.arrayBuffer()));
        submissionContent[key] = filePath;
      } else {
        submissionContent[key] = value as string;
      }
    }

    await db.insert(submissions).values({
      formId: form[0].id,
      content: submissionContent,
    });

    await db
      .update(forms)
      .set({ submissions: (form[0].submissions ?? 0) + 1 })
      .where(eq(forms.id, form[0].id));

    await db
      .update(users)
      .set({ totalSubmissions: totalSubmissions + 1 })
      .where(eq(users.id, user[0].id));

    return NextResponse.json({
      success: true,
      message: "Response submitted successfully",
    });
  } catch (error) {
    console.error("Error submitting response:", error);
    return NextResponse.json({
      success: false,
      error: "Failed to submit response",
    });
  }
}
