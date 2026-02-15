import { useState, useEffect } from 'react';
import Masonry from 'react-responsive-masonry';
import { portfolioAPI } from '../utils/api';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
}

export function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  // Default portfolio items (fallback if no projects in database)
  const portfolioItems = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1761223956832-a1e341babb92?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsb2dvJTIwZGVzaWdufGVufDF8fHx8MTc3MDYzOTE3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Logo Design"
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1667201698408-0c06e55b3da7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGNhcmRzJTIwZGVzaWdufGVufDF8fHx8MTc3MDU5MjgyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Business Cards"
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1626253934161-08cfea22e968?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwcGFja2FnaW5nJTIwZGVzaWdufGVufDF8fHx8MTc3MDYzMDQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Product Packaging"
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1577687407011-cd692d4b8bf7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHBob3RvZ3JhcGh5JTIwcG9ydGZvbGlvfGVufDF8fHx8MTc3MDYyNjU4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Photography"
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1762787863004-767d5d7eac07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwZGVzaWdufGVufDF8fHx8MTc3MDYxNjk0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Brand Identity"
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1661570323628-06de800328c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3N0ZXIlMjBkZXNpZ24lMjBtb2NrdXB8ZW58MXx8fHwxNzcwNTczMjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Poster Design"
    },
    {
      id: "7",
      image: "https://images.unsplash.com/photo-1677890465835-ab8c5c621771?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZGluZyUyMGRlc2lnbiUyMG1vY2t1cHxlbnwxfHx8fDE3NzA2MTgzNzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Branding"
    },
    {
      id: "8",
      image: "https://images.unsplash.com/photo-1545579833-02a4c62797f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdWdtZW50ZWQlMjByZWFsaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzA2MTIyOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "AR Experience"
    }
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await portfolioAPI.getAll();
      if (data.projects && data.projects.length > 0) {
        setProjects(data.projects);
      } else {
        // Use default portfolio items if no projects exist
        setProjects(portfolioItems.map(item => ({
          ...item,
          category: item.title,
          description: ''
        })));
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      // Use default items on error
      setProjects(portfolioItems.map(item => ({
        ...item,
        category: item.title,
        description: ''
      })));
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = filter === 'All'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl text-center mb-8">
          EXPLORE MY PORTFOLIO
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition ${filter === category
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading portfolio...</p>
          </div>
        ) : (
          <Masonry columnsCount={3} gutter="20px">
            {filteredProjects.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-auto transition duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white text-xl mb-2">{item.title}</h3>
                  {item.description && (
                    <p className="text-white/90 text-sm">{item.description}</p>
                  )}
                </div>
              </div>
            ))}
          </Masonry>
        )}
      </div>
    </section>
  );
}