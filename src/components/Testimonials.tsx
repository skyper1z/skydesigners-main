import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialsAPI } from '../utils/api';

interface Testimonial {
  id: string;
  clientName: string;
  clientCompany: string;
  clientRole: string;
  testimonial: string;
  rating: number;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl text-center mb-16">
          Client Testimonials
        </h2>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-12 relative">
            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Rating Stars */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${i < current.rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-white/30'
                    }`}
                />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-2xl text-center mb-8 italic leading-relaxed">
              "{current.testimonial}"
            </p>

            {/* Client Info */}
            <div className="text-center">
              <p className="text-xl font-semibold mb-1">{current.clientName}</p>
              {current.clientRole && (
                <p className="text-white/90">{current.clientRole}</p>
              )}
              {current.clientCompany && (
                <p className="text-white/80">{current.clientCompany}</p>
              )}
            </div>

            {/* Indicators */}
            {testimonials.length > 1 && (
              <div className="flex gap-2 justify-center mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition ${index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
