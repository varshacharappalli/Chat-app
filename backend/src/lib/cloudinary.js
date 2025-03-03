import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

// Load environment variables
config();

// Debug: Print the loaded environment variables
console.log("CLOUDINARY_NAME:", process.env.CLOUDINARY_NAME);
console.log("CLOUDINARY_API_KEY:", process.env.CLOUDINARY_API_KEY);
console.log("CLOUDINARY_SECRET_KEY:", process.env.CLOUDINARY_SECRET_KEY);

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

export default cloudinary;
