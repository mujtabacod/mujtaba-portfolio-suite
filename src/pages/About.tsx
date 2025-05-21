
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, Book, Briefcase, Award, Star, CheckCircle } from 'lucide-react';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { Separator } from '@/components/ui/separator';
import { skills } from '@/data/mockData';
import { Skill } from '@/types';

const About = () => {
  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <SectionContainer className="bg-secondary/30">
        <SectionTitle 
          title="About Me" 
          subtitle="Creative and passionate Full-Stack Web Developer specializing in modern web technologies"
        />
        
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="md:w-1/2 animate-on-scroll">
            <h3 className="text-2xl font-semibold mb-4">Syed Mujtaba Abbas</h3>
            <p className="mb-4 text-muted-foreground">
              I'm a Full-Stack Web Developer specializing in creating beautiful, 
              animated, and functional websites and web applications. With expertise 
              in Next.js, React, TypeScript, Tailwind CSS, and Node.js, I focus on 
              building responsive interfaces with real-time interactivity.
            </p>
            <p className="mb-4 text-muted-foreground">
              Throughout my career, I've built various projects including AI-based applications,
              resume builders, code editors, and streaming platforms. I'm committed to
              continuous learning and delivering high-quality, pixel-perfect projects.
            </p>
            <p className="mb-6 text-muted-foreground">
              I enjoy solving complex problems and turning them into simple, elegant solutions.
              My goal is to create web applications that not only look great but also provide
              exceptional user experiences.
            </p>
            <div className="flex space-x-4">
              <Button asChild>
                <Link to="/resume">View Resume <FileText className="ml-2" size={16} /></Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/projects">My Projects <Briefcase className="ml-2" size={16} /></Link>
              </Button>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <div className="glass p-6 rounded-lg animate-on-scroll">
              <img 
                src="https://mujtaba-mj.vercel.app/_next/image?url=%2Fhero.jpg&w=1920&q=75" 
                alt="Syed Mujtaba Abbas" 
                className="w-full h-80 object-cover rounded-lg mb-6"
              />
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-medium text-lg">Location</h4>
                  <p className="text-muted-foreground">Pakistan</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Email</h4>
                  <p className="text-muted-foreground">s4mujtaba555@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">Languages</h4>
                  <p className="text-muted-foreground">Urdu, English</p>
                </div>
                <div>
                  <h4 className="font-medium text-lg">GitHub</h4>
                  <p className="text-muted-foreground">github.com/SyedMujtabaAbbas</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Skills Section */}
      <SectionContainer>
        <SectionTitle 
          title="Technical Skills" 
          subtitle="I specialize in these technologies and continuously expand my skillset"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsByCategory).map(([category, categorySkills], index) => (
            <div 
              key={category}
              className="glass p-6 rounded-lg animate-on-scroll"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-4 capitalize">
                {category} {category === 'frontend' || category === 'backend' ? 'Development' : ''}
              </h3>
              <div className="space-y-4">
                {categorySkills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span>{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-1000 animate-on-scroll"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Education and Experience */}
      <SectionContainer className="bg-secondary/30">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Education */}
          <div className="animate-on-scroll">
            <div className="flex items-center gap-2 mb-6">
              <Book size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-1">Intermediate (Commerce)</h3>
                <p className="text-sm text-muted-foreground mb-3">Pakistan</p>
                <Separator className="my-3" />
                <div className="mt-2">
                  <h4 className="font-medium mb-2">Certifications</h4>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>GIAIC Certified Web & App Developer</li>
                    <li>AI, Cloud, and Web 3.0 Programs (PIAIC/GIAIC)</li>
                    <li>Advanced React & Frontend Development</li>
                    <li>UI/UX Design Fundamentals</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Experience */}
          <div className="animate-on-scroll delay-100">
            <div className="flex items-center gap-2 mb-6">
              <Briefcase size={24} className="text-primary" />
              <h2 className="text-2xl font-bold">Experience</h2>
            </div>
            <div className="space-y-6">
              <div className="glass p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-1">Full-Stack Web Developer</h3>
                <p className="text-sm text-muted-foreground mb-3">Freelance</p>
                <Separator className="my-3" />
                <p className="text-muted-foreground">
                  Developed various web applications including AI-based apps, resume builders, 
                  code editors, and TV streaming platforms. Focused on delivering high-quality, 
                  responsive web applications with exceptional user experiences.
                </p>
                <ul className="mt-3 list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Created dynamic, responsive user interfaces with React and Next.js</li>
                  <li>Implemented state management solutions using Redux and React Query</li>
                  <li>Built RESTful APIs with Node.js and Express</li>
                  <li>Integrated AI solutions for enhanced user experiences</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* Services Section */}
      <SectionContainer>
        <SectionTitle 
          title="My Services" 
          subtitle="High-quality web development services tailored to your needs"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 animate-on-scroll">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <CheckCircle size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Frontend Development</h3>
            <p className="text-muted-foreground">
              Creating beautiful, responsive user interfaces using React, Next.js, and Tailwind CSS 
              with smooth animations and exceptional user experience.
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 animate-on-scroll delay-100">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <CheckCircle size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Backend Development</h3>
            <p className="text-muted-foreground">
              Building robust server-side applications with Node.js, Express, and MongoDB,
              including API development, authentication, and database design.
            </p>
          </div>
          
          <div className="glass p-6 rounded-lg transition-all duration-300 hover:transform hover:scale-105 animate-on-scroll delay-200">
            <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
              <CheckCircle size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Full-Stack Solutions</h3>
            <p className="text-muted-foreground">
              Delivering end-to-end web applications with seamless integration between
              frontend and backend systems for optimal performance and reliability.
            </p>
          </div>
        </div>
      </SectionContainer>

      {/* Achievements Section */}
      <SectionContainer className="bg-secondary/30">
        <SectionTitle 
          title="Achievements" 
          subtitle="Key milestones in my professional journey"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass p-6 rounded-lg text-center animate-on-scroll">
            <div className="bg-primary/10 p-3 rounded-full mx-auto w-fit mb-4">
              <Award size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">30+</h3>
            <p className="text-muted-foreground">Projects Completed</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center animate-on-scroll delay-100">
            <div className="bg-primary/10 p-3 rounded-full mx-auto w-fit mb-4">
              <Star size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">20+</h3>
            <p className="text-muted-foreground">Satisfied Clients</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center animate-on-scroll delay-200">
            <div className="bg-primary/10 p-3 rounded-full mx-auto w-fit mb-4">
              <Award size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">4+</h3>
            <p className="text-muted-foreground">Years Experience</p>
          </div>
          
          <div className="glass p-6 rounded-lg text-center animate-on-scroll delay-300">
            <div className="bg-primary/10 p-3 rounded-full mx-auto w-fit mb-4">
              <Star size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-1">5+</h3>
            <p className="text-muted-foreground">Certifications</p>
          </div>
        </div>
      </SectionContainer>
      
      {/* Call to Action */}
      <SectionContainer className="text-center">
        <h2 className="text-3xl font-bold mb-4">Interested in Working Together?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          I'm always open to new opportunities, collaborations, and interesting projects.
          Feel free to reach out!
        </p>
        <Button asChild size="lg">
          <Link to="/contact">
            Get In Touch <ArrowRight className="ml-2" size={16} />
          </Link>
        </Button>
      </SectionContainer>
    </div>
  );
};

export default About;
