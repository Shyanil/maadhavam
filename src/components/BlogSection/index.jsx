import React from 'react';
import { Link } from 'react-router-dom';
import { LuCalendar, LuClock, LuArrowRight } from 'react-icons/lu';
import Reveal from '../Reveal';

const IMG = (id) =>
  `https://images.unsplash.com/photo-${id}?w=800&q=80&auto=format&fit=crop`;

// Dummy blog data — editable.
const POSTS = [
  {
    tag: 'Buying Guide',
    date: 'Jun 02, 2026',
    read: '5 min read',
    title: '5 Things to Check Before Buying Property in New Town',
    excerpt:
      'From legal due diligence to connectivity, here is what every first-time buyer in New Town should verify before signing.',
    image: IMG('1560518883-ce09059eeffa'),
  },
  {
    tag: 'Market Insights',
    date: 'May 20, 2026',
    read: '4 min read',
    title: "Why Rajarhat Is Kolkata's Fastest-Growing Investment Hub",
    excerpt:
      'Infrastructure, IT corridors, and steady appreciation make Rajarhat one of the smartest places to invest this year.',
    image: IMG('1568605114967-8130f3a36994'),
  },
  {
    tag: 'Investment',
    date: 'May 08, 2026',
    read: '6 min read',
    title: 'Residential vs Commercial: Which Investment Suits You?',
    excerpt:
      'We break down the returns, risks, and long-term value of residential and commercial properties in Kolkata.',
    image: IMG('1582407947304-fd86f028f716'),
  },
];

const Media = ({ post }) => (
  <div className="blog-card-media">
    <img
      src={post.image}
      alt={post.title}
      loading="lazy"
      onError={(e) => {
        e.currentTarget.style.display = 'none';
      }}
    />
    <span className="blog-card-tag">{post.tag}</span>
  </div>
);

const Meta = ({ post }) => (
  <span className="blog-card-meta">
    <span>
      <LuCalendar aria-hidden="true" />
      {post.date}
    </span>
    <span>
      <LuClock aria-hidden="true" />
      {post.read}
    </span>
  </span>
);

export default function BlogSection() {
  const [featured, ...rest] = POSTS;

  return (
    <section className="blog-preview" id="blog">
      <div className="container">
        <div className="blog-head">
          <div className="blog-head-text">
            <Reveal as="p" className="eyebrow">
              Our Blog
              <span className="eyebrow-rule" aria-hidden="true" />
            </Reveal>
            <Reveal as="h2" className="blog-heading" delay={0.05}>
              Insights From Our Experts
            </Reveal>
            <Reveal as="p" className="blog-sub" delay={0.1}>
              Guides, market trends, and tips to help you make smarter real
              estate decisions in Kolkata.
            </Reveal>
          </div>
          <Reveal className="blog-head-cta" delay={0.12}>
            <Link to="/blog" className="blog-viewall">
              View All Articles
              <LuArrowRight aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <div className="blog-grid">
          <Reveal className="blog-featured" y={32}>
            <Link to="/blog" className="blog-card blog-card--featured">
              <Media post={featured} />
              <div className="blog-card-body">
                <Meta post={featured} />
                <h3 className="blog-card-title">{featured.title}</h3>
                <p className="blog-card-excerpt">{featured.excerpt}</p>
                <span className="blog-card-link">
                  Read Article
                  <LuArrowRight aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="blog-list">
            {rest.map((post, i) => (
              <Reveal
                className="blog-rowitem"
                delay={0.1 + i * 0.1}
                y={24}
                key={post.title}
              >
                <Link to="/blog" className="blog-card blog-card--row">
                  <Media post={post} />
                  <div className="blog-card-body">
                    <Meta post={post} />
                    <h3 className="blog-card-title">{post.title}</h3>
                    <p className="blog-card-excerpt">{post.excerpt}</p>
                    <span className="blog-card-link">
                      Read More
                      <LuArrowRight aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
