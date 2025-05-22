
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2, Search, XCircle } from 'lucide-react';
import { projects } from '@/data/mockData';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

const AdminProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [projectsList, setProjectsList] = useState([...projects]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    imageUrl: '',
    technologies: '',
    projectUrl: '',
    githubUrl: '',
  });

  const filteredProjects = projectsList.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProject = () => {
    const technologies = newProject.technologies.split(',').map(tech => tech.trim());
    
    const projectToAdd = {
      id: (projectsList.length + 1).toString(),
      title: newProject.title,
      description: newProject.description,
      imageUrl: newProject.imageUrl || '/placeholder.svg',
      technologies,
      projectUrl: newProject.projectUrl,
      githubUrl: newProject.githubUrl,
    };
    
    setProjectsList([...projectsList, projectToAdd]);
    setIsAddDialogOpen(false);
    setNewProject({
      title: '',
      description: '',
      imageUrl: '',
      technologies: '',
      projectUrl: '',
      githubUrl: '',
    });
    toast.success('Project added successfully');
  };

  const handleEditProject = () => {
    if (!currentProject) return;
    
    const technologies = typeof currentProject.technologies === 'string' 
      ? currentProject.technologies.split(',').map((tech: string) => tech.trim())
      : currentProject.technologies;
    
    const updatedProject = {
      ...currentProject,
      technologies,
    };
    
    const updatedProjects = projectsList.map(project => 
      project.id === updatedProject.id ? updatedProject : project
    );
    
    setProjectsList(updatedProjects);
    setIsEditDialogOpen(false);
    setCurrentProject(null);
    toast.success('Project updated successfully');
  };

  const handleDeleteProject = () => {
    if (!currentProject) return;
    
    const updatedProjects = projectsList.filter(project => project.id !== currentProject.id);
    setProjectsList(updatedProjects);
    setIsDeleteDialogOpen(false);
    setCurrentProject(null);
    toast.success('Project deleted successfully');
  };

  const openEditDialog = (project: any) => {
    setCurrentProject({
      ...project,
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ')
        : project.technologies
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (project: any) => {
    setCurrentProject(project);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Projects Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <Card className="bg-secondary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Projects</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-2 top-2.5" 
                  onClick={() => setSearchTerm('')}
                >
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>
          </div>
          <CardDescription>Manage your portfolio projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    No projects found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.title}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 2).map((tech, index) => (
                          <span 
                            key={index} 
                            className="bg-secondary px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 2 && (
                          <span className="bg-secondary px-2 py-1 rounded-full text-xs">
                            +{project.technologies.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {project.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => openDeleteDialog(project)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Add Project Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add a new project to your portfolio. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={newProject.imageUrl}
                onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="technologies" className="text-right">
                Technologies
              </Label>
              <Input
                id="technologies"
                value={newProject.technologies}
                onChange={(e) => setNewProject({...newProject, technologies: e.target.value})}
                className="col-span-3"
                placeholder="React, TypeScript, Tailwind (comma separated)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectUrl" className="text-right">
                Project URL
              </Label>
              <Input
                id="projectUrl"
                value={newProject.projectUrl}
                onChange={(e) => setNewProject({...newProject, projectUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="githubUrl" className="text-right">
                GitHub URL
              </Label>
              <Input
                id="githubUrl"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddProject}>
              Add Project
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to the project. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentProject.title}
                  onChange={(e) => setCurrentProject({...currentProject, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-description" className="text-right">
                  Description
                </Label>
                <Input
                  id="edit-description"
                  value={currentProject.description}
                  onChange={(e) => setCurrentProject({...currentProject, description: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={currentProject.imageUrl}
                  onChange={(e) => setCurrentProject({...currentProject, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-technologies" className="text-right">
                  Technologies
                </Label>
                <Input
                  id="edit-technologies"
                  value={currentProject.technologies}
                  onChange={(e) => setCurrentProject({...currentProject, technologies: e.target.value})}
                  className="col-span-3"
                  placeholder="React, TypeScript, Tailwind (comma separated)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-projectUrl" className="text-right">
                  Project URL
                </Label>
                <Input
                  id="edit-projectUrl"
                  value={currentProject.projectUrl}
                  onChange={(e) => setCurrentProject({...currentProject, projectUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-githubUrl" className="text-right">
                  GitHub URL
                </Label>
                <Input
                  id="edit-githubUrl"
                  value={currentProject.githubUrl}
                  onChange={(e) => setCurrentProject({...currentProject, githubUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditProject}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Project Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Project</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this project? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentProject && (
            <div className="py-4">
              <p className="font-medium">{currentProject.title}</p>
              <p className="text-sm text-muted-foreground mt-2">{currentProject.description}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
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
