import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  MessageSquare
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is admin (mock check - replace with real auth)
  useEffect(() => {
    const checkAdminStatus = () => {
      // Mock admin check - replace with real authentication
      const userRole = localStorage.getItem('userRole');
      setIsAdmin(userRole === 'admin');
      setLoading(false);
    };
    
    checkAdminStatus();
  }, []);

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

  if (!isAdmin) {
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

  const recentArticles = [
    {
      id: 1,
      title: "The Future of Web Development",
      author: "Sarah Chen",
      status: "published",
      publishedAt: "2024-01-15",
      views: 1248,
      likes: 89,
      category: "Technology"
    },
    {
      id: 2,
      title: "Mindful Living Guide",
      author: "Marcus Thompson", 
      status: "pending",
      publishedAt: null,
      views: 0,
      likes: 0,
      category: "Lifestyle"
    },
    {
      id: 3,
      title: "Sustainable Business Practices",
      author: "Elena Rodriguez",
      status: "published",
      publishedAt: "2024-01-13",
      views: 867,
      likes: 56,
      category: "Business"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=40&h=40&fit=crop&crop=face",
      role: "author",
      joinedAt: "2024-01-15",
      articles: 5,
      status: "active"
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com", 
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      role: "reader",
      joinedAt: "2024-01-14",
      articles: 0,
      status: "active"
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      role: "author",
      joinedAt: "2024-01-12",
      articles: 12,
      status: "suspended"
    }
  ];

  const handleApproveArticle = (id: number) => {
    console.log("Approving article:", id);
  };

  const handleRejectArticle = (id: number) => {
    console.log("Rejecting article:", id);
  };

  const handlePromoteUser = (id: number) => {
    console.log("Promoting user:", id);
  };

  const handleSuspendUser = (id: number) => {
    console.log("Suspending user:", id); 
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
                Administrator
              </Badge>
            </div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              Back to Site
            </Button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalUsers}</h3>
              <p className="text-slate-600 text-sm">Total Users</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+12% this month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <FileText className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalArticles}</h3>
              <p className="text-slate-600 text-sm">Articles</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+8% this week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalViews}</h3>
              <p className="text-slate-600 text-sm">Views</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+24% today</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-pink-600 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalLikes}</h3>
              <p className="text-slate-600 text-sm">Engagement</p>
              <div className="flex items-center justify-center mt-2">
                <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600">+18% this week</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.pendingArticles}</h3>
              <p className="text-slate-600 text-sm">Pending Review</p>
              {stats.pendingArticles > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    Needs Attention
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100/50 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <XCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.reportedContent}</h3>
              <p className="text-slate-600 text-sm">Reports</p>
              {stats.reportedContent > 0 && (
                <div className="mt-2">
                  <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded-full">
                    Action Required
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">Dashboard</TabsTrigger>
            <TabsTrigger value="articles">Content</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <span>Recent Articles</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentArticles.map((article) => (
                      <div key={article.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800 mb-1">{article.title}</h4>
                          <div className="flex items-center space-x-3 text-sm text-slate-600">
                            <span>by {article.author}</span>
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                              {article.status}
                            </Badge>
                            <span className="flex items-center">
                              <Eye className="w-3 h-3 mr-1" />
                              {article.views}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>Recent Users</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-slate-800">{user.name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-slate-600">
                              <Badge variant="outline" className="text-xs">{user.role}</Badge>
                              <span>{user.articles} articles</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="articles">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <span>Content Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentArticles.map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-1">{article.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span>by {article.author}</span>
                          <Badge variant="secondary">{article.category}</Badge>
                          <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                            {article.status}
                          </Badge>
                          {article.publishedAt && <span>Published: {article.publishedAt}</span>}
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {article.status === 'pending' && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveArticle(article.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleRejectArticle(article.id)}
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-primary" />
                  <span>User Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg border border-slate-100">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-slate-800">{user.name}</h3>
                          <p className="text-sm text-slate-600">{user.email}</p>
                          <div className="flex items-center space-x-3 text-sm text-slate-600 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <span>Joined: {user.joinedAt}</span>
                            <span>{user.articles} articles</span>
                            <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {user.role === 'reader' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handlePromoteUser(user.id)}
                          >
                            <UserCheck className="w-4 h-4 mr-1" />
                            Promote
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant={user.status === 'active' ? 'destructive' : 'default'}
                          onClick={() => handleSuspendUser(user.id)}
                        >
                          {user.status === 'active' ? (
                            <>
                              <UserX className="w-4 h-4 mr-1" />
                              Suspend
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4 mr-1" />
                              Activate
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

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <span>Growth Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Active Users</span>
                      <span className="font-bold text-primary">{stats.totalUsers}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Monthly Growth</span>
                      <span className="font-bold text-green-600">+12%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <span className="text-slate-600">Content Quality</span>
                      <span className="font-bold text-primary">98.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

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
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
