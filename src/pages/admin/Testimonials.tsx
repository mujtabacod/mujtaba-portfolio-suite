
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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2, Star, User, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

// Mock testimonials data
const mockTestimonials = [
  {
    id: "1",
    name: "Alex Johnson",
    position: "CEO, TechStart",
    content: "Working with this developer was an absolute pleasure. They delivered the project on time and exceeded all our expectations.",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    name: "Maria Garcia",
    position: "Product Manager, InnovateCorp",
    content: "Incredible attention to detail and very responsive to feedback. I highly recommend their services for any web development project.",
    rating: 5,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    name: "David Kim",
    position: "Founder, DesignHub",
    content: "Outstanding work! The developer understood our requirements perfectly and delivered a beautiful, functional website that our customers love.",
    rating: 4,
    imageUrl: "/placeholder.svg",
  }
];

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([...mockTestimonials]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<any>(null);
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    position: '',
    content: '',
    rating: 5,
    imageUrl: '',
  });

  const handleAddTestimonial = () => {
    const testimonialToAdd = {
      id: (testimonials.length + 1).toString(),
      ...newTestimonial,
      imageUrl: newTestimonial.imageUrl || '/placeholder.svg',
    };
    
    setTestimonials([...testimonials, testimonialToAdd]);
    setIsAddDialogOpen(false);
    setNewTestimonial({
      name: '',
      position: '',
      content: '',
      rating: 5,
      imageUrl: '',
    });
    toast.success('Testimonial added successfully');
  };

  const handleEditTestimonial = () => {
    if (!currentTestimonial) return;
    
    const updatedTestimonials = testimonials.map(testimonial => 
      testimonial.id === currentTestimonial.id ? currentTestimonial : testimonial
    );
    
    setTestimonials(updatedTestimonials);
    setIsEditDialogOpen(false);
    setCurrentTestimonial(null);
    toast.success('Testimonial updated successfully');
  };

  const handleDeleteTestimonial = () => {
    if (!currentTestimonial) return;
    
    const updatedTestimonials = testimonials.filter(testimonial => testimonial.id !== currentTestimonial.id);
    setTestimonials(updatedTestimonials);
    setIsDeleteDialogOpen(false);
    setCurrentTestimonial(null);
    toast.success('Testimonial deleted successfully');
  };

  const openEditDialog = (testimonial: any) => {
    setCurrentTestimonial({...testimonial});
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (testimonial: any) => {
    setCurrentTestimonial(testimonial);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Testimonials</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Testimonial
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="bg-secondary/20">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                    {testimonial.imageUrl === '/placeholder.svg' ? (
                      <User className="h-6 w-6" />
                    ) : (
                      <img 
                        src={testimonial.imageUrl} 
                        alt={testimonial.name} 
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-base">{testimonial.name}</CardTitle>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Briefcase className="mr-1 h-3 w-3" />
                      {testimonial.position}
                    </div>
                  </div>
                </div>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                  {[...Array(5 - testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-muted-foreground" />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-4">{testimonial.content}</p>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => openEditDialog(testimonial)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-destructive hover:bg-destructive/10"
                  onClick={() => openDeleteDialog(testimonial)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {testimonials.length === 0 && (
          <Card className="bg-secondary/20 col-span-3">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <div className="text-muted-foreground">No testimonials found</div>
              <Button 
                onClick={() => setIsAddDialogOpen(true)} 
                className="mt-4"
                variant="outline"
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Your First Testimonial
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Add Testimonial Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Add New Testimonial</DialogTitle>
            <DialogDescription>
              Add a new client testimonial. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})}
                className="col-span-3"
                placeholder="Client name"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                value={newTestimonial.position}
                onChange={(e) => setNewTestimonial({...newTestimonial, position: e.target.value})}
                className="col-span-3"
                placeholder="Company and position"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={newTestimonial.content}
                onChange={(e) => setNewTestimonial({...newTestimonial, content: e.target.value})}
                className="col-span-3"
                rows={4}
                placeholder="Testimonial content"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="rating" className="text-right">
                Rating
              </Label>
              <div className="col-span-3">
                <div className="flex items-center">
                  <Input
                    id="rating"
                    type="number"
                    min="1"
                    max="5"
                    value={newTestimonial.rating}
                    onChange={(e) => setNewTestimonial({
                      ...newTestimonial, 
                      rating: Math.max(1, Math.min(5, Number(e.target.value)))
                    })}
                    className="w-20 mr-4"
                  />
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-5 w-5 cursor-pointer ${
                          i < newTestimonial.rating 
                            ? "fill-primary text-primary" 
                            : "text-muted-foreground"
                        }`}
                        onClick={() => setNewTestimonial({...newTestimonial, rating: i + 1})}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={newTestimonial.imageUrl}
                onChange={(e) => setNewTestimonial({...newTestimonial, imageUrl: e.target.value})}
                className="col-span-3"
                placeholder="URL to client image (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddTestimonial}>
              Add Testimonial
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Testimonial Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Testimonial</DialogTitle>
            <DialogDescription>
              Make changes to this testimonial. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentTestimonial && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={currentTestimonial.name}
                  onChange={(e) => setCurrentTestimonial({...currentTestimonial, name: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-position" className="text-right">
                  Position
                </Label>
                <Input
                  id="edit-position"
                  value={currentTestimonial.position}
                  onChange={(e) => setCurrentTestimonial({...currentTestimonial, position: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={currentTestimonial.content}
                  onChange={(e) => setCurrentTestimonial({...currentTestimonial, content: e.target.value})}
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-rating" className="text-right">
                  Rating
                </Label>
                <div className="col-span-3">
                  <div className="flex items-center">
                    <Input
                      id="edit-rating"
                      type="number"
                      min="1"
                      max="5"
                      value={currentTestimonial.rating}
                      onChange={(e) => setCurrentTestimonial({
                        ...currentTestimonial, 
                        rating: Math.max(1, Math.min(5, Number(e.target.value)))
                      })}
                      className="w-20 mr-4"
                    />
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 cursor-pointer ${
                            i < currentTestimonial.rating 
                              ? "fill-primary text-primary" 
                              : "text-muted-foreground"
                          }`}
                          onClick={() => setCurrentTestimonial({...currentTestimonial, rating: i + 1})}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={currentTestimonial.imageUrl}
                  onChange={(e) => setCurrentTestimonial({...currentTestimonial, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditTestimonial}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Testimonial Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Testimonial</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this testimonial? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentTestimonial && (
            <div className="py-4">
              <p className="font-medium">{currentTestimonial.name}</p>
              <p className="text-xs text-muted-foreground">{currentTestimonial.position}</p>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{currentTestimonial.content}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive" 
              onClick={handleDeleteTestimonial}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTestimonials;
