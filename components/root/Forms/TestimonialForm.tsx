"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-session";
import { useEffect } from "react";
import { useAddTestimonial } from "@/hooks/use-testimonials";

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
  const { mutateAsync: addTestimonial } = useAddTestimonial();
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
  }, [user?.name, form, form.setValue]);

  async function onSubmit(values: z.infer<typeof testimonialFormSchema>) {
    try {
      await toast.promise(addTestimonial(values), {
        loading: "Submitting testimonial...",
        success: "Testimonial submitted successfully!",
        error: (err) => err.message || "Failed to submit testimonial",
      });

      form.resetField("role");
      form.resetField("testimonial");

      if (onSuccess) onSuccess();
    } catch (error) {
      console.log('Error occurred:',error)
    }
  }

  return (
    <>
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }
          }}
          >
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
