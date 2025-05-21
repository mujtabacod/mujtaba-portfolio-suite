
import React from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';

const Resume = () => {
  // Function to download resume (placeholder)
  const handleDownloadResume = () => {
    // In a real application, this would trigger a download of the PDF file
    // For now, we'll just log a message
    console.log('Resume download triggered');
    alert('Resume download feature will be implemented in the future.');
  };
  
  return (
    <div className="min-h-screen pt-16">
      <SectionContainer>
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <SectionTitle 
              title="My Resume" 
              subtitle="A comprehensive overview of my skills, experience, and education"
              className="text-left"
            />
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={handleDownloadResume} className="animate-on-scroll">
              <Download size={16} className="mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
        
        <div className="glass p-8 rounded-lg max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-bold mb-2">Syed Mujtaba Abbas</h1>
            <p className="text-muted-foreground mb-3">Full-Stack Web Developer</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span>📍 Pakistan</span>
              <span>✉️ s4mujtaba555@gmail.com</span>
              <span>📱 0346-0630802</span>
              <span>🌐 github.com/SyedMujtabaAbbas</span>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          {/* Professional Summary */}
          <section className="mb-8 animate-on-scroll">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Professional Summary
            </h2>
            <p className="text-muted-foreground">
              Creative and passionate Full-Stack Web Developer with a strong command of modern web 
              technologies like Next.js, React, TypeScript, Tailwind CSS, and Node.js. Adept in 
              building beautiful, animated, and functional websites and web apps with real-time 
              interactivity and responsiveness.
            </p>
            <p className="text-muted-foreground mt-2">
              Experienced in creating AI-based apps, resume builders, code editors, TV streaming 
              platforms, and multi-page modern web UIs. Committed to continuous learning and 
              delivering high-quality, pixel-perfect projects.
            </p>
          </section>
          
          {/* Technical Skills */}
          <section className="mb-8 animate-on-scroll delay-100">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Frontend</h3>
                <p className="text-muted-foreground">
                  React.js, Next.js, Vite.js, TypeScript, Tailwind CSS, HTML5, CSS3, Framer Motion, JavaScript (ES6+)
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Backend</h3>
                <p className="text-muted-foreground">
                  Node.js, Express.js, MongoDB, Firebase, REST APIs
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Tools & Libraries</h3>
                <p className="text-muted-foreground">
                  Git, GitHub, Postman, Redux Toolkit, React Query, jsPDF, Three.js, Lottie Animations
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Other</h3>
                <p className="text-muted-foreground">
                  ChatGPT API Integration, PWA, Responsive Design, Figma to Code, Dark/Light Mode Toggle
                </p>
              </div>
            </div>
          </section>
          
          {/* Projects */}
          <section className="mb-8 animate-on-scroll delay-200">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Key Projects
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">✅ Dynamic Resume Builder</h3>
                <p className="text-muted-foreground">
                  Multi-step resume creation tool with live preview, editable sections, theme toggle, and PDF download.
                </p>
              </div>
              <div>
                <h3 className="font-medium">✅ Al-Kazim Model School Website</h3>
                <p className="text-muted-foreground">
                  Professional school website with Admission Form, Attendance Checker, Secure Portal, and School GPT chatbot.
                </p>
              </div>
              <div>
                <h3 className="font-medium">✅ 3D Animated Portfolio</h3>
                <p className="text-muted-foreground">
                  Next.js 14 + Tailwind-based interactive portfolio using Framer Motion and Three.js for immersive experience.
                </p>
              </div>
            </div>
          </section>
          
          {/* Education */}
          <section className="mb-8 animate-on-scroll delay-300">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Education
            </h2>
            <div>
              <h3 className="font-medium">Intermediate (commerce)</h3>
              <p className="text-muted-foreground">Pakistan</p>
              <div className="mt-2">
                <h4 className="font-medium">Certifications:</h4>
                <ul className="list-disc list-inside text-muted-foreground">
                  <li>GIAIC Certified Web & App Developer</li>
                  <li>AI, Cloud, and Web 3.0 Programs (PIAIC/GIAIC)</li>
                </ul>
              </div>
            </div>
          </section>
          
          {/* Soft Skills */}
          <section className="mb-8 animate-on-scroll delay-400">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Soft Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">Team Collaboration</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">Time Management</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">Problem Solving</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">UI/UX Thinking</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">Self-Motivated Learner</span>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-center">Communication</span>
            </div>
          </section>
          
          {/* Career Objective */}
          <section className="animate-on-scroll delay-500">
            <h2 className="text-xl font-semibold mb-3 flex items-center">
              <FileText size={18} className="mr-2 text-primary" />
              Career Objective
            </h2>
            <p className="text-muted-foreground">
              To grow as a professional full-stack developer by contributing to innovative projects 
              and learning cutting-edge technologies, with the vision of building impactful digital 
              products for users in Pakistan and globally.
            </p>
          </section>
        </div>
      </SectionContainer>
      
      {/* Call to Action */}
      <SectionContainer className="bg-secondary/30">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Discuss Your Project?</h2>
          <p className="text-muted-foreground mb-6">
            I'm always open to new opportunities and interesting projects.
            Let's create something amazing together!
          </p>
          <Button asChild size="lg">
            <Link to="/contact">
              Contact Me <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Resume;
