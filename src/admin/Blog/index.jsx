import React, { useState, useEffect } from 'react';
import { blogService } from '../../services/blogService';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import SEO from '../../components/SEO';
import { uploadAdminImage } from '../../services/supabase';

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [imageFile, setImageFile] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    const { data } = await blogService.getAllBlogs();
    setBlogs(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const { data: imageUrl, error: imageError } = await uploadAdminImage(
      'blog-images',
      imageFile,
      'blogs'
    );

    if (imageError) {
      toast.error(imageError.message || 'Failed to upload blog image');
      setSubmitting(false);
      return;
    }

    const blogData = {
      title: title.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim() || 'Admin',
      image: imageUrl,
      tags: ['News', 'Gwalior'],
    };

    const { error } = await blogService.createBlog(blogData);
    if (!error) {
      toast.success('Blog post created successfully!');
      setTitle('');
      setExcerpt('');
      setContent('');
      setAuthor('Admin');
      setImageFile(null);
      e.target.reset();
      setShowAddForm(false);
      fetchBlogs();
    } else {
      toast.error(error.message || 'Failed to create blog post');
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog post?')) {
      const { error } = await blogService.deleteBlog(id);
      if (!error) {
        toast.success('Blog post deleted successfully');
        fetchBlogs();
      } else {
        toast.error('Failed to delete blog post');
      }
    }
  };

  return (
    <>
      <SEO customTitle="Manage Blog | Madhavam Admin" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>Article & Blog Manager</h2>
            <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>Create and publish market guides and construction updates.</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)} 
            className="btn-admin-primary"
          >
            <FiPlus /> {showAddForm ? 'Close Form' : 'Write Article'}
          </button>
        </div>

        {/* Form Panel */}
        {showAddForm && (
          <form onSubmit={handleSubmit} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Article Title</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Why Gwalior Airport Road properties are appreciating fast" className="admin-input" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Excerpt / Summary</label>
              <input type="text" required value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Brief summary of the article..." className="admin-input" />
            </div>

            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Author Name</label>
                <input type="text" required value={author} onChange={(e) => setAuthor(e.target.value)} className="admin-input" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Cover Image</label>
                <input type="file" required accept="image/webp" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="admin-input" />
                <span style={{ color: 'var(--admin-text-secondary)', fontSize: 'var(--text-xs)' }}>WebP only. Maximum 200 KB.</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Full Article Body</label>
              <textarea required rows="8" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Detailed paragraphs content here..." className="admin-textarea" />
            </div>

            <button type="submit" disabled={submitting} className="btn-admin-primary">
              {submitting ? 'Uploading...' : 'Publish Blog Post'}
            </button>
          </form>
        )}

        {/* Listings Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>Loading articles...</div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Excerpt</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <img src={blog.image} alt={blog.title} style={{ width: '60px', height: '40px', borderRadius: '4px', objectFit: 'cover' }} />
                    </td>
                    <td>
                      <strong>{blog.title}</strong>
                    </td>
                    <td>{blog.author}</td>
                    <td style={{ color: 'var(--admin-text-secondary)', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {blog.excerpt}
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(blog.id)} 
                        style={{ color: 'var(--admin-error)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}
                        title="Delete Article"
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
