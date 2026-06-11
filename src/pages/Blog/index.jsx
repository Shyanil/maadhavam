import React, { useEffect, useState } from 'react';
import { blogService } from '../../services/blogService';
import BlogCard from '../../components/BlogCard';
import SEO from '../../components/SEO';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      const { data } = await blogService.getAllBlogs();
      setBlogs(data || []);
      setLoading(false);
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO pageKey="blog" />
      
      {/* Intro Header */}
      <section className="section" style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '60px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ color: 'var(--accent-gold)' }}>Realty Insights & Guides</h1>
          <p style={{ marginTop: '12px', color: 'var(--neutral-400)', maxWidth: '600px', marginInline: 'auto' }}>
            Latest trends, investment updates, policy updates, and home buying tips for Gwalior real estate.
          </p>
        </div>
      </section>

      {/* Search Bar */}
      <section className="container" style={{ marginTop: '40px', marginBottom: '20px' }}>
        <div style={{ maxWidth: '500px', marginInline: 'auto' }}>
          <input 
            type="text" 
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px',
              border: '1px solid var(--neutral-400)',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--neutral-100)',
              color: 'var(--neutral-900)'
            }}
          />
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="section container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>Loading articles...</div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--neutral-600)' }}>
            No articles found matching your query.
          </div>
        ) : (
          <div className="grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
