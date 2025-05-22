export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedDate: string;
  tags: string[];
  date?: string; // For compatibility with admin pages
  author?: string; // For compatibility with admin pages
  readTime?: string; // For compatibility with admin pages
  category?: string; // For compatibility with admin pages
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'other';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  testimonial: string;
  avatarUrl?: string;
}

export interface User {
  id: string;
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    languages: string[];
    github: string;
    linkedin?: string;
    portfolio: string;
  };
  professionalSummary: string;
  skills: {
    frontend: string[];
    backend: string[];
    tools: string[];
    other: string[];
  };
  projects: {
    name: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    certifications: string[];
  };
  softSkills: string[];
  careerObjective: string;
  achievements: string[];
}
