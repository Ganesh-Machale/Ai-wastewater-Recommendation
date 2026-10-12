import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Backdrop from '../components/Backdrop';

const MainLayout = ({ children }) => {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background text-foreground">
      <Backdrop />
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 sm:px-12 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
