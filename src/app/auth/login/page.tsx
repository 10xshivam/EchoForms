"use client"
import { signIn } from "next-auth/react";
import React from "react";

export default function page() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <h2>Signin</h2>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
      <button onClick={() => signIn("github")}>Sign in with GitHub</button>
    </div>
  );
}
