"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm, Controller } from "react-hook-form";

interface FormField {
  fieldName: string;
  fieldTitle: string;
  fieldType:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "file"
    | "radio";
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface FormDetails {
  formTitle: string;
  formHeading?: string;
  formFields: FormField[];
}

export default function FormDetail() {
  const { formId } = useParams<{ formId: string }>();
  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);

  const reactForm = useForm<Record<string, string | number | boolean | File>>({
    defaultValues: { formTitle: "", formHeading: "" },
  });

  const fetchForm = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms/details?formId=${formId}`);
      const data = await res?.data;

      if (data.success) {
        setFormDetails(data.form.content as FormDetails);
        reactForm.reset(data.form.content);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Failed to fetch form:", error);
    }
  }, [formId, reactForm]);

  useEffect(() => {
    if (formId) {
      fetchForm();
    }
  }, [formId, fetchForm]);

  if (!formDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-6  shadow-lg rounded-lg">
      <h2 className="text-xl font-bold">{formDetails.formTitle}</h2>
      <p className="text-gray-500">{formDetails.formHeading}</p>
      <form onSubmit={reactForm.handleSubmit((data) => console.log("Form Submitted:", data))} className="space-y-4 mt-4">
  {formDetails.formFields.map((field) => (
    <div key={field.fieldName} className="flex flex-col gap-2">
      <Label htmlFor={field.fieldName}>{field.fieldTitle}</Label>

      {field.fieldType === "text" || field.fieldType === "email" || field.fieldType === "password" || field.fieldType === "number" ? (
        <Input 
          id={field.fieldName} 
          type={field.fieldType} 
          placeholder={field.placeholder} 
          {...reactForm.register(field.fieldName, { required: field.required })}
        />
      ) : field.fieldType === "textarea" ? (
        <Textarea 
          id={field.fieldName} 
          placeholder={field.placeholder} 
          {...reactForm.register(field.fieldName, { required: field.required })} 
        />
      ) : field.fieldType === "select" ? (
        <Controller
          control={reactForm.control}
          name={field.fieldName}
          rules={{ required: field.required }}
          render={({ field: selectField }) => (
            <Select onValueChange={selectField.onChange} value={String(selectField.value)}>
              <SelectTrigger>
                <SelectValue placeholder={field.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      ) : field.fieldType === "radio" ? (
        <Controller
          control={reactForm.control}
          name={field.fieldName}
          rules={{ required: field.required }}
          render={({ field: radioField }) => (
            <div className="flex flex-col gap-2">
              {field.options?.map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    value={option}
                    checked={radioField.value === option}
                    onChange={() => radioField.onChange(option)}
                    className="form-radio"
                    required={field.required} 
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        />
      ) : field.fieldType === "checkbox" ? (
        <Controller
          control={reactForm.control}
          name={field.fieldName}
          rules={{ required: field.required }}
          render={({ field: checkboxField }) => (
            <div className="flex gap-2 items-center">
              <Checkbox
                id={field.fieldName}
                checked={Boolean(checkboxField.value)}
                onCheckedChange={checkboxField.onChange}
              />
              <Label htmlFor={field.fieldName}>{field.options?.[0] ?? "Accept Terms"}</Label>
            </div>
          )}
        />
      ) : field.fieldType === "file" ? (
        <Input 
          id={field.fieldName} 
          type="file" 
          {...reactForm.register(field.fieldName, { required: field.required })}
        />
      ) : null}

      {reactForm.formState.errors[field.fieldName] && (
        <p className="text-red-500 text-sm">This field is required.</p>
      )}
    </div>
  ))}

  <Button type="submit" className="w-full">
    Submit
  </Button>
</form>

    </div>
  );
}
