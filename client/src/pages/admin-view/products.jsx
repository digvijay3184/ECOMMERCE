import ProductImageUpload from '@/components/admin-view/image-upload';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import React, { Fragment, useState } from 'react';
import { X } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

function onSubmit() {
  // Your form submission logic
}

const AdminProducts = () => {
  const [openProductsDailog, setOpenProductsDailog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState , setImageLoadingState] = useState(false);

  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductsDailog(true)}>
          Add New Products
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openProductsDailog}
        onOpenChange={setOpenProductsDailog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="flex justify-between items-center">
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            {/* Provide a brief description of the dialog */}
            Fill out the form below to add a new product to your store.
          </SheetDescription>
          <div className="py-6">
            <ProductImageUpload
              imageFile={image}
              setImageFile={setImage}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
            />
            <CommonForm
              formData={formData}
              onSubmit={onSubmit}
              setFormData={setFormData}
              buttonText="Add"
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;