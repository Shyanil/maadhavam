import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import ProjectCard from '../../components/ProjectCard';
import SEO from '../../components/SEO';

export default function Projects() {
  const { projects, loading } = useProjects();
  const [filter, setFilter] = useState('All');

  // Filter projects based on selection
  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.type.toLowerCase().includes(filter.toLowerCase()));

  const filterTabs = ['All', 'Villa', 'Plots', 'Apartment'];

  return (
    <>
      <SEO pageKey="projects" />
      
      {/* Page Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>Our Projects Portfolio</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)' }}>
            Discover Gwalior's finest residential plots, premium villas, and commercial real estate.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="container" style={{ marginTop: '40px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="btn"
              style={{
                backgroundColor: filter === tab ? 'var(--primary)' : 'var(--neutral-100)',
                color: filter === tab ? 'white' : 'var(--neutral-800)',
                border: '1px solid var(--neutral-400)',
                padding: '8px 20px',
                fontSize: 'var(--text-sm)'
              }}
            >
              {tab === 'All' ? 'All Properties' : tab + 's'}
            </button>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>Loading projects...</div>
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--neutral-600)' }}>
            No projects found matching the filter.
          </div>
        ) : (
          <div className="grid-cols-3">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
