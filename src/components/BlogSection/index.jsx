import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { LuChevronRight, LuChevronLeft } from 'react-icons/lu';
import Reveal from '../Reveal';

// Import local assets for blog images
import edenImg from '../../assets/eden_devprayag.webp';
import vinayakImg from '../../assets/vinayak_21_acre.webp';
import bhawaniImg from '../../assets/bhawani_paraiso.webp';
import dtcImg from '../../assets/dtc_still_waters.webp';
import psImg from '../../assets/ps_sansara.webp';
import slider3Img from '../../assets/hero_slider_3.webp';

const POSTS = [
  {
    id: 'post-1',
    tag: 'Buying Guide',
    date: 'Jun 12, 2026',
    read: '4 min read',
    title: 'How to Choose the Right Property Location in Kolkata',
    excerpt: 'Verify legal due diligence, transport connections, and long-term values before signing.',
    image: edenImg,
    category: 'Buying Guide',
    originalIndex: 0
  },
  {
    id: 'post-2',
    tag: 'Market Trends',
    date: 'May 28, 2026',
    read: '5 min read',
    title: 'Residential vs Commercial: Which Segment Offers Higher Yield?',
    excerpt: 'Compare the capital timelines, risks, and rental yields of residential vs commercial segments.',
    image: vinayakImg,
    category: 'Market Trends',
    originalIndex: 1
  },
  {
    id: 'post-3',
    tag: 'Investment',
    date: 'May 15, 2026',
    read: '3 min read',
    title: 'Understanding Kolkata Real Estate Appreciation Rates',
    excerpt: 'Analyze Gwalior and Kolkata growth corridors to find high-appreciation plotted layouts.',
    image: bhawaniImg,
    category: 'Investment',
    originalIndex: 2
  },
  {
    id: 'post-4',
    tag: 'Buying Guide',
    date: 'May 02, 2026',
    read: '6 min read',
    title: 'Top Legal Checklist Before Buying Land or Plots',
    excerpt: 'Verify mutation papers, title deeds, land tax receipts, and municipal conversion clearance.',
    image: dtcImg,
    category: 'Buying Guide',
    originalIndex: 3
  },
  {
    id: 'post-5',
    tag: 'Investment',
    date: 'Apr 18, 2026',
    read: '4 min read',
    title: 'Maximize Your Commercial Property Rental Returns',
    excerpt: 'Identify corporate tenant criteria, yield optimization tips, and commercial lease layouts.',
    image: psImg,
    category: 'Investment',
    originalIndex: 4
  },
  {
    id: 'post-6',
    tag: 'Market Trends',
    date: 'Apr 05, 2026',
    read: '5 min read',
    title: 'Why Newtown and Rajarhat are Kolkata\'s Hottest Hubs',
    excerpt: 'Investigate commercial IT park expansions, transit links, and premium developer projects.',
    image: slider3Img,
    category: 'Market Trends',
    originalIndex: 5
  },
];

export default function BlogSection() {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [active, setActive] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [paused, setPaused] = useState(false);
  const autoplayTimer = useRef(null);

  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'All') return POSTS;
    return POSTS.filter(post => post.tag === selectedFilter || post.category === selectedFilter);
  }, [selectedFilter]);

  // Replicate the list three times for seamless infinite loop translation
  const displayPosts = useMemo(() => {
    if (filteredPosts.length === 0) return [];
    return [...filteredPosts, ...filteredPosts, ...filteredPosts];
  }, [filteredPosts]);

  // Initialize active index in the middle set of cloned items
  useEffect(() => {
    setIsTransitioning(false);
    setActive(filteredPosts.length);
    setTimeout(() => {
      setIsTransitioning(true);
    }, 50);
  }, [filteredPosts.length]);

  const handleNext = useCallback(() => {
    if (filteredPosts.length === 0) return;
    setActive((prev) => prev + 1);
  }, [filteredPosts.length]);

  const handlePrev = useCallback(() => {
    if (filteredPosts.length === 0) return;
    setActive((prev) => prev - 1);
  }, [filteredPosts.length]);

  // Autoplay loop
  useEffect(() => {
    if (paused || filteredPosts.length === 0) return undefined;
    autoplayTimer.current = setInterval(() => {
      handleNext();
    }, 4000);
    return () => {
      if (autoplayTimer.current) clearInterval(autoplayTimer.current);
    };
  }, [paused, handleNext, filteredPosts.length]);

  // Seamless jump wrap-around for infinite scroll
  useEffect(() => {
    if (filteredPosts.length === 0) return;
    if (active >= filteredPosts.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActive(active - filteredPosts.length);
      }, 600); // matches transition time
      return () => clearTimeout(timer);
    }
    if (active < filteredPosts.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setActive(active + filteredPosts.length);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [active, filteredPosts.length]);

  // Turn transition back on after jump
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  return (
    <section
      className="blog-slider-section"
      id="blog"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {/* Header Grid */}
        <div className="blog-slider-head">
          <div className="blog-slider-left">
            <Reveal as="p" className="eyebrow">
              Insights &amp; Guides
              <span className="eyebrow-rule" aria-hidden="true" />
            </Reveal>
            <Reveal as="h2" delay={0.05}>
              Madhavam Realty Blog
            </Reveal>

            {/* Category Filter Pills */}
            <div className="blog-slider-filters">
              {['All', 'Buying Guide', 'Market Trends', 'Investment'].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`blog-filter-btn${selectedFilter === filter ? ' is-active' : ''}`}
                  onClick={() => handleFilterChange(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="blog-slider-right">
            <p className="blog-slider-right-sub">
              Every article is crafted to bring you closer to making transparent,
              informed real estate decisions in Kolkata. Get inspired. Get informed. Get involved.
            </p>
          </div>
        </div>

        {/* Horizontal Card Slider Container */}
        {filteredPosts.length > 0 && (
          <div className="blog-slider-container">
            <div className="blog-slider-viewport">
              <div
                className="blog-slider-track"
                style={{
                  transform: `translateX(var(--bs-translate))`,
                  transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  '--bs-translate': `calc(-${active} * var(--bs-slide-width-with-gap))`
                }}
              >
                {displayPosts.map((post, idx) => (
                  <div key={`${post.id}-${idx}`} className="blog-slider-card-wrap">
                    <Link to="/blog" className="blog-slider-card">
                      <div className="blog-slider-image-box">
                        <img src={post.image} alt={post.title} loading="lazy" />
                      </div>
                      <div className="blog-slider-card-content">
                        <div className="blog-slider-card-meta-row">
                          <span className="blog-slider-card-tag">{post.tag}</span>
                          <span className="blog-slider-card-date">{post.date} · {post.read}</span>
                        </div>
                        <h3 className="blog-slider-card-title">{post.title}</h3>
                        <p className="blog-slider-card-desc">{post.excerpt}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Centered Left & Right Navigation Controls below the track */}
            <div className="blog-slider-controls">
              <button
                type="button"
                className="blog-slider-control-btn"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <LuChevronLeft aria-hidden="true" />
              </button>
              <button
                type="button"
                className="blog-slider-control-btn"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <LuChevronRight aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
