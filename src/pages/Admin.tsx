
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Eye, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  TrendingUp,
  MessageSquare,
  Plus,
  LogOut,
  Phone
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
  username: string;
  role: 'super_admin' | 'editor' | 'viewer';
  isActive: boolean;
  createdAt: string;
}

interface CurrentUser {
  email: string;
  role: string;
  isAuthenticated: boolean;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
    role: "editor"
  });
  const { toast } = useToast();

  // Check authentication and get current user
  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      if (adminUser) {
        const user = JSON.parse(adminUser);
        setCurrentUser(user);
        loadAdminUsers();
      }
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const loadAdminUsers = () => {
    // Mock admin users data - in production, fetch from your backend
    const mockUsers: AdminUser[] = [
      {
        id: 1,
        name: "Super Admin",
        email: "admin@indublog.com",
        mobile: "+1234567890",
        username: "superadmin",
        role: "super_admin",
        isActive: true,
        createdAt: "2024-01-01"
      },
      {
        id: 2,
        name: "Content Editor",
        email: "editor@indublog.com",
        mobile: "+1234567891",
        username: "editor1",
        role: "editor",
        isActive: true,
        createdAt: "2024-01-15"
      },
      {
        id: 3,
        name: "Content Viewer",
        email: "viewer@indublog.com",
        mobile: "+1234567892",
        username: "viewer1",
        role: "viewer",
        isActive: true,
        createdAt: "2024-01-20"
      }
    ];
    setAdminUsers(mockUsers);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.href = '/auth';
  };

  const handleCreateUser = () => {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast({
        title: "Access Denied",
        description: "Only Super Admins can create new users.",
        variant: "destructive",
      });
      return;
    }

    // Validate form
    if (!newUser.name || !newUser.email || !newUser.mobile || !newUser.username || !newUser.password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Create new user (in production, send to backend)
    const newUserData: AdminUser = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      username: newUser.username,
      role: newUser.role as 'super_admin' | 'editor' | 'viewer',
      isActive: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAdminUsers([...adminUsers, newUserData]);
    setNewUser({ name: "", email: "", mobile: "", username: "", password: "", role: "editor" });
    setShowCreateUser(false);
    
    toast({
      title: "User Created",
      description: `New ${newUser.role} user created successfully.`,
    });
  };

  const handleToggleUserStatus = (userId: number) => {
    if (!currentUser || currentUser.role !== 'super_admin') {
      toast({
        title: "Access Denied",
        description: "Only Super Admins can ban/unban users.",
        variant: "destructive",
      });
      return;
    }

    setAdminUsers(adminUsers.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
    
    const user = adminUsers.find(u => u.id === userId);
    toast({
      title: user?.isActive ? "User Banned" : "User Unbanned",
      description: `User has been ${user?.isActive ? 'banned' : 'unbanned'} successfully.`,
    });
  };

  const canAccess = (requiredRole: string[]) => {
    if (!currentUser) return false;
    return requiredRole.includes(currentUser.role);
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'editor': return 'Editor';
      case 'viewer': return 'Viewer';
      default: return role;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-slate-600">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  const stats = {
    totalUsers: 1248,
    totalArticles: 3456,
    totalViews: 125678,
    totalLikes: 8765,
    pendingArticles: 23,
    reportedContent: 5
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-slate-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-8 h-8 text-primary" />
                <h1 className="text-2xl font-bold text-slate-800">IndubLog Admin</h1>
              </div>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {getRoleDisplayName(currentUser.role)}
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-slate-600">{currentUser.email}</span>
              <Button 
                variant="outline" 
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview - Visible to all roles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
              <p className="text-slate-600 text-sm">Total Users</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalArticles}</h3>
              <p className="text-slate-600 text-sm">Articles</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalViews}</h3>
              <p className="text-slate-600 text-sm">Views</p>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalLikes}</h3>
              <p className="text-slate-600 text-sm">Engagement</p>
            </CardContent>
          </Card>
          
          {canAccess(['super_admin', 'editor']) && (
            <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-slate-800">{stats.pendingArticles}</h3>
                <p className="text-slate-600 text-sm">Pending Review</p>
              </CardContent>
            </Card>
          )}
          
          {canAccess(['super_admin']) && (
            <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-2xl font-bold text-slate-800">{stats.reportedContent}</h3>
                <p className="text-slate-600 text-sm">Reports</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            {canAccess(['super_admin', 'editor']) && <TabsTrigger value="articles">Content</TabsTrigger>}
            <TabsTrigger value="users">Users</TabsTrigger>
            {canAccess(['super_admin']) && <TabsTrigger value="admin-users">Admin Users</TabsTrigger>}
            {canAccess(['super_admin']) && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    <span>Platform Analytics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Total Views</span>
                      <span className="font-bold text-primary">{stats.totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Total Engagement</span>
                      <span className="font-bold text-primary">{stats.totalLikes}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Published Articles</span>
                      <span className="font-bold text-primary">{stats.totalArticles}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span>Your Permissions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Role</span>
                      <Badge>{getRoleDisplayName(currentUser.role)}</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Content Management</span>
                      <Badge variant={canAccess(['super_admin', 'editor']) ? 'default' : 'secondary'}>
                        {canAccess(['super_admin', 'editor']) ? 'Allowed' : 'Restricted'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">User Management</span>
                      <Badge variant={canAccess(['super_admin']) ? 'default' : 'secondary'}>
                        {canAccess(['super_admin']) ? 'Allowed' : 'Restricted'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {canAccess(['super_admin', 'editor']) && (
            <TabsContent value="articles">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Content Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      Content management functionality will be implemented with backend integration.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          <TabsContent value="users">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Eye className="h-4 w-4" />
                  <AlertDescription>
                    User list and management functionality will be implemented with backend integration.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>

          {canAccess(['super_admin']) && (
            <TabsContent value="admin-users">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span>Admin User Management</span>
                  </CardTitle>
                  <Dialog open={showCreateUser} onOpenChange={setShowCreateUser}>
                    <DialogTrigger asChild>
                      <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="w-4 h-4 mr-2" />
                        Create Admin User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Admin User</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div>
                          <Label htmlFor="mobile">Mobile Number</Label>
                          <Input
                            id="mobile"
                            value={newUser.mobile}
                            onChange={(e) => setNewUser({...newUser, mobile: e.target.value})}
                            placeholder="Enter mobile number"
                          />
                        </div>
                        <div>
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            placeholder="Enter username"
                          />
                        </div>
                        <div>
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            placeholder="Enter password"
                          />
                        </div>
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser({...newUser, role: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="super_admin">Super Admin</SelectItem>
                              <SelectItem value="editor">Editor</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleCreateUser} className="w-full">
                          Create User
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {adminUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="" alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-slate-800">{user.name}</h3>
                            <p className="text-sm text-slate-600">{user.email}</p>
                            <div className="flex items-center space-x-3 text-sm text-slate-600 mt-1">
                              <Badge variant="outline">{getRoleDisplayName(user.role)}</Badge>
                              <span className="flex items-center">
                                <Phone className="w-3 h-3 mr-1" />
                                {user.mobile}
                              </span>
                              <span>@{user.username}</span>
                              <Badge variant={user.isActive ? 'default' : 'destructive'}>
                                {user.isActive ? 'Active' : 'Banned'}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            variant={user.isActive ? 'destructive' : 'default'}
                            onClick={() => handleToggleUserStatus(user.id)}
                            disabled={user.email === currentUser.email}
                          >
                            {user.isActive ? (
                              <>
                                <UserX className="w-4 h-4 mr-1" />
                                Ban
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-4 h-4 mr-1" />
                                Unban
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {canAccess(['super_admin']) && (
            <TabsContent value="settings">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-primary" />
                    <span>Platform Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Content Moderation</h3>
                      <p className="text-slate-600 mb-4">Configure automatic content filtering and approval workflows.</p>
                      <Button variant="outline">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Configure Moderation
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">User Permissions</h3>
                      <p className="text-slate-600 mb-4">Manage user roles and access levels across the platform.</p>
                      <Button variant="outline">
                        <UserCheck className="w-4 h-4 mr-2" />
                        Manage Roles
                      </Button>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-lg">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">SEO & Analytics</h3>
                      <p className="text-slate-600 mb-4">Configure SEO settings and integrate analytics platforms.</p>
                      <Button variant="outline">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        SEO Settings
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
