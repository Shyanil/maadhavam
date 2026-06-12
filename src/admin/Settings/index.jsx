import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SEO from '../../components/SEO';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('Madhavam Realty');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [whatsappAlerts, setWhatsappAlerts] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('System configurations saved successfully!');
  };

  return (
    <>
      <SEO customTitle="Admin Settings | Madhavam Admin" />
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <div>
          <h2>System Settings</h2>
          <p style={{ color: 'var(--neutral-600)', fontSize: 'var(--text-sm)' }}>Configure real estate platform configurations and notifications routing.</p>
        </div>

        <form onSubmit={handleSave} className="glass-card" style={{ padding: '30px', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: 'var(--text-sm)', color: 'var(--admin-text-primary)' }}>Platform Name</label>
            <input 
              type="text" 
              value={siteName} 
              onChange={(e) => setSiteName(e.target.value)} 
              className="admin-input"
            />
          </div>

          <div style={{ borderTop: '1px solid var(--admin-border)', paddingTop: '20px' }}>
            <h4 style={{ marginBottom: '12px', color: 'var(--admin-text-primary)' }}>Leads Routing Notifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--admin-text-secondary)' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)} 
                  style={{ width: '16px', height: '16px', accentColor: 'var(--admin-accent-gold)' }}
                />
                Email Alerts: Notify when a customer books a site visit.
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={whatsappAlerts} 
                  onChange={(e) => setWhatsappAlerts(e.target.checked)} 
                  style={{ width: '16px', height: '16px', accentColor: 'var(--admin-accent-gold)' }}
                />
                WhatsApp Alerts: Forward leads to office mobile instantly.
              </label>
            </div>
          </div>

          <button type="submit" className="btn-admin-primary" style={{ alignSelf: 'flex-start', marginTop: '10px' }}>
            Save Configurations
          </button>

        </form>
      </div>
    </>
  );
}
