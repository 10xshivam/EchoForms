import { NextResponse } from "next/server";
import { db } from "@/db"; // Adjust based on your db config
import { submissions } from "@/db/schema";
import { gte } from "drizzle-orm";

export async function GET() {
    try {
      // Get today's date at 00:00:00
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      // Fetch count of submissions created today
      const [{ count }] = await db
        .select({ count: db.$count(submissions.id) })
        .from(submissions)
        .where(gte(submissions.createdAt, today));
        console.log(count)
  
      return NextResponse.json({ success: true, count });
    } catch (error) {
      return NextResponse.json({ success: false, message: "Error fetching submission count", error }, { status: 500 });
    }
  }
