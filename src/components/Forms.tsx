"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
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
import { Check, Clipboard, Eye, Loader, Pencil, Share2, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import EmailNotificationToggle from "./EmailNotificationToggle";
import QrCodeGenerator from "./QrCodeGenerator";
import { useUser } from "@clerk/nextjs";
import { DialogDescription } from "@radix-ui/react-dialog";

interface FormData {
  id: number;
  ownerId: string;
  shareUrl: string;
  published: boolean;
  createdAt: string;
  submissions: number;
  receiveSubmissionEmails: boolean;
  content: {
    formTitle: string;
    formHeading: string;
  };
}

interface UsageInterface {
  createdForms: number;
  totalSubmissions: number;
  plan: string;
}

export default function Forms() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usage, setUsage] = useState<UsageInterface | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [formsResponse, usageResponse] = await Promise.all([
          axios.get(`/api/forms`),
          user ? axios.get(`/api/getUsage`) : Promise.resolve({ data: null }),
        ]);

        const formsData = formsResponse?.data;
        if (formsData.success) {
          setForms(formsData.forms as FormData[]);
        } else {
          console.error("Error fetching forms:", formsData.error);
        }
        if (user && usageResponse?.data) {
          setUsage(usageResponse.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchData();
  }, [user]);

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
      const data = res?.data;
      if (data.success) {
        setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
        console.log("Form deleted successfully");
      } else {
        console.error("Error:", data.message);
      }
    } catch (error) {
      console.error("Failed to delete form:", error);
    }
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center py-40">
        <Loader className="text-black dark:text-white animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 py-8 max-md:gap-5 max-md:py-5">
      {forms.length === 0 ? (
        <p className="text-center text-zinc-500">No forms available.</p>
      ) : (
        forms.map((form) => (
          <Card key={form.id} className="bg-white dark:bg-zinc-800/30">
            <CardHeader className="relative">
              <CardTitle className="text-2xl">{form.content.formTitle}</CardTitle>
              <CardDescription className="text-base">
                {form.content.formHeading}
                <div className="absolute right-5 top-5 flex gap-2 max-md:relative max-md:right-0 max-md:top-0 max-md:mt-5">
                  <Link href={`/form/edit/${form.id}`}>
                    <div className="border p-2 rounded-lg cursor-pointer">
                      <Pencil size={20} className="hover:text-blue-500 transition-colors duration-200" />
                    </div>
                  </Link>

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border p-2 rounded-lg cursor-pointer">
                        <Trash2 size={20} className="hover:text-red-500 transition-colors duration-200" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-md:w-[300px]">
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

                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="border p-2 rounded-lg cursor-pointer">
                        <Share2 size={20} className="hover:text-blue-500 transition-colors duration-200" />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-md:w-[300px]">
                      <DialogHeader>
                        <DialogTitle>Copy URL</DialogTitle>
                      </DialogHeader>
                      <div className="bg-zinc-900/10 dark:bg-zinc-900 p-3 rounded-lg w-full ">
                        <p className="text-sky-500 text-sm max-md:text-xs max-md:w-[200px]">
                          {`${window.location.origin}/form/submit/${form.shareUrl}`}
                        </p>
                      </div>
                      <DialogFooter>
                        <div className="flex justify-between w-full items-center">
                          <div
                            onClick={() =>
                              copyToClipboard(
                                `${window.location.origin}/form/submit/${form.shareUrl}`
                              )
                            }
                            className="flex border py-2 px-3 justify-center items-center gap-2 rounded-lg cursor-pointer max-md:px-2 "
                          >
                            {isCopied ? (
                              <Check className="text-sky-500" size={20} />
                            ) : (
                              <Clipboard className="text-sky-500" size={20} />
                            )}
                            <span className="text-sm font-medium max-md:text-xs">
                              {!isCopied ? "Copy Link" : "Copied"}
                            </span>
                          </div>
                          <QrCodeGenerator
                            shareUrl={`${window.location.origin}/form/submit/${form.shareUrl}`}
                          />
                        </div>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Link href={`/form/submit/${form.shareUrl}`}>
                    <div className="border p-2 rounded-lg">
                      <Eye size={20} className="hover:text-blue-500 transition-colors duration-200" />
                    </div>
                  </Link>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Separator />
            </CardContent>
            <CardFooter className="flex justify-between max-md:flex-col max-md:justify-center max-md:w-full">
              <p className="max-md:font-bold max-md:mb-3">{form.submissions} Submissions</p>
              <div className="flex gap-2 max-md:flex-col">
                {usage?.plan === "Pro" && (
                  <EmailNotificationToggle
                    formId={form.id}
                    enable={form.receiveSubmissionEmails}
                  />
                )}
                <Link href={`/form/responses/${form.id}`}>
                  <Button variant={"outline"}>View All Submissions</Button>
                </Link>
                <Link href={`/form/analyze/${form.id}`}>
                  <Button variant={"outline"}>Analyze Submissions</Button>
                </Link>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}