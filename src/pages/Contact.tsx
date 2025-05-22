
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from 'lucide-react';
import SectionContainer, { SectionTitle } from '@/components/ui/section-container';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form data submitted:', formData);
      toast.success('Message sent successfully! I will get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16">
      <SectionContainer>
        <SectionTitle 
          title="Get in Touch" 
          subtitle="Have a question or want to work together? Send me a message!"
        />
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact Form */}
          <div className="md:w-2/3 animate-on-scroll">
            <div className="glass p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Send Me a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium mb-1"
                    >
                      Your Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium mb-1"
                    >
                      Your Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label 
                    htmlFor="subject" 
                    className="block text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div className="mb-6">
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium mb-1"
                  >
                    Your Message
                  </label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 rounded-md border border-border bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Hi Mujtaba, I'd like to discuss a project..."
                  />
                </div>
                
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⧖</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="md:w-1/3 animate-on-scroll delay-100">
            <div className="glass p-8 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a 
                      href="mailto:abbasmujtaba125@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      abbasmujtaba125@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <a 
                      href="tel:+923460630802" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      0346-0630802
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-2 rounded-full mr-4">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Links */}
            <div className="glass p-8 rounded-lg">
              <h2 className="text-xl font-semibold mb-6">Connect With Me</h2>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="https://github.com/mujtabaabas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary/50 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://www.linkedin.com/in/syed-mujtaba-abbas-4a3441366/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary/50 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-secondary/50 p-3 rounded-full hover:bg-primary/20 transition-colors"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      
      {/* Map Section (Placeholder) */}
      <SectionContainer className="bg-secondary/30">
        <div className="h-96 rounded-lg overflow-hidden animate-on-scroll">
          <div className="w-full h-full bg-muted flex items-center justify-center">
            <div className="text-center">
              <h3 className="font-semibold mb-2">Map Coming Soon</h3>
              <p className="text-muted-foreground">
                A Google Maps integration will be added in the future.
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </div>
  );
};

export default Contact;
