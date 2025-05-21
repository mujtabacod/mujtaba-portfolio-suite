import { Project, BlogPost, Skill, Testimonial, ResumeData } from '../types';

// Projects data
export const projects: Project[] = [
  {
    id: '1',
    title: 'Dynamic Resume Builder',
    description: 'Multi-step resume creation tool with live preview, editable sections, theme toggle, and PDF download.',
    technologies: ['React', 'Tailwind CSS', 'jsPDF', 'Redux Toolkit'],
    imageUrl: '/placeholder.svg',
    liveUrl: 'https://example.com/resume-builder',
    githubUrl: 'https://github.com/example/resume-builder',
    featured: true,
  },
  {
    id: '2',
    title: 'Al-Kazim Model School Website',
    description: 'Professional school website with Admission Form, Attendance Checker, Secure Portal, and School GPT chatbot.',
    technologies: ['Next.js', 'Tailwind CSS', 'MongoDB', 'ChatGPT API'],
    imageUrl: '/placeholder.svg',
    liveUrl: 'https://example.com/school-website',
    githubUrl: 'https://github.com/example/school-website',
    featured: true,
  },
  {
    id: '3',
    title: '3D Animated Portfolio',
    description: 'Next.js 14 + Tailwind-based interactive portfolio using Framer Motion and Three.js for immersive experience.',
    technologies: ['Next.js 14', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
    imageUrl: '/placeholder.svg',
    liveUrl: 'https://example.com/3d-portfolio',
    githubUrl: 'https://github.com/example/3d-portfolio',
    featured: true,
  },
  {
    id: '4',
    title: 'E-Commerce Dashboard',
    description: 'Full-featured admin dashboard for e-commerce with analytics, inventory management, and order processing.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    imageUrl: '/placeholder.svg',
    liveUrl: 'https://example.com/ecommerce-dashboard',
    githubUrl: 'https://github.com/example/ecommerce-dashboard',
    featured: false,
  },
  {
    id: '5',
    title: 'Streaming Platform UI',
    description: 'Modern streaming platform interface with video playback, user profiles, and recommendations.',
    technologies: ['React', 'Tailwind CSS', 'Firebase'],
    imageUrl: '/placeholder.svg',
    liveUrl: 'https://example.com/streaming-platform',
    githubUrl: 'https://github.com/example/streaming-platform',
    featured: false,
  }
];

// Blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Learn how to create beautiful, responsive user interfaces using Tailwind CSS.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel elit vestibulum tincidunt. Phasellus auctor eros sit amet magna bibendum, eu finibus nunc lacinia...',
    coverImage: '/placeholder.svg',
    publishedDate: '2023-05-15',
    tags: ['Tailwind CSS', 'Frontend', 'UI Design']
  },
  {
    id: '2',
    title: 'Implementing JWT Authentication in Node.js',
    excerpt: 'A step-by-step guide to implementing secure JWT authentication in your Node.js applications.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel elit vestibulum tincidunt. Phasellus auctor eros sit amet magna bibendum, eu finibus nunc lacinia...',
    coverImage: '/placeholder.svg',
    publishedDate: '2023-06-20',
    tags: ['Node.js', 'Authentication', 'Security', 'JWT']
  },
  {
    id: '3',
    title: 'Creating 3D Animations with Three.js',
    excerpt: 'Explore the world of 3D web graphics and learn how to create stunning animations with Three.js.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget felis vel elit vestibulum tincidunt. Phasellus auctor eros sit amet magna bibendum, eu finibus nunc lacinia...',
    coverImage: '/placeholder.svg',
    publishedDate: '2023-07-10',
    tags: ['Three.js', '3D Graphics', 'Animation', 'WebGL']
  }
];

// Skills data
export const skills: Skill[] = [
  // Frontend
  { name: 'React.js', level: 95, category: 'frontend' },
  { name: 'Next.js', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'frontend' },
  { name: 'HTML5/CSS3', level: 98, category: 'frontend' },
  { name: 'JavaScript (ES6+)', level: 92, category: 'frontend' },
  { name: 'Framer Motion', level: 80, category: 'frontend' },
  
  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Express.js', level: 80, category: 'backend' },
  { name: 'MongoDB', level: 75, category: 'backend' },
  { name: 'Firebase', level: 80, category: 'backend' },
  { name: 'REST APIs', level: 90, category: 'backend' },
  
  // Tools
  { name: 'Git/GitHub', level: 90, category: 'tools' },
  { name: 'Postman', level: 85, category: 'tools' },
  { name: 'Redux Toolkit', level: 80, category: 'tools' },
  { name: 'React Query', level: 75, category: 'tools' },
  { name: 'Three.js', level: 70, category: 'tools' },
  
  // Other
  { name: 'Responsive Design', level: 95, category: 'other' },
  { name: 'PWA', level: 80, category: 'other' },
  { name: 'ChatGPT API', level: 85, category: 'other' },
  { name: 'UI/UX Design', level: 75, category: 'other' }
];

// Testimonials data
export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    role: 'CEO',
    company: 'TechSolutions Inc',
    testimonial: 'Syed delivered an exceptional website that perfectly captured our vision. His attention to detail and technical expertise made the entire process smooth and successful.',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Sarah Ali',
    role: 'Project Manager',
    company: 'Creative Works',
    testimonial: 'Working with Mujtaba was a pleasure. His ability to understand our requirements and translate them into a functional, beautiful website was impressive. Highly recommended!',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Zain Abbas',
    role: 'School Director',
    company: 'Al-Kazim Model School',
    testimonial: 'The school website Syed created for us has transformed our online presence. Parents and students love the interactive features, especially the attendance tracker and admission forms.',
    avatarUrl: '/placeholder.svg'
  }
];

// Resume data
export const resumeData: ResumeData = {
  personalInfo: {
    fullName: 'Syed Mujtaba Abbas',
    email: 's4mujtaba555@gmail.com',
    phone: '0346-0630802',
    location: 'Pakistan',
    languages: ['Urdu', 'English'],
    github: 'github.com/SyedMujtabaAbbas',
    portfolio: 'https://mujtaba-portfolio.vercel.app'
  },
  professionalSummary: 'Creative and passionate Full-Stack Web Developer with a strong command of modern web technologies like Next.js, React, TypeScript, Tailwind CSS, and Node.js. Adept in building beautiful, animated, and functional websites and web apps with real-time interactivity and responsiveness. Experienced in creating AI-based apps, resume builders, code editors, TV streaming platforms, and multi-page modern web UIs. Committed to continuous learning and delivering high-quality, pixel-perfect projects.',
  skills: {
    frontend: ['React.js', 'Next.js', 'Vite.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'Framer Motion', 'JavaScript (ES6+)'],
    backend: ['Node.js', 'Express.js', 'MongoDB', 'Firebase', 'REST APIs'],
    tools: ['Git', 'GitHub', 'Postman', 'Redux Toolkit', 'React Query', 'jsPDF', 'Three.js', 'Lottie Animations'],
    other: ['ChatGPT API Integration', 'PWA', 'Responsive Design', 'Figma to Code', 'Dark/Light Mode Toggle', 'File Upload Systems']
  },
  projects: [
    {
      name: 'Dynamic Resume Builder',
      description: 'Multi-step resume creation tool with live preview, editable sections, theme toggle, and PDF download.'
    },
    {
      name: 'Al-Kazim Model School Website',
      description: 'Professional school website with Admission Form, Attendance Checker, Secure Portal, and School GPT chatbot.'
    },
    {
      name: '3D Animated Portfolio',
      description: 'Next.js 14 + Tailwind-based interactive portfolio using Framer Motion and Three.js for immersive experience.'
    }
  ],
  education: {
    degree: 'Intermediate (commerce)',
    institution: 'Pakistan',
    certifications: ['GIAIC Certified Web & App Developer (In Progress / Completed)', 'AI, Cloud, and Web 3.0 Programs (PIAIC/GIAIC)']
  },
  softSkills: ['Team Collaboration', 'Time Management', 'Problem Solving', 'UI/UX Thinking', 'Self-Motivated Learner', 'Excellent Communication'],
  careerObjective: 'To grow as a professional full-stack developer by contributing to innovative projects and learning cutting-edge technologies, with the vision of building impactful digital products for users in Pakistan and globally.',
  achievements: [
    'Created multiple real-world projects used in professional and academic environments.',
    'Consistently delivered responsive, pixel-perfect designs from Figma files.',
    'Integrated AI and chatbots into web systems.',
    'Successfully deployed projects to Vercel, Netlify, and GitHub Pages.'
  ]
};
