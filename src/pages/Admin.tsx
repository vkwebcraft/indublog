
import { useState, useEffect } from "react";
import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { BlogManagement } from "@/components/admin/BlogManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AuthorManagement } from "@/components/admin/AuthorManagement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  BarChart3, 
  Eye, 
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  XCircle,
  CheckCircle,
  PenTool
} from "lucide-react";

interface CurrentUser {
  email: string;
  role: string;
  isAuthenticated: boolean;
}

const AdminDashboard = () => {
  const stats = {
    totalUsers: 1248,
    totalArticles: 3456,
    totalViews: 125678,
    totalLikes: 8765,
    pendingArticles: 23,
    reportedContent: 5,
    totalAuthors: 89,
    verifiedAuthors: 67
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Overview</h1>
        <p className="text-slate-600">Monitor your platform's performance and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Users</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalUsers}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Articles</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalArticles}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Total Views</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalViews.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Authors</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalAuthors}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <PenTool className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-pink-50 to-pink-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Engagement</p>
                <p className="text-2xl font-bold text-slate-800">{stats.totalLikes}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Pending Articles</p>
                <p className="text-2xl font-bold text-slate-800">{stats.pendingArticles}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-red-50 to-red-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Reports</p>
                <p className="text-2xl font-bold text-slate-800">{stats.reportedContent}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-br from-teal-50 to-teal-100/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">Verified Authors</p>
                <p className="text-2xl font-bold text-slate-800">{stats.verifiedAuthors}</p>
              </div>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <span>Platform Analytics</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Daily Active Users</span>
                <span className="font-bold text-primary">2,847</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Articles Published Today</span>
                <span className="font-bold text-primary">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">New User Registrations</span>
                <span className="font-bold text-primary">34</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span>Quick Actions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Pending Articles</span>
                <span className="text-primary font-medium">Review {stats.pendingArticles}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Reported Content</span>
                <span className="text-red-600 font-medium">Review {stats.reportedContent}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="text-slate-600">Author Applications</span>
                <span className="text-yellow-600 font-medium">Review 8</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const Admin = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const adminUser = localStorage.getItem('adminUser');
      if (adminUser) {
        const user = JSON.parse(adminUser);
        setCurrentUser(user);
      }
      setLoading(false);
    };
    
    checkAuth();
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

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  const isExactAdminRoute = location.pathname === '/admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        {isExactAdminRoute ? (
          <AdminDashboard />
        ) : (
          <Routes>
            <Route path="/blogs" element={<BlogManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/authors" element={<AuthorManagement />} />
            <Route path="/admin-users" element={<div className="text-center text-slate-600">Admin Users Management - Coming Soon</div>} />
            <Route path="/analytics" element={<div className="text-center text-slate-600">Analytics - Coming Soon</div>} />
            <Route path="/settings" element={<div className="text-center text-slate-600">Settings - Coming Soon</div>} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default Admin;
