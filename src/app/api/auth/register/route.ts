import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existingUser = await db.query.users.findFirst({ where: eq(users.email, email) });

    if (existingUser) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      email,
      name,
      passwordHash,
    });

    return NextResponse.json({ success: "User registered successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Registration Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
