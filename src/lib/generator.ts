import { GoogleGenerativeAI } from "@google/generative-ai";

const prompt = `
Generate a valid JSON response without formatting it as a code block. Do not include json or triple backticks. Return raw JSON only.

{
  "formTitle": "string",
  "formHeading": "string",
  "formFields": [
    {
      "fieldName": "string",
      "fieldTitle": "string",
      "fieldType": "string",
      "placeholder": "string",
      "required": "boolean",
      "options": ["string"]
    }
  ]
}

Requirements:
- Always include "formTitle" and "formHeading".
- "formFields" must contain at least 3 fields, covering different input types.
- Allowed "fieldType" values: "text", "email", "password", "number", "select", "checkbox", "radio", "file", "textarea".
- "options" must be included only for "select", "radio", and "checkbox" fields.
- Ensure consistency in "fieldName" for reliable frontend rendering.
- Provide meaningful "placeholder" text based on the "fieldTitle".
- Generate a "file" field only if strictly necessary (e.g., for profile picture or document upload).
- Prefer simple input fields over complex ones to reduce database storage usage.
- Avoid unnecessary multi-option fields unless they are critical for the form's purpose.
- Return only valid JSON, without any additional text.

Example Output:

{
  "formTitle": "User Registration",
  "formHeading": "Register Your Account",
  "formFields": [
    {
      "fieldName": "fullName",
      "fieldTitle": "Full Name",
      "fieldType": "text",
      "placeholder": "Enter your full name",
      "required": true
    },
    {
      "fieldName": "email",
      "fieldTitle": "Email Address",
      "fieldType": "email",
      "placeholder": "Enter your email",
      "required": true
    },
    {
      "fieldName": "password",
      "fieldTitle": "Password",
      "fieldType": "password",
      "placeholder": "Create a strong password",
      "required": true
    }
  ]
}
`;

export async function generateAIContent(description: string) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const result = await model.generateContent(`${description} ${prompt}`);
  
  const cleanedResponse = result.response
    .text()
    .replace(/```json|```/g, "")
    .trim();
  return JSON.parse(cleanedResponse);
}
