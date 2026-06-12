import React from 'react';
import Reveal from '../Reveal';
import flowerImg from '../../assets/flower_section.png';

// High-resolution modern vector SVG logos for developers
const DEVELOPERS = [
  {
    name: 'Atri Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36 L22 14 L32 36 Z" fill="none" stroke="#C6A15B" strokeWidth="2.2" strokeLinejoin="round"/>
        <path d="M16 28 L28 28" stroke="#8B1E1E" strokeWidth="1.8"/>
        <circle cx="22" cy="14" r="2.5" fill="#8B1E1E"/>
        <text x="40" y="30" fontFamily="'Montserrat', sans-serif" fontSize="13" fontWeight="700" fill="#2E2620" letterSpacing="0.8">Atri Group</text>
        <text x="40" y="39" fontFamily="'Montserrat', sans-serif" fontSize="6.5" fontWeight="600" fill="#C6A15B" letterSpacing="1.8">BUILDING DREAMS</text>
      </svg>
    ),
  },
  {
    name: 'Purti Realty',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text x="10" y="27" fontFamily="'Cormorant Garamond', serif" fontSize="18" fontWeight="700" fill="#8B1E1E" letterSpacing="2.5">PURTI</text>
        <text x="12" y="40" fontFamily="'Montserrat', sans-serif" fontSize="9.5" fontWeight="500" fill="#C6A15B" letterSpacing="4.5">REALTY</text>
        <line x1="10" y1="12" x2="110" y2="12" stroke="#C6A15B" strokeWidth="0.8"/>
      </svg>
    ),
  },
  {
    name: 'Diamond Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polygon points="20,12 32,22 20,32 8,22" fill="none" stroke="#2563EB" strokeWidth="2"/>
        <circle cx="20" cy="22" r="3.5" fill="#C6A15B"/>
        <text x="42" y="26" fontFamily="'Montserrat', sans-serif" fontSize="10.5" fontWeight="700" fill="#2E2620" letterSpacing="1.2">DIAMOND</text>
        <text x="42" y="37" fontFamily="'Montserrat', sans-serif" fontSize="8" fontWeight="600" fill="#9A8C79" letterSpacing="2.5">G R O U P</text>
      </svg>
    ),
  },
  {
    name: 'Primarc',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(10, 11)">
          <circle cx="12" cy="12" r="9" fill="none" stroke="#E2E8F0" strokeWidth="2.5"/>
          <path d="M12 3 A9 9 0 0 1 21 12" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
          <path d="M12 12 L18 6" stroke="#8B1E1E" strokeWidth="2" strokeLinecap="round"/>
        </g>
        <text x="42" y="29" fontFamily="'Montserrat', sans-serif" fontSize="15" fontWeight="700" fill="#2E2620" letterSpacing="0.4">primarc</text>
      </svg>
    ),
  },
  {
    name: 'Benchmark',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text x="15" y="27" fontFamily="'Cormorant Garamond', serif" fontSize="13" fontWeight="600" fill="#8B1D1D" letterSpacing="1.8">BENCHMARK</text>
        <line x1="15" y1="33" x2="115" y2="33" stroke="#C6A15B" strokeWidth="1.2"/>
        <rect x="60" y="31" width="10" height="4" fill="#8B1E1E"/>
        <text x="45" y="42" fontFamily="'Montserrat', sans-serif" fontSize="6.5" fontWeight="500" fill="#9A8C79" letterSpacing="2">SINCE 2004</text>
      </svg>
    ),
  },
  {
    name: 'Belani Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 32 L10 16 L16 12 L22 16 L22 32 L34 32 L34 22 L42 22 L42 32" fill="none" stroke="#0F172A" strokeWidth="1.5"/>
        <line x1="5" y1="36" x2="48" y2="36" stroke="#C6A15B" strokeWidth="1"/>
        <text x="52" y="25" fontFamily="'Montserrat', sans-serif" fontSize="12" fontWeight="700" fill="#2E2620" letterSpacing="1.5">BELANI</text>
        <text x="52" y="34" fontFamily="'Montserrat', sans-serif" fontSize="7" fontWeight="600" fill="#8B1E1E" letterSpacing="0.8">BUILDS BETTER</text>
      </svg>
    ),
  },
  {
    name: 'AM Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="10" width="30" height="30" rx="6" fill="#8B1E1E"/>
        <text x="15" y="30" fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="800" fill="#FFFFFF">AM</text>
        <text x="48" y="26" fontFamily="'Montserrat', sans-serif" fontSize="11" fontWeight="700" fill="#2E2620" letterSpacing="1">AM GROUP</text>
        <text x="48" y="36" fontFamily="'Montserrat', sans-serif" fontSize="7.5" fontWeight="500" fill="#C6A15B" letterSpacing="1.5">TRUSTED HOMES</text>
      </svg>
    ),
  },
  {
    name: 'Salarpuria',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 36 L12 14 Q18 20 24 14 L24 36 Z" fill="#1E3A8A" opacity="0.85"/>
        <path d="M18 36 L18 17 Q24 23 30 17 L30 36 Z" fill="#C6A15B" opacity="0.9"/>
        <text x="38" y="29" fontFamily="'Montserrat', sans-serif" fontSize="11" fontWeight="800" fill="#1E3A8A" letterSpacing="1.2">SALARPURIA</text>
      </svg>
    ),
  },
  {
    name: 'Jain Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="14" width="22" height="22" fill="none" stroke="#DC2626" strokeWidth="2"/>
        <line x1="23" y1="14" x2="23" y2="36" stroke="#DC2626" strokeWidth="1"/>
        <line x1="12" y1="25" x2="34" y2="25" stroke="#DC2626" strokeWidth="1"/>
        <text x="42" y="25" fontFamily="'Montserrat', sans-serif" fontSize="10" fontWeight="800" fill="#DC2626" letterSpacing="0.8">JAIN GROUP</text>
        <text x="42" y="34" fontFamily="'Montserrat', sans-serif" fontSize="6.5" fontWeight="600" fill="#5A5450" letterSpacing="0.5">Your Dreams. Our Commitment.</text>
      </svg>
    ),
  },
  {
    name: 'Mani Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="22" r="5" fill="#8B1E1E"/>
        <circle cx="26" cy="28" r="5" fill="#C6A15B"/>
        <circle cx="26" cy="16" r="4" fill="#4B5563"/>
        <text x="39" y="26" fontFamily="'Montserrat', sans-serif" fontSize="16" fontWeight="700" fill="#2E2620" letterSpacing="-0.2">mani</text>
        <text x="39" y="36" fontFamily="'Montserrat', sans-serif" fontSize="7" fontWeight="600" fill="#C6A15B" letterSpacing="0.4">changeforgood</text>
      </svg>
    ),
  },
  {
    name: 'Rishi Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="15" width="20" height="20" rx="3" fill="#059669"/>
        <rect x="18" y="23" width="12" height="12" rx="2" fill="#3B82F6"/>
        <text x="38" y="27" fontFamily="'Montserrat', sans-serif" fontSize="13.5" fontWeight="800" fill="#2E2620" letterSpacing="1">RISHI</text>
        <text x="38" y="35" fontFamily="'Montserrat', sans-serif" fontSize="6" fontWeight="600" fill="#9A8C79" letterSpacing="0.8">exceeding expectations!</text>
      </svg>
    ),
  },
  {
    name: 'Shivom Realty',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 25 C12 15, 28 15, 28 25 C28 35, 12 35, 12 25" fill="none" stroke="#D97706" strokeWidth="2.5"/>
        <path d="M20 15 L20 35" stroke="#8B1E1E" strokeWidth="2.2" strokeLinecap="round"/>
        <text x="36" y="26" fontFamily="'Montserrat', sans-serif" fontSize="10.5" fontWeight="700" fill="#2E2620" letterSpacing="0.8">SHIVOM</text>
        <text x="36" y="35" fontFamily="'Montserrat', sans-serif" fontSize="9" fontWeight="600" fill="#8B1E1E" letterSpacing="2">REALTY</text>
      </svg>
    ),
  },
  {
    name: 'Rajat',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,25 24,14 36,25 24,36" fill="#10B981" opacity="0.85"/>
        <polygon points="18,25 24,19 30,25 24,31" fill="#F59E0B"/>
        <text x="44" y="30" fontFamily="'Montserrat', sans-serif" fontSize="14" fontWeight="800" fill="#0F172A" letterSpacing="0.8">RAJAT</text>
      </svg>
    ),
  },
  {
    name: 'Multicon Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <line x1="8" y1="36" x2="38" y2="36" stroke="#475569" strokeWidth="1.5"/>
        <line x1="16" y1="36" x2="16" y2="12" stroke="#475569" strokeWidth="2"/>
        <line x1="24" y1="36" x2="24" y2="18" stroke="#475569" strokeWidth="2"/>
        <line x1="32" y1="36" x2="32" y2="24" stroke="#475569" strokeWidth="2"/>
        <circle cx="16" cy="12" r="2" fill="#8B1E1E"/>
        <circle cx="24" cy="18" r="2" fill="#8B1E1E"/>
        <circle cx="32" cy="24" r="2" fill="#8B1E1E"/>
        <text x="44" y="26" fontFamily="'Montserrat', sans-serif" fontSize="10.5" fontWeight="700" fill="#2E2620" letterSpacing="1">MULTICON</text>
        <text x="44" y="35" fontFamily="'Montserrat', sans-serif" fontSize="8" fontWeight="600" fill="#C6A15B" letterSpacing="1.8">G R O U P</text>
      </svg>
    ),
  },
  {
    name: 'Soham',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M22 14 Q22 28 14 28 Q22 28 22 36 Q22 28 30 28 Q22 28 22 14" fill="#047857"/>
        <text x="38" y="30" fontFamily="'Cormorant Garamond', serif" fontSize="18" fontWeight="700" fill="#0F172A" letterSpacing="1">sohâm</text>
      </svg>
    ),
  },
  {
    name: 'Natural Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 30 L20 16 L28 30 Z" fill="#15803D"/>
        <path d="M20 30 L26 21 L32 30 Z" fill="#C6A15B"/>
        <circle cx="28" cy="16" r="3" fill="#D97706"/>
        <text x="38" y="25" fontFamily="'Montserrat', sans-serif" fontSize="9.5" fontWeight="700" fill="#15803D" letterSpacing="0.8">NATURAL GROUP</text>
        <text x="38" y="34" fontFamily="'Montserrat', sans-serif" fontSize="7" fontWeight="600" fill="#9A8C79" letterSpacing="1.2">THE REAL REALTORS</text>
      </svg>
    ),
  },
  {
    name: 'Nirmala Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="14" fill="none" stroke="#2E2620" strokeWidth="1.5"/>
        <path d="M20 28 Q18 22 22 20 Q26 18 27 22 Q28 26 23 26" fill="none" stroke="#8B1E1E" strokeWidth="1.8"/>
        <text x="46" y="28" fontFamily="'Montserrat', sans-serif" fontSize="11" fontWeight="700" fill="#2E2620" letterSpacing="0.8">Nirmala Group</text>
      </svg>
    ),
  },
  {
    name: 'Shriram Properties',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="14" width="8" height="20" fill="#1D4ED8"/>
        <rect x="21" y="19" width="8" height="15" fill="#C6A15B"/>
        <rect x="32" y="24" width="8" height="10" fill="#1D4ED8"/>
        <text x="46" y="24" fontFamily="'Montserrat', sans-serif" fontSize="10.5" fontWeight="800" fill="#1D4ED8">Shriram</text>
        <text x="46" y="33" fontFamily="'Montserrat', sans-serif" fontSize="9" fontWeight="600" fill="#4B5563">Properties</text>
      </svg>
    ),
  },
  {
    name: 'Pasari Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="14" y="14" width="18" height="18" rx="2" fill="none" stroke="#D97706" strokeWidth="2"/>
        <polygon points="23,10 27,15 19,15" fill="#D97706"/>
        <text x="40" y="29" fontFamily="'Montserrat', sans-serif" fontSize="12.5" fontWeight="700" fill="#2E2620" letterSpacing="0.4">pasarigroup</text>
      </svg>
    ),
  },
  {
    name: 'PS Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <polygon points="12,32 24,14 36,32" fill="#8B1E1E"/>
        <rect x="21" y="24" width="6" height="8" fill="#FFFFFF"/>
        <text x="44" y="26" fontFamily="'Montserrat', sans-serif" fontSize="13" fontWeight="800" fill="#2E2620" letterSpacing="2">PS GROUP</text>
        <text x="44" y="34" fontFamily="'Montserrat', sans-serif" fontSize="7" fontWeight="600" fill="#8B1E1E" letterSpacing="0.5">FAMILY HOMES</text>
      </svg>
    ),
  },
  {
    name: 'Sureka Group',
    logo: (
      <svg viewBox="0 0 160 50" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <text x="15" y="32" fontFamily="'Montserrat', sans-serif" fontSize="19" fontWeight="900" fill="#1E3A8A" letterSpacing="0.8">SUREKA</text>
        <circle cx="106" cy="18" r="4.5" fill="#8B1E1E"/>
      </svg>
    ),
  },
];

export default function Developers() {
  return (
    <section className="developers" id="developers">
      <img src={flowerImg} className="dev-flower-bg dev-flower-bg--top" alt="" aria-hidden="true" />
      <img src={flowerImg} className="dev-flower-bg dev-flower-bg--bottom" alt="" aria-hidden="true" />
      <div className="container">
        {/* Header Block */}
        <div className="developers-header">
          <Reveal as="p" className="eyebrow">
            DEVELOPERS
            <span className="eyebrow-rule" aria-hidden="true" />
          </Reveal>
          <Reveal as="h2" className="developers-heading" delay={0.05}>
            Our Esteemed Developers
          </Reveal>
          <Reveal as="p" className="developers-sub" delay={0.1}>
            Our trusted developers are known for delivering high-quality, sustainable projects on 
            time, offering exceptional homes and investment opportunities across prime locations.
          </Reveal>
        </div>

        {/* Logo Grid */}
        <div className="developers-grid">
          {DEVELOPERS.map((dev, i) => (
            <Reveal
              className="developer-card"
              delay={0.05 + (i % 7) * 0.05}
              key={dev.name}
              y={20}
            >
              <div className="developer-logo-wrapper" title={dev.name}>
                {dev.logo}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
