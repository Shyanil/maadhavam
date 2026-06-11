import React, { useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { LuStar } from 'react-icons/lu';
import TimelineContent from './TimelineContent';

const AV = (id) =>
  `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&crop=faces&q=80`;

const TESTIMONIALS = [
  {
    name: 'Rahul Agarwal',
    role: 'Business Owner, Kolkata',
    quote:
      'Madhavam Realty made our property search completely stress-free. Their market knowledge, transparency, and attention to detail helped us find the perfect commercial space within our budget.',
    image: AV('1633332755192-727a05c4013d'),
  },
  {
    name: 'Priya Sharma',
    role: 'Homebuyer, New Town',
    quote:
      'As first-time homebuyers, we had countless questions. The team guided us through every step, from property selection to registration.',
    image: AV('1494790108377-be9c29b29330'),
  },
  {
    name: 'Anirban Chatterjee',
    role: 'Investor, Rajarhat',
    quote:
      'Their investment insights and local expertise helped us identify a high-potential property in Rajarhat. The entire process was smooth, professional, and highly transparent.',
    image: AV('1507003211169-0a1dd7228f2d'),
  },
  {
    name: 'Sneha Gupta',
    role: 'IT Professional, Howrah',
    quote:
      'What impressed us most was their honest advice. Instead of pushing sales, they focused on understanding our needs and recommending the right property for our family.',
    image: AV('1573497019940-1c28c88b4f3e'),
  },
  {
    name: 'Ritika Jain',
    role: 'Entrepreneur',
    quote:
      "Their strong network of reputed developers gave us access to projects we wouldn't have discovered otherwise. Seamless from start to finish.",
    image: AV('1544005313-94ddf0286df2'),
  },
  {
    name: 'Arindam Mukherjee',
    role: 'Property Investor',
    quote:
      'From site visits to documentation and final possession, Madhavam Realty handled everything with professionalism. I would highly recommend them to anyone looking for trusted property guidance.',
    image: AV('1500648767791-00dcc994a43e'),
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const reduceMotion = useReducedMotion();

  // Staggered blur-up reveal, mirroring the source component's revealVariants.
  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: reduceMotion ? 0 : i * 0.15,
        duration: reduceMotion ? 0.2 : 0.5,
      },
    }),
    hidden: {
      filter: reduceMotion ? 'blur(0px)' : 'blur(10px)',
      y: reduceMotion ? 0 : -20,
      opacity: 0,
    },
  };

  const renderCard = (idx, variant, withGrid, num) => {
    const t = TESTIMONIALS[idx];
    return (
      <TimelineContent
        as="figure"
        className={`tm-card ${variant}`.trim()}
        animationNum={num}
        customVariants={revealVariants}
        timelineRef={sectionRef}
      >
        {withGrid && <span className="tm-card-grid" aria-hidden="true" />}
        <div className="tm-card-body">
          <div
            className="tm-stars"
            role="img"
            aria-label="Rated 5 out of 5 stars"
          >
            {[0, 1, 2, 3, 4].map((s) => (
              <LuStar key={s} aria-hidden="true" />
            ))}
          </div>
          <blockquote className="tm-quote">{t.quote}</blockquote>
          <figcaption className="tm-foot">
            <span className="tm-foot-meta">
              <span className="tm-person-name">{t.name}</span>
              <span className="tm-person-role">{t.role}</span>
            </span>
            <img
              className="tm-photo"
              src={t.image}
              alt={t.name}
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
            />
          </figcaption>
        </div>
      </TimelineContent>
    );
  };

  return (
    <section className="testimonials" id="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="tm-head">
          <TimelineContent
            as="p"
            className="tm-eyebrow"
            animationNum={0}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            Testimonials
          </TimelineContent>
          <TimelineContent
            as="h2"
            className="tm-heading"
            animationNum={1}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            What Our Clients Say
          </TimelineContent>
          <TimelineContent
            as="p"
            className="tm-sub"
            animationNum={2}
            customVariants={revealVariants}
            timelineRef={sectionRef}
          >
            Trusted by homebuyers, investors, and businesses across Kolkata for
            transparent guidance and personalized real estate solutions.
          </TimelineContent>
        </div>

        {/* All testimonials in one frame — uniform grid, no slider */}
        <div className="tm-grid">
          {renderCard(0, 'tm-card--feature', true, 0)}
          {renderCard(1, 'tm-card--dark', false, 1)}
          {renderCard(2, '', false, 2)}
          {renderCard(3, '', false, 3)}
          {renderCard(4, 'tm-card--dark', false, 4)}
          {renderCard(5, 'tm-card--feature', true, 5)}
        </div>

        <div className="tm-frame" aria-hidden="true" />
      </div>
    </section>
  );
}
