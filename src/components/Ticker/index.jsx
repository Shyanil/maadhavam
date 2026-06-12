import React from 'react';
import {
  LuUserCheck,
  LuMapPin,
  LuShieldCheck,
  LuHandshake,
  LuBuilding2,
  LuChartColumnIncreasing,
} from 'react-icons/lu';

// Key differentiators surfaced as a lightweight scrolling strip. Edit labels
// here to change what loops past the hero.
const ITEMS = [
  { icon: LuUserCheck, label: 'Personalized Consultation' },
  { icon: LuMapPin, label: 'Local Market Expertise' },
  { icon: LuShieldCheck, label: 'Transparent Guidance' },
  { icon: LuHandshake, label: 'End-to-End Support' },
  { icon: LuBuilding2, label: 'Premium Developer Network' },
  { icon: LuChartColumnIncreasing, label: 'Smart Investment Insights' },
];

// One self-contained run of the items. We render it twice inside the track so
// translating the track by -50% produces a seamless infinite loop. The second
// copy is hidden from assistive tech to avoid reading everything twice.
function TickerGroup({ duplicate = false }) {
  return (
    <ul className="ticker-group" aria-hidden={duplicate || undefined}>
      {ITEMS.map(({ icon: Icon, label }) => (
        <li className="ticker-item" key={label}>
          <Icon className="ticker-icon" aria-hidden="true" />
          <span className="ticker-label">{label}</span>
          <span className="ticker-sep" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

export default function Ticker() {
  return (
    <section className="ticker" aria-label="Why clients choose Madhavam Realty">
      <div className="ticker-track">
        <TickerGroup />
        <TickerGroup duplicate />
      </div>
    </section>
  );
}
