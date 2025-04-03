import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Step1BasicInfoProps } from "@/types/types";
import { motion } from "framer-motion";
import { ImageIcon, Loader2, TextIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Step1BasicInfo({
  form,
  isUploading,
  isLogoUploading,
  handleFileUpload,
  handleLogoUpload,
}: Step1BasicInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TextIcon className="h-5 w-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="siteName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site Name</FormLabel>
                <FormControl>
                  <Input placeholder="My Awesome Site" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Site Author" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A brief description of your site"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Keywords (comma separated)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="keyword1, keyword2, keyword3"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Site Logo Field */}
          <FormField
            control={form.control}
            name="siteLogo"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Site Logo</FormLabel>
                <FormControl>
                  <div className="flex gap-2 w-full">
                    <div className="flex-1">
                      <Input
                        placeholder="https://res.cloudinary.com/your-cloud/image/upload/logo.png"
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </div>
                    <div className="flex-shrink-0">
                      <input
                        type="file"
                        id="logo-upload"
                        accept="image/png,image/jpeg,image/svg+xml"
                        className="hidden"
                        onChange={handleLogoUpload}
                        disabled={isLogoUploading}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full cursor-pointer"
                        disabled={isLogoUploading}
                        onClick={() =>
                          document.getElementById("logo-upload")?.click()
                        }
                      >
                        {isLogoUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ImageIcon className="h-4 w-4" />
                        )}
                        <span className="ml-2">Upload</span>
                      </Button>
                    </div>
                  </div>
                </FormControl>
                {field.value &&
                  !isLogoUploading &&
                  field.value !== "Uploading..." && (
                    <div className="mt-2">
                      <Image
                        src={field.value}
                        alt="Site logo preview"
                        width={200}
                        height={100}
                        className="max-h-40 object-contain border rounded"
                        priority={false}
                      />
                    </div>
                  )}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Favicon URL</FormLabel>
                <FormControl>
                  <div className="flex gap-2 w-full">
                    {/* Input - 80% width */}
                    <div className="flex-1" >
                      <Input
                        placeholder="https://example.com/favicon.ico"
                        value={
                          typeof field.value === "string" ? field.value : ""
                        }
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        className="w-full" // Ensure input fills its container
                      />
                    </div>

                    {/* Upload Button - 20% width */}
                    <div className="flex-shrink-0" >
                      <input
                        type="file"
                        id="favicon-upload"
                        accept="image/x-icon,image/png,image/svg+xml"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      <Button
                        type="button"
                        className="w-full cursor-pointer"
                        variant="outline"
                        disabled={isUploading}
                        onClick={() =>
                          document.getElementById("favicon-upload")?.click()
                        }
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <ImageIcon className="h-4 w-4" />
                        )}
                        <span className="ml-2">Upload</span>
                      </Button>
                    </div>
                  </div>
                </FormControl>
                {field.value && !isUploading && (
                  <div className="mt-2 flex items-center gap-2">
                    <Image
                      src={typeof field.value === "string" ? field.value : ""}
                      alt="Favicon preview"
                      width={24}
                      height={24}
                      className="h-24 w-24 object-contain"
                    />
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}
