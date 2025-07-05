
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Heart, Mail, Twitter, Github, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">IndubLog</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Stories that inspire. Words that matter. Join our community of thoughtful writers and readers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/explore" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Explore
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/authors" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Authors
                </Link>
              </li>
              <li>
                <Link to="/write" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Write
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/newsletter" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Newsletter
                </Link>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Writing Guidelines
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <Link to="/auth" className="text-slate-600 hover:text-primary transition-colors text-sm">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © 2024 IndubLog. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for writers and readers</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
