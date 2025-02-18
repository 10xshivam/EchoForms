"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react"; 
import Link from "next/link";
import { useParams } from "next/navigation";

export default function FormSubmissionSuccess() {
  const { shareId } = useParams()
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-2" />
          <CardTitle>Thank You for Submitting!</CardTitle>
          <CardDescription>
            Your response has been successfully submitted.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild className="px-5">
            <Link href={`/form/submit/${shareId}`}>Submit Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}