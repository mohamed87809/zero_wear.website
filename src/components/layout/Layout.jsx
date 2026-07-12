// src/components/layout/Layout.jsx

import { Outlet } from 'react-router-dom';

import AnnouncementBar from './AnnouncementBar.jsx';
import Navbar from './Navbar.jsx';
import MobileMenu from './MobileMenu.jsx';
import Footer from './Footer.jsx';
import ScrollTop from '../shared/ScrollTop.jsx';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AnnouncementBar />
      <Navbar />
      <MobileMenu />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
      <ScrollTop />
    </div>
  );
}

export default Layout;