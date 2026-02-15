import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { contentAPI } from '../../utils/api';

export function ContentEditor() {
  const [content, setContent] = useState({
    hero: {
      tagline: '',
      subtitle: '',
    },
    about: {
      skills: '',
      description: '',
    },
    contact: {
      phone: '',
      email: '',
      address: '',
    },
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const data = await contentAPI.get();
      if (data.content) {
        setContent(data.content);
      }
    } catch (error) {
      console.error('Error loading content:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setSaved(false);

    try {
      await contentAPI.update(content);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Content Editor</h1>
          <p className="text-gray-600">Update all website content from one place</p>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
        >
          <Save className="w-5 h-5" />
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg">
          ✓ Content saved successfully!
        </div>
      )}

      {/* Hero Section */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">Hero Section</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Main Tagline</label>
            <input
              type="text"
              value={content.hero.tagline}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, tagline: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Visuals that speak. Brands that breathe."
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Subtitle</label>
            <input
              type="text"
              value={content.hero.subtitle}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, subtitle: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Creating exceptional design experiences for Ghanaian businesses"
            />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">About Section</h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Skills / Specialties</label>
            <input
              type="text"
              value={content.about.skills}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, skills: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Graphic Designer | Photographer | Branding Expert..."
            />
          </div>
          <div>
            <label className="block text-sm mb-2">About Description</label>
            <textarea
              value={content.about.description}
              onChange={(e) => setContent({
                ...content,
                about: { ...content.about, description: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              rows={8}
              placeholder="Welcome to SKYDESIGNERS Limited..."
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl p-8">
        <h2 className="text-2xl mb-6">Contact Information</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm mb-2">Phone (Ghana format)</label>
            <input
              type="tel"
              value={content.contact.phone}
              onChange={(e) => setContent({
                ...content,
                contact: { ...content.contact, phone: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="+233 502 140 791"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              value={content.contact.email}
              onChange={(e) => setContent({
                ...content,
                contact: { ...content.contact, email: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="info@skydesigners.com"
            />
          </div>
          <div>
            <label className="block text-sm mb-2">Address</label>
            <input
              type="text"
              value={content.contact.address}
              onChange={(e) => setContent({
                ...content,
                contact: { ...content.contact, address: e.target.value }
              })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Accra, Ghana"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
