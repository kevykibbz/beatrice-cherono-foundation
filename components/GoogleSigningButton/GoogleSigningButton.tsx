import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { useAuth } from "@/hooks/use-session";

export default function GoogleSigningButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true);
    const currentUrl = window.location.pathname;
    try {
      await signIn("google", { 
        callbackUrl:currentUrl,
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleSignIn}
      disabled={isLoading || isAuthenticated}
      className="w-full flex items-center justify-center gap-2 py-3 px-8 h-auto min-h-[1.5rem] cursor-pointer rounded-full"
    >
      {isLoading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Redirecting...
        </>
      ) : (
        <>
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </>
      )}
    </Button>
  );
}