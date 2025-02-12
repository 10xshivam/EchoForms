"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface FormData {
  id: number;
  ownerId: string;
  shareUrl: string;
  published: boolean;
  createdAt: string;
  content: {
    formTitle: string;
    formHeading: string;
  };
}

export default function Responses() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [submissionsCount, setSubmissionsCount] = useState<{ [key: number]: number }>({});

  const fetchForms = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms`);
      const data = res?.data;
      if (data.success) {
        setForms(data.forms as FormData[]);

        fetchResponsesCount(data.forms);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  }, []);

  const fetchResponsesCount = async (forms: FormData[]) => {
    const counts: { [key: number]: number } = {};

    await Promise.all(
      forms.map(async (form) => {
        try {
          const res = await axios.get(`/api/forms/submissions?formId=${form.id}`);
          counts[form.id] = res.data.data.length; // Counting number of responses
        } catch (error) {
          console.error(`Failed to fetch responses for form ${form.id}:`, error);
          counts[form.id] = 0;
        }
      })
    );

    setSubmissionsCount(counts);
  };

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  if (!forms.length) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {forms.map((form) => (
        <Card key={form.id} className="max-w-lg">
          <CardHeader>
            <CardTitle>{form.content.formTitle}</CardTitle>
            <CardDescription>{form.content.formHeading}</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
          <CardFooter>
            <p>{submissionsCount[form.id] ?? 0} Responses</p>
            <Link href={`/form/responses/${form.id}`}>
            <Button variant="secondary" className="ml-2">See responses</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
