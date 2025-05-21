
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Check if the current route matches
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 bg-white shadow-md' : 'py-6 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl md:text-3xl font-bold text-black font-display">
          <span className="border-b-2 border-black">M</span>J Dev
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-black ${
                isActive(link.path) ? 'text-black font-bold' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild variant="default" size="sm" className="bg-black text-white hover:bg-black/80">
            <Link to="/admin">Admin</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-black p-2"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X size={24} className="text-black" />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white p-4 border-t border-gray-200 animate-slide-down shadow-md">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-sm font-medium p-2 rounded-md transition-colors ${
                  isActive(link.path) 
                    ? 'bg-black/5 text-black font-bold' 
                    : 'hover:bg-black/5 text-gray-600'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild variant="default" size="sm" className="mt-2 bg-black text-white hover:bg-black/80 w-full">
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                Admin
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
