import React from 'react';

export default function Hero({ title, subtitle, bgImage }) {
  const defaultBg = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200';
  
  return (
    <section className="section" style={{
      backgroundImage: `linear-gradient(rgba(1, 22, 39, 0.75), rgba(1, 22, 39, 0.85)), url(${bgImage || defaultBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      padding: '80px 0',
      textAlign: 'center'
    }}>
      <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <h1 style={{ color: 'var(--accent-gold)', fontSize: 'var(--text-4xl)' }}>{title}</h1>
        {subtitle && <p style={{ color: 'var(--neutral-400)', maxWidth: '600px', fontSize: 'var(--text-base)' }}>{subtitle}</p>}
      </div>
    </section>
  );
}
