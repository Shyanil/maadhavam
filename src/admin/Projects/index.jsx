import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import SEO from '../../components/SEO';

export default function AdminProjects() {
  const { projects, loading, createProject, deleteProject } = useProjects();
  const [showAddForm, setShowAddForm] = useState(false);
  
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Residential Villa');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const projectData = {
      title,
      type,
      location,
      price,
      area,
      description,
      image: image || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      features: ['24/7 Security', 'Water Supply', 'Road Connectivity'],
    };

    const { success } = await createProject(projectData);
    if (success) {
      toast.success('Project added successfully!');
      setTitle('');
      setLocation('');
      setPrice('');
      setArea('');
      setDescription('');
      setImage('');
      setShowAddForm(false);
    } else {
      toast.error('Failed to create project');
    }
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
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Property Type</label>
              <select value={type} onChange={(e) => setType(e.target.value)} className="admin-select">
                <option value="Residential Villa">Residential Villa</option>
                <option value="Plots & Land">Plots & Land</option>
                <option value="Luxury Apartment">Luxury Apartment</option>
                <option value="Commercial Space">Commercial Space</option>
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Location</label>
              <input type="text" required value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. City Centre, Gwalior" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Price (INR / Display label)</label>
              <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. ₹50 Lakhs - 1.2 Cr" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Area Range</label>
              <input type="text" required value={area} onChange={(e) => setArea(e.target.value)} placeholder="e.g. 1200 - 2400 Sq.Ft." className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Image URL</label>
              <input type="url" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Unsplash image URL" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', gridColumn: 'span 2' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Description</label>
              <textarea required rows="3" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Property highlights, layouts, structural specifications details..." className="admin-textarea" />
            </div>

            <button type="submit" className="btn-admin-primary" style={{ gridColumn: 'span 2' }}>
              Add Property Listing
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
                  <th>Type</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Area</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <img src={project.image} alt={project.title} style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <strong>{project.title}</strong>
                    </td>
                    <td>{project.type}</td>
                    <td>{project.location}</td>
                    <td>{project.price}</td>
                    <td>{project.area}</td>
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
