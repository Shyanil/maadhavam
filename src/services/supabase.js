import { createClient } from '@supabase/supabase-js';

const SUPABASE_CONFIG = Object.freeze({
  url: 'https://fmtbdncpyrxeyzapcuyi.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtdGJkbmNweXJ4ZXl6YXBjdXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEyNTQ3MjAsImV4cCI6MjA5NjgzMDcyMH0.jRX-rk7_H9ZqFe2RSB7eEgWo-PVArv8K5RKSY0Lp-mw',
});

if (!SUPABASE_CONFIG.url.startsWith('https://') || !SUPABASE_CONFIG.anonKey.startsWith('eyJ')) {
  throw new Error('Invalid Supabase client configuration.');
}

export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

const MAX_IMAGE_SIZE_BYTES = 200 * 1024;

export const validateAdminImage = (file) => {
  if (!file) {
    return 'Please choose a WebP image.';
  }

  const isWebp = file.type === 'image/webp' || file.name.toLowerCase().endsWith('.webp');
  if (!isWebp) {
    return 'Only .webp images are allowed.';
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return 'Image must be 200 KB or smaller.';
  }

  return null;
};

export const uploadAdminImage = async (bucket, file, folder = 'admin') => {
  const validationError = validateAdminImage(file);
  if (validationError) {
    return { data: null, error: new Error(validationError) };
  }

  const safeName = file.name
    .toLowerCase()
    .replace(/\.webp$/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const path = `${folder}/${Date.now()}-${crypto.randomUUID()}-${safeName || 'image'}.webp`;

  const { error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '31536000',
      contentType: 'image/webp',
      upsert: false,
    });

  if (uploadError) {
    return { data: null, error: uploadError };
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return { data: data.publicUrl, error: null };
};
