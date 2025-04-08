"use client";

import React, { useState, useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Check, Loader2, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  imageGallarySchema,
  GallaryImagesFormValues,
} from "@/schemas/image-gallary";
import { useAddImagesToCategory } from "@/hooks/use-image-gallary";
import { ImageDropzone } from "../ImageDropzone/ImageDropzone";
import { Category } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

type AddImagesToCategoryModalProps = {
  addImageOpen: boolean;
  setAddImageOpen: (open: boolean) => void;
  categories: Category[];
  selectedCategoryId?: string;
  onCategorySelect?: (categoryId: string) => void;
};

export default function AddImagesToCategoryModal({
  addImageOpen,
  setAddImageOpen,
  categories,
  selectedCategoryId,
  onCategorySelect,
}: AddImagesToCategoryModalProps) {
  const mutation = useAddImagesToCategory();
  const [isImageUploading, setIsImageUploading] = useState<boolean>(false);
  const [isImageDeleting, setIsImageDeleting] = useState<boolean>(false);

  const form = useForm<GallaryImagesFormValues>({
    resolver: zodResolver(imageGallarySchema),
    defaultValues: {
      categoryId: selectedCategoryId || "",
      caption: "",
      url: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Update form values when selectedCategoryId changes
  useEffect(() => {
    if (selectedCategoryId) {
      form.setValue("categoryId", selectedCategoryId);
    }
  }, [selectedCategoryId, form]);

  const handleCategoryChange = (categoryId: string) => {
    form.setValue("categoryId", categoryId);
    if (onCategorySelect) {
      onCategorySelect(categoryId);
    }
  };

  const handleSubmit = (values: GallaryImagesFormValues) => {
    mutation.mutate(
      {
        categoryId: values.categoryId,
        caption: values.caption,
        url: values.url,
      },
      {
        onSuccess: () => {
          form.reset({
            categoryId: selectedCategoryId || "",
            caption: "",
            url: "",
          });
          setAddImageOpen(false);

          toast.success("Image added successfully!");
        },
        onError: (error) => {
          toast.error("Failed to add image. Please try again.");
          console.error("Error adding image:", error);
        },
      }
    );
  };

  return (
    <Dialog open={addImageOpen} onOpenChange={setAddImageOpen}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <DialogTrigger asChild>
          <Button className="cursor-pointer rounded-full">
            <Plus className="mr-2 h-4 w-4" /> Add Image
          </Button>
        </DialogTrigger>
        <DialogContent
          className="w-full max-w-[95vw] md:max-w-[600px] h-[85vh] max-h-[600px] p-0 overflow-auto"
          aria-describedby="add-images-to-category-description"
        >
          <div className="sticky top-0 z-10 bg-background px-6 py-4 border-b">
            {/* Sticky header */}
            <DialogHeader className="text-left space-y-2">
              <DialogTitle className="text-xl font-semibold">
                Add New Image
              </DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                {selectedCategoryId
                  ? `Add to ${
                      categories.find((c) => c.id === selectedCategoryId)?.title
                    }`
                  : "Upload a new image to an existing category"}
              </DialogDescription>
            </DialogHeader>
          </div>
          <ScrollArea className="flex-1 pr-4">
            <div className="space-y-6 px-6 py-4">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className="space-y-4"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(handleSubmit)(); 
                    }
                  }}
                >
                  {!selectedCategoryId && (
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={(value) => {
                              field.onChange(value);
                              handleCategoryChange(value);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full cursor-pointe">
                                {" "}
                                {/* Full width */}
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-[var(--radix-select-trigger-width)] cursor-pointe">
                              {" "}
                              {/* Match trigger width */}
                              {categories.map((category) => (
                                <SelectItem
                                  key={category.id}
                                  value={category.id}
                                  className="relative pl-8 "
                                >
                                  {field.value === category.id && (
                                    <span className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                                      <Check className="h-3 w-3 text-primary-foreground" />
                                    </span>
                                  )}
                                  <span className="ml-6">{category.title}</span>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caption</FormLabel>
                        <FormControl>
                          <Input placeholder="Image caption" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <ImageDropzone
                              value={field.value}
                              onChange={field.onChange}
                              onUploadStatusChange={setIsImageUploading}
                              onDeleteStatusChange={setIsImageDeleting}
                              folder="gallery-images"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button
                      variant="outline"
                      className="cursor-pointer rounded-full"
                      type="button"
                      onClick={() => {
                        form.reset({
                          categoryId: selectedCategoryId || "",
                          caption: "",
                          url: "",
                        });
                        setAddImageOpen(false);
                      }}
                      disabled={mutation.isPending || isImageUploading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="cursor-pointer rounded-full"
                      disabled={
                        mutation.isPending ||
                        !form.formState.isValid ||
                        isImageUploading ||
                        isImageDeleting
                      }
                    >
                      {mutation.isPending || isImageUploading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {isImageUploading
                            ? "Uploading..."
                            : isImageDeleting
                            ? "Deleting..."
                            : "Adding image..."}
                        </span>
                      ) : (
                        "Add Image"
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </div>
          </ScrollArea>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
