import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Upload, Image } from 'lucide-react';
import { portfolioAPI } from '../../utils/api';

interface PortfolioManagerProps {
  onUpdate: () => void;
}

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  createdAt: string;
}

export function PortfolioManager({ onUpdate }: PortfolioManagerProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await portfolioAPI.getAll();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await portfolioAPI.create(formData);
      setFormData({ title: '', category: '', description: '', image: '' });
      setShowForm(false);
      await loadProjects();
      onUpdate();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const projectId = id.replace('project:', '');
      await portfolioAPI.delete(projectId);
      await loadProjects();
      onUpdate();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  };

  const categories = [
    'Logo Design',
    'Brand Identity',
    'Business Cards',
    'Product Packaging',
    'Photography',
    'Poster Design',
    'Social Media',
    'AR/Lens Development',
    'Web Design',
    'Other'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Portfolio Manager</h1>
          <p className="text-gray-600">Manage your portfolio projects and showcase your work</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Project
        </button>
      </div>

      {/* Add Project Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl mb-6">New Portfolio Project</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Project Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Project Image *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                {formData.image ? (
                  <div>
                    <img src={formData.image} alt="Preview" className="max-h-64 mx-auto rounded-lg mb-4" />
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, image: '' })}
                      className="text-red-600 hover:text-red-700"
                    >
                      Remove Image
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Upload project image</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                      required
                    />
                    <label
                      htmlFor="image-upload"
                      className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer inline-block"
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Project'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-8 py-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-lg group">
            <div className="h-48 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold mb-1">{project.title}</h3>
                  <span className="text-sm text-blue-600">{project.category}</span>
                </div>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              {project.description && (
                <p className="text-sm text-gray-600 mt-2">{project.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="bg-white rounded-xl p-12 text-center">
          <Image className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 mb-2">No projects yet</h3>
          <p className="text-gray-500 mb-6">Start adding your portfolio projects to showcase your work</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add Your First Project
          </button>
        </div>
      )}
    </div>
  );
}