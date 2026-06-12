import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LuHouse,
  LuBuilding2,
  LuMapPinned,
  LuKey,
  LuPhone,
  LuArrowRight,
  LuArrowUpRight,
} from 'react-icons/lu';
import { CONTACT_INFO } from '../../utils/constants';

// Import local assets for services
import residentialImg from '../../assets/hero_slider_1.webp';
import commercialImg from '../../assets/ps_sansara.webp';
import landImg from '../../assets/vinayak_21_acre.webp';
import leasingImg from '../../assets/hero_slider_3.webp';

const SERVICES = [
  { 
    icon: LuHouse, 
    title: 'Residential Properties',
    image: residentialImg,
    desc: 'Premium apartments, villas, and modern residential spaces across Kolkata\'s growth corridors.',
    bpFile: '/madhavam_residential_bp.pdf'
  },
  { 
    icon: LuBuilding2, 
    title: 'Commercial Properties',
    image: commercialImg,
    desc: 'High-end offices, retail outlets, and commercial spaces optimized for yield and utility.',
    bpFile: '/madhavam_commercial_bp.pdf'
  },
  { 
    icon: LuMapPinned, 
    title: 'Land Acquisition',
    image: landImg,
    desc: 'Strategic residential/commercial land parcels and plotted layouts in high-development areas.',
    bpFile: '/madhavam_land_bp.pdf'
  },
  { 
    icon: LuKey, 
    title: 'Leasing Solutions',
    image: leasingImg,
    desc: 'Professional leasing, tenant matching, and asset management for landlords and corporates.',
    bpFile: '/madhavam_leasing_bp.pdf'
  },
];

const clipPathVariants = {
  visible: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  },
  hidden: {
    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0px)",
  },
};


export default function PropertyServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const telHref = `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`;

  const handleDownload = (e, bpFile, title) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = bpFile;
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_bp.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="services" id="services">
      <div className="container">
        {/* Eyebrow + ornament */}
        <p className="services-eyebrow">Property Services</p>
        <span className="services-orn" aria-hidden="true">
          <span className="services-orn-line services-orn-line-sm" />
          <span className="services-orn-diamond" />
          <span className="services-orn-line services-orn-line-lg" />
          <span className="services-orn-arrow" />
        </span>

        {/* Heading + subtext */}
        <h2 className="services-heading">
          Innovation Meets Expertise In Our Range Of Services
        </h2>
        <p className="services-sub">
          From buying to investing, we offer expert guidance across residential,
          commercial, land, and leasing.
        </p>

        {/* Interactive List Container */}
        <div className="services-list-container">
          <div className="services-list">
            {SERVICES.map(({ icon: Icon, title, image, desc, bpFile }, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div 
                  key={title}
                  className={`services-row-item${isActive ? ' is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => setActiveIndex(idx)}
                >
                  {/* Row content layout */}
                  <div className="services-row-main-wrap">
                    <div className="services-row-title-box">
                      <span className="services-row-icon">
                        <Icon />
                      </span>
                      <h3 className="services-row-title">{title}</h3>
                    </div>
                    
                    <div className="services-row-desc-container">
                      <p className="services-row-desc">{desc}</p>
                      {isActive && (
                        <button
                          type="button"
                          className="services-row-download-link"
                          onClick={(e) => handleDownload(e, bpFile, title)}
                        >
                          Download BP (PDF) <LuArrowRight />
                        </button>
                      )}
                    </div>

                    <div className="services-row-action">
                      <button 
                        type="button"
                        className="services-row-arrow"
                        onClick={(e) => handleDownload(e, bpFile, title)}
                        aria-label={`Download ${title} Brochure`}
                      >
                        {isActive ? <LuArrowUpRight /> : <LuArrowRight />}
                      </button>
                    </div>
                  </div>

                  {/* Responsive Accordion image for mobile/tablet */}
                  <div className="services-row-accordion-content">
                    <div className="services-accordion-image-box">
                      <img src={image} alt={title} loading="lazy" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Image Preview Showcase for desktop */}
          <div className="services-preview-panel">
            <div className="services-preview-card">
              {SERVICES.map((s, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <motion.img 
                    key={s.title}
                    src={s.image} 
                    alt={s.title}
                    className="services-preview-img"
                    transition={{ ease: [0.33, 1, 0.68, 1], duration: 0.8 }}
                    variants={clipPathVariants}
                    initial="hidden"
                    animate={isActive ? "visible" : "hidden"}
                    style={{
                      zIndex: isActive ? 2 : 1
                    }}
                    loading="lazy"
                  />
                );
              })}
              <div className="services-preview-glow" />
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="services-actions">
          <a href={telHref} className="services-btn-primary">
            <LuPhone aria-hidden="true" />
            Call Us
          </a>
          <Link to="/land-leasing" className="services-btn-outline">
            View More Services
            <LuArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

