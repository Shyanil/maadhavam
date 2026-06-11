import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import EnquireButton from '../components/EnquireButton';

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <EnquireButton />
    </>
  );
}
