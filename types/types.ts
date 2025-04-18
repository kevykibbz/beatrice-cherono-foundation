import Mail from "nodemailer/lib/mailer";
import { Session, User } from "next-auth";
import mongoose, { Document, Types } from "mongoose";
import { PermissionDocument } from "@/lib/models/Permission";
import { UseFormReturn } from "react-hook-form";
import { ChangeEvent } from "react";
import { FormValues } from "@/schemas/SiteSettings";
import { PermissionAction, Role } from "@prisma/client";

export type LoaderTypes = {
  width?: number;
  height?: number;
  color?: string;
  fullScreen?: boolean;
};

export type LoaderProps = {
  size?: number;
  color?: string;
  fullScreen?: boolean;
};

export type PageTypes = {
  title?: string;
};

export type PathTypes = {
  name: string;
  path: string;
};

export interface SlideTypes {
  image: string;
  title: string;
  description: string;
  link?: string;
}

export interface ServicesTypes {
  icon: string;
  title: string;
  description: string;
}

export interface TeamMembersTypes {
  id: number;
  name: string;
  designation: string;
  img: string;
}

export type SendEmailTypes = {
  sender: Mail.Address;
  recipients: Mail.Address[];
  subject: string;
  message: string;
};

export type DonatePageTypes = {
  isDonatePage?: boolean;
};

export interface GalleryImage {
  src: string;
  title: string;
  description?: string;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimerProps {
  targetDate: string;
}

export interface CountdownTimerProps {
  targetDate: string; // Format: "YYYY-MM-DD HH:MM:SS"
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
}

export type LoginImagesTypes = {
  image: string | undefined;
  title: string | undefined;
  description: string | undefined;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  provider: "google" | "credentials";
  role: string;
  image?: string;
  permissions?: mongoose.Types.ObjectId[] | PermissionDocument[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type TestimonialsTypes = {
  id: string;
  name: string;
  role: string;
  email?: string;
  image: string;
  testimonial: string;
};

export interface ITestimonial {
  id: string;
  user:
    | Types.ObjectId
    | {
        _id: Types.ObjectId;
        id?: string;
        name: string;
        email: string;
        image?: string;
      };
  role: string;
  testimonial: string;
  approved?: boolean;
  createdAt?: Date;
}

export type SocialMediaPlatform = {
  name: string;
  value: string;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  placeholder: string;
};

export interface Step1BasicInfoProps {
  form: UseFormReturn<FormValues>;
  isUploading: boolean;
  isLogoUploading: boolean;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleLogoUpload: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export interface Step2ImagesProps {
  form: UseFormReturn<FormValues>;
  handleImageUpload: (files: File[]) => Promise<void>;
}

export interface Step3SocialMediaProps {
  form: UseFormReturn<FormValues>;
  platforms: SocialMediaPlatform[];
}

export interface PlatformFormFieldProps {
  platform: {
    value: string;
    label: string;
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    placeholder: string;
  };
  form: UseFormReturn<FormValues>;
  uploadingPlatform: string | null;
  handlePlatformImageUpload: (
    e: ChangeEvent<HTMLInputElement>,
    platform: string
  ) => Promise<void>;
  index?: number;
}

export type SiteSettings = {
  siteName: string;
  description: string;
  keywords?: string;
  author?: string;
  favicon?: string;
  siteLogo?: string;
  siteImages?: string[];
  openGraph?: {
    facebook?: { url?: string };
    twitter?: { url?: string };
    instagram?: { url?: string };
    linkedin?: { url?: string };
    tiktok?: { url?: string };
    youtube?: { url?: string };
  };
};

export interface SocialPlatformData {
  url?: string | null;
  cardImage?: string | null;
  description?: string | null;
  images?: string[];
}

export type AuthCheckResult = {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: {
    id: string;
    email: string;
    role: Role;
    permissions: {
      resource: string;
      action: PermissionAction;
    }[];
  } | null;
};

export type SocialLinks = {
  facebook?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
  twitter?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
  linkedin?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
  instagram?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
  tiktok?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
  youtube?: {
    url?: string;
    description?: string;
    cardImage?: string;
    images?: string[];
  };
};

export type ContactDetails = {
  id: string;
  contactEmail: string;
  phoneNumber: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  postalCode?: string | null;
  mapEmbedUrl?: string | null;
  businessHours?: string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  siteSettingsId?: string | null;
};

// Type for creating/updating contact details (omits auto-generated fields)
export type ContactDetailsInput = Omit<
  ContactDetails,
  "id" | "createdAt" | "updatedAt"
>;

// Type for the full address combination
export type FullAddress = {
  street?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  postalCode?: string | null;
};

// Helper type for API responses
export type ApiContactDetailsResponse = {
  data: ContactDetails | null;
  error?: string;
  status: number;
};

// If you need a type for the contact details form
export type ContactDetailsFormValues = {
  contactEmail: string;
  phoneNumber: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  mapEmbedUrl?: string;
  businessHours?: string;
};

export interface CategoryWithImages {
  id: string;
  title: string;
  description: string | null;
  images: {
    id: string;
    url: string;
    caption: string | null;
    createdAt: Date;
  }[];
}


export type CardImageTypes={
  id: string;
  url: string;
  caption: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type Category = {
  id: string;
  title: string;
  location: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  images: Image[];
};

export type Image = {
  id: string;
  url: string;
  caption?: string;
  categoryId: string;
  createdAt?: string;
};


export interface GalleryCategory {
  id: string;
  title: string;
  location: string;
  description: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
  categoryId: string;
  createdAt: string;
  category: GalleryCategory;
}

export interface GalleryPagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  perPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GalleryResponse {
  images: GalleryImage[];
  pagination: GalleryPagination;
}