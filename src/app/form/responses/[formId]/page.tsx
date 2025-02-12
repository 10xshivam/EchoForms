"use client"
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
        const data = res.data
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
      alert("No responses available to export.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(
      responses.map((resp) => resp.content)
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Responses");
    XLSX.writeFile(workbook, `${form?.content.formTitle.replace(/\s+/g, "_")}_Responses.xlsx`);
  };

  if (!form) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{form.content.formTitle}</h1>
      <p className="text-gray-500 mb-6">{form.content.formHeading}</p>

      <div className="mb-4">
        <Button onClick={exportToExcel}>Export to Excel</Button>
      </div>

     
      {responses.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Response ID</TableHead>
              <TableHead>Submitted At</TableHead>
              {responses[0] &&
                Object.keys(responses[0].content).map((key) => (
                  <TableHead key={key}>{key.toLocaleUpperCase()}</TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses.map((response) => (
              <TableRow key={response.id}>
                <TableCell>{response.id}</TableCell>
                <TableCell>{new Date(response.createdAt).toLocaleString()}</TableCell>
                {Object.values(response.content).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No responses available for this form.</p>
      )}
    </div>
  );
}