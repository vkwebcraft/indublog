
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2, 
  Search,
  Filter,
  Calendar,
  User
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Blog {
  id: number;
  title: string;
  author: string;
  authorAvatar: string;
  category: string;
  status: 'draft' | 'pending' | 'published' | 'rejected';
  publishedDate: string;
  views: number;
  likes: number;
  excerpt: string;
}

export const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadBlogs();
  }, []);

  useEffect(() => {
    filterBlogs();
  }, [blogs, searchTerm, statusFilter]);

  const loadBlogs = () => {
    // Mock blog data - in production, fetch from your backend
    const mockBlogs: Blog[] = [
      {
        id: 1,
        title: "Getting Started with React",
        author: "John Doe",
        authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        category: "Technology",
        status: "pending",
        publishedDate: "2024-01-15",
        views: 1250,
        likes: 45,
        excerpt: "Learn the basics of React and start building modern web applications..."
      },
      {
        id: 2,
        title: "Advanced TypeScript Patterns",
        author: "Jane Smith",
        authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        category: "Programming",
        status: "published",
        publishedDate: "2024-01-12",
        views: 2340,
        likes: 89,
        excerpt: "Explore advanced TypeScript patterns and techniques for better code..."
      },
      {
        id: 3,
        title: "UI/UX Design Principles",
        author: "Mike Johnson",
        authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        category: "Design",
        status: "draft",
        publishedDate: "2024-01-10",
        views: 890,
        likes: 23,
        excerpt: "Essential design principles every designer should know..."
      },
      {
        id: 4,
        title: "Building Scalable APIs",
        author: "Sarah Wilson",
        authorAvatar: "https://images.unsplash.com/photo-1494790108755-2616b332c8c2?w=40&h=40&fit=crop&crop=face",
        category: "Backend",
        status: "pending",
        publishedDate: "2024-01-08",
        views: 1567,
        likes: 67,
        excerpt: "Best practices for building scalable and maintainable APIs..."
      }
    ];
    setBlogs(mockBlogs);
  };

  const filterBlogs = () => {
    let filtered = blogs;

    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(blog => blog.status === statusFilter);
    }

    setFilteredBlogs(filtered);
  };

  const handleStatusUpdate = (blogId: number, newStatus: 'published' | 'rejected') => {
    setBlogs(blogs.map(blog =>
      blog.id === blogId ? { ...blog, status: newStatus } : blog
    ));

    toast({
      title: `Blog ${newStatus}`,
      description: `The blog has been ${newStatus} successfully.`,
    });
  };

  const handleDelete = (blogId: number) => {
    setBlogs(blogs.filter(blog => blog.id !== blogId));
    toast({
      title: "Blog Deleted",
      description: "The blog has been deleted successfully.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      draft: 'secondary',
      pending: 'default',
      published: 'default',
      rejected: 'destructive'
    };

    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Blog Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Blogs</p>
                <p className="text-2xl font-bold">{blogs.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Review</p>
                <p className="text-2xl font-bold">{blogs.filter(b => b.status === 'pending').length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Published</p>
                <p className="text-2xl font-bold">{blogs.filter(b => b.status === 'published').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Drafts</p>
                <p className="text-2xl font-bold">{blogs.filter(b => b.status === 'draft').length}</p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Edit className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Blogs Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Blog</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBlogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div className="max-w-xs">
                      <h3 className="font-medium text-slate-800 truncate">{blog.title}</h3>
                      <p className="text-sm text-slate-500 truncate">{blog.excerpt}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={blog.authorAvatar} alt={blog.author} />
                        <AvatarFallback>{blog.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{blog.author}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{blog.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(blog.status)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm text-slate-600">
                      <div>{blog.views} views</div>
                      <div>{blog.likes} likes</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{blog.publishedDate}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Dialog open={showDetails && selectedBlog?.id === blog.id} onOpenChange={(open) => {
                        setShowDetails(open);
                        if (!open) setSelectedBlog(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedBlog(blog)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{blog.title}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="flex items-center space-x-4">
                              <Avatar>
                                <AvatarImage src={blog.authorAvatar} />
                                <AvatarFallback>{blog.author[0]}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{blog.author}</p>
                                <p className="text-sm text-slate-600">{blog.publishedDate}</p>
                              </div>
                              {getStatusBadge(blog.status)}
                            </div>
                            <p className="text-slate-700">{blog.excerpt}</p>
                            <div className="flex items-center space-x-6 text-sm text-slate-600">
                              <span>{blog.views} views</span>
                              <span>{blog.likes} likes</span>
                              <span>Category: {blog.category}</span>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {blog.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(blog.id, 'published')}
                            className="text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleStatusUpdate(blog.id, 'rejected')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </>
                      )}

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
