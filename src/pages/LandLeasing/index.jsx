import React from 'react';
import LeadForm from '../../components/LeadForm';
import SEO from '../../components/SEO';

export default function LandLeasing() {
  return (
    <>
      <SEO pageKey="landLeasing" />
      
      {/* Intro Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>Commercial Land Leasing</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)', maxWidth: '600px', marginInline: 'auto' }}>
            Strategic land listings and build-to-suit commercial spaces for lease in Gwalior's prime business districts.
          </p>
        </div>
      </section>

      {/* Details Grid */}
      <section className="section container" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '50px' }}>
        
        {/* Left Side Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div>
            <h2 style={{ marginBottom: '16px' }}>Leasing Options & Layouts</h2>
            <p style={{ marginBottom: '16px' }}>
              Madhavam Realty offers prime land holdings in Sitholi and Airport Road corridors suitable for warehouse setups, logistics parks, corporate offices, educational institutions, or retail franchise outlets.
            </p>
            <p>
              Our layouts are fully certified, clear-titled, and pre-approved with wide approach roads, electric grids, and water support networks.
            </p>
          </div>

          <div>
            <h2 style={{ marginBottom: '16px' }}>Key Benefits</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Strategic Locations</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>Immediate highway connectivity and heavy transport vehicle access routes.</p>
              </div>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Flexible Contracts</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>Long-term lease agreements with customized build-to-suit layouts.</p>
              </div>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Clear Authorizations</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>All municipal, layout, fire and environmental clearances pre-obtained.</p>
              </div>
              <div className="glass-card" style={{ padding: '20px' }}>
                <h4 style={{ color: 'var(--primary)', marginBottom: '8px' }}>Infrastructure Loaded</h4>
                <p style={{ fontSize: 'var(--text-sm)' }}>3-phase industrial power backups, drainage networks, and boundary fences.</p>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side Enquiry Form */}
        <div>
          <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '10px' }}>Land Inquiry</h3>
            <p style={{ color: 'var(--neutral-700)', fontSize: 'var(--text-sm)', marginBottom: '20px' }}>
              Leave your parameters below, and our business leasing manager will verify options for you.
            </p>
            <LeadForm projectName="Commercial Land Leasing" />
          </div>
        </div>

      </section>
    </>
  );
}
