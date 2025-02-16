import { Resend } from "resend";

interface sendEmailInterface {
    to: string; 
    subject: string; 
    body: string 
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({ to, subject, body }:sendEmailInterface) {
  try {
    await resend.emails.send({
      from: "no-reply@yourapp.com",
      to,
      subject,
      text: body,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
