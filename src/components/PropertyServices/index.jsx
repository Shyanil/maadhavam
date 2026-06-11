import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuHouse,
  LuBuilding2,
  LuMapPinned,
  LuKey,
  LuPhone,
  LuArrowRight,
} from 'react-icons/lu';
import { CONTACT_INFO } from '../../utils/constants';

const SERVICES = [
  { icon: LuHouse, title: 'Residential Properties' },
  { icon: LuBuilding2, title: 'Commercial Properties' },
  { icon: LuMapPinned, title: 'Land Acquisition' },
  { icon: LuKey, title: 'Leasing Solutions' },
];

export default function PropertyServices() {
  const telHref = `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`;

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
          Expert Real Estate Solutions{' '}
          <br className="services-break" />
          Tailored to Your Needs
        </h2>
        <p className="services-sub">
          From buying to investing, we offer expert guidance across residential,
          commercial, land, and leasing.
        </p>

        {/* Four service columns */}
        <div className="services-grid">
          {SERVICES.map(({ icon: Icon, title }) => (
            <article className="services-item" key={title}>
              <span className="services-icon" aria-hidden="true">
                <Icon />
              </span>
              <h3 className="services-item-title">{title}</h3>
              <span className="services-item-underline" aria-hidden="true" />
            </article>
          ))}
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
