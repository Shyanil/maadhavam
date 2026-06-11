import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

// Public Pages
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

/*
 * NOTE (temporary): The interior pages below are still under construction.
 * Until they're ready, every public route except Home renders the <NotFound />
 * placeholder, so any nav link or button leads to the 404 page (with
 * "Back to Home"). To bring a page online, restore its import and swap
 * <NotFound /> back to the real component on its <Route>.
 */
// import About from '../pages/About';
// import Projects from '../pages/Projects';
// import ProjectDetails from '../pages/ProjectDetails';
// import LandLeasing from '../pages/LandLeasing';
// import Awards from '../pages/Awards';
// import Blog from '../pages/Blog';
// import BlogDetails from '../pages/BlogDetails';
// import Contact from '../pages/Contact';

// Admin Pages
import AdminLogin from '../admin/Login';
import AdminDashboard from '../admin/Dashboard';
import AdminLeads from '../admin/Leads';
import AdminProjects from '../admin/Projects';
import AdminBlog from '../admin/Blog';
import AdminSettings from '../admin/Settings';
import AdminAnalytics from '../admin/Analytics';

import { ROUTES } from '../utils/constants';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<Home />} />

        {/* TEMP: under construction — route to the 404 placeholder for now */}
        <Route path={ROUTES.ABOUT} element={<NotFound />} />
        <Route path={ROUTES.PROJECTS} element={<NotFound />} />
        <Route path={ROUTES.PROJECT_DETAILS} element={<NotFound />} />
        <Route path={ROUTES.LAND_LEASING} element={<NotFound />} />
        <Route path={ROUTES.AWARDS} element={<NotFound />} />
        <Route path={ROUTES.BLOG} element={<NotFound />} />
        <Route path={ROUTES.BLOG_DETAILS} element={<NotFound />} />
        <Route path={ROUTES.CONTACT} element={<NotFound />} />
      </Route>

      {/* Admin Login Route (No Layout wrapper or standalone) */}
      <Route path={ROUTES.ADMIN_LOGIN} element={<AdminLogin />} />

      {/* Admin Protected Routes */}
      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN_DASHBOARD} element={<AdminDashboard />} />
        <Route path={ROUTES.ADMIN_LEADS} element={<AdminLeads />} />
        <Route path={ROUTES.ADMIN_PROJECTS} element={<AdminProjects />} />
        <Route path={ROUTES.ADMIN_BLOG} element={<AdminBlog />} />
        <Route path={ROUTES.ADMIN_SETTINGS} element={<AdminSettings />} />
        <Route path={ROUTES.ADMIN_ANALYTICS} element={<AdminAnalytics />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
