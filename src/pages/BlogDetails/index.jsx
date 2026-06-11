import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import { formatDate } from '../../utils/helpers';
import SEO from '../../components/SEO';

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const { data } = await blogService.getBlogBySlug(slug);
      setBlog(data);
      setLoading(false);
    };
    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        Loading article details...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container" style={{ padding: '80px', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '20px' }}>Article Not Found</h2>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
      <SEO 
        customTitle={`${blog.title} | Madhavam Realty Blog`}
        customDescription={blog.excerpt}
      />
      
      {/* Article Content Layout */}
      <article className="container" style={{ padding: '80px 0', maxWidth: '800px' }}>
        
        {/* Breadcrumb */}
        <Link to="/blog" style={{ color: 'var(--primary)', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '30px' }}>
          &larr; Back to Blog Listing
        </Link>
        
        {/* Main Image */}
        <img 
          src={blog.image} 
          alt={blog.title} 
          style={{ width: '100%', borderRadius: 'var(--radius-lg)', marginBottom: '40px', objectFit: 'cover', maxHeight: '400px' }} 
        />
        
        {/* Heading */}
        <h1 style={{ color: 'var(--secondary)', fontSize: 'var(--text-3xl)', marginBottom: '16px', fontFamily: 'var(--font-serif)' }}>
          {blog.title}
        </h1>
        
        {/* Meta data */}
        <div style={{ display: 'flex', gap: '20px', color: 'var(--neutral-600)', fontSize: 'var(--text-sm)', borderBottom: '1px solid var(--neutral-300)', paddingBottom: '20px', marginBottom: '30px' }}>
          <span>By <strong>{blog.author}</strong></span>
          <span>&bull;</span>
          <span>{formatDate(blog.published_at)}</span>
        </div>

        {/* Paragraphs body */}
        <div style={{ color: 'var(--neutral-800)', fontSize: 'var(--text-base)', lineHeight: '1.8', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ fontSize: 'var(--text-lg)', fontWeight: '500', color: 'var(--neutral-900)' }}>{blog.excerpt}</p>
          <p>{blog.content}</p>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '40px', borderTop: '1px solid var(--neutral-300)', paddingTop: '20px' }}>
          {blog.tags && blog.tags.map((tag, idx) => (
            <span key={idx} className="badge" style={{ backgroundColor: 'var(--neutral-300)', color: 'var(--neutral-800)' }}>
              {tag}
            </span>
          ))}
        </div>

      </article>
    </>
  );
}
