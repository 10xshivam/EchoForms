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
import Link from "next/link";
import { Button } from "@/components/ui/button";

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

export default function Analyze() {
  const [forms, setForms] = useState<FormData[]>([]);

  const fetchForms = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms`);
      const data = res?.data;
      if (data.success) {
        setForms(data.forms as FormData[]);

      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    }
  }, []);


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
            <Link href={`/form/analyze/${form.id}`}>
            <Button variant="secondary" className="ml-2">Analyze</Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}