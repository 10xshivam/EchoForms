"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Loader } from "lucide-react";
import User from "@/components/User";
import toast from "react-hot-toast";

interface Form {
  id: number;
  content: {
    formTitle: string;
    formHeading: string;
  };
}

interface Submission {
  id: number;
  createdAt: Date;
  content: Record<string, string>;
}

export default function FormResponses() {
  const { formId } = useParams();

  const [form, setForm] = useState<Form | null>(null);
  const [responses, setResponses] = useState<Submission[]>([]);

  useEffect(() => {
    if (!formId) return;

    const fetchFormAndResponses = async () => {
      try {
        const formRes = await axios.get(`/api/forms/details?formId=${formId}`);
        if (formRes.data.success) {
          setForm(formRes.data.form);
        }

        const res = await axios.get(`/api/forms/submissions?formId=${formId}`);
        const data = res.data;
        if (data.success) {
          const cleanedResponses = data.data.map((response: Submission) => ({
            ...response,
            content: Object.fromEntries(
              Object.entries(response.content).filter(
                ([key]) => key !== "formTitle" && key !== "formHeading"
              )
            ),
          }));

          setResponses(cleanedResponses || []);
        }
      } catch (error) {
        console.error("Failed to fetch form or responses:", error);
      }
    };

    fetchFormAndResponses();
  }, [formId]);

  const exportToExcel = () => {
    if (!responses || responses.length === 0) {
      toast("No responses available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      responses.map((resp) => resp.content)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
    XLSX.writeFile(
      workbook,
      `${form?.content.formTitle.replace(/\s+/g, "_")}_Responses.xlsx`
    );
  };

  if (!form) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="text-black dark:text-white animate-spin" size={40} />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex-col relative pt-24 px-20 justify-center items-center max-md:px-6 max-md:pt-16 max-md:pb-10">
      <div className="w-full px-5 absolute top-4 left-0 flex justify-between items-center">
        <Link
          href={"/dashboard"}
          className=" py-2 px-3 rounded-lg flex justify-center items-center max-md:p-0"
        >
          <ChevronLeft
            className="inline text-zinc-500 mr-3 max-md:mr-1"
            size={20}
            strokeWidth={2}
          />
          Back
        </Link>
        <div className="flex gap-x-3">
          <User />
        </div>
      </div>
      <div>
        <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-b from-black to-black/50 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent py-1 max-md:text-3xl">
          {form.content.formTitle}
        </h1>
        <p className="text-zinc-500 font-medium mb-4 mt-1 tracking-tight text-lg max-md:text-base">
          {form.content.formHeading}
        </p>
        <div className="mb-4">
          <Button onClick={exportToExcel}>Export to Excel</Button>
        </div>
        <div className="bg-zinc-500/10 dark:bg-zinc-800/30 rounded-lg p-6 max-md:p-4">
          {responses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border bg-zinc-900/10 dark:bg-zinc-700/20">
                    id
                  </TableHead>
                  <TableHead className="border bg-zinc-900/10 dark:bg-zinc-700/20">
                    submittedAt
                  </TableHead>
                  {responses[0] &&
                    Object.keys(responses[0].content).map((key) => (
                      <TableHead
                        key={key}
                        className="border bg-zinc-900/10 dark:bg-zinc-700/20"
                      >
                        {key}
                      </TableHead>
                    ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell className="border">{response.id}</TableCell>
                    <TableCell className="border">
                      {new Date(response.createdAt).toLocaleString()}
                    </TableCell>
                    {Object.values(response.content).map((value, index) => (
                      <TableCell key={index} className="border">
                        {value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p >No responses available for this form.</p>
          )}
        </div>
      </div>
    </div>
  );
}
