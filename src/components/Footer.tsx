import { Phone, MessageCircle } from 'lucide-react';
import { socialLinks } from './SocialLinks';
import logo from '../assets/logo.png';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand & Contact Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center p-1">
                <img src={logo} alt="SkyDesigners Logo" className="w-full h-full object-contain" />
              </div>
              <span className="text-2xl font-bold">SKYDESIGNERS</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transforming ideas into visual masterpieces.
            </p>
            <h3 className="text-xl mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+233 502 140 791</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <span>Text • Calls • WhatsApp</span>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl mb-6">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition ${link.colorClass || 'bg-blue-600'}`}
                  title={link.name}
                >
                  <link.icon className={`w-5 h-5 ${link.name === 'Snapchat' ? 'text-black' : 'text-white'}`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition">Our Story</a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white transition">Meet the Team</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-white transition">Services</a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-white transition">Portfolio</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition">Contact</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>© 2025 by Osei-Bonsu Skyper. All rights reserved.</p>
          <p>
            SKYDESIGNERS
          </p>
        </div>
      </div>
    </footer>
  );
}
