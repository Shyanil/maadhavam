import React from 'react';
import { Link } from 'react-router-dom';
import { LuMessageSquareText } from 'react-icons/lu';

// Floating "Enquire Now" call-to-action, shown only on mobile.
// Sits at the bottom-left so it never overlaps the WhatsApp button (bottom-right).
export default function EnquireButton() {
  return (
    <Link to="/contact" className="enquire-fab" aria-label="Enquire now">
      <LuMessageSquareText aria-hidden="true" />
      <span>Enquire Now</span>
    </Link>
  );
}
