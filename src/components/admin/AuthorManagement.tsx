
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  PenTool, 
  Users, 
  FileText, 
  TrendingUp,
  Search,
  Star,
  Eye
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  articlesCount: number;
  followersCount: number;
  totalViews: number;
  rating: number;
  joinDate: string;
  status: 'verified' | 'pending' | 'suspended';
  specialization: string;
}

export const AuthorManagement = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [filteredAuthors, setFilteredAuthors] = useState<Author[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { toast } = useToast();

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    filterAuthors();
  }, [authors, searchTerm, statusFilter]);

  const loadAuthors = () => {
    // Mock author data
    const mockAuthors: Author[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        bio: "Full-stack developer with 5+ years of experience",
        articlesCount: 24,
        followersCount: 1250,
        totalViews: 45000,
        rating: 4.8,
        joinDate: "2023-06-15",
        status: "verified",
        specialization: "Web Development"
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        bio: "UI/UX Designer passionate about user-centered design",
        articlesCount: 18,
        followersCount: 890,
        totalViews: 32000,
        rating: 4.6,
        joinDate: "2023-08-20",
        status: "verified",
        specialization: "Design"
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike@example.com",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        bio: "Backend engineer specializing in scalable systems",
        articlesCount: 15,
        followersCount: 670,
        totalViews: 28000,
        rating: 4.4,
        joinDate: "2023-09-10",
        status: "pending",
        specialization: "Backend"
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c8c2?w=40&h=40&fit=crop&crop=face",
        bio: "Data scientist and AI enthusiast",
        articlesCount: 12,
        followersCount: 445,
        totalViews: 19000,
        rating: 4.2,
        joinDate: "2023-10-05",
        status: "verified",
        specialization: "Data Science"
      }
    ];
    setAuthors(mockAuthors);
  };

  const filterAuthors = () => {
    let filtered = authors;

    if (searchTerm) {
      filtered = filtered.filter(author =>
        author.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(author => author.status === statusFilter);
    }

    setFilteredAuthors(filtered);
  };

  const handleStatusUpdate = (authorId: number, newStatus: 'verified' | 'suspended') => {
    setAuthors(authors.map(author =>
      author.id === authorId ? { ...author, status: newStatus } : author
    ));

    toast({
      title: `Author ${newStatus}`,
      description: `Author has been ${newStatus} successfully.`,
    });
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      verified: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      suspended: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Author Management</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search authors..."
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
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
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
                <p className="text-sm text-slate-600">Total Authors</p>
                <p className="text-2xl font-bold">{authors.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Verified Authors</p>
                <p className="text-2xl font-bold">{authors.filter(a => a.status === 'verified').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Articles</p>
                <p className="text-2xl font-bold">{authors.reduce((sum, a) => sum + a.articlesCount, 0)}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Views</p>
                <p className="text-2xl font-bold">{(authors.reduce((sum, a) => sum + a.totalViews, 0) / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Authors Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Authors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Articles</TableHead>
                <TableHead>Followers</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAuthors.map((author) => (
                <TableRow key={author.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{author.name}</p>
                        <p className="text-sm text-slate-500 max-w-xs truncate">{author.bio}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{author.specialization}</Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{author.articlesCount}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-slate-400" />
                      <span>{author.followersCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4 text-slate-400" />
                      <span>{(author.totalViews / 1000).toFixed(0)}K</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(author.rating)}
                      </div>
                      <span className="text-sm font-medium">{author.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(author.status)}
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-slate-600">{author.joinDate}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {author.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(author.id, 'verified')}
                          className="text-green-600 hover:text-green-700"
                        >
                          Verify
                        </Button>
                      )}
                      {author.status === 'verified' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleStatusUpdate(author.id, 'suspended')}
                          className="text-red-600 hover:text-red-700"
                        >
                          Suspend
                        </Button>
                      )}
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
