import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import SEO from '../../components/SEO';
import { uploadAdminImage } from '../../services/supabase';

export default function AdminProjects() {
  const { projects, loading, createProject, deleteProject } = useProjects();
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [type, setType] = useState('Residential');
  const [location, setLocation] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    const { data: imageUrl, error: imageError } = await uploadAdminImage(
      'project-images',
      imageFile,
      'projects'
    );

    if (imageError) {
      toast.error(imageError.message || 'Failed to upload project image');
      setSubmitting(false);
      return;
    }

    const projectData = {
      title: title.trim(),
      tag: tag.trim(),
      image_url: imageUrl,
      location: location.trim(),
      type,
      featured,
    };

    const { success, error } = await createProject(projectData);
    if (success) {
      toast.success('Project added successfully!');
      setTitle('');
      setTag('');
      setLocation('');
      setFeatured(false);
      setImageFile(null);
      e.target.reset();
      setShowAddForm(false);
    } else {
      toast.error(error?.message || 'Failed to create project');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this project listing?')) {
      const { success } = await deleteProject(id);
      if (success) {
        toast.success('Project deleted successfully');
      } else {
        toast.error('Failed to delete project');
      }
    }
  };

  return (
    <>
      <SEO customTitle="Manage Listings | Madhavam Admin" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>Property Listings Manager</h2>
            <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>Manage residential plots, villas, and apartments catalog.</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="btn-admin-primary"
          >
            <FiPlus /> {showAddForm ? 'Close Form' : 'Add Property'}
          </button>
        </div>

        {/* Add Form Panel */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Property Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Madhavam Gold Meadows" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Project Tag</label>
              <input type="text" required value={tag} onChange={(e) => setTag(e.target.value)} placeholder="e.g. Premium Apartments" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Property Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="admin-select">
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Land">Land</option>
                <option value="Leasing">Leasing</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Location</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. New Town, Kolkata" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Project Image</label>
              <input type="file" required accept="image/webp" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="admin-input" />
              <span style={{ color: 'var(--admin-text-secondary)', fontSize: 'var(--text-xs)' }}>WebP only. Maximum 200 KB.</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                id="project-featured"
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--admin-accent-gold)' }}
              />
              <label htmlFor="project-featured" style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>
                Show as featured project
              </label>
            </div>

            <button type="submit" disabled={submitting} className="btn-admin-primary" style={{ gridColumn: 'span 2' }}>
              {submitting ? 'Uploading...' : 'Add Project'}
            </button>
          </form>
        )}

        {/* Listings Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>Loading properties...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Tag</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <img src={project.image_url} alt={project.title} style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <strong>{project.title}</strong>
                    </td>
                    <td>{project.tag}</td>
                    <td>{project.type}</td>
                    <td>{project.location}</td>
                    <td>{project.featured ? 'Yes' : 'No'}</td>
                    <td>
                      <button 
                        onClick={() => handleDelete(project.id)} 
                        style={{ color: 'var(--admin-error)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}
                        title="Delete Property"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </>
  );
}
