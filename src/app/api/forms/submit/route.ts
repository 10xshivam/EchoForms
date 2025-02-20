import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { submissions, forms, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { writeFile } from "fs/promises";
import path from "path";
import { sendEmail } from "@/lib/mail";

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

    const form = await db
      .select({
        id: forms.id,
        ownerId: forms.ownerId,
        receiveSubmissionEmails: forms.receiveSubmissionEmails,
        submissions: forms.submissions,
        shareUrl: forms.shareUrl,
      })
      .from(forms)
      .where(eq(forms.shareUrl, shareId))
      .limit(1);

    if (form.length === 0 || !form[0].id) {
      return NextResponse.json({ success: false, error: "Form not found" });
    }

    const formDetails = form[0];

    const formOwner = await db
      .select({
        id: users.id,
        email: users.email,
        plan: users.plan,
        totalSubmissions: users.totalSubmissions,
      })
      .from(users)
      .where(eq(users.id, formDetails.ownerId))
      .limit(1);

    if (formOwner.length === 0 || !formOwner[0].id) {
      return NextResponse.json({ error: "Form owner not found" }, { status: 404 });
    }

    const ownerDetails = formOwner[0];

    const isPro = ownerDetails.plan === "Pro"; 
    const totalSubmissions = ownerDetails.totalSubmissions ?? 0;

    if (!isPro && totalSubmissions >= 500) {
      return NextResponse.json(
        { error: "Free plan submission limit reached. Upgrade to Pro!" },
        { status: 403 }
      );
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
      formId: formDetails.id,
      content: submissionContent,
    });

    await db
      .update(forms)
      .set({ submissions: (formDetails.submissions ?? 0) + 1 })
      .where(eq(forms.id, formDetails.id));

    await db
      .update(users)
      .set({ totalSubmissions: totalSubmissions + 1 })
      .where(eq(users.id, ownerDetails.id));

    if (formDetails.receiveSubmissionEmails) {
      await sendEmail({
        to: ownerDetails.email,
        subject: "New Form Submission",
        body: `You have received a new submission for your form: ${formDetails.shareUrl}`,
      });
    }

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
