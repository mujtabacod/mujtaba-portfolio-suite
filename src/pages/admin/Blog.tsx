
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
import { PlusCircle, Edit, Trash2, Search, XCircle, Calendar } from 'lucide-react';
import { blogPosts } from '@/data/mockData';
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

const AdminBlog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [blogList, setBlogList] = useState([...blogPosts]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    publishedDate: new Date().toISOString().split('T')[0],
    tags: '',
    imageUrl: '',
  });

  const filteredPosts = blogList.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPost = () => {
    const tags = newPost.tags.split(',').map(tag => tag.trim());
    
    const postToAdd = {
      id: (blogList.length + 1).toString(),
      title: newPost.title,
      excerpt: newPost.excerpt,
      content: newPost.content,
      publishedDate: newPost.publishedDate,
      tags,
      imageUrl: newPost.imageUrl || '/placeholder.svg',
    };
    
    setBlogList([...blogList, postToAdd]);
    setIsAddDialogOpen(false);
    setNewPost({
      title: '',
      excerpt: '',
      content: '',
      publishedDate: new Date().toISOString().split('T')[0],
      tags: '',
      imageUrl: '',
    });
    toast.success('Blog post added successfully');
  };

  const handleEditPost = () => {
    if (!currentPost) return;
    
    const tags = typeof currentPost.tags === 'string' 
      ? currentPost.tags.split(',').map((tag: string) => tag.trim())
      : currentPost.tags;
    
    const updatedPost = {
      ...currentPost,
      tags,
    };
    
    const updatedPosts = blogList.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    
    setBlogList(updatedPosts);
    setIsEditDialogOpen(false);
    setCurrentPost(null);
    toast.success('Blog post updated successfully');
  };

  const handleDeletePost = () => {
    if (!currentPost) return;
    
    const updatedPosts = blogList.filter(post => post.id !== currentPost.id);
    setBlogList(updatedPosts);
    setIsDeleteDialogOpen(false);
    setCurrentPost(null);
    toast.success('Blog post deleted successfully');
  };

  const openEditDialog = (post: any) => {
    setCurrentPost({
      ...post,
      tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (post: any) => {
    setCurrentPost(post);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Blog Management</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Blog Post
        </Button>
      </div>

      <Card className="bg-secondary/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>All Blog Posts</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search blog posts..."
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
          <CardDescription>Manage your blog posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Title</TableHead>
                <TableHead>Published Date</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="hidden md:table-cell">Excerpt</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No blog posts found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        {post.publishedDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {post.tags.slice(0, 2).map((tag, index) => (
                          <span 
                            key={index} 
                            className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="bg-secondary px-2 py-1 rounded-full text-xs">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-xs truncate">
                      {post.excerpt}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => openEditDialog(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => openDeleteDialog(post)}
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

      {/* Add Blog Post Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Add New Blog Post</DialogTitle>
            <DialogDescription>
              Add a new blog post to your website. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="excerpt" className="text-right">
                Excerpt
              </Label>
              <Input
                id="excerpt"
                value={newPost.excerpt}
                onChange={(e) => setNewPost({...newPost, excerpt: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="content" className="text-right pt-2">
                Content
              </Label>
              <Textarea
                id="content"
                value={newPost.content}
                onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                className="col-span-3"
                rows={8}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="publishedDate" className="text-right">
                Date
              </Label>
              <Input
                id="publishedDate"
                type="date"
                value={newPost.publishedDate}
                onChange={(e) => setNewPost({...newPost, publishedDate: e.target.value})}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tags" className="text-right">
                Tags
              </Label>
              <Input
                id="tags"
                value={newPost.tags}
                onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                className="col-span-3"
                placeholder="Web, React, UI/UX (comma separated)"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">
                Image URL
              </Label>
              <Input
                id="imageUrl"
                value={newPost.imageUrl}
                onChange={(e) => setNewPost({...newPost, imageUrl: e.target.value})}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleAddPost}>
              Add Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Post Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>
              Make changes to the blog post. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {currentPost && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={currentPost.title}
                  onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-excerpt" className="text-right">
                  Excerpt
                </Label>
                <Input
                  id="edit-excerpt"
                  value={currentPost.excerpt}
                  onChange={(e) => setCurrentPost({...currentPost, excerpt: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right pt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={currentPost.content}
                  onChange={(e) => setCurrentPost({...currentPost, content: e.target.value})}
                  className="col-span-3"
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-publishedDate" className="text-right">
                  Date
                </Label>
                <Input
                  id="edit-publishedDate"
                  type="date"
                  value={currentPost.publishedDate}
                  onChange={(e) => setCurrentPost({...currentPost, publishedDate: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-tags" className="text-right">
                  Tags
                </Label>
                <Input
                  id="edit-tags"
                  value={currentPost.tags}
                  onChange={(e) => setCurrentPost({...currentPost, tags: e.target.value})}
                  className="col-span-3"
                  placeholder="Web, React, UI/UX (comma separated)"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-imageUrl" className="text-right">
                  Image URL
                </Label>
                <Input
                  id="edit-imageUrl"
                  value={currentPost.imageUrl}
                  onChange={(e) => setCurrentPost({...currentPost, imageUrl: e.target.value})}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleEditPost}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Blog Post Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentPost && (
            <div className="py-4">
              <p className="font-medium">{currentPost.title}</p>
              <p className="text-sm text-muted-foreground mt-2">{currentPost.excerpt}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive" 
              onClick={handleDeletePost}
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
