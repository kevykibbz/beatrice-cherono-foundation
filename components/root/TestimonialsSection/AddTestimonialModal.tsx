"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/root/ui/dialog";
import { TestimonialForm } from "../Forms/TestimonialForm";

interface AddTestimonialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTestimonialModal = ({ isOpen, onClose }: AddTestimonialModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            Your feedback helps us improve our services and reach more people.
          </DialogDescription>
        </DialogHeader>
        <TestimonialForm onSuccess={onClose} />
      </DialogContent>
    </Dialog>
  );
};