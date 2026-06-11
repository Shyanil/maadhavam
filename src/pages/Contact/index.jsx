import React from 'react';
import { CONTACT_INFO, ROUTES } from '../../utils/constants';
import LeadForm from '../../components/LeadForm';
import SEO from '../../components/SEO';

export default function Contact() {
  return (
    <>
      <SEO pageKey="contact" />
      
      {/* Intro Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>Contact Us</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)', maxWidth: '600px', marginInline: 'auto' }}>
            Get in touch with our property consultants, schedule site visits, or request customized leasing quotations.
          </p>
        </div>
      </section>

      {/* Main Layout Grid */}
      <section className="section container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px' }}>
        
        {/* Left Side: Contact details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div>
            <h2 style={{ marginBottom: '16px' }}>Our Office</h2>
            <p style={{ color: 'var(--neutral-700)' }}>Visit our headquarters located in Gwalior city centre to view physical site layouts and blueprint documents.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <strong>Address:</strong>
              <p style={{ color: 'var(--neutral-800)', marginTop: '4px' }}>{CONTACT_INFO.address}</p>
            </div>
            <div>
              <strong>Phone Helpline:</strong>
              <p style={{ color: 'var(--neutral-800)', marginTop: '4px' }}>{CONTACT_INFO.phone}</p>
            </div>
            <div>
              <strong>Email Support:</strong>
              <p style={{ color: 'var(--neutral-800)', marginTop: '4px' }}>{CONTACT_INFO.email}</p>
            </div>
            <div>
              <strong>Working Hours:</strong>
              <p style={{ color: 'var(--neutral-800)', marginTop: '4px' }}>{CONTACT_INFO.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div>
          <div className="glass-card" style={{ padding: '30px' }}>
            <h3 style={{ marginBottom: '10px' }}>Send a Message</h3>
            <p style={{ color: 'var(--neutral-700)', fontSize: 'var(--text-sm)', marginBottom: '20px' }}>
              Fill in the form below and our real estate consultant will contact you within 24 hours.
            </p>
            <LeadForm projectName="Contact Page General Enquiry" />
          </div>
        </div>

      </section>
    </>
  );
}
