
import React, { useState } from 'react';
import { ArrowRight, Calendar, Clock, User, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { Link } from 'react-router-dom';

// Mock blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React 18: What's New and Improved",
    excerpt: "Explore the latest features in React 18 and how they can improve your development workflow.",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
    date: "May 15, 2025",
    author: "Syed Mujtaba Abbas",
    readTime: "5 min read",
    category: "React",
    content: "React 18 introduces several exciting features that enhance both developer experience and application performance. Concurrent rendering, automatic batching, and the new Suspense SSR architecture are game-changers for modern web applications. This version focuses on making app performance more predictable under heavy loads while simplifying the API for common tasks. The new startTransition API helps prioritize urgent updates over less critical ones, leading to more responsive user interfaces even during complex state updates.",
  },
  {
    id: 2,
    title: "Building Responsive UIs with Tailwind CSS",
    excerpt: "Learn how to create beautiful, responsive interfaces quickly using Tailwind CSS utility classes.",
    coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop",
    date: "April 28, 2025",
    author: "Syed Mujtaba Abbas",
    readTime: "7 min read",
    category: "CSS",
    content: "Tailwind CSS has revolutionized frontend development with its utility-first approach. By composing small, single-purpose classes directly in your markup, you can build complex designs without leaving your HTML. The framework's responsive modifiers make it seamless to adapt your UI to different screen sizes, while its JIT compiler ensures your production CSS remains small and optimized. With Tailwind, you'll find yourself writing less custom CSS and shipping features faster than ever before.",
  },
  {
    id: 3,
    title: "Introduction to TypeScript for React Developers",
    excerpt: "Discover how TypeScript can make your React applications more robust and maintainable.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
    date: "April 10, 2025",
    author: "Syed Mujtaba Abbas",
    readTime: "6 min read",
    category: "TypeScript",
    content: "TypeScript brings static typing to JavaScript, creating a more robust development experience for React applications. By defining interfaces for your props and state, you catch errors during development rather than at runtime. TypeScript's type inference system works seamlessly with React's component model, helping you ensure that data flows correctly through your application. The combination of React's component structure and TypeScript's type system results in more maintainable, self-documenting code that scales with your team and project complexity.",
  },
  {
    id: 4,
    title: "State Management in 2025: Beyond Redux",
    excerpt: "Explore modern state management solutions for React applications in 2025.",
    coverImage: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1374&auto=format&fit=crop",
    date: "March 22, 2025",
    author: "Syed Mujtaba Abbas",
    readTime: "8 min read",
    category: "State Management",
    content: "The state management landscape has evolved significantly since Redux's dominance. Today's React applications leverage a mix of Context API, React Query for server state, Zustand for client state, and Jotai for atomic state management. These modern solutions reduce boilerplate while maintaining predictability. Server components and React Server Actions are blurring the line between client and server state, creating new paradigms for data management. The focus has shifted from global stores to purpose-specific tools that solve distinct problems in the state management domain.",
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Get all unique categories
  const categories = Array.from(new Set(blogPosts.map(post => post.category)));
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory ? post.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  const handlePostClick = (post: (typeof blogPosts)[0]) => {
    setSelectedPost(post);
    window.scrollTo(0, 0);
  };

  const closePostDetail = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen pt-16 bg-white text-black">
      {selectedPost ? (
        // Post Detail View
        <SectionContainer>
          <div className="max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              onClick={closePostDetail}
              className="mb-6 border-black text-black hover:bg-gray-100"
            >
              <ArrowRight className="mr-2 rotate-180" size={16} /> Back to Posts
            </Button>
            
            <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={selectedPost.coverImage} 
                alt={selectedPost.title} 
                className="w-full h-64 md:h-96 object-cover"
              />
              
              <div className="p-6 md:p-8">
                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
                  <span className="bg-black/5 text-black px-2 py-1 rounded">
                    {selectedPost.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    {selectedPost.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    {selectedPost.readTime}
                  </span>
                </div>
                
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black">
                  {selectedPost.title}
                </h1>
                
                <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
                  <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-black font-semibold mr-3">
                    M
                  </span>
                  <span className="text-gray-700">{selectedPost.author}</span>
                </div>
                
                <div className="prose max-w-none text-black">
                  <p className="text-lg leading-relaxed mb-6">{selectedPost.content}</p>
                  <p className="text-lg leading-relaxed mb-6">
                    This is an example of a full blog post. In a real application, this would contain much more content,
                    including paragraphs, images, code snippets, and other interactive elements.
                  </p>
                  <p className="text-lg leading-relaxed">
                    The blog system could be expanded to load these posts from a CMS or database rather than having them
                    hardcoded in the frontend application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      ) : (
        // Blog Posts List View
        <SectionContainer>
          <SectionTitle 
            title="Blog & Articles" 
            subtitle="Thoughts, tutorials, and insights on web development"
          />
          
          {/* Search and Filter */}
          <div className="mb-10">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative w-full md:w-1/2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!activeCategory ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  className={!activeCategory ? "bg-black text-white" : "border-black text-black hover:bg-gray-100"}
                  size="sm"
                >
                  All
                </Button>
                
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    className={activeCategory === category ? "bg-black text-white" : "border-black text-black hover:bg-gray-100"}
                    size="sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Featured Post */}
          {filteredPosts.length > 0 && (
            <div className="mb-16">
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-lg animate-on-scroll">
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-1/2">
                    <img 
                      src={filteredPosts[0].coverImage} 
                      alt={filteredPosts[0].title} 
                      className="w-full h-full object-cover"
                      style={{ maxHeight: '400px' }}
                    />
                  </div>
                  <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <span className="bg-black/5 text-black px-2 py-1 rounded">
                        {filteredPosts[0].category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {filteredPosts[0].date}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {filteredPosts[0].readTime}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                      {filteredPosts[0].title}
                    </h2>
                    <p className="text-gray-700 mb-6">
                      {filteredPosts[0].excerpt}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-black font-semibold mr-2">
                          M
                        </span>
                        <span className="text-sm text-gray-700">{filteredPosts[0].author}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        onClick={() => handlePostClick(filteredPosts[0])}
                        className="border-black text-black hover:bg-gray-100"
                      >
                        Read More <ArrowRight size={16} className="ml-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16 bg-gray-50 rounded-xl">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button 
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory(null);
                }}
                className="bg-black text-white hover:bg-black/90"
              >
                Clear Filters
              </Button>
            </div>
          )}
          
          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.slice(1).map((post, index) => (
                <div 
                  key={post.id}
                  className="bg-gray-50 rounded-lg overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow animate-on-scroll cursor-pointer"
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handlePostClick(post)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center text-xs text-gray-600 mb-3">
                      <span className="bg-black/5 text-black px-2 py-0.5 rounded">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span className="flex items-center">
                        <Calendar size={12} className="mr-1" />
                        {post.date}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-black">{post.title}</h3>
                    <p className="text-gray-700 text-sm mb-4 flex-grow">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center">
                        <User size={14} className="mr-1 text-gray-500" />
                        <span className="text-xs text-gray-600">{post.author}</span>
                      </div>
                      <span className="text-xs text-gray-600 flex items-center">
                        <Clock size={14} className="mr-1" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Newsletter Subscription */}
          <div className="mt-16 bg-gray-50 p-8 rounded-lg shadow-md animate-on-scroll">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl font-bold mb-2 text-black">Subscribe to My Newsletter</h2>
                <p className="text-gray-700">
                  Get notified when I publish new articles and tutorials. 
                  No spam, just valuable content delivered to your inbox.
                </p>
              </div>
              <div className="md:w-1/3 w-full">
                <div className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <Button className="rounded-l-none bg-black text-white hover:bg-black/90">Subscribe</Button>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>
      )}
    </div>
  );
};

export default Blog;
