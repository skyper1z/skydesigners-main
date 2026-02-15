import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-039f45c3/health", (c) => {
  return c.json({ status: "ok" });
});

// ============= AUTH ROUTES =============
app.post("/make-server-039f45c3/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });
    
    if (error) {
      console.log('Error creating user during signup:', error);
      return c.json({ error: error.message }, 400);
    }
    
    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log('Unexpected error during signup:', error);
    return c.json({ error: 'Signup failed' }, 500);
  }
});

app.post("/make-server-039f45c3/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
    );
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.log('Error signing in user:', error);
      return c.json({ error: error.message }, 401);
    }
    
    return c.json({ success: true, session: data.session });
  } catch (error) {
    console.log('Unexpected error during signin:', error);
    return c.json({ error: 'Sign in failed' }, 500);
  }
});

// ============= PORTFOLIO ROUTES =============
app.get("/make-server-039f45c3/portfolio", async (c) => {
  try {
    const projects = await kv.getByPrefix('project:');
    return c.json({ projects: projects.map(p => p.value) });
  } catch (error) {
    console.log('Error fetching portfolio projects:', error);
    return c.json({ error: 'Failed to fetch projects' }, 500);
  }
});

app.post("/make-server-039f45c3/portfolio", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const project = await c.req.json();
    const projectId = `project:${Date.now()}`;
    await kv.set(projectId, { ...project, id: projectId, createdAt: new Date().toISOString() });
    
    return c.json({ success: true, projectId });
  } catch (error) {
    console.log('Error creating portfolio project:', error);
    return c.json({ error: 'Failed to create project' }, 500);
  }
});

app.put("/make-server-039f45c3/portfolio/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    const updates = await c.req.json();
    const existing = await kv.get(`project:${id}`);
    
    await kv.set(`project:${id}`, { ...existing, ...updates, updatedAt: new Date().toISOString() });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error updating portfolio project:', error);
    return c.json({ error: 'Failed to update project' }, 500);
  }
});

app.delete("/make-server-039f45c3/portfolio/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    await kv.del(`project:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting portfolio project:', error);
    return c.json({ error: 'Failed to delete project' }, 500);
  }
});

// ============= INVOICE ROUTES =============
app.get("/make-server-039f45c3/invoices", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const invoices = await kv.getByPrefix('invoice:');
    return c.json({ invoices: invoices.map(i => i.value) });
  } catch (error) {
    console.log('Error fetching invoices:', error);
    return c.json({ error: 'Failed to fetch invoices' }, 500);
  }
});

app.post("/make-server-039f45c3/invoices", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const invoice = await c.req.json();
    const invoiceNumber = await generateInvoiceNumber();
    const invoiceId = `invoice:${invoiceNumber}`;
    
    await kv.set(invoiceId, { 
      ...invoice, 
      id: invoiceId,
      invoiceNumber,
      createdAt: new Date().toISOString() 
    });
    
    return c.json({ success: true, invoiceNumber });
  } catch (error) {
    console.log('Error creating invoice:', error);
    return c.json({ error: 'Failed to create invoice' }, 500);
  }
});

// ============= TESTIMONIALS ROUTES =============
app.get("/make-server-039f45c3/testimonials", async (c) => {
  try {
    const testimonials = await kv.getByPrefix('testimonial:');
    return c.json({ testimonials: testimonials.map(t => t.value) });
  } catch (error) {
    console.log('Error fetching testimonials:', error);
    return c.json({ error: 'Failed to fetch testimonials' }, 500);
  }
});

app.post("/make-server-039f45c3/testimonials", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const testimonial = await c.req.json();
    const testimonialId = `testimonial:${Date.now()}`;
    
    await kv.set(testimonialId, { 
      ...testimonial, 
      id: testimonialId,
      createdAt: new Date().toISOString() 
    });
    
    return c.json({ success: true, testimonialId });
  } catch (error) {
    console.log('Error creating testimonial:', error);
    return c.json({ error: 'Failed to create testimonial' }, 500);
  }
});

app.delete("/make-server-039f45c3/testimonials/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const id = c.req.param('id');
    await kv.del(`testimonial:${id}`);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error deleting testimonial:', error);
    return c.json({ error: 'Failed to delete testimonial' }, 500);
  }
});

// ============= CONTENT ROUTES =============
app.get("/make-server-039f45c3/content", async (c) => {
  try {
    const content = await kv.get('site:content');
    return c.json({ content: content || getDefaultContent() });
  } catch (error) {
    console.log('Error fetching content:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

app.put("/make-server-039f45c3/content", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const content = await c.req.json();
    await kv.set('site:content', content);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error updating content:', error);
    return c.json({ error: 'Failed to update content' }, 500);
  }
});

// ============= ANALYTICS ROUTES =============
app.post("/make-server-039f45c3/analytics/track", async (c) => {
  try {
    const { event, data } = await c.req.json();
    const analyticsKey = `analytics:${event}:${new Date().toISOString()}`;
    await kv.set(analyticsKey, { event, data, timestamp: new Date().toISOString() });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error tracking analytics:', error);
    return c.json({ error: 'Failed to track event' }, 500);
  }
});

app.get("/make-server-039f45c3/analytics/stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }
    
    const projects = await kv.getByPrefix('project:');
    const invoices = await kv.getByPrefix('invoice:');
    const testimonials = await kv.getByPrefix('testimonial:');
    const analytics = await kv.getByPrefix('analytics:');
    
    return c.json({
      stats: {
        totalProjects: projects.length,
        totalInvoices: invoices.length,
        totalTestimonials: testimonials.length,
        totalViews: analytics.filter(a => a.value.event === 'page_view').length,
      }
    });
  } catch (error) {
    console.log('Error fetching analytics stats:', error);
    return c.json({ error: 'Failed to fetch stats' }, 500);
  }
});

// ============= CONTACT FORM ROUTE =============
app.post("/make-server-039f45c3/contact", async (c) => {
  try {
    const contactData = await c.req.json();
    const contactId = `contact:${Date.now()}`;
    
    await kv.set(contactId, {
      ...contactData,
      id: contactId,
      createdAt: new Date().toISOString()
    });
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error submitting contact form:', error);
    return c.json({ error: 'Failed to submit contact form' }, 500);
  }
});

// Helper function to generate invoice numbers
async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const invoices = await kv.getByPrefix('invoice:');
  const count = invoices.length + 1;
  return `SKY-${year}-${String(count).padStart(4, '0')}`;
}

// Default content structure
function getDefaultContent() {
  return {
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
}

Deno.serve(app.fetch);