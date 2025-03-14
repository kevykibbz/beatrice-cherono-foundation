export type LoaderTypes = {
  width?: number;
  height?: number;
  fullScreen?: boolean
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
  link: string;
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
  name:string
  profession:string
  image:string
  text:string
}