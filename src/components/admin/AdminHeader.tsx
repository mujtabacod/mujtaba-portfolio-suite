
import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const AdminHeader = () => {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-secondary border-b border-border/20 flex items-center px-4">
      <Button variant="ghost" size="icon" className="md:hidden mr-2">
        <Menu size={24} />
      </Button>
      
      <div className="flex-1" />
      
      <div className="flex items-center">
        <Button variant="ghost" size="icon" className="mr-2 text-muted-foreground">
          <Bell size={20} />
        </Button>
        
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium mr-2">
            {user?.email.charAt(0).toUpperCase()}
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">{user?.email}</p>
            <p className="text-xs text-muted-foreground">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
