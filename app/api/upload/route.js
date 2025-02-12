import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // Ensure secure uploads
});

export async function POST(request) {
  try {
    const { image } = await request.json();

    // Validate image data
    if (!image || typeof image !== 'string') {
      return NextResponse.json(
        { error: 'Invalid image data' },
        { status: 400 }
      );
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      resource_type: 'auto', // Automatically detect image type
    });

    // Return the secure URL
    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json(
      { error: 'Image upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
export async function DELETE(request) {
  const {img}=await request.json()
  const public_id_img=img.split('/').pop().split(".")[0]

  const response = await cloudinary.uploader.destroy(public_id_img,{
    invalidate: true,
  });
  if (response.result === 'ok') {
    return NextResponse.json({ message: 'Image deleted successfully' });
  } else {
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}