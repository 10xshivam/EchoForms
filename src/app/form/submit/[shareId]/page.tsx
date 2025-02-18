"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { Loader, LoaderCircle } from "lucide-react";

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
  options?: string | string[];
}

interface FormDetails {
  formTitle: string;
  formHeading?: string;
  formFields: FormField[];
}

export default function ShareUrl() {
  const { shareId } = useParams()
  const router = useRouter()
  const [formDetails, setFormDetails] = useState<FormDetails | null>(null);
  const [isSubmitting,setIsSubmitting] = useState(false)


  const reactForm = useForm<Record<string, string | File>>({
    defaultValues: { formTitle: "", formHeading: "" },
  });

  const fetchForm = useCallback(async () => {
    try {
      const res = await axios.get(`/api/forms/get?shareId=${shareId}`);
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
  }, [shareId, reactForm]);

  useEffect(() => {
    if (shareId) {
      fetchForm();
    }
  }, [shareId, fetchForm]);

  const onSubmit = async (formData: Record<string, string | File>) => {
    try {
      setIsSubmitting(true)
      const formPayload = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value instanceof File) {
          formPayload.append(key, value);
        } else {
          formPayload.append(key, value);
        }
      });
      console.log(formPayload);

      const response = await axios.post(
        `/api/forms/submit?shareId=${shareId}`,
        formPayload
      );

      const data = await response.data;
      if (data.success) {
        router.push(`/form/submit/${shareId}/success`);
      } else {
        toast.error("Failed to submit response: " + data.error);
      }
    } catch (err) {
      toast.error("Submission error:" + err);
    } finally {
      setIsSubmitting(false)
    }
  };

  if (!formDetails) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="text-black dark:text-white animate-spin" size={40} />
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen justify-center pt-20">
      <form
        onSubmit={reactForm.handleSubmit(onSubmit)}
        className="space-y-4 mt-4 max-w-lg mx-auto"
      >
        <div className="border-2 p-2 px-4 bg-zinc-800/5 dark:bg-zinc-800/40 rounded-xl mb-2 border-l-8">
          <h2 className="text-3xl tracking-tighter font-bold bg-gradient-to-b from-black/80 to-zinc-700 dark:from-white dark:to-zinc-200 bg-clip-text text-transparent py-1">
            {formDetails.formTitle}
          </h2>
          <p className="text-zinc-500 dark:text-white/40 tracking-tight text-base ">
            {formDetails.formHeading}
          </p>
        </div>
        {formDetails.formFields.map((field) => (
          <div key={field.fieldName} className="relative flex flex-col gap-2">
            <Label htmlFor={field.fieldName} className="text-sm">{field.fieldTitle}</Label>
            {field.fieldType === "text" ||
            field.fieldType === "email" ||
            field.fieldType === "password" ||
            field.fieldType === "number" ? (
              <Input
                id={field.fieldName}
                type={field.fieldType}
                placeholder={field.placeholder}
                {...reactForm.register(field.fieldName, {
                  required: field.required,
                })}
                required={field.required}
                className="h-11 border-2 focus:ring-2 focus:ring-gray-600 rounded-lg"
              />
            ) : field.fieldType === "textarea" ? (
              <Textarea
                id={field.fieldName}
                placeholder={field.placeholder}
                {...reactForm.register(field.fieldName, {
                  required: field.required,
                })}
                required={field.required}
                className="h-11 border-2"
              />
            ) : field.fieldType === "select" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: selectField }) => (
                  
                  <Select
                    onValueChange={selectField.onChange}
                    value={String(selectField.value)}
                    required={field.required}
                    
                  >
                    <SelectTrigger className="border-2 h-11">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.isArray(field.options) &&
                        field.options.map((option: string) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
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
                      required={field.required}
                    />
                    <Label htmlFor={field.fieldName}>
                      {field.options?.[0] ?? "Accept Terms"}
                    </Label>
                  </div>
                )}
              />
            ) : field.fieldType === "radio" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: radioField }) => (
                  <RadioGroup
                    value={String(radioField.value)}
                    onValueChange={radioField.onChange}
                    className="flex flex-col gap-2"
                  >
                    {Array.isArray(field.options) &&
                      field.options.map((option: string) => (
                        <div key={option} className="flex items-center gap-2">
                          <RadioGroupItem
                            value={option}
                            id={`${field.fieldName}-${option}`}
                            required={field.required}
                          />
                          <Label htmlFor={`${field.fieldName}-${option}`} className="text-base">
                            {option}
                          </Label>
                        </div>
                      ))}
                  </RadioGroup>
                )}
              />
            ) : field.fieldType === "file" ? (
              <Controller
                control={reactForm.control}
                name={field.fieldName}
                rules={{ required: field.required }}
                render={({ field: fileField }) => (
                  <Input
                    className="w-full py-1.5 border-2 border-dashed  cursor-pointer file:hidden"
                    id={field.fieldName}
                    type="file"
                    accept="image/*, .pdf, .docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        fileField.onChange(file);
                      }
                    }}
                    required={field.required}
                  />
                )}
              />
            ) : null}
          </div>
        ))}
        <Button type="submit" className="text-base w-full h-10" disabled={isSubmitting}>
          {!isSubmitting ? "Submit -->" : 
          <>
          <LoaderCircle className="animate-spin"/>
          Submitting...
          </>}
        </Button>
      </form>
    </div>
  );
}
