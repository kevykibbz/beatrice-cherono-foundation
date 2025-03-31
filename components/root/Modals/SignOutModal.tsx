"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/root/ui/dialog";
import { Button } from "@/components/root/ui/button";
import { signOut } from "next-auth/react";

interface SignOutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutModal({ open, onOpenChange }: SignOutModalProps) {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you sure you want to sign out?</DialogTitle>
          <DialogDescription>
            You&apos;ll need to sign in again to access your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}