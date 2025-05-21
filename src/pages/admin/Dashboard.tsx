
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { projects, blogPosts } from '@/data/mockData';
import { BarChart, FileText, Folder, MessageSquare, Users } from 'lucide-react';

const Dashboard = () => {
  // Stats for the dashboard
  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: Folder,
      description: 'Projects in your portfolio',
    },
    {
      title: 'Blog Posts',
      value: blogPosts.length,
      icon: FileText,
      description: 'Published articles',
    },
    {
      title: 'Visitors',
      value: '1,234',
      icon: Users,
      description: 'Visitors this month',
    },
    {
      title: 'Messages',
      value: '16',
      icon: MessageSquare,
      description: 'Unread messages',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-secondary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {projects.slice(0, 4).map((project) => (
                <div key={project.id} className="flex items-center gap-4 p-2 hover:bg-secondary/50 rounded-md transition-colors">
                  <div className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center">
                    <Folder size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{project.title}</h4>
                    <p className="text-xs text-muted-foreground">
                      {project.technologies.slice(0, 2).join(', ')}
                      {project.technologies.length > 2 && ` +${project.technologies.length - 2} more`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-secondary/20">
          <CardHeader>
            <CardTitle>Recent Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div key={post.id} className="flex items-center gap-4 p-2 hover:bg-secondary/50 rounded-md transition-colors">
                  <div className="h-10 w-10 bg-primary/20 rounded flex items-center justify-center">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{post.title}</h4>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">
                        Published on {post.publishedDate}
                      </p>
                      <span className="text-xs px-2 py-0.5 bg-primary/20 text-primary rounded-full">
                        {post.tags[0]}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor Stats */}
      <Card className="bg-secondary/20">
        <CardHeader>
          <CardTitle>Visitor Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="flex items-center">
              <BarChart size={32} className="text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">Analytics data will appear here when connected</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
