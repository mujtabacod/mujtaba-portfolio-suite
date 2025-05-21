
import React from 'react';
import { ArrowRight, Calendar, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { Link } from 'react-router-dom';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with React 18: What's New and Improved',
    excerpt: 'Explore the latest features in React 18 and how they can improve your development workflow.',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop',
    date: 'May 15, 2025',
    author: 'Syed Mujtaba Abbas',
    readTime: '5 min read',
    category: 'React',
  },
  {
    id: 2,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Learn how to create beautiful, responsive interfaces quickly using Tailwind CSS utility classes.',
    coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop',
    date: 'April 28, 2025',
    author: 'Syed Mujtaba Abbas',
    readTime: '7 min read',
    category: 'CSS',
  },
  {
    id: 3,
    title: 'Introduction to TypeScript for React Developers',
    excerpt: 'Discover how TypeScript can make your React applications more robust and maintainable.',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop',
    date: 'April 10, 2025',
    author: 'Syed Mujtaba Abbas',
    readTime: '6 min read',
    category: 'TypeScript',
  },
  {
    id: 4,
    title: 'State Management in 2025: Beyond Redux',
    excerpt: 'Explore modern state management solutions for React applications in 2025.',
    coverImage: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1374&auto=format&fit=crop',
    date: 'March 22, 2025',
    author: 'Syed Mujtaba Abbas',
    readTime: '8 min read',
    category: 'State Management',
  },
];

const Blog = () => {
  return (
    <div className="min-h-screen pt-16">
      <SectionContainer>
        <SectionTitle 
          title="Blog & Articles" 
          subtitle="Thoughts, tutorials, and insights on web development"
        />
        
        {/* Featured Post */}
        <div className="mb-16">
          <div className="glass rounded-xl overflow-hidden animate-on-scroll">
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2">
                <img 
                  src={blogPosts[0].coverImage} 
                  alt={blogPosts[0].title} 
                  className="w-full h-full object-cover"
                  style={{ maxHeight: '400px' }}
                />
              </div>
              <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {blogPosts[0].category}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {blogPosts[0].date}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {blogPosts[0].readTime}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold mr-2">
                      M
                    </span>
                    <span className="text-sm">{blogPosts[0].author}</span>
                  </div>
                  <Button variant="outline">
                    Read More <ArrowRight size={16} className="ml-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(1).map((post, index) => (
            <div 
              key={post.id}
              className="glass rounded-lg overflow-hidden flex flex-col animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/20">
                  <div className="flex items-center">
                    <User size={14} className="mr-1 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{post.author}</span>
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock size={14} className="mr-1" />
                    {post.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Newsletter Subscription */}
        <div className="mt-16 glass p-8 rounded-lg animate-on-scroll">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-2">Subscribe to My Newsletter</h2>
              <p className="text-muted-foreground">
                Get notified when I publish new articles and tutorials. 
                No spam, just valuable content delivered to your inbox.
              </p>
            </div>
            <div className="md:w-1/3 w-full">
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-3 py-2 rounded-l-md border border-border focus:outline-none"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Blog;
