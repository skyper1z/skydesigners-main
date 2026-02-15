import { useState, useEffect } from 'react';
import { Plus, Trash2, Star, MessageSquare } from 'lucide-react';
import { testimonialsAPI } from '../../utils/api';

interface TestimonialsManagerProps {
  onUpdate: () => void;
}

interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientRole: string;
  testimonial: string;
  rating: number;
  createdAt: string;
}

export function TestimonialsManager({ onUpdate }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    clientCompany: '',
    clientRole: '',
    testimonial: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const data = await testimonialsAPI.getAll();
      setTestimonials(data.testimonials || []);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await testimonialsAPI.create(formData);
      setFormData({
        clientName: '',
        clientCompany: '',
        clientRole: '',
        testimonial: '',
        rating: 5,
      });
      setShowForm(false);
      await loadTestimonials();
      onUpdate();
    } catch (error) {
      console.error('Error creating testimonial:', error);
      alert('Failed to create testimonial');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;

    try {
      const testimonialId = id.replace('testimonial:', '');
      await testimonialsAPI.delete(testimonialId);
      await loadTestimonials();
      onUpdate();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Testimonials Manager</h1>
          <p className="text-gray-600">Showcase client reviews and build trust</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Testimonial
        </button>
      </div>

      {/* Add Testimonial Form */}
      {showForm && (
        <div className="bg-white rounded-xl p-8">
          <h2 className="text-2xl mb-6">New Testimonial</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm mb-2">Client Name *</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Company / Organization</label>
                <input
                  type="text"
                  value={formData.clientCompany}
                  onChange={(e) => setFormData({ ...formData, clientCompany: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Role / Title</label>
                <input
                  type="text"
                  value={formData.clientRole}
                  onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="CEO, Marketing Director, etc."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2">Testimonial *</label>
              <textarea
                value={formData.testimonial}
                onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={5}
                placeholder="Share your client's feedback..."
                required
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Rating *</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= formData.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
              >
                {loading ? 'Adding...' : 'Add Testimonial'}
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

      {/* Testimonials Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-xl p-6 shadow-lg relative group">
            <button
              onClick={() => handleDelete(testimonial.id)}
              className="absolute top-4 right-4 text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < testimonial.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>

            <p className="text-gray-700 mb-6 italic">"{testimonial.testimonial}"</p>

            <div>
              <p className="font-semibold">{testimonial.clientName}</p>
              {testimonial.clientRole && <p className="text-sm text-gray-600">{testimonial.clientRole}</p>}
              {testimonial.clientCompany && <p className="text-sm text-blue-600">{testimonial.clientCompany}</p>}
            </div>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && !showForm && (
        <div className="bg-white rounded-xl p-12 text-center">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl text-gray-600 mb-2">No testimonials yet</h3>
          <p className="text-gray-500 mb-6">Start adding client testimonials to build trust and credibility</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Add Your First Testimonial
          </button>
        </div>
      )}
    </div>
  );
}