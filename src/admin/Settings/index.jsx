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

        <form onSubmit={handleSave} className="glass-card" style={{ padding: '30px', backgroundColor: 'white', maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: '600', fontSize: 'var(--text-sm)' }}>Platform Name</label>
            <input 
              type="text" 
              value={siteName} 
              onChange={(e) => setSiteName(e.target.value)} 
              style={{
                padding: '12px',
                border: '1px solid var(--neutral-400)',
                borderRadius: 'var(--radius-sm)'
              }}
            />
          </div>

          <div style={{ borderTop: '1px solid var(--neutral-300)', paddingTop: '20px' }}>
            <h4 style={{ marginBottom: '12px' }}>Leads Routing Notifications</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)} 
                  style={{ width: '16px', height: '16px' }}
                />
                Email Alerts: Notify when a customer books a site visit.
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input 
                  type="checkbox" 
                  checked={whatsappAlerts} 
                  onChange={(e) => setWhatsappAlerts(e.target.checked)} 
                  style={{ width: '16px', height: '16px' }}
                />
                WhatsApp Alerts: Forward leads to office mobile instantly.
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ borderRadius: 'var(--radius-sm)', alignSelf: 'flex-start', marginTop: '10px' }}>
            Save Configurations
          </button>

        </form>
      </div>
    </>
  );
}
