
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
import { Badge } from '@/components/ui/badge';
import { Search, XCircle, Mail, MailOpen, Trash2, MessageSquare } from 'lucide-react';
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

// Mock messages data
const mockMessages = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subject: "Project Inquiry",
    message: "Hi there, I'm interested in working with you on a new project. Could we schedule a call to discuss the details?",
    date: "2025-05-20",
    read: false
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subject: "Speaking Opportunity",
    message: "Hello, I'm organizing a tech conference and would love to have you as a speaker. Let me know if you're interested!",
    date: "2025-05-18",
    read: true
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    subject: "Collaboration Opportunity",
    message: "I saw your portfolio and I'm impressed! I have a project I think would be perfect for your skills. Let's connect and discuss.",
    date: "2025-05-15",
    read: false
  },
  {
    id: "4",
    name: "Lisa Wong",
    email: "lisa@example.com",
    subject: "Job Opportunity",
    message: "We have a senior developer position open at our company and I think you'd be a great fit. Would you be interested in applying?",
    date: "2025-05-12",
    read: true
  },
  {
    id: "5",
    name: "Mike Brown",
    email: "mike@example.com",
    subject: "Coffee Chat",
    message: "I'd love to pick your brain about your experience as a developer. Would you be up for a virtual coffee sometime next week?",
    date: "2025-05-10",
    read: false
  },
  {
    id: "6",
    name: "Sarah Parker",
    email: "sarah@example.com",
    subject: "Your recent article",
    message: "I just read your article about React performance and found it incredibly helpful. Thank you for sharing your insights!",
    date: "2025-05-08",
    read: true
  }
];

const AdminMessages = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [messages, setMessages] = useState([...mockMessages]);
  const [currentMessage, setCurrentMessage] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [filter, setFilter] = useState('all'); // 'all', 'read', 'unread'

  const filteredMessages = messages
    .filter(message => 
      (filter === 'all') || 
      (filter === 'read' && message.read) || 
      (filter === 'unread' && !message.read)
    )
    .filter(message => 
      message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const unreadCount = messages.filter(message => !message.read).length;

  const handleViewMessage = (message: any) => {
    setCurrentMessage(message);
    setIsViewDialogOpen(true);
    
    // Mark as read if it wasn't already
    if (!message.read) {
      const updatedMessages = messages.map(m => 
        m.id === message.id ? {...m, read: true} : m
      );
      setMessages(updatedMessages);
    }
  };

  const handleDeleteMessage = () => {
    if (!currentMessage) return;
    
    const updatedMessages = messages.filter(message => message.id !== currentMessage.id);
    setMessages(updatedMessages);
    setIsDeleteDialogOpen(false);
    setCurrentMessage(null);
    toast.success('Message deleted successfully');
  };

  const openDeleteDialog = (message: any) => {
    setCurrentMessage(message);
    setIsDeleteDialogOpen(true);
  };

  const handleMarkAsUnread = (message: any) => {
    const updatedMessages = messages.map(m => 
      m.id === message.id ? {...m, read: false} : m
    );
    setMessages(updatedMessages);
    toast.success('Message marked as unread');
  };

  const handleMarkAllAsRead = () => {
    const updatedMessages = messages.map(m => ({...m, read: true}));
    setMessages(updatedMessages);
    toast.success('All messages marked as read');
  };

  const handleDeleteAllRead = () => {
    const updatedMessages = messages.filter(message => !message.read);
    setMessages(updatedMessages);
    toast.success('All read messages deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground mt-1">
            Manage incoming messages from your contact form
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleMarkAllAsRead} variant="outline">
            <MailOpen className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
          <Button onClick={handleDeleteAllRead} variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Read
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button 
            variant={filter === 'all' ? "default" : "outline"} 
            onClick={() => setFilter('all')}
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            All
          </Button>
          <Button 
            variant={filter === 'unread' ? "default" : "outline"} 
            onClick={() => setFilter('unread')}
          >
            <Mail className="mr-2 h-4 w-4" />
            Unread
            {unreadCount > 0 && (
              <Badge className="ml-2" variant="secondary">{unreadCount}</Badge>
            )}
          </Button>
          <Button 
            variant={filter === 'read' ? "default" : "outline"} 
            onClick={() => setFilter('read')}
          >
            <MailOpen className="mr-2 h-4 w-4" />
            Read
          </Button>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
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

      <Card className="bg-secondary/20">
        <CardHeader>
          <CardTitle>Inbox</CardTitle>
          <CardDescription>
            You have {messages.length} messages ({unreadCount} unread)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60px]">Status</TableHead>
                <TableHead className="w-[200px]">Sender</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="w-[120px]">Date</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMessages.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                    No messages found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredMessages.map((message) => (
                  <TableRow 
                    key={message.id} 
                    className={`cursor-pointer ${!message.read ? 'font-medium bg-secondary/30' : ''}`}
                    onClick={() => handleViewMessage(message)}
                  >
                    <TableCell>
                      {message.read ? (
                        <MailOpen className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <Mail className="h-5 w-5 text-primary" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div>{message.name}</div>
                      <div className="text-xs text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell className="text-muted-foreground">{message.date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            message.read ? 
                              handleMarkAsUnread(message) : 
                              handleViewMessage(message);
                          }}
                        >
                          {message.read ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            <MailOpen className="h-4 w-4" />
                          )}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteDialog(message);
                          }}
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

      {/* View Message Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>{currentMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {currentMessage?.name} ({currentMessage?.email}) • {currentMessage?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="bg-secondary/20 p-4 rounded-md whitespace-pre-wrap">
              {currentMessage?.message}
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-between w-full">
              <Button 
                type="button" 
                variant="outline" 
                className="border-destructive text-destructive hover:bg-destructive/10"
                onClick={() => {
                  openDeleteDialog(currentMessage);
                  setIsViewDialogOpen(false);
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
              <div className="flex gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => {
                    handleMarkAsUnread(currentMessage);
                    setIsViewDialogOpen(false);
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Mark as Unread
                </Button>
                <Button type="button" onClick={() => setIsViewDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Message Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentMessage && (
            <div className="py-4">
              <p className="font-medium">{currentMessage.subject}</p>
              <p className="text-sm text-muted-foreground mt-1">From: {currentMessage.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="destructive" 
              onClick={handleDeleteMessage}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMessages;
