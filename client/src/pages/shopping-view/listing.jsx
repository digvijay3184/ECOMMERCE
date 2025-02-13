import ProductFilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { ArrowUpDown } from 'lucide-react'
import React from 'react'

const ShoppingListing = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter/>
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center justify-between ">
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground'> Showing 1-10 of 100 results</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
              variant='outline'
              size='sm'
              className='flex items-center gap-1'
              >
              <ArrowUpDown size={40} />
              <span>Sort By</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[200px]'>
              <DropdownMenuRadioGroup>
                {
                  sortOptions.map(sortItem=> <DropdownMenuRadioItem key={sortItem.id}>
                    {sortItem.label}
                  </DropdownMenuRadioItem>)
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing