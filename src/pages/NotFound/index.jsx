import React from 'react';
import { Link } from 'react-router-dom';
import { LuHouse, LuArrowLeft } from 'react-icons/lu';
import SEO from '../../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO pageKey="notFound" />

      <section className="notfound">
        <div className="notfound-inner">
          <p className="notfound-eyebrow">Error 404</p>

          {/* The middle "0" becomes a house medallion — on-brand for realty */}
          <div className="notfound-code" aria-hidden="true">
            <span>4</span>
            <span className="notfound-medallion">
              <LuHouse />
            </span>
            <span>4</span>
          </div>

          <h1 className="notfound-title">We couldn&rsquo;t find that page</h1>
          <p className="notfound-text">
            The page you&rsquo;re looking for may have moved or is still being built.
            Let&rsquo;s get you back to the homepage.
          </p>

          <Link to="/" className="notfound-btn">
            <LuArrowLeft aria-hidden="true" />
            Back to Home
          </Link>
        </div>
      </section>
    </>
  );
}
