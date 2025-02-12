import { db } from "@/db";
import { submissions, forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url); 
    const formId = searchParams.get('formId'); 

    if (!formId ) {
      return NextResponse.json({ success: false, message: "Invalid Form ID" });
    }

    
    const form = await db.select().from(forms).where(eq(forms.id, Number(formId))).limit(1) as { content: { formTitle: string } }[];
    if (!form.length) {
      return NextResponse.json({ success: false, message: "Form not found" });
    }

    const responses = await db.select().from(submissions).where(eq(submissions.formId, Number(formId)));

    if (!responses.length) {
      return NextResponse.json({ success: false, message: "No responses found" });
    }

    const formattedResponses = responses.map((response) => response.content);
    
    const description = `
    Analyze the following dataset of form responses for the form titled "${form[0].content.formTitle}".
    Provide insights, trends, and key takeaways. Identify patterns, common themes, and anomalies.
    Summarize user sentiment (positive, negative, neutral) and suggest possible improvements.
    `;

    const aiAnalysis = await generateAIContent(description, formattedResponses as object[]);
    console.log(aiAnalysis)

    return NextResponse.json({ success: true, analysis: aiAnalysis });
  } catch (error) {
    console.error("Error analyzing responses:", error);
    return NextResponse.json({ success: false, message: "Internal Server Error" });
  }
}

async function generateAIContent(description: string, responses: object[]) {
  const prompt = `
    You are an AI data analyst. Here is a dataset of form responses:
    ${JSON.stringify(responses, null, 2)}

    ${description}

    - Identify trends and patterns in the responses.
    - Provide sentiment analysis.
    - Suggest actionable insights and improvements.

    Generate a valid JSON response without formatting it as a code block. Do not include "json" or triple backticks. Return raw JSON only.
    {
      "summary": "string",
      "keyFindings": ["string"],
      "sentimentAnalysis": {
        "positive": "percentage",
        "negative": "percentage",
        "neutral": "percentage"
      },
      "recommendations": ["string"]
    }
  `;

  const result = await model.generateContent(prompt);
  const cleanedResponse = result.response.text().replace(/```json|```/g, "").trim();
    return JSON.parse(cleanedResponse);
}
