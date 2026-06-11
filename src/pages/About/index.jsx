import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function About() {
  return (
    <>
      <SEO pageKey="about" />
      
      {/* Intro Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>About Madhavam Realty</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)', maxWidth: '600px', marginInline: 'auto' }}>
            Building trusted relationships and exceptional properties since 2012.
          </p>
        </div>
      </section>

      {/* Main Vision */}
      <section className="section container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800" 
            alt="Office" 
            style={{ borderRadius: 'var(--radius-lg)' }} 
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h2>Who We Are</h2>
          <p>
            Madhavam Realty is one of Gwalior's most respected real estate development companies. Founded with a vision to redefine urban living, we combine engineering excellence, modern architecture, and customer transparency to create landmark properties.
          </p>
          <p>
            Whether you are looking for ready-to-construct plots, luxury residential villas, or prime commercial leasing options, Madhavam Realty provides premium infrastructure and absolute peace of mind.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/projects" className="btn btn-primary">Browse Projects</Link>
            <Link to="/contact" className="btn btn-outline">Enquire Now</Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ backgroundColor: 'var(--neutral-100)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2>Our Core Pillars</h2>
            <p style={{ color: 'var(--neutral-600)', marginTop: '8px' }}>The principles that guide our development standards</p>
          </div>
          <div className="grid-cols-3">
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Trust & Transparency</h3>
              <p>Clear, unencumbered land titles and customer-centric agreements. We believe in building trust through transparent deals.</p>
            </div>
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Premium Quality</h3>
              <p>Top-tier materials, state-of-the-art security systems, and high quality landscape layouts in every single project.</p>
            </div>
            <div className="glass-card" style={{ padding: '30px' }}>
              <h3 style={{ color: 'var(--primary)', marginBottom: '12px' }}>Customer First</h3>
              <p>We work closely with our home buyers and clients to ensure timely completion and a smooth handover process.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
