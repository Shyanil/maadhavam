import { supabase } from './supabase';

const isMockEnabled = () => {
  return false;
};

// Mock Projects database
const MOCK_PROJECTS = [
  {
    id: '1',
    title: 'Madhavam Royal Orchid',
    tag: 'Premium Villas',
    type: 'Residential',
    featured: true,
    location: 'Airport Road, Gwalior',
    image_url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '2',
    title: 'Madhavam Greens',
    tag: 'Plotted Township',
    type: 'Land',
    featured: true,
    location: 'Sitholi, Gwalior',
    image_url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200',
  },
  {
    id: '3',
    title: 'Madhavam Elite Heights',
    tag: 'Luxury Apartments',
    type: 'Residential',
    featured: false,
    location: 'City Centre, Gwalior',
    image_url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
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
      .order('created_at', { ascending: false });
    return { data, error };
  },

  async getProjectBySlug(slug) {
    if (isMockEnabled()) {
      const project = getLocalProjects().find((p) => p.slug === slug);
      return { data: project || null, error: project ? null : new Error('Project not found') };
    }

    return { data: null, error: new Error('Project detail pages are not wired to the current projects schema.') };
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

    const payload = {
      title: projectData.title,
      tag: projectData.tag,
      image_url: projectData.image_url,
      location: projectData.location,
      type: projectData.type,
      featured: Boolean(projectData.featured),
    };

    const { data, error } = await supabase
      .from('projects')
      .insert([payload])
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

    const payload = {
      title: projectData.title,
      tag: projectData.tag,
      image_url: projectData.image_url,
      location: projectData.location,
      type: projectData.type,
      featured: Boolean(projectData.featured),
    };

    const { data, error } = await supabase
      .from('projects')
      .update(payload)
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
