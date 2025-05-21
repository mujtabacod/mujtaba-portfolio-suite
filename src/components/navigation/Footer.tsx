
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Short Description */}
          <div>
            <Link to="/" className="text-2xl font-bold text-white font-display">
              <span className="border-b-2 border-white">M</span>J Dev
            </Link>
            <p className="mt-4 text-gray-300">
              Full-stack web developer specializing in creating beautiful, functional, and responsive web applications.
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com/SyedMujtabaAbbas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="#linkedin"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:s4mujtaba555@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-300 hover:text-white transition-colors">Projects</Link>
              </li>
              <li>
                <Link to="/resume" className="text-gray-300 hover:text-white transition-colors">Resume</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail size={18} className="mr-3 text-white" />
                <a href="mailto:s4mujtaba555@gmail.com" className="text-gray-300 hover:text-white transition-colors">
                  s4mujtaba555@gmail.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone size={18} className="mr-3 text-white" />
                <a href="tel:+923460630802" className="text-gray-300 hover:text-white transition-colors">
                  0346-0630802
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Syed Mujtaba Abbas. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
