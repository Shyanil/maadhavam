import React from 'react';
import { Link } from 'react-router-dom';
import {
  LuUserCheck,
  LuMapPin,
  LuShieldCheck,
  LuHandshake,
  LuBuilding2,
  LuChartColumnIncreasing,
  LuArrowRight,
  LuPhone,
  LuMessageCircle,
  LuCalendarCheck,
} from 'react-icons/lu';
import SEO from '../../components/SEO';
import HomeHero from '../../components/HomeHero';
import FeaturedProjects from '../../components/FeaturedProjects';
import PropertyServices from '../../components/PropertyServices';
import Testimonials from '../../components/Testimonials';
import Awards from '../../components/Awards';
import { CONTACT_INFO } from '../../utils/constants';
import aboutUsImage from '../../assets/about_us.webp';
import edenImg from '../../assets/eden_devprayag.webp';
import vinayakImg from '../../assets/vinayak_21_acre.webp';
import bhawaniImg from '../../assets/bhawani_paraiso.webp';

const WHY_CHOOSE_FEATURES = [
  {
    icon: LuUserCheck,
    title: 'Personalized Consultation',
    text: 'Tailored property recommendations based on your goals, budget, and lifestyle.',
  },
  {
    icon: LuMapPin,
    title: 'Market Expertise',
    text: 'Deep knowledge of New Town, Rajarhat, Howrah and Hooghly markets.',
  },
  {
    icon: LuShieldCheck,
    title: 'Transparent Guidance',
    text: 'Honest advice on pricing, documentation, and legal checks with complete clarity.',
  },
  {
    icon: LuHandshake,
    title: 'End-to-End Support',
    text: 'From property selection to registration and possession, we are with you.',
  },
  {
    icon: LuBuilding2,
    title: 'Premium Developer Network',
    text: 'Access to reputed developers and exclusive residential & commercial projects.',
  },
  {
    icon: LuChartColumnIncreasing,
    title: 'Investment Insights',
    text: 'Guidance focused on long-term value and strong appreciation potential.',
  },
];

const BLOG_PREVIEWS = [
  {
    number: '01',
    title: 'How to Choose the Right Property Location',
    text: 'A practical checklist for comparing connectivity, neighborhood growth, and long-term value.',
    author: 'Madhavam Advisory',
    updated: 'Updated Jun 2026',
    readTime: '4 min read',
    image: edenImg,
  },
  {
    number: '02',
    title: 'Residential vs Commercial Investment',
    text: 'Understand the differences in returns, timelines, and risk before selecting your next asset.',
    author: 'Investment Desk',
    updated: 'Updated May 2026',
    readTime: '5 min read',
    image: vinayakImg,
  },
  {
    number: '03',
    title: 'What to Check Before Booking a Site Visit',
    text: 'Documents, project details, pricing clarity, and consultation points to prepare in advance.',
    author: 'Client Success Team',
    updated: 'Updated Apr 2026',
    readTime: '3 min read',
    image: bhawaniImg,
  },
];

export default function Home() {
  const telHref = `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`;
  const whatsappText = encodeURIComponent('Hello Madhavam Realty, I would like to book a property consultation.');
  const whatsappHref = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${whatsappText}`;

  return (
    <>
      <SEO pageKey="home" />

      {/* Hero Section — luxury editorial slider + glass search panel */}
      <HomeHero />

      {/* Why Choose Section — same cream / maroon / gold palette as the hero */}
      <section className="why-choose" id="why-choose">
        <div className="container">
          {/* Intro: text on the left, supporting photo on the right */}
          <div className="why-choose-top">
            <div className="why-choose-intro">
              <p className="why-choose-eyebrow">
                <span className="why-choose-eyebrow-text">Why Choose Madhavam Realty</span>
                <span className="why-choose-eyebrow-rule" aria-hidden="true" />
              </p>
              <h2 className="why-choose-heading">
                Your Trusted Partner in{' '}
                <br className="why-choose-break" />
                Real Estate Excellence
              </h2>
              <p className="why-choose-sub">
                We combine local expertise, transparent processes, and personalized service to help you make the right property decisions with confidence.
              </p>
            </div>

            <div className="why-choose-media">
              <img
                src={aboutUsImage}
                alt="Madhavam Realty advisors reviewing property documents with a client"
                className="why-choose-img"
                loading="lazy"
              />
            </div>
          </div>

          {/* Six-up feature grid with vertical dividers */}
          <div className="why-choose-grid">
            {WHY_CHOOSE_FEATURES.map(({ icon: Icon, title, text }) => (
              <article className="why-choose-feature" key={title}>
                <span className="why-choose-icon" aria-hidden="true">
                  <Icon />
                </span>
                <h3 className="why-choose-feature-title">{title}</h3>
                <p className="why-choose-feature-text">{text}</p>
              </article>
            ))}
          </div>

          {/* Divider + centered CTA */}
          <div className="why-choose-footer">
            <Link to="/about" className="why-choose-cta">
              Know More About Us
              <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects — glowing hover slideshow */}
      <FeaturedProjects />

      {/* Property Services — 4 service categories + CTAs */}
      <PropertyServices />

      {/* Testimonials — 3-up carousel */}
      <Testimonials />

      {/* Awards & Recognition — after client testimonials */}
      <Awards />

      {/* Contact Section — requested questionnaire fields and action buttons */}
      <section className="home-contact" id="contact-preview">
        <div className="container home-contact-grid">
          <div className="home-contact-copy">
            <p className="eyebrow">
              Contact Section
              <span className="eyebrow-rule" aria-hidden="true" />
            </p>
            <h2 className="home-contact-heading">
              Tell us what you are looking for
            </h2>
            <p className="home-contact-text">
              Share your basic details and project interest. Our team can call,
              connect on WhatsApp, or schedule a focused consultation.
            </p>
            <div className="home-contact-points" aria-label="Consultation highlights">
              <span>Free consultation</span>
              <span>Same-day callback</span>
              <span>Site visit support</span>
            </div>
            <div className="home-contact-actions">
              <a href={telHref} className="home-contact-btn home-contact-btn-primary">
                <LuPhone aria-hidden="true" />
                Call Now
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="home-contact-btn home-contact-btn-outline"
              >
                <LuMessageCircle aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          <form className="home-contact-form">
            <div className="home-contact-form-head">
              <span className="home-contact-form-kicker">Quick Enquiry</span>
              <h3>Book a property consultation</h3>
            </div>
            <label className="home-contact-field">
              <span>Name</span>
              <input type="text" name="name" placeholder="Your full name" />
            </label>
            <label className="home-contact-field">
              <span>Phone</span>
              <input type="tel" name="phone" placeholder="+91 98765 43210" />
            </label>
            <label className="home-contact-field">
              <span>Email</span>
              <input type="email" name="email" placeholder="you@email.com" />
            </label>
            <label className="home-contact-field">
              <span>Project Interest</span>
              <select name="projectInterest" defaultValue="">
                <option value="" disabled>Select project interest</option>
                <option value="residential">Residential Property</option>
                <option value="commercial">Commercial Property</option>
                <option value="land">Land / Plotted Development</option>
                <option value="leasing">Leasing Requirement</option>
              </select>
            </label>
            <label className="home-contact-field home-contact-field-wide">
              <span>Message</span>
              <textarea
                name="message"
                rows="4"
                placeholder="Tell us your budget, preferred location, timeline, or any project you want to discuss."
              />
            </label>
            <button type="button" className="home-consultation-btn">
              <LuCalendarCheck aria-hidden="true" />
              Book Consultation
            </button>
          </form>
        </div>
      </section>

      {/* Blog Section — three placeholder blogs with CTA */}
      <section className="home-blogs" id="blog-preview">
        <div className="container">
          <div className="home-blogs-head">
            <p className="eyebrow eyebrow--center">Blog Section</p>
            <h2 className="home-blogs-heading">Latest property insights</h2>
            <p className="home-blogs-text">
              Short reads from our advisory team on buying, investing, and
              preparing for property consultations.
            </p>
          </div>

          <div className="home-blogs-grid">
            {BLOG_PREVIEWS.map((post) => (
              <article className="home-blog-card" key={post.title}>
                <div className="home-blog-media">
                  <img src={post.image} alt="" loading="lazy" />
                  <span className="home-blog-number">{post.number}</span>
                </div>
                <div className="home-blog-body">
                  <div className="home-blog-meta" aria-label={`${post.author}, ${post.updated}, ${post.readTime}`}>
                    <span>{post.author}</span>
                    <span>{post.updated}</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.text}</p>
                  <Link to="/blog" className="home-blog-readmore">
                    Read More
                    <LuArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="home-blogs-footer">
            <Link to="/blog" className="home-blogs-cta">
              See more blogs
              <LuArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
