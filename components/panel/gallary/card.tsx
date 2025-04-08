"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category, GalleryImage } from "@/types/types";
import { useGalleryImages } from "@/hooks/use-image-gallary";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeleteCategory } from "@/hooks/use-categories";
import { formatDistanceToNow } from "date-fns";

interface GalleryCardProps {
  category: Category;
  onViewAll: () => void;
  onAddImage: () => void;
  isDeletingCategory?: boolean;
  setIsDeletingCategory?: (value: boolean) => void;
}

export default function GalleryCard({
  category,
  onViewAll,
  onAddImage,
}: GalleryCardProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { data: categoryImages } = useGalleryImages(category.id);
  const imagesToShow = categoryImages?.images || category.images;

  const deleteMutation = useDeleteCategory({
    setIsDeleting,
    setDeleteModalOpen,
  });

  const handleDelete = () => {
    setIsDeleting(true);
    deleteMutation.mutate(category.id);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <Card
        className={`hover:shadow-lg transition-all hover:scale-[1.02] h-full cursor-pointer group relative ${isDeleting ? "animate-pulse border-2 border-destructive overflow-hidden" : ""}`}
        style={{ pointerEvents: isDeleting ? "none" : "auto" }}
        aria-disabled={isDeleting}>
        {isDeleting && (
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <div
              className="
        absolute inset-0 border-t-2 border-destructive 
        animate-[walking-border_2s_linear_infinite]
      "
            ></div>
          </div>
        )}

        {isDeleting && (
          <div className="absolute inset-0 z-20 bg-background/50 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-destructive" />
          </div>
        )}
        <Button
          variant="destructive"
          size="sm"
          className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setDeleteModalOpen(true);
          }}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>

        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="capitalize">
                {category.title} ({imagesToShow.length.toLocaleString("en-US")})
              </CardTitle>
              <CardDescription>{category.location}</CardDescription>
            </div>
            <span className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(category.createdAt), {
                addSuffix: true,
                includeSeconds: true,
              })
                .replace("about ", "")
                .replace("less than ", "")
                .replace(" ago", "")}
            </span>
          </div>
        </CardHeader>
        <CardContent className="relative group">
          {imagesToShow.length > 0 ? (
            imagesToShow.slice(0, 1).map((image: GalleryImage) => (
              <React.Fragment key={image.id}>
                <div
                  className="relative aspect-video overflow-hidden rounded-md cursor-pointer group"
                  onClick={onViewAll}
                >
                  {isLoading && (
                    <div className="absolute inset-0 flex justify-center items-center bg-black/30">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  )}
                  <Image
                    src={image.url}
                    alt={image.caption || category.title}
                    fill
                    className="object-cover rounded-md"
                    priority={true}
                    onLoadingComplete={handleImageLoad}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      {image.caption}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {category.description}
                </p>
              </React.Fragment>
            ))
          ) : (
            <div className="aspect-video border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md flex flex-col items-center justify-center gap-2 p-4 group hover:border-primary/50 transition-colors">
              <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              <p className="text-muted-foreground text-sm text-center group-hover:text-primary transition-colors">
                No images yet
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="ghost"
            className="cursor-pointer rounded-full"
            size="sm"
            onClick={onViewAll}
            disabled={imagesToShow.length === 0}
          >
            View All
          </Button>
          <Button
            variant="ghost"
            className="cursor-pointer rounded-full"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onAddImage();
            }}
          >
            <Plus className="mr-2 h-4 w-4" /> Add Photo
          </Button>
        </CardFooter>
      </Card>

      {/* Delete Confirmation Modal */}
      <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the "
              <b>{category.title}</b>" category and all{" "}
              <b>{imagesToShow.length}</b> images associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isDeleting}
              className="rounded-full cursor-pointer"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive hover:bg-destructive/90 rounded-full cursor-pointer"
            >
              {isDeleting ? (
                <>
                  <span className="animate-pulse">Deleting...</span>
                </>
              ) : (
                "Delete Permanently"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
