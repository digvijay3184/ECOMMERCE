import React from 'react'
import { Button } from '../ui/button'
import { LogOut, Menu } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '@/store/auth-slice'
import { useToast } from '@/hooks/use-toast'

const AdminHeader = ({setOpenSidebar}) => {

  const dispatch = useDispatch() ;
  const {toast} = useToast() ;

  function handleLogout(){
    
    dispatch(logoutUser()).then(data=>{
      if(data?.payload?.success){
        toast({
          title: 'Logged out successfully',
        })
      }
    })
    
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 bg-background border-b">
      {/* Menu Button */}
      <Button onClick={()=>setOpenSidebar(true)} className="lg:hidden sm:block hover:text-black hover:bg-gray-200 active:ring active:ring-offset-2 active:ring-gray-400 transition-all duration-500 ease-out">
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>

      <div className="flex flex-1 justify-end">
        {/* Log Out Button */}
        <Button onClick ={()=>{handleLogout()}} className="inline-flex items-center gap-2 rounded-md px-4 py-2 font-medium shadow hover:bg-gray-200 hover:text-black active:ring active:ring-offset-2 active:ring-gray-400 transition-all duration-1000 ease-out">
          <LogOut />
          <p  className="hidden sm:block">Log Out</p>
        </Button>
      </div>
    </header>
  )
}

export default AdminHeader
