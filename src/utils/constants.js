// Global Application Constants
export const APP_NAME = 'Madhavam Realty';

export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  PROJECTS: '/projects',
  PROJECT_DETAILS: '/projects/:slug',
  LAND_LEASING: '/land-leasing',
  AWARDS: '/awards',
  BLOG: '/blog',
  BLOG_DETAILS: '/blog/:slug',
  CONTACT: '/contact',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_LEADS: '/admin/leads',
  ADMIN_PROJECTS: '/admin/projects',
  ADMIN_BLOG: '/admin/blog',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_ANALYTICS: '/admin/analytics',
};

export const CONTACT_INFO = {
  phone: '+91 98765 43210',
  whatsapp: '919876543210',
  email: 'info@madhavamrealty.com',
  address: '1st Floor, Madhavam Plaza, City Centre, Gwalior, MP, India',
  workingHours: 'Mon - Sat: 10:00 AM - 7:00 PM',
};

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/madhavamrealty',
  instagram: 'https://instagram.com/madhavamrealty',
  youtube: 'https://youtube.com/madhavamrealty',
  linkedin: 'https://linkedin.com/company/madhavamrealty',
};

export const NAVIGATION_ITEMS = [
  { label: 'HOME', path: ROUTES.HOME },
  { label: 'ABOUT US', path: ROUTES.ABOUT },
  { label: 'BLOG', path: ROUTES.BLOG },
  { label: 'PROJECTS', path: ROUTES.PROJECTS },
  { label: 'LAND & LEASING', path: ROUTES.LAND_LEASING },
  { label: 'CONTACT US', path: ROUTES.CONTACT },
];
