import Mail from "nodemailer/lib/mailer";
import { Session, User } from "next-auth";
import { Document, Types } from "mongoose";

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
  createdAt?: Date;
  updatedAt?: Date;
}

export type TestimonialsTypes = {
  id: string;
  name: string;
  role: string;
  image: string;
  testimonial: string;
};

export interface ITestimonial {
  _id: Types.ObjectId;
  user: Types.ObjectId | IUser;
  role: string;
  testimonial: string;
  approved?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
