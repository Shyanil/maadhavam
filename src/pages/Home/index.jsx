import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import HomeHero from '../../components/HomeHero';
import Ticker from '../../components/Ticker';
import FeaturedProjects from '../../components/FeaturedProjects';
import PropertyServices from '../../components/PropertyServices';
import Testimonials from '../../components/Testimonials';
import Developers from '../../components/Developers';
import ContactSection from '../../components/ContactSection';
import BlogSection from '../../components/BlogSection';


export default function Home() {
  return (
    <>
      <SEO pageKey="home" />

      {/* Hero Section — luxury editorial slider + glass search panel */}
      <HomeHero />

      {/* Highlights Ticker — lightweight auto-looping strip of differentiators */}
      <Ticker />

      {/* Featured Projects — glowing hover slideshow */}
      <FeaturedProjects />

      {/* Property Services — 4 service categories + CTAs */}
      <PropertyServices />

      {/* Our Esteemed Developers — logo grid */}
      <Developers />

      {/* Testimonials — 3-up carousel */}
      <Testimonials />

      {/* Contact Section — requested questionnaire fields and action buttons */}
      <ContactSection />

      {/* Redesigned Blog Section — horizontal infinite slider */}
      <BlogSection />
    </>
  );
}
