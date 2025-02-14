import { House, LogOut, ShoppingCart, UserCog } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import { useDispatch, useSelector } from 'react-redux'
import { shoppingViewHeaderMenuItems } from '@/config'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { DropdownMenu, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { logoutUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'

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
          className={`text-sm font-medium cursor-pointer transition-colors ${clickedItemId === menuItem.id ? 'bg-gray-200' : ''
            } hover:text-blue-600 active:text-blue-800`}
        >
          {menuItem.label}
        </Link>
      ))}
    </nav>
  )
}

function HeaderRightContent({ setOpen }) {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!user) {
    return <div className="text-gray-500">Loading...</div>; // Show loading state
  }

  function handleLogout() {
    dispatch(logoutUser()).then(data => {
      if (data?.payload?.success) {
        toast({
          title: 'Logged out successfully',
        })
      }
    })
  }

  function handleAccount() {
    navigate('/shopping/account')
    setOpen(false)
  }

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">

      <Button variant="outline" size="icon">
        <ShoppingCart className="w-6 h-6" />
        <span className="sr-only">User Cart</span>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user.userName ? user.userName[0].toUpperCase() : "?"}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>
            {user.userName ? `Logged in as ${user.userName}` : "Not Logged In"}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { handleAccount() }}>
            <UserCog className='mr-2 h-4 w-4' />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { handleLogout() }}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
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

          {/* Menu Items (visible on large screens) */}
          <div className="hidden lg:block">
            <MenuItems />
          </div>


          <div className='hidden lg:block'><HeaderRightContent /></div>


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
            <SheetContent side="left" className="w-full max-w-xs transition-all duration-700">
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
              <HeaderRightContent setOpen={setOpen} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default ShoppingHeader