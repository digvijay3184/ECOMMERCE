import React, { useEffect, useRef } from 'react';

// UI components
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

// Icons
import { Images, ImageUp, X } from 'lucide-react';

// Axios for HTTP requests
import axios from 'axios';

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  imageLoadingState,
  isEditMode,
}) => {
  const inputRef = useRef(null);

  // Handle file selection from the input
  const handleImageFileChange = (event) => {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setImageFile(selectedFile);
    }
  };

  // Handle drag over event
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Handle drop event
  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer?.files?.[0];

    if (droppedFile) {
      setImageFile(droppedFile);
    }
  };

  // Remove the selected image
  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  console.log(imageFile);

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async () => {
    setImageLoadingState(true);

    const formData = new FormData();
    formData.append('my_file', imageFile);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/products/upload-image',
        formData
      );
      console.log(response.data);

      if (response.data?.success) {
        setUploadedImageUrl(response.data.result.url);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      // Optionally, handle the error state here
    } finally {
      setImageLoadingState(false);
    }
  };

  // Upload the image when imageFile changes
  useEffect(() => {
    if (imageFile !== null) {
      uploadImageToCloudinary();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageFile]);

  return (
    <div className='w-full max-w-md mx-auto'>
      <Label className='text-lg font-semibold mb-2 block'>Upload Image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-4 mb-4`}
      >
        {}
        <Input
          id='image-upload'
          type='file'
          className='hidden'
          accept='image/*'
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor='image-upload'
            className='flex flex-col items-center justify-center h-32 cursor-pointer'
          >
            <ImageUp size={50} className='w-10 h-10 text-muted-foreground mb-2' />
            <span>Drag &amp; Drop or Click to Upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className='w-10 h-10 bg-gray-600' />
        ) : (
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <Images className='w-8 h-8 text-primary mr-2' />
              <p className='text-sm font-medium truncate'>{imageFile.name}</p>
            </div>
            <Button
              variant='ghost'
              size='icon'
              className='text-muted-foreground hover:text-foreground'
              onClick={handleRemoveImage}
            >
              <X className='w-4 h-4' />
              <span className='sr-only'>Remove Image</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;