import { supabase } from './supabase';

const isMockEnabled = () => {
  return import.meta.env.VITE_SUPABASE_URL === undefined || 
         import.meta.env.VITE_SUPABASE_URL.includes('placeholder-url');
};

// Mock Projects database
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Madhavam Royal Orchid',
    slug: 'madhavam-royal-orchid',
    type: 'Residential Villa',
    status: 'Ongoing',
    location: 'Airport Road, Gwalior',
    price: '₹1.2 Cr - 2.5 Cr',
    area: '1800 - 3500 Sq.Ft.',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
    description: 'A premium gated community of luxury villas offering modern amenities, landscape gardens, and state of the art clubhouses.',
    features: ['Swimming Pool', 'Clubhouse', '24/7 Security', 'Gymnasium', 'Gated Community'],
    specifications: {
      structure: 'R.C.C. framed structure',
      flooring: 'Vitrified tiles in living room & kitchen, wooden flooring in master bedroom',
      doors: 'Teak wood main door frame',
    }
  },
  {
    id: '2',
    title: 'Madhavam Greens',
    slug: 'madhavam-greens',
    type: 'Plots & Land',
    status: 'Ready to Construct',
    location: 'Sitholi, Gwalior',
    price: '₹35 Lakhs - 80 Lakhs',
    area: '1200 - 2400 Sq.Ft.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
    description: 'Scenic residential plots surrounded by lush greenery, featuring clean wide roads, streetlights, and an underground sewage system.',
    features: ['Park & Kids Play Area', 'Wide Tar Roads', 'Water Supply', 'Underground Cabling'],
    specifications: {
      boundary: 'Gated boundary wall for individual plots',
      roads: '60 feet main road, 40 feet sub-roads',
      water: '24-hour supply network',
    }
  },
  {
    id: '3',
    title: 'Madhavam Elite Heights',
    slug: 'madhavam-elite-heights',
    type: 'Luxury Apartment',
    status: 'Completed',
    location: 'City Centre, Gwalior',
    price: '₹75 Lakhs - 1.5 Cr',
    area: '1400 - 2200 Sq.Ft.',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'High-rise residential apartments strategically located in the heart of Gwalior, featuring scenic balconies and high-speed lifts.',
    features: ['High Speed Elevators', 'Power Backup', 'Intercom Facility', 'Rooftop Lounge'],
    specifications: {
      structure: 'Earthquake resistant RCC structure',
      windows: 'UPVC sliding window with safety mesh',
      electrical: 'Concealed copper wiring with modular switches',
    }
  }
];

const getLocalProjects = () => {
  const projects = localStorage.getItem('madhavam_projects');
  if (!projects) {
    localStorage.setItem('madhavam_projects', JSON.stringify(MOCK_PROJECTS));
    return MOCK_PROJECTS;
  }
  return JSON.parse(projects);
};

const saveLocalProjects = (projects) => {
  localStorage.setItem('madhavam_projects', JSON.stringify(projects));
};

export const projectService = {
  async getAllProjects() {
    if (isMockEnabled()) {
      return { data: getLocalProjects(), error: null };
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('id', { ascending: true });
    return { data, error };
  },

  async getProjectBySlug(slug) {
    if (isMockEnabled()) {
      const project = getLocalProjects().find((p) => p.slug === slug);
      return { data: project || null, error: project ? null : new Error('Project not found') };
    }

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    return { data, error };
  },

  async createProject(projectData) {
    if (isMockEnabled()) {
      const projects = getLocalProjects();
      const newProject = {
        id: crypto.randomUUID(),
        slug: projectData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        ...projectData,
      };
      projects.push(newProject);
      saveLocalProjects(projects);
      return { data: newProject, error: null };
    }

    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select();
    return { data: data ? data[0] : null, error };
  },

  async updateProject(id, projectData) {
    if (isMockEnabled()) {
      const projects = getLocalProjects();
      const index = projects.findIndex((p) => p.id === id);
      if (index !== -1) {
        projects[index] = { ...projects[index], ...projectData };
        saveLocalProjects(projects);
        return { data: projects[index], error: null };
      }
      return { data: null, error: new Error('Project not found') };
    }

    const { data, error } = await supabase
      .from('projects')
      .update(projectData)
      .eq('id', id)
      .select();
    return { data: data ? data[0] : null, error };
  },

  async deleteProject(id) {
    if (isMockEnabled()) {
      let projects = getLocalProjects();
      projects = projects.filter((p) => p.id !== id);
      saveLocalProjects(projects);
      return { error: null };
    }

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    return { error };
  },
};
