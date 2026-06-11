import React from 'react';
import SEO from '../../components/SEO';

const AWARDS_LIST = [
  {
    year: '2025',
    title: 'Best Residential Gated Community Gwalior',
    issuer: 'Madhya Pradesh Realty Forum',
    description: 'Awarded to Madhavam Royal Orchid for exceptional planning, architecture, green parks integration, and premium construction.',
  },
  {
    year: '2024',
    title: 'Excellence in Customer Transparency',
    issuer: 'Real Estate Developer Association Central India',
    description: 'Recognized for absolute digital ledger sync, clear title verifications, and user-friendly documentation.',
  },
  {
    year: '2023',
    title: 'Upcoming Commercial Landmark Winner',
    issuer: 'City Builders Association MP',
    description: 'Awarded to Madhavam Plaza City Centre for modern structural planning, layout density controls, and solar integration.',
  }
];

export default function Awards() {
  return (
    <>
      <SEO pageKey="awards" />
      
      {/* Intro Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>Awards & Recognition</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)', maxWidth: '600px', marginInline: 'auto' }}>
            A testament to our unwavering commitment to architectural quality, customer service, and development values.
          </p>
        </div>
      </section>

      {/* Awards Grid */}
      <section className="section container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          {AWARDS_LIST.map((award, index) => (
            <div key={index} className="glass-card" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '30px', padding: '30px', alignItems: 'center' }}>
              <div style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                borderRadius: 'var(--radius-md)',
                height: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--text-xl)',
                fontWeight: 'bold'
              }}>
                {award.year}
              </div>
              <div>
                <h3 style={{ marginBottom: '6px', color: 'var(--secondary)' }}>{award.title}</h3>
                <strong style={{ display: 'block', color: 'var(--primary)', fontSize: 'var(--text-sm)', marginBottom: '8px' }}>
                  {award.issuer}
                </strong>
                <p style={{ color: 'var(--neutral-700)' }}>{award.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
