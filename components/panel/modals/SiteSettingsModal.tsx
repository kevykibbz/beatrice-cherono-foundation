"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GlobeIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import SiteSettingsForm from "../forms/Site settings/SiteSettingsForm";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormValues, siteSettingsSchema } from "@/schemas/SiteSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ContactDetailsForm from "../forms/ContactDetailsForm";

interface SiteSettingsModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SiteSettingsModal({
  isOpen,
  onOpenChange,
}: SiteSettingsModalProps) {
  const [currentTab, setCurrentTab] = React.useState<string>("settings");

  const form = useForm<FormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: {
      siteName: "",
      description: "",
      keywords: "",
      author: "",
      favicon: "",
      siteLogo: "",
      siteImages: [],
      openGraph: undefined,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="w-full max-w-[95vw] md:max-w-[800px] h-[85vh] max-h-[800px] p-0 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <DialogHeader className="border-b p-6">
                  <DialogTitle className="flex items-center gap-2">
                    <GlobeIcon className="h-5 w-5" />
                    Site Settings
                  </DialogTitle>
                </DialogHeader>

                <ScrollArea className="h-[70vh] p-6">
                  {/* Tabs for Site Settings and Contact Form */}
                  <Tabs
                    defaultValue="settings"
                    className="w-full"
                    onValueChange={(value) => setCurrentTab(value)}
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="settings"
                        className="cursor-pointer rounded-lg transition-all"
                      >
                        Site Settings
                      </TabsTrigger>
                      <TabsTrigger
                        value="contact"
                        className="cursor-pointer rounded-lg transition-all"
                      >
                        Contact Form
                      </TabsTrigger>
                    </TabsList>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentTab}
                        initial={{
                          opacity: 0,
                          x: currentTab === "settings" ? -20 : 20,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: currentTab === "settings" ? 20 : -20,
                        }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                      >
                        {currentTab === "settings" ? (
                          <TabsContent value="settings">
                            <FormProvider {...form}>
                              <SiteSettingsForm />
                            </FormProvider>
                          </TabsContent>
                        ) : (
                          <TabsContent value="contact">
                            <FormProvider {...form}>
                              <ContactDetailsForm />
                            </FormProvider>
                          </TabsContent>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </Tabs>
                </ScrollArea>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
