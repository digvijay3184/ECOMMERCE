import { House } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../ui/sheet'
import { Button } from '../ui/button'
import { Squash as Hamburger } from 'hamburger-react'
import { useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

function MenuItems({ onItemClick }) {
  const [clickedItemId, setClickedItemId] = useState(null)

  return (
    <nav className="flex flex-col lg:flex-row lg:items-center gap-6 mb-3 lg:mb-0">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Link
          key={menuItem.id}
          to={menuItem.path}
          onClick={() => {
            setClickedItemId(menuItem.id)
            if (onItemClick) {
              onItemClick()
            }
            // Remove the highlight after a delay
            setTimeout(() => {
              setClickedItemId(null)
            }, 300)
          }}
          className={`text-sm font-medium cursor-pointer transition-colors ${
            clickedItemId === menuItem.id ? 'bg-gray-200' : ''
          } hover:text-blue-600 active:text-blue-800`}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  )
}

function HeaderRightContent(){
  return <div className='flex lg:items'>

  </div>
}

const ShoppingHeader = () => {
  const [isOpen, setOpen] = useState(false)
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex items-center h-16 px-4 md:px-6">
        {/* Logo */}
        <Link to="/shopping/home" className="flex items-center gap-2">
          <House className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Spacer to push items to the right */}
        <div className="flex-1"></div>

        {/* Right Side Items */}
        <div className="flex items-center space-x-4">
          {/* Authentication Info */}
          {isAuthenticated ? (
            <div>{/* Authenticated User Elements */}</div>
          ) : null}

          {/* Menu Items (visible on large screens) */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>

          {/* Hamburger Menu (visible on small screens) */}
          <Sheet open={isOpen} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden w-10 h-10">
                <div className="w-full h-full flex items-center justify-center">
                  <Hamburger toggled={isOpen} toggle={setOpen} size={30} />
                </div>
                <span className="sr-only">Toggle header Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs transition-all duration-700">
              <SheetHeader>
                <VisuallyHidden>
                  <SheetTitle>Ecommerce</SheetTitle>
                  <SheetDescription>Welcome to our Ecommerce app</SheetDescription>
                </VisuallyHidden>
              </SheetHeader>
              <MenuItems
                onItemClick={() => {
                  setOpen(false)
                }}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader