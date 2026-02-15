import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { socialLinks } from './SocialLinks';
import logo from '../assets/logo.png';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden p-1">
              <img src={logo} alt="SkyDesigners Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-bold">SKYDESIGNERS</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-600 transition">
              Our Story
            </button>
            <button onClick={() => scrollToSection('team')} className="hover:text-blue-600 transition">
              Team
            </button>
            <button onClick={() => scrollToSection('services')} className="hover:text-blue-600 transition">
              Services
            </button>
          </nav>

          {/* Desktop Social & Login */}
          <div className="hidden md:flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-gray-100 mt-4 animate-in slide-in-from-top-2">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-blue-600 transition">
                Our Story
              </button>
              <button onClick={() => scrollToSection('team')} className="text-left py-2 hover:text-blue-600 transition">
                Team
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left py-2 hover:text-blue-600 transition">
                Services
              </button>

              <div className="flex items-center gap-6 py-4 border-t border-gray-100 mt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-blue-600 transition"
                  >
                    <link.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
