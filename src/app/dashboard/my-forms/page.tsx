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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Clipboard } from "lucide-react";

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

export default function MyForms() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const fetchForm = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms`);
      const data = await res?.data;
      if (data.success) {
        console.log(data);
        setForms(data.forms as FormData[]);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch form:", error);
    }
  }, []);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const onDelete = async (formId:number) => {
    try {
      const res = await axios.delete(`/api/forms/delete?formId=${formId}`);
      const data = await res?.data;
      if (data.success) {
        fetchForm()
        console.log("Form deleted successfully");
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch form:", error);
    }
  }
  

  if (!forms) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div>
      {forms.map((form) => (
        <Card key={form.id} className="max-w-lg ">
          <CardHeader>
            <CardTitle>{form.content.formTitle}</CardTitle>
            <CardDescription>{form.content.formHeading}</CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
          <CardFooter>
            <Link href={`/form/edit-form/${form.id}`}>
              <Button variant="outline" className="mr-2">
                Edit
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Share</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Copy url</DialogTitle>
                </DialogHeader>
                <div className="bg-zinc-900 p-3 rounded w-full relative">
                  <code className="text-sky-500 text-lg">{`${window.location.origin}/form/submit/${form.shareUrl}`}</code>
                  <div
                    className="absolute inline bg-sky-500/5 p-1.5 rounded-lg top-[10px] right-3 hover:bg-sky-500/10"
                    onClick={() => copyToClipboard(`${window.location.origin}/form/submit/${form.shareUrl}`)}
                  >
                    {isCopied ? (
                      <Check className="text-sky-500 h-5 w-5" />
                    ) : (
                      <Clipboard className="text-sky-500 w-5 h-5" />
                    )}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            <Button variant="outline" onClick={()=>onDelete(form.id)}>Delete</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
