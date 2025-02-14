import ProductFilter from '@/components/shopping-view/filter'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchFilteredProducts } from '@/store/shopping/product-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductTile from './product-tile'

const ShoppingListing = () => {

  const dispatch = useDispatch();
  const { productList } = useSelector(state => state.shoppingProducts)
  const [filters , setFilters] = useState({}) ;
  const [sort , setSort] = useState(null) ;

  function handleSort(value){
    setSort(value) ;
  }

  function handleFilter(getSectionId, getCurrentOption) {
    console.log(getSectionId, getCurrentOption);
  
    let cpyFilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyFilters).indexOf(getSectionId);
  
    if (indexOfCurrentSection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption]
      };
    } else {
      if (cpyFilters[getSectionId].includes(getCurrentOption)) {
        cpyFilters[getSectionId] = cpyFilters[getSectionId].filter(
          (option) => option !== getCurrentOption
        );
      } else {
        cpyFilters[getSectionId] = [...cpyFilters[getSectionId], getCurrentOption];
      }
    }
  
    setFilters(cpyFilters);
    sessionStorage.setItem('filters',JSON.stringify(cpyFilters));
  }

  useEffect(()=>{
    setSort('price-lowtohigh');
    setFilters(JSON.parse(sessionStorage.getItem('filters'))|| {});
  } ,[])
  

  useEffect(() => {

    dispatch(fetchFilteredProducts());

  }, [dispatch])

  console.log(productList);

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6'>
      <ProductFilter filters={filters} handleFilter={handleFilter} />
      <div className='bg-background w-full rounded-lg shadow-sm'>
        <div className="p-4 border-b flex items-center justify-between ">
          <h2 className='text-lg font-extrabold'>All Products</h2>
          <div className="flex items-center gap-3">
            <span className='text-muted-foreground'> {productList.length} Products</span>
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
                <DropdownMenuRadioGroup value={sort} onValueChange= {handleSort}>
                  {
                    sortOptions.map(sortItem => <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>
                      {sortItem.label}
                    </DropdownMenuRadioItem>)
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='gird grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          {
            productList && productList.length > 0 ?
              productList.map(productItem => <ShoppingProductTile key={productItem._id} product={productItem} />)
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing