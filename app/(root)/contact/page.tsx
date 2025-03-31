"use client";
import Header from "@/components/root/Header/Header";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import React from "react";
import { Input } from "@/components/root/ui/input";
import { Textarea } from "@/components/root/ui/textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { ContactFormInputs, contactFormSchema } from "@/schemas/ContactForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import DualRingLoader from "@/components/root/Loader/DualRingLoader";
import toast  from 'react-hot-toast';





export default function Contact() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
    reset
  } = useForm<ContactFormInputs>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      console.log(result)
      toast.success('Message sent succesfully.');
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.success('Error sending message. Please try again later.');
      setError("root", {
        type: "manual",
        message: "Failed to submit form. Please try again later.",
      });
    } finally {
      reset();
    }
  };

  return (
    <React.Fragment>
      <Header title="Contact us" />
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            variants={fadeInUp}
          >
            <div className="inline-block rounded-full bg-gray-200 text-purple-700 py-2 px-3 mb-3">
              Contact Us
            </div>
            <h1 className="text-3xl font-bold mb-5">
              If You Have Any Query, Please Contact Us
            </h1>
            <p className="mb-4 text-gray-600">
              Feel free to reach out to us with any questions or inquiries.
              Simply fill out the form below, and we will get back to you as
              soon as possible.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Input
                    id="name"
                    placeholder="Your name"
                    {...register("name")}
                    className="!h-15 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                  />{" "}
                  {errors.name && (
                    <small className="flex mt-2 text-red-500 text-sm ">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {errors.name?.message}
                    </small>
                  )}
                </div>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Your email address"
                    className="!h-15 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                  />{" "}
                  {errors.email && (
                    <small className="flex mt-2 text-red-500 text-sm ">
                      <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                      {errors.email?.message}
                    </small>
                  )}
                </div>
              </div>
              <div className="relative">
                <Input
                  id="subject"
                  placeholder="Subject"
                  {...register("subject")}
                  className="!h-15 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                />{" "}
                {errors.subject && (
                  <small className="flex mt-2 text-red-500 text-sm ">
                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                    {errors.subject?.message}
                  </small>
                )}
              </div>
              <div className="relative">
                <Textarea
                  id="message"
                  cols={5}
                  placeholder="Message"
                  {...register("message")}
                  className="!h-32 !border !border-gray-300 focus:!ring-2 focus:!ring-purple-500"
                />{" "}
                {errors.message && (
                  <small className="flex mt-2 text-red-500 text-sm ">
                    <ExclamationCircleIcon className="w-4 h-4 mr-1" />
                    {errors.message?.message}
                  </small>
                )}
              </div>
              <div className="flex sm:justify-start items-center justify-center">
                <button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  className={`bg-purple-500  justify-center  border-purple-500 text-white py-2 px-4 flex items-center gap-2 hover:bg-purple-700 transition cursor-pointer rounded-full sm:mx-auto ${
                    !isValid || isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <DualRingLoader size={30} color="#ffffff" />
                      Sending...
                    </div>
                  ) : (
                    <span className="flex items-center gap-2">
                      Send Message
                      <span className="bg-white text-purple-600 p-2 rounded-full">
                        <ChevronRightIcon className="w-5 h-5" />
                      </span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative w-full h-[450px] rounded-lg overflow-hidden shadow-lg"
          >
            <iframe  
            className="absolute inset-0 w-full h-full" 
            style={{ border: "none" }}
            allowFullScreen
            aria-hidden="false"
            tabIndex={0}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.6614767313736!2d35.26624217377779!3d0.5080376637057457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17810146235f4bf7%3A0x840b6ee35e268730!2sMachayo%20court!5e0!3m2!1sen!2ske!4v1743320501714!5m2!1sen!2ske"  
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"/>
          </motion.div>
        </div>
      </div>
    </React.Fragment>
  );
}
