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
import { useCreateCategory } from "@/hooks/use-categories";
import { CategoryFormValues, categorySchema } from "@/schemas/image-category";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { motion } from "framer-motion";
import { FolderPlus, Loader2 } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddImageCategoryModalProps = {
  newCategoryOpen: boolean;
  setNewCategoryOpen: (newCategoryOpen: boolean) => void;
};

export default function AddImageCategoryModal({
  newCategoryOpen,
  setNewCategoryOpen,
}: AddImageCategoryModalProps) {
  const createCategoryMuatation = useCreateCategory();

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onSubmit = async (values: CategoryFormValues) => {
    try {
      await createCategoryMuatation.mutateAsync(values);
      form.reset();
      toast.success("New category created!");
    } catch (error) {
      let errorMessage = "An unknown error occurred";

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      console.error("Error creating category:", error);
      toast.error(errorMessage);
    } finally {
      setNewCategoryOpen(false);
    }
  };
  return (
    <Dialog open={newCategoryOpen} onOpenChange={setNewCategoryOpen}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
      >
        <DialogTrigger asChild>
          <Button variant="outline" className="cursor-pointer rounded-full">
            <FolderPlus className="mr-2 h-4 w-4" /> New Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="add-image-description">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Create a new category for organizing your gallery images.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form 
              onSubmit={form.handleSubmit(onSubmit)} 
              className="space-y-4"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  form.handleSubmit(onSubmit)(); 
                }
              }}
              >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Category title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input placeholder="Where was this taken?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe this category"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="flex  justify-center gap-4">
                <Button
                  variant="outline"
                  className="cursor-pointer rounded-full"
                  onClick={() => setNewCategoryOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={
                    createCategoryMuatation.isPending || !form.formState.isValid
                  }
                  className="cursor-pointer rounded-full"
                >
                  {createCategoryMuatation.isPending ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin " />
                      Creating...
                    </span>
                  ) : (
                    "Create Category"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </motion.div>
    </Dialog>
  );
}
