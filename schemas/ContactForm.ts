import {z} from "zod"


export const contactFormSchema=z.object({
    name:z.string().min(1,{message:"Your name is required"}),
    email:z.string().email().min(1,{message:"Your email is required"}),
    subject:z.string().min(1,{message:"Subject is required"}),
    message:z.string().min(1,{message:"Message is required"}),
})
export type ContactFormInputs = z.infer<typeof contactFormSchema>;

