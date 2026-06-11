import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import logo from '../../assets/maadhavam_removebg_logo.png';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { LuMenu, LuX } from 'react-icons/lu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        {/* Logo */}
        <Link to="/" className="site-logo" onClick={closeMenu}>
          <img src={logo} alt="Madhavam Realty Logo" />
        </Link>

        {/* Hamburger toggle (mobile only) */}
        <button
          type="button"
          className="site-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <LuX /> : <LuMenu />}
        </button>

        {/* Nav + socials: inline on desktop, dropdown panel on mobile */}
        <div className={`site-nav-group${menuOpen ? ' open' : ''}`}>
          <nav className="site-nav">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="site-navlink"
                onClick={closeMenu}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="site-social">
            <a
              href="https://instagram.com/madhavamrealty"
              target="_blank"
              rel="noopener noreferrer"
              className="site-social-link"
              aria-label="Madhavam Realty on Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com/madhavamrealty"
              target="_blank"
              rel="noopener noreferrer"
              className="site-social-link"
              aria-label="Madhavam Realty on Facebook"
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
