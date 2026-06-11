import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
        <Toaster 
          position="top-right" 
          toastOptions={{
            duration: 4000,
            style: {
              background: 'var(--secondary)',
              color: 'white',
              fontFamily: 'var(--font-sans)',
            },
          }} 
        />
      </BrowserRouter>
    </HelmetProvider>
  );
}
