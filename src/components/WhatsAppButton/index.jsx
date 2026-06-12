import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { CONTACT_INFO } from '../../utils/constants';

export default function WhatsAppButton() {
  const text = encodeURIComponent('Hello Madhavam Realty, I would like to inquire about your property listings.');
  const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${text}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-fab"
      style={{
        position: 'fixed',
        bottom: '14px',
        right: '30px',
        backgroundColor: '#25D366',
        color: 'white',
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
        zIndex: 999,
        transition: 'transform 0.3s ease',
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      title="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
