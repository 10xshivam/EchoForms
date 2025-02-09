"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { LoaderCircle, Plus } from "lucide-react"
import { useState } from "react";
import { Textarea } from "./ui/textarea"
import axios from "axios";

const formSchema = z.object({
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
  })

export function CreateForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("");
  const form = useForm<z.infer<typeof formSchema >>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description:""
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/forms/create",data);
      console.log(response?.data)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        setError(err.response.data.error);
        console.log(err.response.data.error)
      } else {
        setError("Something went wrong.");
      }
    } finally {
      console.log("Resetting isSubmitting state");
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
          <DialogTitle>Create a form</DialogTitle>
          <DialogDescription>
            Enter a prompt to see the magic
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Give a brief description of your form" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p>{error}</p>}
        <DialogFooter>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="group bg-zinc-200 hover:bg-zinc-400 w-full h-9 rounded-lg"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle className="text-white animate-spin h-5 w-5" />
              Submitting...
            </>
          ) : (
            <>
              Submit
            </>
          )}
        </Button>
        </DialogFooter>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  );
}

