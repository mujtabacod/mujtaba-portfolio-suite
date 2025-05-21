
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Folder, 
  User, 
  Mail, 
  MessageSquare,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AdminSidebar = () => {
  const location = useLocation();
  const { logout } = useAuth();

  // Check if the current route matches
  const isActive = (path: string) => location.pathname === path;

  // Navigation links
  const navLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: Folder },
    { name: 'Blog Posts', path: '/admin/blog', icon: FileText },
    { name: 'Profile', path: '/admin/profile', icon: User },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  ];

  return (
    <aside className="w-64 h-screen bg-secondary flex-shrink-0 hidden md:block">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border/20">
          <Link to="/admin" className="text-xl font-bold text-gradient font-display">
            <span className="text-primary">M</span>J Admin
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive(link.path) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground/80 hover:bg-primary/10 hover:text-primary'
                  }`}
                >
                  <link.icon size={18} className="mr-3" />
                  <span>{link.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/20">
          <Button onClick={logout} variant="ghost" className="w-full justify-start text-foreground/80 hover:text-destructive">
            <LogOut size={18} className="mr-3" />
            <span>Logout</span>
          </Button>
          <div className="mt-4 text-center">
            <Button asChild variant="outline" size="sm">
              <Link to="/">View Site</Link>
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
