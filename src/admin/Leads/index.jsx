import React, { useState } from 'react';
import { useLeads } from '../../hooks/useLeads';
import { formatDate, exportToCSV } from '../../utils/helpers';
import toast from 'react-hot-toast';
import { FiDownload, FiTrash2, FiSearch } from 'react-icons/fi';
import SEO from '../../components/SEO';

export default function AdminLeads() {
  const { leads, loading, updateStatus, deleteLead } = useLeads();
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = async (id, newStatus) => {
    const { success } = await updateStatus(id, newStatus);
    if (success) {
      toast.success(`Lead status updated to ${newStatus}`);
    } else {
      toast.error('Failed to update lead status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      const { success } = await deleteLead(id);
      if (success) {
        toast.success('Lead deleted successfully');
      } else {
        toast.error('Failed to delete lead');
      }
    }
  };

  const handleExport = () => {
    exportToCSV(leads, `madhavam_leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    toast.success('Leads exported successfully as CSV');
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.phone.includes(searchTerm) ||
    (lead.interest && lead.interest.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      <SEO customTitle="Manage Enquiries | Madhavam Admin" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>Customer Enquiries / Leads</h2>
            <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>Manage incoming site visit bookings and land leasing requests.</p>
          </div>
          <button onClick={handleExport} className="btn-admin-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiDownload /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="admin-search-field">
          <FiSearch className="admin-search-icon" aria-hidden="true" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, phone or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="admin-input admin-search-input"
          />
        </div>

        {/* Lead Table Container */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--admin-text-secondary)' }}>Loading inquiries...</div>
        ) : filteredLeads.length === 0 ? (
          <div className="glass-card" style={{ padding: '50px', textAlign: 'center' }}>
            No leads found.
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Contact info</th>
                  <th>Project / Interest</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id}>
                    <td>{formatDate(lead.created_at)}</td>
                    <td>
                      <strong>{lead.name}</strong>
                    </td>
                    <td style={{ color: 'var(--admin-text-secondary)' }}>
                      <div>{lead.phone}</div>
                      <div style={{ opacity: 0.7, fontSize: 'var(--text-xs)' }}>{lead.email}</div>
                    </td>
                    <td>
                      <span className="badge badge-info">
                        {lead.interest || 'General'}
                      </span>
                    </td>
                    <td>
                      <select 
                        value={lead.status || 'new'}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="admin-select"
                        style={{
                          padding: '6px 12px',
                          width: 'auto',
                          fontSize: 'var(--text-xs)'
                        }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button 
                        onClick={() => handleDelete(lead.id)} 
                        style={{ color: 'var(--admin-error)', cursor: 'pointer', padding: '8px', background: 'none', border: 'none' }}
                        title="Delete Lead"
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
