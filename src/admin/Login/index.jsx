import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import SEO from '../../components/SEO';

export default function AdminLogin() {
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    const { success, error } = await login(email, password);
    if (!success) {
      setErrorMsg(error.message || 'Invalid email or password');
    }
  };

  return (
    <>
      <SEO customTitle="Admin Portal Login | Madhavam Realty" />
      
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--neutral-200)',
        padding: '20px'
      }}>
        <div className="glass-card animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--secondary)' }}>Madhavam Realty</h2>
            <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>Admin Dashboard Sign In</p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(231, 29, 54, 0.12)',
              color: 'var(--error)',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--text-sm)',
              marginBottom: '20px',
              border: '1px solid rgba(231, 29, 54, 0.2)'
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@madhavam.com"
                style={{
                  padding: '12px 16px',
                  border: '1px solid var(--neutral-400)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'white'
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="password" style={{ fontSize: 'var(--text-sm)', fontWeight: '600' }}>Password</label>
              <input 
                id="password"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  padding: '12px 16px',
                  border: '1px solid var(--neutral-400)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'white'
                }}
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn btn-primary" 
              style={{ width: '100%', borderRadius: 'var(--radius-md)', padding: '14px' }}
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: 'var(--text-xs)', color: 'var(--neutral-600)' }}>
            <p>Mock login: <strong>admin@madhavam.com</strong> / <strong>admin123</strong></p>
          </div>
        </div>
      </section>
    </>
  );
}
