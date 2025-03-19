import Mail from "nodemailer/lib/mailer";

export type LoaderTypes = {
  width?: number;
  height?: number;
  color?:string;
  fullScreen?: boolean
};


export type LoaderProps = {
  size?: number;
  color?: string;
  fullScreen?: boolean;
};

export type PageTypes={
  title?:string
}


export type PathTypes={
  name:string
  path:string
}

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
  img:string;
}


export type TestimonialsTypes={
  id?:number
  name:string
  role:string
  img:string
  testimonial:string;
}


export type SendEmailTypes={
  sender:Mail.Address;
  recipients:Mail.Address[];
  subject:string;
  message:string
}


export type DonatePageTypes={
  isDonatePage?:boolean;
}
