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
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewProduct, fetchAllProducts } from '@/store/admin-slice/product-slice';
import { useToast } from '@/hooks/use-toast';
import AdminProductTile from '@/components/admin-view/productTile';

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



const AdminProducts = () => {
  const [openProductsDailog, setOpenProductsDailog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const { productList } = useSelector(state => state.adminProducts);
  const [currentEditiedId, setCurrentEditiedId] = useState(null);
  const { toast } = useToast();
  const dispatch = useDispatch();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(addNewProduct({
      ...formData,
      image: uploadedImageUrl,
    })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
        setOpenProductsDailog(false);
        setImage(null);
        setFormData(initialFormData);
        toast({
          title: 'Product Added Successfully',
        })
      }
    })
  }

  useEffect(() => {
    dispatch(fetchAllProducts())
  }, [dispatch])

  console.log(productList, "Product list")

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end ml-auto">
        <Button onClick={() => setOpenProductsDailog(true)}>
          Add New Products
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {
          productList && productList.length > 0 ?
            productList.map(productItem => <AdminProductTile
              product={productItem}
              key={productItem._id}
              setCurrentEditiedId={setCurrentEditiedId}
              setOpenProductsDailog={setOpenProductsDailog}
              setFormData={setFormData}
            />) : null
        }
      </div>

      <Sheet
        open={openProductsDailog}
        onOpenChange={setOpenProductsDailog}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="flex justify-between items-center">
            <SheetTitle>Add New Products</SheetTitle>
          </SheetHeader>
          <SheetDescription>
            Fill out the form below to add a new product to your store.
          </SheetDescription>
          <div className="py-6">
            <ProductImageUpload
              imageFile={image}
              setImageFile={setImage}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode = {currentEditiedId!==null}
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