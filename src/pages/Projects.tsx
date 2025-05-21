
import React, { useState } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { projects } from '@/data/mockData';

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  
  // Get unique technologies from projects
  const allTechnologies = Array.from(
    new Set(
      projects.flatMap(project => project.technologies)
    )
  );
  
  // Filter projects based on selected technology
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.technologies.includes(filter));

  return (
    <div className="min-h-screen pt-16">
      <SectionContainer>
        <SectionTitle 
          title="My Projects" 
          subtitle="A showcase of my work, personal projects, and experiments"
        />
        
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setFilter('all')}
            className="animate-on-scroll"
          >
            All Projects
          </Button>
          
          {allTechnologies.map((tech, index) => (
            <Button
              key={tech}
              variant={filter === tech ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(tech)}
              className="animate-on-scroll"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {tech}
            </Button>
          ))}
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="glass rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  {project.liveUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} className="mr-1" />
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
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects match your filter criteria.</p>
            <Button 
              variant="outline" 
              onClick={() => setFilter('all')}
              className="mt-4"
            >
              Show All Projects
            </Button>
          </div>
        )}
      </SectionContainer>
      
      {/* Project Details Section */}
      <SectionContainer className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Want to see more of my work?</h2>
          <p className="text-muted-foreground mb-6">
            Check out my GitHub profile for more projects, contributions, and experiments.
            I'm constantly working on new projects and improving existing ones.
          </p>
          <Button asChild size="lg">
            <a 
              href="https://github.com/SyedMujtabaAbbas" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github size={18} className="mr-2" />
              Visit My GitHub
            </a>
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Projects;
