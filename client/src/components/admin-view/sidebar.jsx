import { adminSidebarMenuItems } from '@/config';
import { ChartNetwork } from 'lucide-react';
import React, { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '../ui/sheet';

function MenuItems({ onItemClick }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;

        return (
          <div
            key={menuItem.id}
            className={`flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer font-medium shadow transition-all duration-500 ease-out ${
              isActive
                ? 'bg-black text-white'
                : 'hover:bg-gray-200 hover:text-black active:ring active:ring-offset-2 active:ring-gray-400'
            }`}
            onClick={() => {
              navigate(menuItem.path);
              if (onItemClick) onItemClick(); // Close sidebar on mobile when item is clicked
            }}
          >
            {/* Render the icon if it exists */}
            {menuItem.icon && <span>{menuItem.icon}</span>}
            <span className="text-lg font-medium">{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();

  return (
    <Fragment>
      {/* Mobile Sidebar using Sheet */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="flex items-center gap-2">
                <ChartNetwork size={24} />
                <span className="text-2xl font-extrabold">Admin Panel</span>
              </SheetTitle>
              <SheetDescription />
            </SheetHeader>
            {/* Navigation Menu Items */}
            <MenuItems onItemClick={() => setOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden w-64 bg-background border-r p-6 lg:flex flex-col">
        {/* Admin Panel Heading */}
        <div
          onClick={() => navigate('/admin/dashboard')}
          className="flex items-center gap-2 mb-6 cursor-pointer hover:bg-gray-200 p-2 rounded-md transition-colors"
        >
          <ChartNetwork size={24} />
          <span className="text-2xl font-extrabold">Admin Panel</span>
        </div>

        {/* Navigation Menu Items */}
        <MenuItems />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar; 