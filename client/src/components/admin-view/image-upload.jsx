import React, { useEffect, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Images, ImageUp, X } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';


const ProductImageUpload = ({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
}) => {

    const inputRef = useRef(null);

    function handleImageFileChange(event) {
        console.log(event.target.files);
        const selectedFile = event.target.files?.[0]
        if (selectedFile) setImageFile(selectedFile)
    }

    function handleDaragOver(event) {
        event.preventDefault();
    }
    function handleDrop(event) {
        event.preventDefault();
        const dropped = event.dataTransfer.files?.[0];
        if (dropped) setImageFile(dropped)
    }
    function handleRemoveImage() {
        setImageFile(null);
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    console.log(imageFile);

    async function uploadImageToCloudinary() {
        const data = new FormData();
        data.append('my_file',imageFile)
        const response = await axios.post(
            "http://localhost:5000/api/admin/products/upload-image",
            data
          );
        console.log(response.data);
        if(response){
            setUploadedImageUrl(response.data);
        }
    }

    
  useEffect(() => {
    if (imageFile !== null) uploadImageToCloudinary();
  }, [imageFile]);

    return (
        <div className='w-full max-w-md mx-auto'>
            <Label className='textlg font-semibold mb-2 block'>Upload Image</Label>
            <div onDragOver={handleDaragOver} onDrop={handleDrop} className='border-2 border-dashed rounded-lg p-4 mb-4'>
                <Input id='image-upload' type='file'
                    className='hidden' 
                    accept="image/*"
                    ref={inputRef} onChange={handleImageFileChange} />
                {
                    !imageFile ?
                        <Label htmlFor='image-upload' className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                            <ImageUp size={50} className='w-10 h=10 text-muted-foreground mb-2' />
                            <span>Drag & Drop or Click to Upload</span>
                        </Label> : <div className='flex items-center justify-between'>
                            <div className="flex items-center">
                                <Images className='w-8 text-primary mr-2 h-8' />
                            </div>
                            <p className='text-sm font-medium truncate'>{imageFile.name}</p>
                            <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handleRemoveImage} ><X className='w-4 h-4' />
                                <span className='sr-only'>Remove Image</span></Button>
                        </div>
                }
            </div>
        </div>
    )
}

export default ProductImageUpload