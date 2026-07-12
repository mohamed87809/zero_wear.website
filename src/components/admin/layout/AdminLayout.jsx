// src/components/admin/layout/AdminLayout.jsx

import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';

import AdminSidebar from '../AdminSidebar.jsx';

function AdminLayout() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#f9fafb]">
      <AdminSidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="flex items-center gap-3 border-b border-[#e5e7eb] bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(true)}
            aria-label="Open menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#111827] hover:bg-[#f9fafb]"
          >
            <Menu size={20} />
          </button>
          <p className="text-sm font-semibold text-[#111827]">
            Zero Wear DZ Admin
          </p>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;