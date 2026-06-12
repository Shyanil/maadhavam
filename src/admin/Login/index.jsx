import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/admin.css';

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
      
      <section className="admin-container" style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div className="glass-card animate-fade-in" style={{ padding: '40px', width: '100%', maxWidth: '420px' }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--admin-accent-gold)' }}>Madhavam Realty</h2>
            <p style={{ color: 'var(--admin-text-secondary)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>Admin Dashboard Sign In</p>
          </div>

          {errorMsg && (
            <div style={{
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              color: 'var(--admin-error)',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: 'var(--text-sm)',
              marginBottom: '20px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="email" style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Email Address</label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@madhavam.com"
                className="admin-input"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label htmlFor="password" style={{ fontSize: 'var(--text-sm)', fontWeight: '600', color: 'var(--admin-text-primary)' }}>Password</label>
              <input 
                id="password"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="admin-input"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="btn-admin-primary" 
              style={{ width: '100%', padding: '14px', borderRadius: '8px' }}
            >
              {loading ? 'Verifying...' : 'Sign In'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: 'var(--text-xs)', color: 'var(--admin-text-secondary)' }}>
            <p>Admin credentials: <strong>admin@madhavam.com</strong> / <strong>AdminPassword123!</strong></p>
          </div>
        </div>
      </section>
    </>
  );
}
