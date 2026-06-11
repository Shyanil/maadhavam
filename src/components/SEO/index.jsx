import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIGS } from '../../utils/seo';

export default function SEO({ pageKey, customTitle, customDescription }) {
  const defaults = SEO_CONFIGS[pageKey] || SEO_CONFIGS.home;
  
  const title = customTitle || defaults.title;
  const description = customDescription || defaults.description;
  const keywords = defaults.keywords || 'Madhavam Realty, Gwalior properties';

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
