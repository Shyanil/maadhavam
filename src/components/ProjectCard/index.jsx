import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      
      {/* Property Image */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
        <img 
          src={project.image} 
          alt={project.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <span className="badge" style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          backgroundColor: 'var(--primary)',
          color: 'white'
        }}>
          {project.type}
        </span>
      </div>

      {/* Info Content */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1, gap: '12px' }}>
        <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--secondary)' }}>{project.title}</h3>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-600)' }}>📍 {project.location}</p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', borderTop: '1px solid var(--neutral-300)', paddingTop: '12px' }}>
          <div>
            <span style={{ fontSize: 'var(--text-xs)', color: 'var(--neutral-600)' }}>Starting Price</span>
            <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{project.price}</p>
          </div>
          <Link to={`/projects/${project.slug}`} className="btn btn-primary" style={{ padding: '6px 14px', fontSize: 'var(--text-xs)', borderRadius: 'var(--radius-sm)' }}>
            Details
          </Link>
        </div>
      </div>

    </div>
  );
}
