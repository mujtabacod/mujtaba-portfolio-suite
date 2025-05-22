
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Search, Plus, Edit, Trash, X, ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { projects as initialProjects } from '@/data/mockData';
import { toast } from "sonner";

// Define the Project type based on our existing data
interface Project {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  featured: boolean;
  coverImage?: string;
}

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [newTechnology, setNewTechnology] = useState("");

  // Form state
  const [formData, setFormData] = useState<Project>({
    id: "",
    title: "",
    description: "",
    image: "",
    technologies: [],
    projectUrl: "",
    githubUrl: "",
    featured: false,
  });

  // Filter projects based on search query
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      featured: checked
    }));
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !formData.technologies.includes(newTechnology.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology("");
    }
  };

  const handleRemoveTechnology = (techToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };

  const handleAddProject = () => {
    // Generate a unique ID for the new project
    const newId = projects.length > 0 
      ? Math.max(...projects.map(project => typeof project.id === 'number' ? project.id : 0)) + 1 
      : 1;
    
    const newProject: Project = {
      ...formData,
      id: newId,
      image: formData.image || formData.imageUrl || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1470&auto=format&fit=crop",
      featured: formData.featured || false,
    };

    setProjects([...projects, newProject]);
    setIsDialogOpen(false);
    resetForm();
    
    toast.success("Project added successfully!");
  };

  const handleEditProject = () => {
    if (!currentProject) return;
    
    const updatedProject: Project = {
      ...formData,
      image: formData.image || formData.imageUrl || currentProject.image,
      featured: formData.featured,
    };

    setProjects(projects.map(project => 
      project.id === currentProject.id ? updatedProject : project
    ));
    setIsDialogOpen(false);
    resetForm();
    
    toast.success("Project updated successfully!");
  };

  const handleDeleteProject = () => {
    if (!currentProject) return;
    
    setProjects(projects.filter(project => project.id !== currentProject.id));
    setIsDeleteDialogOpen(false);
    setCurrentProject(null);
    
    toast.success("Project deleted successfully!");
  };

  const openAddDialog = () => {
    resetForm();
    setCurrentProject(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (project: Project) => {
    setCurrentProject(project);
    setFormData({
      ...project
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (project: Project) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      image: "",
      technologies: [],
      projectUrl: "",
      githubUrl: "",
      featured: false,
    });
    setNewTechnology("");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button
          onClick={openAddDialog}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus size={18} className="mr-2" /> Add New Project
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search projects..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredProjects.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No projects found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Technologies</TableHead>
                    <TableHead className="hidden md:table-cell">Featured</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProjects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded bg-secondary/50 flex-shrink-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${project.image})` }}
                          />
                          <div>
                            <div className="font-medium truncate max-w-[200px]">{project.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {project.description}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="outline">{tech}</Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {project.featured ? (
                          <Badge className="bg-green-500 text-white hover:bg-green-600">Yes</Badge>
                        ) : (
                          <Badge variant="outline">No</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(project)}
                          >
                            <Edit size={18} className="text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteDialog(project)}
                          >
                            <Trash size={18} className="text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Add/Edit Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentProject ? "Edit Project" : "Add New Project"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="image">Image URL</Label>
              <Input 
                id="image" 
                name="image" 
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="technologies">Technologies</Label>
              <div className="flex gap-2">
                <Input 
                  id="technologies" 
                  value={newTechnology}
                  onChange={(e) => setNewTechnology(e.target.value)}
                  placeholder="Add a technology"
                  className="flex-grow"
                />
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={handleAddTechnology}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                    {tech}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => handleRemoveTechnology(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="projectUrl">Project URL</Label>
                <div className="flex">
                  <Input 
                    id="projectUrl" 
                    name="projectUrl" 
                    value={formData.projectUrl || ""}
                    onChange={handleInputChange}
                    placeholder="https://"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    disabled={!formData.projectUrl}
                    className="ml-2"
                    onClick={() => window.open(formData.projectUrl, '_blank')}
                  >
                    <ExternalLink size={18} />
                  </Button>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="githubUrl">GitHub URL</Label>
                <div className="flex">
                  <Input 
                    id="githubUrl" 
                    name="githubUrl" 
                    value={formData.githubUrl || ""}
                    onChange={handleInputChange}
                    placeholder="https://github.com/"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    disabled={!formData.githubUrl}
                    className="ml-2"
                    onClick={() => window.open(formData.githubUrl, '_blank')}
                  >
                    <Github size={18} />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                checked={formData.featured}
                onCheckedChange={handleSwitchChange}
                id="featured"
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={currentProject ? handleEditProject : handleAddProject}
            >
              {currentProject ? "Save Changes" : "Add Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-foreground">
                "{currentProject?.title}"
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteProject}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
