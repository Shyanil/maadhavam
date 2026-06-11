import { supabase } from './supabase';

const isMockEnabled = () => {
  return import.meta.env.VITE_SUPABASE_URL === undefined || 
         import.meta.env.VITE_SUPABASE_URL.includes('placeholder-url');
};

const getLocalLeads = () => {
  const leads = localStorage.getItem('madhavam_leads');
  return leads ? JSON.parse(leads) : [];
};

const saveLocalLeads = (leads) => {
  localStorage.setItem('madhavam_leads', JSON.stringify(leads));
};

export const leadService = {
  async submitLead(leadData) {
    if (isMockEnabled()) {
      const leads = getLocalLeads();
      const newLead = {
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        status: 'New',
        ...leadData,
      };
      leads.push(newLead);
      saveLocalLeads(leads);
      return { data: newLead, error: null };
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([leadData])
      .select();
    return { data: data ? data[0] : null, error };
  },

  async getAllLeads() {
    if (isMockEnabled()) {
      return { data: getLocalLeads().sort((a, b) => new Date(b.created_at) - new Date(a.created_at)), error: null };
    }

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async updateLeadStatus(id, status) {
    if (isMockEnabled()) {
      const leads = getLocalLeads();
      const index = leads.findIndex((l) => l.id === id);
      if (index !== -1) {
        leads[index].status = status;
        saveLocalLeads(leads);
        return { data: leads[index], error: null };
      }
      return { data: null, error: new Error('Lead not found') };
    }

    const { data, error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)
      .select();
    return { data: data ? data[0] : null, error };
  },

  async deleteLead(id) {
    if (isMockEnabled()) {
      let leads = getLocalLeads();
      leads = leads.filter((l) => l.id !== id);
      saveLocalLeads(leads);
      return { error: null };
    }

    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);
    return { error };
  },
};
