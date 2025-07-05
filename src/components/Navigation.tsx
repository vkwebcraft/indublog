
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { User, Pen, Search, Menu, X, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const [isAdmin, setIsAdmin] = useState(false); // Mock admin state
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Pen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">IndubLog</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/explore" 
              className={cn(
                "transition-colors",
                isActiveLink("/explore") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
            >
              Explore
            </Link>
            <Link 
              to="/categories" 
              className={cn(
                "transition-colors",
                isActiveLink("/categories") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
            >
              Categories
            </Link>
            <Link 
              to="/authors" 
              className={cn(
                "transition-colors",
                isActiveLink("/authors") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
            >
              Authors
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link to="/write">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                    <Pen className="w-4 h-4 mr-2" />
                    Write
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-1">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Your Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link to="/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-slate-600 hover:text-primary">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-4 space-y-4">
            <Link
              to="/explore"
              className={cn(
                "block transition-colors",
                isActiveLink("/explore") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              Explore
            </Link>
            <Link
              to="/categories"
              className={cn(
                "block transition-colors",
                isActiveLink("/categories") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              Categories
            </Link>
            <Link
              to="/authors"
              className={cn(
                "block transition-colors",
                isActiveLink("/authors") 
                  ? "text-primary font-medium" 
                  : "text-slate-600 hover:text-primary"
              )}
              onClick={toggleMenu}
            >
              Authors
            </Link>
            <div className="pt-4 border-t border-slate-200 space-y-3">
              {isLoggedIn ? (
                <>
                  <Link to="/write" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full justify-start">
                      <Pen className="w-4 h-4 mr-2" />
                      Write
                    </Button>
                  </Link>
                  <Link to="/dashboard" onClick={toggleMenu}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={toggleMenu}>
                      <Button variant="ghost" className="w-full justify-start">
                        <Settings className="w-4 h-4 mr-2" />
                        Admin Panel
                      </Button>
                    </Link>
                  )}
                </>
              ) : (
                <>
                  <Link to="/auth" onClick={toggleMenu}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth" onClick={toggleMenu}>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
