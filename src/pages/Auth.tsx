
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Lock, Pen, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Development credentials - only shown in development mode
  const isDevelopment = import.meta.env.DEV;
  const devCredentials = [
    { email: "admin@indublog.com", password: "admin123", role: "Super Admin" },
    { email: "editor@indublog.com", password: "editor123", role: "Editor" },
    { email: "viewer@indublog.com", password: "viewer123", role: "Viewer" }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock authentication - in production, this would connect to your backend
      const validCredentials = devCredentials.find(
        cred => cred.email === formData.email && cred.password === formData.password
      );

      if (validCredentials) {
        // Store admin info in localStorage (in production, use secure tokens)
        localStorage.setItem('adminUser', JSON.stringify({
          email: validCredentials.email,
          role: validCredentials.role.toLowerCase().replace(' ', '_'),
          isAuthenticated: true
        }));

        toast({
          title: "Login successful",
          description: `Welcome back, ${validCredentials.role}!`,
        });

        navigate('/admin');
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Please check your email and password.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDevCredentialClick = (credentials: typeof devCredentials[0]) => {
    setFormData({
      email: credentials.email,
      password: credentials.password
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Pen className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-800">IndubLog</span>
        </Link>

        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold text-slate-800">
              Admin Login
            </CardTitle>
            <p className="text-slate-600">
              Sign in to access the admin dashboard
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Development Credentials */}
            {isDevelopment && (
              <Alert className="border-blue-200 bg-blue-50">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Development Mode - Test Credentials:</strong>
                  <div className="mt-2 space-y-1">
                    {devCredentials.map((cred, index) => (
                      <div key={index} className="text-xs">
                        <button
                          onClick={() => handleDevCredentialClick(cred)}
                          className="text-blue-600 hover:text-blue-800 underline"
                        >
                          {cred.role}: {cred.email}
                        </button>
                      </div>
                    ))}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="email"
                  name="email"
                  placeholder="Admin email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 border-slate-200 focus:border-primary"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 border-slate-200 focus:border-primary"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center">
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-slate-600 hover:text-primary">
            ← Back to IndubLog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
