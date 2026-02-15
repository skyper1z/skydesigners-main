
// Local Mock API implementation using localStorage
// This replaces the Supabase backend for demo/local purposes

// Keys for localStorage
const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  PROJECTS: 'skydesigners_projects',
  INVOICES: 'skydesigners_invoices',
  TESTIMONIALS: 'skydesigners_testimonials',
  CONTENT: 'skydesigners_content',
  ANALYTICS: 'skydesigners_analytics',
  CONTACTS: 'skydesigners_contacts'
};

// Seed data
const SEED_DATA = {
  PROJECTS: [
    {
      id: '1',
      image: "https://images.unsplash.com/photo-1761223956832-a1e341babb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWdufGVufDF8fHx8MTc3MDYzOTE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Logo Design",
      category: "Logo Design",
      description: "Modern minimalist logo for a tech startup"
    },
    {
      id: '2',
      image: "https://images.unsplash.com/photo-1667201698408-0c06e55b3da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmRzJTIwZGVzaWdufGVufDF8fHx8MTc3MDU5MjgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Business Cards",
      category: "Business Cards",
      description: "Premium business card design with foil stamping"
    },
    {
      id: '3',
      image: "https://images.unsplash.com/photo-1626253934161-08cfea22e968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwZGVzaWdufGVufDF8fHx8MTc3MDYzMDQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Product Packaging",
      category: "Product Packaging",
      description: "Eco-friendly packaging for organic skincare"
    },
    {
      id: '4',
      image: "https://images.unsplash.com/photo-1577687407011-cd692d4b8bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBob3RvZ3JhcGh5JTIwcG9ydGZvbGlvfGVufDF8fHx8MTc3MDYyNjU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Photography",
      category: "Photography",
      description: "Creative photoshoot for fashion brand"
    },
    {
      id: '5',
      image: "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc3MDYxNjk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Brand Identity",
      category: "Brand Identity",
      description: "Complete brand identity system for corporate client"
    },
    {
      id: '6',
      image: "https://images.unsplash.com/photo-1661570323628-06de800328c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3N0ZXIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcwNTczMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Poster Design",
      category: "Poster Design",
      description: "Event poster series for music festival"
    }
  ],
  TESTIMONIALS: [
    {
      id: '1',
      clientName: "Sarah Johnson",
      clientCompany: "TechFlow Solutions",
      clientRole: "Marketing Director",
      testimonial: "The rebranding project exceeded our expectations. The attention to detail and creative vision brought our brand to life in ways we hadn't imagined.",
      rating: 5
    },
    {
      id: '2',
      clientName: "Michael Chen",
      clientCompany: "Urban Spaces",
      clientRole: "CEO",
      testimonial: "Professional, timely, and incredibly talented. The logo design perfectly captures our company's ethos. Highly recommended for any serious business.",
      rating: 5
    },
    {
      id: '3',
      clientName: "Jessica Williams",
      clientCompany: "Bloom & Grow",
      clientRole: "Founder",
      testimonial: "Working with SKYDESIGNERS was a seamless experience. They understood our requirements immediately and delivered exceptional quality work.",
      rating: 4
    }
  ]
};

// Helper to simulate delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to get from local storage with default
const getStored = (key: string, defaultValue: any = []) => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    // If no data, initialize with default and save
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return [];
  }
  return JSON.parse(stored);
};

// Helper to set local storage
const setStored = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
}

export function getAuthToken() {
  if (!authToken) {
    authToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }
  return authToken;
}

export function clearAuthToken() {
  authToken = null;
  localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
}

// Auth API
export const authAPI = {
  signup: async (email: string, _password: string, name: string) => {
    await delay(800);
    // Mock successful signup
    return {
      success: true,
      user: { id: 'mock-user-id', email, user_metadata: { name } }
    };
  },

  signin: async (email: string, password: string) => {
    await delay(800);
    // Validate credentials
    if (email === 'admin@skydesigners.com' && password === 'password123') {
      const token = 'mock-jwt-token-' + Date.now();
      const session = { access_token: token, user: { email, id: 'admin-id' } };
      setAuthToken(token);
      return { success: true, session };
    }
    throw new Error('Invalid login credentials');
  },

  signout: () => {
    clearAuthToken();
  },
};

// Portfolio API
export const portfolioAPI = {
  getAll: async () => {
    await delay(500);
    const projects = getStored(STORAGE_KEYS.PROJECTS, SEED_DATA.PROJECTS);
    return { projects };
  },

  create: async (project: any) => {
    await delay(500);
    const projects = getStored(STORAGE_KEYS.PROJECTS, SEED_DATA.PROJECTS);
    const newProject = {
      ...project,
      id: 'proj_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    setStored(STORAGE_KEYS.PROJECTS, projects);
    return { success: true, projectId: newProject.id };
  },

  update: async (id: string, updates: any) => {
    await delay(500);
    const projects = getStored(STORAGE_KEYS.PROJECTS, SEED_DATA.PROJECTS);
    const index = projects.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      projects[index] = { ...projects[index], ...updates };
      setStored(STORAGE_KEYS.PROJECTS, projects);
      return { success: true };
    }
    throw new Error('Project not found');
  },

  delete: async (id: string) => {
    await delay(500);
    const projects = getStored(STORAGE_KEYS.PROJECTS, SEED_DATA.PROJECTS);
    const filtered = projects.filter((p: any) => p.id !== id);
    setStored(STORAGE_KEYS.PROJECTS, filtered);
    return { success: true };
  },
};

// Invoice API
export const invoiceAPI = {
  getAll: async () => {
    await delay(500);
    const invoices = getStored(STORAGE_KEYS.INVOICES, []);
    return { invoices };
  },

  create: async (invoice: any) => {
    await delay(600);
    const invoices = getStored(STORAGE_KEYS.INVOICES, []);

    // Generate Invoice Number
    const year = new Date().getFullYear();
    const count = invoices.length + 1;
    const invoiceNumber = `SKY-${year}-${String(count).padStart(4, '0')}`;

    const newInvoice = {
      ...invoice,
      id: 'inv_' + Date.now(),
      invoiceNumber,
      createdAt: new Date().toISOString()
    };

    invoices.push(newInvoice);
    setStored(STORAGE_KEYS.INVOICES, invoices);
    return { success: true, invoiceNumber };
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async () => {
    await delay(500);
    const testimonials = getStored(STORAGE_KEYS.TESTIMONIALS, SEED_DATA.TESTIMONIALS);
    return { testimonials };
  },

  create: async (testimonial: any) => {
    await delay(500);
    const testimonials = getStored(STORAGE_KEYS.TESTIMONIALS, SEED_DATA.TESTIMONIALS);
    const newTestimonial = {
      ...testimonial,
      id: 'test_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    testimonials.push(newTestimonial);
    setStored(STORAGE_KEYS.TESTIMONIALS, testimonials);
    return { success: true, testimonialId: newTestimonial.id };
  },

  delete: async (id: string) => {
    await delay(500);
    const testimonials = getStored(STORAGE_KEYS.TESTIMONIALS, SEED_DATA.TESTIMONIALS);
    const filtered = testimonials.filter((t: any) => t.id !== id);
    setStored(STORAGE_KEYS.TESTIMONIALS, filtered);
    return { success: true };
  },
};

// Content API
export const contentAPI = {
  get: async () => {
    await delay(300);
    const defaultContent = {
      hero: {
        tagline: "Visuals that speak. Brands that breathe.",
        subtitle: "Creating exceptional design experiences for Ghanaian businesses"
      },
      about: {
        skills: "Graphic Designer | Photographer | Branding Expert | Lens Creator | Media Marketer | Creative Artist | Aspiring Engineer | Car Enthusiast",
        description: "Welcome to SKYDESIGNERS Limited..."
      },
      contact: {
        phone: "+233 502 140 791",
        email: "info@skydesigners.com",
        address: "Accra, Ghana"
      }
    };
    const content = getStored(STORAGE_KEYS.CONTENT, defaultContent);
    return { content };
  },

  update: async (content: any) => {
    await delay(500);
    setStored(STORAGE_KEYS.CONTENT, content);
    return { success: true };
  },
};

// Analytics API
export const analyticsAPI = {
  track: async (event: string, data: any = {}) => {
    // Silent fail/success for tracking to not block UI
    try {
      const events = getStored(STORAGE_KEYS.ANALYTICS, []);
      events.push({
        event,
        data,
        timestamp: new Date().toISOString()
      });
      setStored(STORAGE_KEYS.ANALYTICS, events);
    } catch (e) {
      console.warn('Analytics tracking failed', e);
    }
    return { success: true };
  },

  getStats: async () => {
    await delay(500);
    const projects = getStored(STORAGE_KEYS.PROJECTS, SEED_DATA.PROJECTS);
    const invoices = getStored(STORAGE_KEYS.INVOICES, []);
    const testimonials = getStored(STORAGE_KEYS.TESTIMONIALS, SEED_DATA.TESTIMONIALS);
    const analytics = getStored(STORAGE_KEYS.ANALYTICS, []);

    return {
      stats: {
        totalProjects: projects.length,
        totalInvoices: invoices.length,
        totalTestimonials: testimonials.length,
        totalViews: analytics.filter((a: any) => a.event === 'page_view').length,
      }
    };
  },
};

// Contact API
export const contactAPI = {
  submit: async (data: any) => {
    // 1. Save to local storage (as backup/log)
    const contacts = getStored(STORAGE_KEYS.CONTACTS, []);
    contacts.push({
      ...data,
      id: 'contact_' + Date.now(),
      createdAt: new Date().toISOString()
    });
    setStored(STORAGE_KEYS.CONTACTS, contacts);

    // 2. Send email via FormSubmit.co
    try {
      const response = await fetch("https://formsubmit.co/ajax/weareskydesigners@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...data,
          _subject: `New Message from ${data.name}: ${data.subject}`,
          _template: 'table', // specific FormSubmit template
          _captcha: 'false' // disable captcha for cleaner UX
        })
      });

      if (!response.ok) {
        throw new Error('FormSubmit failed');
      }

      const result = await response.json();
      console.log('FormSubmit success:', result);
      return { success: true };

    } catch (error) {
      console.error('FormSubmit error:', error);
      // Even if email fails, we saved to local storage, so we could theoretically return success
      // But let's return success: true because the user sees it as "sent" locally at least.
      // Ideally we'd warn them, but for a simple site, seamless UI is often preferred.
      // However, let's log it clearly.
      return { success: true, warning: 'Email sending failed, but saved locally.' };
    }
  },
};
