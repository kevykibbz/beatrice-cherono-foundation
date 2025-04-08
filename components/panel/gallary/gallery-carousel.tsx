"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { Category } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import { useDeleteImage } from "@/hooks/use-image-gallary";
import toast from "react-hot-toast";

interface GalleryCarouselProps {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialIndex?: number;
}

export function GalleryCarousel({
  category,
  open,
  onOpenChange,
  initialIndex = 0,
}: GalleryCarouselProps) {
  // Carousel state management
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [api, setApi] = useState<CarouselApi>();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Delete image state management
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState<{
    categoryId: string;
    imageId: string;
  } | null>(null);

  // Initialize delete mutation hook
  const { mutate: deleteImage, isPending: isDeleting } = useDeleteImage();

  // Set up carousel API events
  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrentIndex(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    return () => {
      api.off("select", handleSelect);
    };
  }, [api]);

  // Focus close button when dialog opens
  useEffect(() => {
    if (open && closeButtonRef.current) {
      setTimeout(() => closeButtonRef.current?.focus(), 100);
    }
  }, [open]);

  // Handle delete button click
  const handleDeleteClick = (categoryId: string, imageId: string) => {
    setImageToDelete({ categoryId, imageId });
    setDeleteModalOpen(true);
  };

  // Confirm and execute image deletion
  const confirmDelete = () => {
    if (!imageToDelete) return;

    deleteImage(
      {
        imageId: imageToDelete.imageId,
        categoryId: imageToDelete.categoryId,
      },
      {
        onSuccess: () => {
          toast.success("Image deleted successfully");
          setDeleteModalOpen(false);
        },
        onError: (error: Error) => {
          toast.error(
            error.message.includes("Failed to delete")
              ? error.message
              : "Failed to delete image. Please try again."
          );
        },
      }
    );
  };

  return (
    <>
      {/* Main Image Carousel Dialog */}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-[80vw] max-h-[90vh] p-0 overflow-hidden"
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader className="px-6 pt-6 pb-4 border-b sm:hidden">
            <DialogTitle className="text-xl font-semibold leading-none tracking-tight truncate max-w-[70vw]">
              {category?.title}
            </DialogTitle>
          </DialogHeader>

          {category && (
            <Carousel
              setApi={setApi}
              opts={{
                startIndex: initialIndex,
                loop: true,
              }}
              className="w-full h-full"
            >
              <CarouselContent className="mt-2 h-[70vh]">
                {category.images.map((image) => (
                  <CarouselItem
                    key={image.id}
                    className="flex items-center justify-center"
                  >
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={image.url}
                        alt={image.caption || "Gallery image"}
                        width={800}
                        height={600}
                        className="max-w-full max-h-full object-contain"
                        priority
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                        <p className="text-white text-center">
                          {image.caption}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={isDeleting}
                        className={`absolute top-4 z-10 shadow-2xl left-4 ml-4 cursor-pointer ${
                          isDeleting ? "rounded-full" : "rounded-lg"
                        }`}
                        onClick={() =>
                          handleDeleteClick(image.categoryId, image.id)
                        }
                        aria-label={`Delete image ${image.caption || ""}`}
                      >
                        {isDeleting ? (
                          <span className="flex justify-center items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />{" "}
                            Deleting...
                          </span>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          )}

          <DialogFooter className="bg-background p-4 border-t">
            <div className="flex items-center justify-between w-full">
              <p className="text-sm text-muted-foreground">
                {category?.title} • {currentIndex + 1} of{" "}
                {category?.images.length}
              </p>
              <Button
                ref={closeButtonRef}
                className="cursor-pointer rounded-full"
                disabled={isDeleting}
                onClick={() => onOpenChange(false)}
                aria-label="Close image viewer"
              >
                Close
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteModalOpen}
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setDeleteModalOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              image.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="cursor-pointer rounded-full"
              disabled={isDeleting}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-white cursor-pointer rounded-full flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
