import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { projects, skills } from '@/data/mockData';
import { Skill } from '@/types';

const Home = () => {
  // Animation on scroll
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((element) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementPosition < windowHeight * 0.85) {
          element.classList.add('animated');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger once on load
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  // Filter featured projects
  const featuredProjects = projects.filter(project => project.featured);
  
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative hero-gradient">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/20 filter blur-3xl animate-spin-slow" />
          <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-accent/20 filter blur-3xl animate-spin-slow" />
        </div>
        
        <div className="container mx-auto px-4 z-10 pt-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-center md:text-left">
              <p className="text-primary font-medium mb-3 animate-slide-down">Full-Stack Web Developer</p>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-down">
                Hi, I'm <span className="text-gradient">Syed Mujtaba Abbas</span>
              </h1>
              
              <p className="text-xl mb-8 text-muted-foreground animate-slide-down delay-100">
                I build beautiful, responsive web applications with modern technologies
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start animate-slide-down delay-200">
                <Button asChild size="lg">
                  <Link to="/projects">View My Work</Link>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Get In Touch</Link>
                </Button>
              </div>
            </div>

            <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-4 border-primary/30 flex items-center justify-center relative animate-fade-in p-2">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <img 
                    src="https://mujtaba-mj.vercel.app/_next/image?url=%2Fhero.jpg&w=1920&q=75" 
                    alt="Syed Mujtaba Abbas"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -right-4 -top-4 bg-secondary p-2 rounded-full animate-pulse">
                  <div className="bg-primary w-4 h-4 rounded-full" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button variant="ghost" size="icon" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
              <ArrowDown size={24} className="text-primary" />
            </Button>
          </div>
        </div>
      </section>

      {/* About Section Preview */}
      <SectionContainer id="about" className="bg-secondary/30">
        <SectionTitle 
          title="About Me" 
          subtitle="Creative and passionate Full-Stack Web Developer with a strong command of modern web technologies"
        />
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 animate-on-scroll">
            <p className="mb-4 text-muted-foreground">
              I'm a Full-Stack Web Developer specializing in creating beautiful, 
              animated, and functional websites and web applications. With expertise 
              in Next.js, React, TypeScript, Tailwind CSS, and Node.js, I focus on 
              building responsive interfaces with real-time interactivity.
            </p>
            <p className="mb-6 text-muted-foreground">
              Throughout my career, I've built various projects including AI-based applications,
              resume builders, code editors, and streaming platforms. I'm committed to
              continuous learning and delivering high-quality, pixel-perfect projects.
            </p>
            <Button asChild>
              <Link to="/about">Learn More About Me</Link>
            </Button>
          </div>
          
          <div className="md:w-1/2 animate-on-scroll delay-100">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(skillsByCategory).slice(0, 2).map(([category, categorySkills]) => (
                <div key={category} className="glass p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {category} {category === 'frontend' ? 'Development' : 'Development'}
                  </h3>
                  <div className="space-y-2">
                    {categorySkills.slice(0, 3).map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{skill.name}</span>
                          <span>{skill.level}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Projects Section Preview */}
      <SectionContainer>
        <SectionTitle 
          title="Featured Projects" 
          subtitle="Check out some of my recent work"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="glass rounded-lg overflow-hidden card-hover animate-on-scroll" 
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                
                <div className="flex justify-between">
                  {project.liveUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    </Button>
                  )}
                  
                  {project.githubUrl && (
                    <Button asChild variant="ghost" size="sm">
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github size={16} className="mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center animate-on-scroll">
          <Button asChild size="lg">
            <Link to="/projects">View All Projects</Link>
          </Button>
        </div>
      </SectionContainer>

      {/* Call to Action */}
      <SectionContainer className="bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="text-center max-w-3xl mx-auto animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8">
            I'm currently available for freelance projects, full-time positions, or collaborative work.
            Let's create something amazing together!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/resume">View Resume</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Home;
