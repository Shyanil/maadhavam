import React from 'react';
import { useLeads } from '../../hooks/useLeads';
import { useProjects } from '../../hooks/useProjects';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SEO from '../../components/SEO';

const ANALYTICS_DATA = [
  { name: 'Jan', Leads: 12 },
  { name: 'Feb', Leads: 19 },
  { name: 'Mar', Leads: 15 },
  { name: 'Apr', Leads: 27 },
  { name: 'May', Leads: 32 },
  { name: 'Jun', Leads: 45 },
];

export default function AdminDashboard() {
  const { leads } = useLeads();
  const { projects } = useProjects();

  const activeLeadsCount = leads.length;
  const projectsCount = projects.length;
  const newLeads = leads.filter(l => l.status === 'new').length;

  return (
    <>
      <SEO customTitle="Admin Dashboard | Madhavam Realty" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h2>Dashboard Overview</h2>
          <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>Real-time business parameters for Madhavam Realty Gwalior</p>
        </div>

        {/* Metrics Grid */}
        <div className="admin-metrics-grid">
          <div className="metric-card leads-card">
            <span className="metric-card-title">Total Leads</span>
            <div className="metric-card-value">{activeLeadsCount}</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--admin-accent-gold)' }}>&bull; All customer enquiries</p>
          </div>
          <div className="metric-card new-card">
            <span className="metric-card-title">New Inquiries</span>
            <div className="metric-card-value">{newLeads}</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--admin-warning)' }}>&bull; Awaiting callback response</p>
          </div>
          <div className="metric-card projects-card">
            <span className="metric-card-title">Active Projects</span>
            <div className="metric-card-value">{projectsCount}</div>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--admin-success)' }}>&bull; Real estate properties catalog</p>
          </div>
        </div>

        {/* Analytics Charts */}
        <div className="glass-card" style={{ padding: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--admin-text-primary)', fontFamily: 'var(--font-serif)' }}>Lead Acquisition Trend (2026)</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={ANALYTICS_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--admin-accent-gold)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--admin-accent-gold)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                <XAxis dataKey="name" stroke="var(--admin-text-secondary)" tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }} />
                <YAxis stroke="var(--admin-text-secondary)" tick={{ fill: 'var(--admin-text-secondary)', fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: '#121520', borderColor: 'var(--admin-border)', color: 'var(--admin-text-primary)' }} />
                <Area type="monotone" dataKey="Leads" stroke="var(--admin-accent-gold)" fillOpacity={1} fill="url(#colorLeads)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </>
  );
}
