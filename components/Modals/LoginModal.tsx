"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmailLoginForm } from "@/components/root/Forms/EmailLoginForm";
import GoogleSigningButton from "../root/GoogleSigningButton/GoogleSigningButton";

interface LoginModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onGoogleLogin?: () => void;
}

export function LoginModal({ isOpen, onOpenChange }: LoginModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Log In</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-gray-600">
            Log in to share your testimonial with our community.
          </p>
          
          <EmailLoginForm />
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSigningButton/>
        </div>
      </DialogContent>
    </Dialog>
  );
}