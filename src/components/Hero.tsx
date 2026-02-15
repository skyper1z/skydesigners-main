import { motion } from 'framer-motion';
import heroImage from '../assets/fb872c_34594420d35f4e508cb5af2c62a3bc65~mv2.jpeg';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" id="home">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1742440711276-679934f5b988?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHN0dWRpbyUyMHdvcmtzcGFjZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzA2NzI2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Creative Studio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="text-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl md:text-7xl mb-6 font-bold leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Visuals that speak.<br />
              Brands that breathe.
            </motion.h1>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-8 items-start sm:items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button
                onClick={() => scrollToSection('about')}
                className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition transform hover:scale-105"
              >
                GET TO KNOW ME!
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition transform hover:scale-105"
              >
                MY PORTFOLIO
              </button>
            </motion.div>
          </motion.div>

          {/* Hero Image - Replaced with user uploaded asset */}
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <img
              src={heroImage}
              alt="Creative Professional"
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}