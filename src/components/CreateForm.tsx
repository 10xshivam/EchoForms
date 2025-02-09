"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle, Plus } from "lucide-react";
import { useState } from "react";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const formSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export function CreateForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/forms/create", data);
      const formId = response?.data?.formId;
      if (formId) {
        router.push(`/edit-form/${formId}`);
        toast.success("Form created successfully");
      } else {
        throw new Error("Form ID not found.");
      }
    } catch (err) {
      const errorMessage = axios.isAxiosError(err) && err.response?.data?.error
        ? err.response.data.error
        : "Something went wrong.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex gap-2 items-center bg-zinc-500/40 hover:bg-zinc-500/20 cursor-pointer p-2 rounded-lg my-3">
          <Plus size={25} strokeWidth={2} />
          <span>Create a form</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate Your Custom Form</DialogTitle>
          <DialogDescription>
            Describe the type of form you need, and we will create it for you
            instantly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Form Details</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give a brief description of your form"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="group bg-zinc-500/40 hover:bg-zinc-500/20 text-white w-full h-9 rounded-lg"
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="text-white animate-spin h-5 w-5" />
                    Generating...
                  </>
                ) : (
                  <>Create Form</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
