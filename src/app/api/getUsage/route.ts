import { db } from "@/db";
import { users } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
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

  return NextResponse.json({
    createdForms: user[0].createdForms,
    totalSubmissions: user[0].totalSubmissions,
    plan: user[0].plan,
  });
}
