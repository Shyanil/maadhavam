import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';
import SEO from '../../components/SEO';

const LEADS_BY_SOURCE = [
  { name: 'Direct Website', value: 34 },
  { name: 'WhatsApp Click', value: 48 },
  { name: 'Contact Form', value: 20 },
  { name: 'Land Leasing Form', value: 12 },
];

const MONTHLY_CONVERSIONS = [
  { name: 'Jan', Conversions: 4 },
  { name: 'Feb', Conversions: 8 },
  { name: 'Mar', Conversions: 5 },
  { name: 'Apr', Conversions: 11 },
  { name: 'May', Conversions: 14 },
  { name: 'Jun', Conversions: 22 },
];

const COLORS = ['#011627', '#2ec4b6', '#c5a880', '#e71d36'];

export default function AdminAnalytics() {
  return (
    <>
      <SEO customTitle="Platform Analytics | Madhavam Admin" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h2>Platform Analytics</h2>
          <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>Detailed breakdown of client acquisitions and lead sources.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          {/* Monthly Conversions */}
          <div className="glass-card" style={{ padding: '30px', backgroundColor: 'white' }}>
            <h3 style={{ marginBottom: '20px' }}>Monthly Site-Visit Conversions</h3>
            <div style={{ width: '100%', height: 260 }}>
              <ResponsiveContainer>
                <BarChart data={MONTHLY_CONVERSIONS}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Conversions" fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leads by Source */}
          <div className="glass-card" style={{ padding: '30px', backgroundColor: 'white' }}>
            <h3 style={{ marginBottom: '20px' }}>Inquiries By Acquisition Source</h3>
            <div style={{ width: '100%', height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={LEADS_BY_SOURCE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label
                  >
                    {LEADS_BY_SOURCE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '10px', fontSize: 'var(--text-xs)' }}>
              {LEADS_BY_SOURCE.map((entry, idx) => (
                <span key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '10px', height: '10px', backgroundColor: COLORS[idx], borderRadius: '50%', display: 'inline-block' }}></span>
                  {entry.name}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
