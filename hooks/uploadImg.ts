"use client"
import { useState } from "react";
import { toast } from "react-hot-toast";

export function useImageUpload() {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string>("");
    const [isUploading, setIsUploading] = useState<boolean>(false);

    // Function to set image file
    const handleImageChange = (file: File | null) => {
        setImageFile(file);
    };

    // **New function to reset image selection**
    const resetImage = () => { 
        setImageFile(null);
        setImageUrl("");
    };

    // Upload Image Function
    const uploadImage = async (): Promise<string | null> => {
        if (!imageFile) {
            toast.error("No image selected");
            return null;
        }

        setIsUploading(true);

        try {
            // Convert image to Base64
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);

            const base64Image = await new Promise<string>((resolve, reject) => {
                reader.onloadend = () => {
                    const result = reader.result as string;
                    if (result && result.startsWith("data:image")) {
                        resolve(result);
                    } else {
                        reject(new Error("Invalid image format"));
                    }
                };
                reader.onerror = () => {
                    reject(new Error("Failed to read image file"));
                };
            });

            // Upload to API (e.g., Cloudinary)
            const response = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ image: base64Image }),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Upload failed");
            }

            const data = await response.json();
            setImageUrl(data.url); // Update state for UI
            
            // **Reset imageFile after successful upload**
            resetImage();

            return data.url; // Return the new URL
        } catch (error) {
            console.error("Image upload error:", error);
            toast.error("Image upload failed. Please try again.");
            resetImage();  // **Reset in case of error**
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    return {
        imageFile,
        imageUrl,
        isUploading,
        handleImageChange,
        uploadImage,
        resetImage,  // **Expose reset function**
    };
}
