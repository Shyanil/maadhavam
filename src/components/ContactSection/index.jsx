import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  LuPhone,
  LuMail,
  LuMapPin,
  LuClock,
  LuSend,
  LuChevronDown,
  LuShieldCheck,
} from 'react-icons/lu';
import Reveal from '../Reveal';
import { CONTACT_INFO } from '../../utils/constants';

const PROJECT_OPTIONS = ['Residential', 'Commercial', 'Land', 'Leasing', 'Other'];
const EMPTY = { name: '', phone: '', email: '', interest: '' };

export default function ContactSection() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const update = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Backend not wired yet — acknowledge and reset.
    setTimeout(() => {
      toast.success("Thank you! We'll get back to you shortly.");
      setForm(EMPTY);
      setSubmitting(false);
    }, 600);
  };

  const telHref = `tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`;

  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        {/* Info — dark maroon panel */}
        <Reveal className="contact-info" y={28}>
          <span className="contact-info-grid" aria-hidden="true" />
          <div className="contact-info-inner">
            <p className="eyebrow eyebrow--light">
              Get In Touch
              <span className="eyebrow-rule" aria-hidden="true" />
            </p>
            <h2 className="contact-heading">
              Let&rsquo;s Discuss Your Property Needs
            </h2>
            <p className="contact-sub">
              Share a few details and our team will reach out with tailored
              guidance for your next move.
            </p>

            <ul className="contact-details">
              <li>
                <span className="contact-detail-icon" aria-hidden="true">
                  <LuPhone />
                </span>
                <a href={telHref}>{CONTACT_INFO.phone}</a>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden="true">
                  <LuMail />
                </span>
                <a href={`mailto:${CONTACT_INFO.email}`}>{CONTACT_INFO.email}</a>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden="true">
                  <LuMapPin />
                </span>
                <span>{CONTACT_INFO.address}</span>
              </li>
              <li>
                <span className="contact-detail-icon" aria-hidden="true">
                  <LuClock />
                </span>
                <span>{CONTACT_INFO.workingHours}</span>
              </li>
            </ul>

            <div className="contact-reassure">
              <LuShieldCheck aria-hidden="true" />
              We typically reply within 24 hours — no spam, ever.
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal as="form" className="contact-form" delay={0.1} y={28} onSubmit={handleSubmit}>
          <h3 className="contact-form-title">Request a Callback</h3>

          <div className="contact-field">
            <label htmlFor="cf-name">
              Name <span className="req" aria-hidden="true">*</span>
            </label>
            <input
              id="cf-name"
              name="name"
              type="text"
              value={form.name}
              onChange={update}
              required
              placeholder="Your full name"
              autoComplete="name"
            />
          </div>

          <div className="contact-row">
            <div className="contact-field">
              <label htmlFor="cf-phone">
                Phone <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="cf-phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={update}
                required
                placeholder="+91 98765 43210"
                autoComplete="tel"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="cf-email">
                Email <span className="req" aria-hidden="true">*</span>
              </label>
              <input
                id="cf-email"
                name="email"
                type="email"
                value={form.email}
                onChange={update}
                required
                placeholder="you@email.com"
                autoComplete="email"
              />
            </div>
          </div>

          <div className="contact-field">
            <label htmlFor="cf-interest">
              Project Interest <span className="req" aria-hidden="true">*</span>
            </label>
            <div className="contact-select">
              <select
                id="cf-interest"
                name="interest"
                value={form.interest}
                onChange={update}
                required
              >
                <option value="" disabled>
                  Select an option
                </option>
                {PROJECT_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <LuChevronDown className="contact-select-icon" aria-hidden="true" />
            </div>
          </div>

          <button type="submit" className="contact-submit" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send Enquiry'}
            <LuSend aria-hidden="true" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
