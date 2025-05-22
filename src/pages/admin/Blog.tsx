
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
import { Search, Plus, Edit, Trash, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { blogPosts as initialBlogPosts } from '@/data/mockData';
import { toast } from "sonner";

// Define the BlogPost type based on our existing data
interface BlogPost {
  id: number | string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  publishedDate?: string;
  tags?: string[];
  imageUrl?: string;
}

const AdminBlog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentBlogPost, setCurrentBlogPost] = useState<BlogPost | null>(null);
  const [newTag, setNewTag] = useState("");

  // Form state
  const [formData, setFormData] = useState<BlogPost>({
    id: "",
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: "Syed Mujtaba Abbas",
    readTime: "5 min read",
    tags: [],
  });

  // Filter blog posts based on search query
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const handleAddBlogPost = () => {
    // Generate a unique ID for the new blog post
    const newId = blogPosts.length > 0 
      ? Math.max(...blogPosts.map(post => typeof post.id === 'number' ? post.id : 0)) + 1 
      : 1;
    
    const newBlogPost: BlogPost = {
      ...formData,
      id: newId,
      coverImage: formData.coverImage || formData.imageUrl || "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1470&auto=format&fit=crop",
    };

    setBlogPosts([...blogPosts, newBlogPost]);
    setIsDialogOpen(false);
    resetForm();
    
    toast.success("Blog post added successfully!");
  };

  const handleEditBlogPost = () => {
    if (!currentBlogPost) return;
    
    const updatedBlogPost: BlogPost = {
      ...formData,
      coverImage: formData.coverImage || formData.imageUrl || currentBlogPost.coverImage,
    };

    setBlogPosts(blogPosts.map(post => 
      post.id === currentBlogPost.id ? updatedBlogPost : post
    ));
    setIsDialogOpen(false);
    resetForm();
    
    toast.success("Blog post updated successfully!");
  };

  const handleDeleteBlogPost = () => {
    if (!currentBlogPost) return;
    
    setBlogPosts(blogPosts.filter(post => post.id !== currentBlogPost.id));
    setIsDeleteDialogOpen(false);
    setCurrentBlogPost(null);
    
    toast.success("Blog post deleted successfully!");
  };

  const openAddDialog = () => {
    resetForm();
    setCurrentBlogPost(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (post: BlogPost) => {
    setCurrentBlogPost(post);
    setFormData({
      ...post,
      tags: post.tags || []
    });
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (post: BlogPost) => {
    setCurrentBlogPost(post);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      excerpt: "",
      content: "",
      coverImage: "",
      category: "",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      author: "Syed Mujtaba Abbas",
      readTime: "5 min read",
      tags: [],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button
          onClick={openAddDialog}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus size={18} className="mr-2" /> Add New Post
        </Button>
      </div>
      
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input
          placeholder="Search blog posts..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Blog Posts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Blog Posts</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredPosts.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No blog posts found</p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-12 h-12 rounded bg-secondary/50 flex-shrink-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${post.coverImage})` }}
                          />
                          <div>
                            <div className="font-medium truncate max-w-[200px]">{post.title}</div>
                            <div className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {post.excerpt}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {post.date}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => openEditDialog(post)}
                          >
                            <Edit size={18} className="text-muted-foreground" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteDialog(post)}
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
      
      {/* Add/Edit Blog Post Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {currentBlogPost ? "Edit Blog Post" : "Add New Blog Post"}
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
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea 
                id="excerpt" 
                name="excerpt" 
                value={formData.excerpt}
                onChange={handleInputChange}
                rows={2}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea 
                id="content" 
                name="content" 
                value={formData.content}
                onChange={handleInputChange}
                rows={6}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input 
                id="coverImage" 
                name="coverImage" 
                value={formData.coverImage}
                onChange={handleInputChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex gap-2">
                <Input 
                  id="tags" 
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  className="flex-grow"
                />
                <Button 
                  type="button"
                  variant="secondary"
                  onClick={handleAddTag}
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
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
              onClick={currentBlogPost ? handleEditBlogPost : handleAddBlogPost}
            >
              {currentBlogPost ? "Save Changes" : "Add Post"}
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
                "{currentBlogPost?.title}"
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
              onClick={handleDeleteBlogPost}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
