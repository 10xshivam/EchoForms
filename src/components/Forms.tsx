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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Clipboard, Code, Eye, Pencil, Share2, Trash2 } from "lucide-react";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

interface FormData {
  id: number;
  ownerId: string;
  shareUrl: string;
  published: boolean;
  createdAt: string;
  submissions: number;
  content: {
    formTitle: string;
    formHeading: string;
  };
}

export default function Forms() {
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

  const onDelete = async (formId: number) => {
    try {
      const res = await axios.delete(`/api/forms/delete?formId=${formId}`);
      const data = await res?.data;
      if (data.success) {
        fetchForm();
        console.log("Form deleted successfully");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  if (!forms) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-10 pt-8">
      {forms.map((form) => (
        <Card key={form.id} className=" ">
          <CardHeader className="relative">
            <CardTitle className="text-2xl">{form.content.formTitle}</CardTitle>
            <CardDescription className="text-base">
              {form.content.formHeading}
              <div className=" absolute right-5 top-5 flex gap-2">
                <Link href={`/form/edit/${form.id}`}>
                  <div className="border p-2">
                    <Pencil size={20} />
                  </div>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="border p-2">
                      <Trash2 size={20} />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Form</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this form?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        type="submit"
                        variant={"destructive"}
                        onClick={() => onDelete(form.id)}
                      >
                        Delete
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <div className="border p-2">
                      <Code size={20} />
                    </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <div className="border p-2">
                      <Share2 size={20} />
                    </div>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Copy url</DialogTitle>
                    </DialogHeader>
                    <div className="bg-zinc-900 p-3 rounded w-full relative">
                      <code className="text-sky-500 text-lg">{`${window.location.origin}/form/submit/${form.shareUrl}`}</code>
                      <div
                        className="absolute inline bg-sky-500/5 p-1.5 rounded-lg top-[10px] right-3 hover:bg-sky-500/10"
                        onClick={() =>
                          copyToClipboard(
                            `${window.location.origin}/form/submit/${form.shareUrl}`
                          )
                        }
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
                <Link href={`/form/submit/${form.shareUrl}`}>
                  <div className="border p-2">
                    <Eye size={20} />
                  </div>
                </Link>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Separator />
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{form.submissions} Submissions</p>
            <div className="flex gap-2">
              <Link href={`/form/responses/${form.id}`}>
                <Button variant={"outline"}>Email Notifications</Button>
              </Link>
              <Link href={`/form/responses/${form.id}`}>
                <Button variant={"outline"}>View All Submissions</Button>
              </Link>
              <Link href={`/form/analyze/${form.id}`}>
                <Button variant={"outline"}>Analyze Submissions </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
