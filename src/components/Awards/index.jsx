import React from 'react';
import { LuTrophy, LuMedal, LuAward, LuShieldCheck } from 'react-icons/lu';
import Reveal from '../Reveal';
import Counter from '../Counter';
import aboutUsImage from '../../assets/about_us.webp';

// Dummy awards data — editable.
const AWARDS = [
  { icon: LuTrophy, title: 'Best Property Consultancy', meta: 'Bengal Realty Awards · 2024' },
  { icon: LuMedal, title: 'Customer Trust Award', meta: 'Kolkata Realty Forum · 2023' },
  { icon: LuAward, title: 'Excellence in Land Advisory', meta: 'Eastern India Realty Summit · 2023' },
  { icon: LuShieldCheck, title: 'Transparent Deal Advisory', meta: 'Regional Property Forum · 2022' },
];

// Dummy stats — editable.
const STATS = [
  { to: 15, suffix: '+', label: 'Years of Trust' },
  { to: 1200, suffix: '+', label: 'Happy Families' },
  { to: 250, prefix: '₹', suffix: ' Cr+', label: 'Deals Closed' },
];

export default function Awards() {
  return (
    <section className="awards" id="awards">
      <div className="container awards-grid">
        <Reveal className="awards-media" y={32}>
          <div className="awards-media-frame">
            <img
              src={aboutUsImage}
              alt="Madhavam Realty recognised at an industry awards ceremony"
              className="awards-img"
              loading="lazy"
            />
          </div>
          <div className="awards-media-badge">
            <span className="awards-media-badge-icon" aria-hidden="true">
              <LuTrophy />
            </span>
            <div>
              <strong>4x</strong>
              <span>Industry Awards</span>
            </div>
          </div>
        </Reveal>

        <div className="awards-content">
          <Reveal as="p" className="eyebrow">
            Awards &amp; Recognition
            <span className="eyebrow-rule" aria-hidden="true" />
          </Reveal>
          <Reveal as="h2" className="awards-heading" delay={0.05}>
            Recognized for Trust &amp; Excellence
          </Reveal>
          <Reveal as="p" className="awards-sub" delay={0.1}>
            Our commitment to transparency and client-first service has been
            celebrated across the region&rsquo;s leading real estate forums.
          </Reveal>

          <div className="awards-list">
            {AWARDS.map(({ icon: Icon, title, meta }, i) => (
              <Reveal className="awards-item" delay={0.12 + i * 0.08} key={title}>
                <span className="awards-item-icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="awards-item-text">
                  <h3 className="awards-item-title">{title}</h3>
                  <p className="awards-item-meta">{meta}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="awards-stats">
            {STATS.map((s, i) => (
              <Reveal className="awards-stat" delay={0.2 + i * 0.1} key={s.label}>
                <span className="awards-stat-num">
                  <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} />
                </span>
                <span className="awards-stat-label">{s.label}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
