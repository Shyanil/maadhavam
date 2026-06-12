import React, { useEffect } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiLayout, FiMail, FiLayers, FiFileText, FiTrendingUp, FiSettings, FiLogOut, FiHome } from 'react-icons/fi';
import { ROUTES } from '../utils/constants';
import '../styles/admin.css';

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate(ROUTES.ADMIN_LOGIN);
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    const { success } = await logout();
    if (success) {
      navigate(ROUTES.ADMIN_LOGIN);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
        <h3>Verifying administrative credentials...</h3>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="admin-container">
      
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-logo">MADHAVAM ADMIN</div>
        
        <nav className="admin-nav">
          <NavLink to={ROUTES.ADMIN_DASHBOARD} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiLayout /> Dashboard
          </NavLink>
          <NavLink to={ROUTES.ADMIN_LEADS} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiMail /> Leads / Enquiries
          </NavLink>
          <NavLink to={ROUTES.ADMIN_PROJECTS} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiLayers /> Properties
          </NavLink>
          <NavLink to={ROUTES.ADMIN_BLOG} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiFileText /> Blog Editor
          </NavLink>
          <NavLink to={ROUTES.ADMIN_ANALYTICS} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiTrendingUp /> Analytics
          </NavLink>
          <NavLink to={ROUTES.ADMIN_SETTINGS} className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <FiSettings /> Settings
          </NavLink>
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Link to="/" className="admin-nav-item" style={{ color: 'var(--accent-gold)' }}>
            <FiHome /> Public Site
          </Link>
          <button onClick={handleLogout} className="admin-nav-item" style={{ border: 'none', background: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
            <FiLogOut /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="admin-main">
        <Outlet />
      </main>

    </div>
  );
}
