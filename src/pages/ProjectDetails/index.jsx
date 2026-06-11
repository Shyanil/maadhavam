import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProjects } from '../../hooks/useProjects';
import LeadForm from '../../components/LeadForm';
import SEO from '../../components/SEO';

export default function ProjectDetails() {
  const { slug } = useParams();
  const { getProject, loading } = useProjects();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const data = await getProject(slug);
      if (data) {
        setProject(data);
      }
    };
    fetchDetails();
  }, [slug, getProject]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Project Not Found</h2>
        <Link to="/projects" className="btn btn-primary">Back to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        customTitle={`${project.title} | ${project.type} in ${project.location}`}
        customDescription={`Learn about ${project.title}, offering premium ${project.type}s with areas of ${project.area} at ${project.location}. View pricing, specifications, and layout plans.`}
      />
      
      {/* Banner / Header */}
      <section className="section" style={{
        backgroundImage: `linear-gradient(rgba(1, 22, 39, 0.7), rgba(1, 22, 39, 0.8)), url(${project.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white',
        padding: '100px 0'
      }}>
        <div className="container">
          <span className="badge" style={{ backgroundColor: 'var(--accent-gold)', color: 'var(--secondary)', marginBottom: '16px' }}>{project.type}</span>
          <h1 style={{ color: 'var(--neutral-100)', fontSize: 'var(--text-4xl)' }}>{project.title}</h1>
          <p style={{ color: 'var(--neutral-300)', marginTop: '8px', fontSize: 'var(--text-lg)' }}>{project.location}</p>
        </div>
      </section>

      {/* Main Details Body */}
      <section className="section container" style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '50px' }}>
        
        {/* Left Hand Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          {/* Overview */}
          <div>
            <h2 style={{ marginBottom: '16px' }}>Overview</h2>
            <p style={{ color: 'var(--neutral-800)', fontSize: 'var(--text-base)' }}>{project.description}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px', backgroundColor: 'var(--neutral-100)', padding: '20px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <strong>Price Range:</strong>
                <p style={{ color: 'var(--primary)', fontSize: 'var(--text-lg)', fontWeight: 'bold', marginTop: '4px' }}>{project.price}</p>
              </div>
              <div>
                <strong>Property Area:</strong>
                <p style={{ color: 'var(--primary)', fontSize: 'var(--text-lg)', fontWeight: 'bold', marginTop: '4px' }}>{project.area}</p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h2 style={{ marginBottom: '16px' }}>Key Amenities</h2>
            <ul style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', paddingLeft: '20px' }}>
              {project.features.map((feature, idx) => (
                <li key={idx} style={{ color: 'var(--neutral-800)' }}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          {project.specifications && (
            <div>
              <h2 style={{ marginBottom: '16px' }}>Specifications</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(project.specifications).map(([key, val]) => (
                  <div key={key} style={{ borderBottom: '1px solid var(--neutral-300)', paddingBottom: '12px' }}>
                    <strong style={{ textTransform: 'capitalize' }}>{key}</strong>
                    <p style={{ color: 'var(--neutral-700)', marginTop: '4px' }}>{val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Hand Sidebar (Enquiry Form) */}
        <div>
          <div className="glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
            <h3 style={{ marginBottom: '10px' }}>Request Site Visit</h3>
            <p style={{ color: 'var(--neutral-700)', fontSize: 'var(--text-sm)', marginBottom: '20px' }}>
              Leave your contact details and our Gwalior sales representative will get back to you shortly.
            </p>
            <LeadForm projectName={project.title} />
          </div>
        </div>

      </section>
    </>
  );
}
