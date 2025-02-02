"use client"

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession()


  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2">Welcome, {session?.user?.name}!</p>
      <p className="mt-1">Email: {session?.user?.email}</p>
      <Button
        className="bg-blue-600 hover:bg-blue-700"
        onClick={() => signOut()}
      >
        Logout
      </Button>
    </div>
  );
}
