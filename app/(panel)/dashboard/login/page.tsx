"use client";

import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Plus, X, ImageIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
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
import { ImageDropzone } from "@/components/panel/ImageDropzone/ImageDropzone";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCarouselImages,
  createCarouselImage,
  deleteCarouselImage,
  updateCarouselImage,
} from "@/services/carousel";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-session";
import Loader from "@/components/panel/Loader/Loader";
import { DeleteButton } from "@/components/panel/modals/delete-button";

// Zod schema for form validation
const imageFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z
    .string()
    .url("Valid URL required")
    .min(1, "Image URL is required"),
});

type CarouselImage = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
};

export default function LoginPageAdmin() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = React.useState<boolean>(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState<boolean>(false);
  const [isImageUploading, setIsImageUploading] = React.useState<boolean>(false);
  const [editingImage, setEditingImage] = React.useState<CarouselImage | null>(null);

  // Fetch carousel images
  const {
    data: images = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["carousel-images"],
    queryFn: getCarouselImages,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: createCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousel-images"] });
      toast.success("Image added successfully");
      setIsCreateDialogOpen(false);
      createForm.reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updateCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousel-images"] });
      toast.success("Image updated successfully");
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteCarouselImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carousel-images"] });
      toast.success("Image deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const createForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      title: "",
      description: "",
      imageUrl: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const editForm = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleCreateSubmit = (values: z.infer<typeof imageFormSchema>) => {
    if (user?.id) {
      createMutation.mutate({ ...values, userId: user.id });
    } else {
      toast.error("User ID is required to create a carousel image");
    }
  };

  const handleEditSubmit = (values: z.infer<typeof imageFormSchema>) => {
    if (editingImage && user?.id) {
      updateMutation.mutate({ 
        ...values, 
        id: editingImage.id,
        userId: user.id 
      });
    }
  };

  const handleEditClick = (image: CarouselImage) => {
    setEditingImage(image);
    editForm.reset({
      title: image.title,
      description: image.description,
      imageUrl: image.imageUrl,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Failed to load carousel images</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upper Split - Hero Section */}
      <div className="relative h-96 w-full overflow-hidden">
        <Image
          src="/images/login-illustration.jpg"
          alt="Login page background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center p-6 text-center text-white">
          <h1 className="text-4xl font-bold md:text-5xl">Login Page Manager</h1>
          <p className="mt-4 max-w-2xl text-xl">
            Customize the images and content that appear on your login page
          </p>
        </div>
      </div>

      {/* Lower Split - Table Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Carousel Images</h2>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-full cursor-pointer">
                <Plus className="mr-2 h-4 w-4" />
                Add New Image
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[95vw] md:max-w-[800px]">
              <ScrollArea className="h-[500px] w-full space-y-6 p-6 space-x-2">
                <div className="space-y-6 px-6 py-4">
                  <DialogHeader>
                    <DialogTitle>Add New Carousel Image</DialogTitle>
                  </DialogHeader>
                  <Form {...createForm}>
                    <form
                      onSubmit={createForm.handleSubmit(handleCreateSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={createForm.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter title"
                                {...field}
                                disabled={createMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter description"
                                rows={3}
                                {...field}
                                disabled={createMutation.isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={createForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <div className="space-y-4">
                                <ImageDropzone
                                  value={field.value}
                                  onChange={field.onChange}
                                  onUploadStatusChange={setIsImageUploading}
                                  folder="login-carousel"
                                />
                                {field.value && (
                                  <div className="mt-2 flex items-center gap-2">
                                    <Button
                                      type="button"
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => field.onChange("")}
                                      className="h-4 w-4 cursor-pointer"
                                      disabled={createMutation.isPending}
                                    >
                                      <X className="h-3 w-3" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex justify-end space-x-4">
                        <Button
                          type="button"
                          className="rounded-full cursor-pointer"
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(false)}
                          disabled={createMutation.isPending}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          disabled={
                            isImageUploading ||
                            createMutation.isPending ||
                            !createForm.formState.isValid
                          }
                          className="rounded-full cursor-pointer"
                        >
                          {createMutation.isPending ? (
                            <span className="flex jutsify-center items-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Saving...
                            </span>
                          ) : (
                            "Save Image"
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="w-full max-w-[95vw] md:max-w-[800px]">
            <ScrollArea className="h-[500px] w-full space-y-6 p-6 space-x-2">
              <div className="space-y-6 px-6 py-4">
                <DialogHeader>
                  <DialogTitle>Edit Carousel Image</DialogTitle>
                </DialogHeader>
                <Form {...editForm}>
                  <form
                    onSubmit={editForm.handleSubmit(handleEditSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={editForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter title"
                              {...field}
                              disabled={updateMutation.isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter description"
                              rows={3}
                              {...field}
                              disabled={updateMutation.isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={editForm.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <ImageDropzone
                                value={field.value}
                                onChange={field.onChange}
                                onUploadStatusChange={setIsImageUploading}
                                folder="login-carousel"
                              />
                              {field.value && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => field.onChange("")}
                                    className="h-4 w-4 cursor-pointer"
                                    disabled={updateMutation.isPending}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>
                              )}
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end space-x-4">
                      <Button
                        type="button"
                        className="rounded-full cursor-pointer"
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        disabled={updateMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={
                          isImageUploading ||
                          updateMutation.isPending ||
                          !editForm.formState.isValid
                        }
                        className="rounded-full cursor-pointer"
                      >
                        {updateMutation.isPending ? (
                          <span className="flex jutsify-center items-center gap-2">
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Updating...
                          </span>
                        ) : (
                          "Update Image"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>

        <div className="rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Preview</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {images.length > 0 ? (
                images.map((image) => (
                  <TableRow key={image.id}>
                    <TableCell>
                      <div className="h-16 w-24 overflow-hidden rounded-md">
                        <Image
                          src={image.imageUrl}
                          alt={image.title}
                          width={96}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{image.title}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {image.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          className="cursor-pointer rounded-full"
                          size="icon"
                          disabled={deleteMutation.isPending}
                          onClick={() => handleEditClick(image)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <DeleteButton
                          id={image.id}
                          onConfirm={handleDelete}
                          deleteMessage="This action cannot be undone."
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center h-full w-full p-6">
                      <div className="flex flex-col items-center justify-center space-y-4 h-full w-full max-w-sm rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-6">
                        <ImageIcon className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                        <div className="text-center space-y-1">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            No images found
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Upload your first image to get started
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setIsCreateDialogOpen(true)}
                          className="rounded-full cursor-pointer"
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Image
                        </Button>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}