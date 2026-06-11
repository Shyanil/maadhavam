import React from 'react';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/helpers';

export default function BlogCard({ blog }) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Blog Image */}
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <img 
          src={blog.image} 
          alt={blog.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      {/* Info Body */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--secondary)' }}>
          {blog.title}
        </h3>
        <p style={{ color: 'var(--neutral-700)', fontSize: 'var(--text-sm)' }}>
          {truncateText(blog.excerpt, 90)}
        </p>
        
        <Link to={`/blog/${blog.slug}`} style={{
          marginTop: 'auto',
          color: 'var(--primary)',
          fontWeight: '600',
          fontSize: 'var(--text-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          Read Article &rarr;
        </Link>
      </div>

    </div>
  );
}
