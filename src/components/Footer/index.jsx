import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { LuMail, LuMapPin, LuPhone, LuArrowRight, LuArrowUp } from 'react-icons/lu';
import {
  APP_NAME,
  CONTACT_INFO,
  NAVIGATION_ITEMS,
  SOCIAL_LINKS,
} from '../../utils/constants';
import Reveal from '../Reveal';
import logo from '../../assets/maadhavam_removebg_logo.png';

const SERVICES = [
  { label: 'Residential Properties', path: '/projects' },
  { label: 'Commercial Properties', path: '/projects' },
  { label: 'Land Advisory', path: '/land-leasing' },
  { label: 'Leasing Solutions', path: '/land-leasing' },
];

// 'LAND & LEASING' -> 'Land & Leasing'
const toTitle = (s) => s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());

export default function Footer() {
  const [email, setEmail] = useState('');
  const year = new Date().getFullYear();

  const tel = `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`;
  const mailto = `mailto:${CONTACT_INFO.email}`;

  const onSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    toast.success('Thanks for subscribing! Property updates are on the way.');
    setEmail('');
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="site-footer">
      <span className="mf-grid-bg" aria-hidden="true" />
      <div className="container mf-inner">
        {/* Top: brand info (with logo) + two link tabs */}
        <div className="mf-top">
          <Reveal className="mf-brand" y={20}>
            <Link
              to="/"
              className="mf-logo-plate"
              aria-label={`${APP_NAME} home`}
            >
              <img src={logo} alt={`${APP_NAME} logo`} width={168} />
            </Link>
            <p className="mf-tagline">
              Guided real estate consultation for residential, commercial, land,
              and leasing needs — transparent support from enquiry to decision.
            </p>
            <ul className="mf-contact">
              <li>
                <span className="mf-contact-icon" aria-hidden="true">
                  <LuMapPin />
                </span>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <span className="mf-contact-icon" aria-hidden="true">
                  <LuPhone />
                </span>
                <a href={tel}>{CONTACT_INFO.phone}</a>
              </li>
              <li>
                <span className="mf-contact-icon" aria-hidden="true">
                  <LuMail />
                </span>
                <a href={mailto}>{CONTACT_INFO.email}</a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="mf-tabs" y={20} delay={0.08}>
            <div className="mf-tab">
              <h3 className="mf-tab-title">Explore</h3>
              <nav className="mf-links" aria-label="Footer navigation">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link key={item.path} to={item.path} className="mf-link">
                    <span className="mf-link-dot" aria-hidden="true" />
                    {toTitle(item.label)}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="mf-tab">
              <h3 className="mf-tab-title">Services</h3>
              <nav className="mf-links" aria-label="Our services">
                {SERVICES.map((s) => (
                  <Link key={s.label} to={s.path} className="mf-link">
                    <span className="mf-link-dot" aria-hidden="true" />
                    {s.label}
                  </Link>
                ))}
              </nav>
            </div>
          </Reveal>
        </div>

        {/* Below: newsletter strip */}
        <Reveal
          as="form"
          className="mf-newsletter"
          delay={0.12}
          y={16}
          onSubmit={onSubscribe}
        >
          <div className="mf-newsletter-copy">
            <h3>Stay ahead of the market</h3>
            <p>Get new listings and property insights in your inbox. No spam.</p>
          </div>
          <div className="mf-newsletter-field">
            <label htmlFor="mf-email" className="sr-only">
              Email address
            </label>
            <input
              id="mf-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
            <button type="submit" aria-label="Subscribe">
              <LuArrowRight aria-hidden="true" />
            </button>
          </div>
        </Reveal>

        {/* Oversized wordmark watermark */}
        <span className="mf-watermark" aria-hidden="true">
          MAADHAVAM
        </span>

        {/* Bottom bar */}
        <div className="mf-bottom">
          <p>
            &copy; {year} {APP_NAME}. All rights reserved.
          </p>
          <div className="mf-socials">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={SOCIAL_LINKS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube />
            </a>
          </div>
          <div className="mf-bottom-right">
            <Link to="/admin/login" className="mf-admin">
              Admin Portal
            </Link>
            <button
              type="button"
              className="mf-totop"
              onClick={scrollTop}
              aria-label="Back to top"
            >
              <LuArrowUp aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
