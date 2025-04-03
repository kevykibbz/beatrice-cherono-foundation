"use client";

import ContactDetailsForm from "@/components/panel/forms/ContactDetailsForm";
import SiteSettingsForm from "@/components/panel/forms/Site settings/SiteSettingsForm";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormValues, siteSettingsSchema } from "@/schemas/SiteSettings";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function SiteSettings() {
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
      openGraph: undefined ,
    },
    mode:"onChange",
    reValidateMode:"onChange"
  });

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-gray-100">
          {/* Left Panel - Minimal Info Card */}
          <div className="lg:w-2/5 relative">
            {/* Background Image with Gradient Overlay */}
            <div className="absolute inset-0">
              <Image
                src="/images/site-settings/settings-illustration.jpg"
                alt="Settings Illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-indigo-800/70" />
            </div>

            {/* Content */}
            <div
              className="relative p-6 h-full flex flex-col text-white"
              style={{ minHeight: "400px" }}
            >
              <div className="mb-5">
                <h2 className="text-2xl font-bold mb-3">Site Configuration</h2>
                <p className="text-purple-100">
                  Update your site&apos;s core settings and metadata for better
                  visibility.
                </p>
              </div>

              {/* Purple Gradient Checklist */}
              <div className="space-y-2 mt-auto">
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/30 p-3 rounded-full backdrop-blur-sm flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-50">SEO optimization</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/30 p-3 rounded-full backdrop-blur-sm flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-50">Social media previews</span>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 to-purple-500/30 p-3 rounded-full backdrop-blur-sm flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-purple-300 flex-shrink-0 mt-0.5" />
                  <span className="text-purple-50">Brand customization</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Form Card */}
          <div className="lg:w-3/5 p-6">
            <div className="mb-6">
              <h1 className="text-xl font-semibold text-gray-800">
                Site Configuration
              </h1>
              <p className="text-gray-500 text-sm">
                Manage your site settings and contact information
              </p>
            </div>

            <Card>
              <CardContent className="space-y-6">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
