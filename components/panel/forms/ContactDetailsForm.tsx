"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CheckIcon, Loader2 } from "lucide-react";
import {
  siteContactDetailsFormSchema,
  SiteContactDetailsFormValues,
} from "@/schemas/SiteContactDetailsForm";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useMemo } from "react";
import { useContactDetails } from "@/hooks/use-contact-details";

export default function ContactDetailsForm() {
  const { contactDetails, isLoading, createMutation, updateMutation } =
    useContactDetails();
  const form = useForm<SiteContactDetailsFormValues>({
    resolver: zodResolver(siteContactDetailsFormSchema),
    defaultValues: {
      contactEmail: "",
      phoneNumber: "",
      address: "",
      city: "",
      country: "",
      postalCode: "",
      mapEmbedUrl: "",
      businessHours: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const resetFormWithContactDetails = useCallback(() => {
    if (contactDetails && !isLoading) {
      form.reset(contactDetails);
    }
  }, [contactDetails, isLoading, form]);

  const dependencies = useMemo(
    () => ({
      contactDetails,
      isLoading,
      form,
    }),
    [contactDetails, isLoading, form]
  );

  useEffect(() => {
    resetFormWithContactDetails();
  }, [resetFormWithContactDetails, dependencies]);

  const onSubmit = (data: SiteContactDetailsFormValues) => {
    if (contactDetails) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  // Determine which mutation is active
  const isMutating = createMutation.isPending || updateMutation.isPending;
  const isCreating = !contactDetails && createMutation.isPending;

  return (
    <div className="relative">
      {/* Loading Overlay for initial data fetch */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-base font-medium text-foreground sm:text-lg">
            Loading contact details...
          </p>
        </div>
      )}

      {/* Loading Overlay for mutations */}
      {isMutating && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 gap-2">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-base font-medium text-foreground sm:text-lg">
            {isCreating
              ? "Creating contact details..."
              : "Updating contact details..."}
          </p>
          <p className="text-sm text-muted-foreground">
            Please don&apos;t close this window
          </p>
        </div>
      )}
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-y-auto">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="contactEmail"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Contact Email*</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="contact@example.com"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Phone Number*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 (555) 123-4567"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Address Field */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Street Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* City Field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="New York"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Country Field */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="United States"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Postal Code Field */}
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="10001"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />

                {/* Business Hours Field */}
                <FormField
                  control={form.control}
                  name="businessHours"
                  render={({ field, fieldState }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Business Hours</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mon-Fri: 9AM-5PM"
                          className={cn("transition-colors", {
                            "border-destructive focus-visible:ring-destructive":
                              fieldState.error,
                          })}
                          {...field}
                        />
                      </FormControl>
                      {fieldState.error && (
                        <FormMessage className="text-destructive text-xs mt-1">
                          {fieldState.error.message}
                        </FormMessage>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              {/* Map Embed URL Field */}
              <FormField
                control={form.control}
                name="mapEmbedUrl"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Google Maps Embed URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://www.google.com/maps/embed?pb=..."
                        className={cn("transition-colors", {
                          "border-destructive focus-visible:ring-destructive":
                            fieldState.error,
                        })}
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-destructive text-xs mt-1">
                        {fieldState.error.message}
                      </FormMessage>
                    )}
                    {field.value && (
                      <div className="mt-4 aspect-video w-full">
                        <iframe
                          src={field.value}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    )}
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
              className="flex justify-center items-center cursor-pointer rounded-full px-2 py-2"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <span className="flex justify-center items-center">
                  <CheckIcon className="w-5 h-5 mr-2" />
                  Save Contact Details
                </span>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
