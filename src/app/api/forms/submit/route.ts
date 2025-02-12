import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submissions, forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import path from "path";

interface SubmissionContent {
  [key: string]: string | null; 
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const { searchParams } = new URL(req.url);
    const shareId = searchParams.get("shareId");

    if (!shareId) {
      return NextResponse.json({ success: false, error: "Missing form link" });
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
