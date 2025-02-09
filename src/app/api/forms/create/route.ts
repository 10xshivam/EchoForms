import { db } from "@/db";
import { forms } from "@/db/schema";
import { generateAIContent } from "@/lib/generator";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { description } = await req.json();
        console.log(description);

        const user = await currentUser();
        if (!user) {
            return NextResponse.json({ error: "User not found" });
        }

        const formContent = await generateAIContent(description);
        if (!formContent) {
            return NextResponse.json({ error: "Unable to generate form" });
        }
        console.log(formContent);

        const form = await db.insert(forms).values({
            ownerId: user.id,
            content: formContent
        }).returning();

        return NextResponse.json({
            success: true,
            message: "Form generated successfully.",
            formId: form[0].id
        });
    } catch (error) {
        console.error("Error generating form", error);
        return NextResponse.json({ success: false, error: "An error occurred while generating the form" });
    }
}