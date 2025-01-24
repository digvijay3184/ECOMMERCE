import CommonForm from '@/components/common/form'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import React, { Fragment, useState } from 'react'

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
}

function onSubmit() {

}

const AdminProducts = () => {

  const [openProductsDailog, setOpenProductsDailog] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenProductsDailog(true)}>
          Add New Products
        </Button>
      </div>
      <div className='grid gap-4 md:griod-cols-3 lg:grid-cols-4 '></div>
      <Sheet
        open={openProductsDailog}
        onClose={() => setOpenProductsDailog(false)}
      >
        <SheetContent
          side='right'
          className='overflow-auto'
        >
          <SheetHeader>
            <SheetTitle>
              Add New Products
            </SheetTitle>
          </SheetHeader>
          <div className="py-6">
            <CommonForm
              formData={formData}
              onSubmit={onSubmit}
              setFormData={setFormData}
              formControls={addProductFormElements}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  )
}

export default AdminProducts