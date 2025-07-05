
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  UserCheck, 
  Shield, 
  Settings, 
  LogOut,
  PenTool,
  Eye,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CurrentUser {
  email: string;
  role: string;
  isAuthenticated: boolean;
}

export const AdminSidebar = () => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const location = useLocation();

  useEffect(() => {
    const adminUser = localStorage.getItem('adminUser');
    if (adminUser) {
      setCurrentUser(JSON.parse(adminUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminUser');
    window.location.href = '/auth';
  };

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'super_admin': return 'Super Admin';
      case 'editor': return 'Editor';
      case 'viewer': return 'Viewer';
      default: return role;
    }
  };

  const canAccess = (requiredRoles: string[]) => {
    if (!currentUser) return false;
    return requiredRoles.includes(currentUser.role);
  };

  const isActiveLink = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      exact: true,
      roles: ['super_admin', 'editor', 'viewer']
    },
    {
      name: "Blog Management",
      path: "/admin/blogs",
      icon: FileText,
      roles: ['super_admin', 'editor']
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
      roles: ['super_admin', 'editor', 'viewer']
    },
    {
      name: "Authors",
      path: "/admin/authors",
      icon: PenTool,
      roles: ['super_admin', 'editor', 'viewer']
    },
    {
      name: "Admin Users",
      path: "/admin/admin-users",
      icon: Shield,
      roles: ['super_admin']
    },
    {
      name: "Analytics",
      path: "/admin/analytics",
      icon: TrendingUp,
      roles: ['super_admin', 'editor']
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: Settings,
      roles: ['super_admin']
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">IndubLog</h2>
            <p className="text-sm text-slate-600">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* User Info */}
      {currentUser && (
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="" alt="Admin" />
              <AvatarFallback>{currentUser.email[0].toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">
                {currentUser.email}
              </p>
              <Badge variant="outline" className="text-xs">
                {getRoleDisplayName(currentUser.role)}
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            if (!canAccess(item.roles)) return null;
            
            const isActive = item.exact 
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-200">
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-slate-600 hover:text-slate-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
};
