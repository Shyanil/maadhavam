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
  ADMIN_ANALYTICS: '/admin/analytics',
};

export const CONTACT_INFO = {
  phone: '+91 98756 56616',
  whatsapp: '919875656616',
  email: 'maadhavamrealty@gmail.com',
  address: '3/1/A, Guha Park, Howrah - 711204, West Bengal, India',
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
