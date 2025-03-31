"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/root/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/root/ui/form";
import { Input } from "@/components/root/ui/input";
import { Textarea } from "@/components/root/ui/textarea";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-session";
import { useEffect } from "react";

const testimonialFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().min(2, {
    message: "Role must be at least 2 characters.",
  }),
  testimonial: z.string().min(10, {
    message: "Testimonial must be at least 10 characters.",
  }),
});

interface TestimonialFormProps {
  onSuccess?: () => void;
}

export function TestimonialForm({ onSuccess }: TestimonialFormProps) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof testimonialFormSchema>>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: {
      name: "",
      role: "",
      testimonial: "",
    },
  });

  useEffect(() => {
    if (user?.name) {
      form.setValue("name", user.name, { shouldValidate: true });
    }
  }, [user?.name, form,form.setValue]);

  async function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
    const submitPromise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch("/api/testimonials/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await response.json();
        if (!response.ok) {
          if (data.error === "DUPLICATE_TESTIMONIAL") {
            throw new Error(data.message);
          }
          throw new Error(data.message || "Failed to submit testimonial");
        }

        resolve("Testimonial submitted successfully!");
      } catch (error) {
        reject(error instanceof Error ? error.message : "Something went wrong");     
      }
    });

    await toast.promise(submitPromise, {
      loading: "Submitting testimonial...",
      success: (message) => message as string, // Ensure message is treated as a string
      error: (err) => err as string, // Use the rejected error message
    });

    // Reset form & call onSuccess if submission is successful
    try {
      await submitPromise;
      form.resetField("role");
      form.resetField("testimonial");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log('Error:',error)
      // No need to handle error separately since toast.promise already does
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="py-3 px-4 h-13"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Role/Position</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Volunteer, Donor, etc."
                    {...field}
                    className="py-3 px-4 h-13"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testimonial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Testimonial</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with us..."
                    className="min-h-[120px] py-3 px-4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 cursor-pointer rounded-full"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Testimonial"
            )}
          </Button>
        </form>
      </Form>
    </>
  );
}
