import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true 
});

export default cloudinary;


export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== "ok") {
      throw new Error(`Failed to delete image ${publicId} from Cloudinary`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting image ${publicId} from Cloudinary:`, error);
    throw error;
  }
}