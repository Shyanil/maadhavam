import React from 'react';
import { useForm } from 'react-hook-form';
import { useLeads } from '../../hooks/useLeads';
import toast from 'react-hot-toast';

export default function LeadForm({ projectName }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { submitLead, loading } = useLeads({ autoFetch: false });

  const onSubmit = async (data) => {
    const leadData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      interest: projectName || 'General Enquiry',
    };

    const { success, error } = await submitLead(leadData);
    
    if (success) {
      toast.success('Inquiry submitted! We will contact you shortly.');
      reset();
    } else {
      toast.error(error.message || 'Failed to submit enquiry. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="name" style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>Full Name *</label>
        <input
          id="name"
          type="text"
          placeholder="e.g. Rahul Sharma"
          style={{
            padding: '10px 14px',
            border: '1px solid var(--neutral-400)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'white'
          }}
          {...register('name', { required: 'Name is required' })}
        />
        {errors.name && <span style={{ color: 'var(--error)', fontSize: 'var(--text-xs)' }}>{errors.name.message}</span>}
      </div>

      {/* Phone */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="phone" style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>Mobile Number *</label>
        <input
          id="phone"
          type="tel"
          placeholder="e.g. +91 9876543210"
          style={{
            padding: '10px 14px',
            border: '1px solid var(--neutral-400)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'white'
          }}
          {...register('phone', {
            required: 'Phone is required',
            pattern: {
              value: /^[0-9+\s-]{10,15}$/,
              message: 'Invalid phone number format'
            }
          })}
        />
        {errors.phone && <span style={{ color: 'var(--error)', fontSize: 'var(--text-xs)' }}>{errors.phone.message}</span>}
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <label htmlFor="email" style={{ fontSize: 'var(--text-xs)', fontWeight: '600' }}>Email Address *</label>
        <input
          id="email"
          type="email"
          placeholder="e.g. rahul@example.com"
          style={{
            padding: '10px 14px',
            border: '1px solid var(--neutral-400)',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'white'
          }}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />
        {errors.email && <span style={{ color: 'var(--error)', fontSize: 'var(--text-xs)' }}>{errors.email.message}</span>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn btn-primary"
        style={{ width: '100%', borderRadius: 'var(--radius-sm)', padding: '12px', marginTop: '8px' }}
      >
        {loading ? 'Submitting...' : 'Submit Inquiry'}
      </button>

    </form>
  );
}
