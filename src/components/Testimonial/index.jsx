import React from 'react';
import { FaQuoteLeft } from 'react-icons/fa';

export default function Testimonial({ name, role, quote }) {
  return (
    <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: 'white' }}>
      <FaQuoteLeft style={{ color: 'var(--accent-gold-light)', fontSize: 'var(--text-2xl)' }} />
      <p style={{ color: 'var(--neutral-800)', fontStyle: 'italic' }}>
        "{quote}"
      </p>
      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--neutral-300)', paddingTop: '12px' }}>
        <strong style={{ display: 'block', color: 'var(--secondary)' }}>{name}</strong>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-600)' }}>{role}</span>
      </div>
    </div>
  );
}
