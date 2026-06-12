import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../utils/constants';
import logo from '../../assets/maadhavam_removebg_logo.png';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { LuMenu, LuX } from 'react-icons/lu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.classList.toggle('site-menu-lock', menuOpen);
    return () => document.body.classList.remove('site-menu-lock');
  }, [menuOpen]);

  return (
    <header className={`site-header${menuOpen ? ' menu-open' : ''}`}>
      <div className="container site-header-inner">
        <Link to="/" className="site-logo" onClick={closeMenu}>
          <img src={logo} alt="Madhavam Realty Logo" />
        </Link>

        <button
          type="button"
          className="site-nav-toggle"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      <div className={`site-menu-panel${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        <div className="container site-menu-inner">
          <p className="site-menu-kicker">Menu</p>
          <nav className="site-nav">
            {NAVIGATION_ITEMS.map((item, index) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="site-navlink"
                onClick={closeMenu}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
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
