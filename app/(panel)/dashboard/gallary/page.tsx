"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Settings,
  ImageIcon,
  Folder,
  Loader2,
  XCircle,
  RefreshCw,
  FolderPlus,
} from "lucide-react";
import { useCategories } from "@/hooks/use-categories";
import AddImageCategoryModal from "@/components/panel/modals/add-image-category";
import AddImagesToCategoryModal from "@/components/panel/modals/add-images-to-category";
import { Category } from "@/types/types";
import GalleryCard from "@/components/panel/gallary/card";
import { GalleryCarousel } from "@/components/panel/gallary/gallery-carousel";

export default function GalleryPage() {
  const {
    data: categoriesData,
    isPending,
    refetch,
    isFetching,
    isError,
  } = useCategories();
  const categories = categoriesData?.data || [];
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [isCarouselOpen, setIsCarouselOpen] = useState<boolean>(false);
  const [newCategoryOpen, setNewCategoryOpen] = useState<boolean>(false);
  const [addImageOpen, setAddImageOpen] = useState<boolean>(false);
  const [currentAddCategory, setCurrentAddCategory] = useState<string | null>(
    null
  );
  


  const openImageGallery = (category: Category, index: number = 0) => {
    setSelectedCategory(category);
    setSelectedImageIndex(index);
    setIsCarouselOpen(true);
  };


  if (isError) {
    return (
      <div className="relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-sm z-50 gap-2">
          <XCircle className="h-10 w-10 text-red-500" />
          <p className="text-base font-medium text-red-700 sm:text-lg">
            Failed to load images. Please try again.
          </p>
          <Button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90 disabled:opacity-60"
          >
            {isFetching ? (
              <div className="flex justify-center items-center gap-2">
                <RefreshCw className="animate-spin h-4 w-4" />
                Retrying...
              </div>
            ) : (
              <div className="flex justify-center items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                Retry
              </div>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Left Column - Gallery Content (2/3 width) */}
      <div className="w-full lg:w-2/3 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Our Gallery</h1>
          <div className="flex justify-center items-center gap-2">
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <AddImagesToCategoryModal
                addImageOpen={addImageOpen}
                setAddImageOpen={setAddImageOpen}
                categories={categories}
                selectedCategoryId={currentAddCategory ?? undefined}
              />
            )}

            <AddImageCategoryModal
              newCategoryOpen={newCategoryOpen}
              setNewCategoryOpen={setNewCategoryOpen}
            />
          </div>
        </div>
        {isPending ? (
          <div className="relative w-full h-[60vh] flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-base font-medium text-foreground sm:text-lg">
                  Loading images...
                </p>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Gallery Grid - 2 cards per row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {categories && categories.length > 0 ? (
                categories.map((category) => {

                  return (
                    <GalleryCard
                      key={category.id}
                      // @ts-expect-error: images property is present but not in the inferred type
                      category={category}
                      // @ts-expect-error: images property is present but not in the inferred type
                      onViewAll={() => openImageGallery(category)}
                      onAddImage={() => {
                        setCurrentAddCategory(category.id);
                        setAddImageOpen(true);
                      }}
                    />
                  );
                })
              ) : (
                <div
                  className="col-span-2 flex flex-col items-center justify-center p-12 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setNewCategoryOpen(true)}
                >
                  <FolderPlus className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-center text-muted-foreground">
                    No categories found
                  </h3>
                  <p className="text-sm text-center text-muted-foreground mt-2">
                    Click here to create your first category
                  </p>
                </div>
              )}
            </div>

            {/* Image Carousel Modal */}
            <GalleryCarousel
              category={selectedCategory}
              open={isCarouselOpen}
              onOpenChange={setIsCarouselOpen}
              initialIndex={selectedImageIndex}
            />
          </>
        )}
      </div>

      {/* Right Column - Management Panel (1/3 width) */}
      <div className="w-full lg:w-1/3 bg-gradient-to-b from-indigo-900 to-indigo-950 text-white p-8 sticky top-0 h-screen hidden lg:block rounded-bl-lg rounded-br-lg">
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-indigo-900/50 to-purple-900/40">
          <div className="absolute inset-0 bg-[url('/images/gallary-illustration.jpg')] bg-cover bg-center mix-blend-multiply" />
        </div>
        <div className="flex flex-col h-full justify-center">
          <h2 className="text-4xl font-bold tracking-tight mb-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Gallery Management
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Organize and showcase your impactful moments with our intuitive
            gallery system.
          </p>

          <div className="space-y-6">
            {/* Card 1 */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/80 to-indigo-800/80 backdrop-blur-sm border border-indigo-400/30 relative overflow-hidden">
              {/* Background Icon */}
              <Folder className="absolute -bottom-3 -right-3 h-20 w-20 text-indigo-700/30 rotate-45 transform-gpu" />

              <h3 className="text-xl font-semibold mb-2 relative z-10">
                Effortless Organization
              </h3>
              <p className="text-sm opacity-90 relative z-10">
                Categorize images by projects, locations, or events for easy
                navigation.
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/80 to-indigo-800/80 backdrop-blur-sm border border-indigo-400/30 relative overflow-hidden">
              {/* Background Icon */}
              <ImageIcon className="absolute -bottom-2 -right-2 h-24 w-24 text-indigo-700/25 rotate-45 transform-gpu" />

              <h3 className="text-xl font-semibold mb-2 relative z-10">
                Visual Storytelling
              </h3>
              <p className="text-sm opacity-90 relative z-10">
                Showcase your work through powerful imagery that speaks volumes.
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/80 to-indigo-800/80 backdrop-blur-sm border border-indigo-400/30 relative overflow-hidden">
              {/* Background Icon */}
              <Settings className="absolute -bottom-3 -right-3 h-20 w-20 text-indigo-700/30 rotate-45 transform-gpu" />

              <h3 className="text-xl font-semibold mb-2 relative z-10">
                Simple Management
              </h3>
              <p className="text-sm opacity-90 relative z-10">
                Add, edit, and organize images with our user-friendly interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
