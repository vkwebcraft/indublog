
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Heart, MessageSquare, Calendar, User, Tag } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";
import { CategorySidebar } from "@/components/CategorySidebar";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demonstration
  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Exploring the latest innovations in web technology, from AI integration to sustainable coding practices that are shaping the future of digital experiences.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=40&h=40&fit=crop&crop=face",
        bio: "Full-stack developer and tech writer"
      },
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
      category: "Technology",
      tags: ["Web Development", "AI", "Trends"],
      publishedAt: "2024-01-15",
      readTime: "8 min read",
      likes: 124,
      comments: 18
    },
    {
      id: 2,
      title: "Mindful Living in a Digital Age",
      excerpt: "How to maintain balance and presence while navigating our increasingly connected world. Practical strategies for digital wellness and meaningful connections.",
      author: {
        name: "Marcus Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        bio: "Wellness coach and mindfulness advocate"
      },
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      category: "Lifestyle",
      tags: ["Mindfulness", "Digital Wellness", "Balance"],
      publishedAt: "2024-01-14",
      readTime: "6 min read",
      likes: 89,
      comments: 12
    }
  ];

  const latestPosts = [
    {
      id: 3,
      title: "Building Sustainable Businesses for Tomorrow",
      excerpt: "A deep dive into sustainable business practices and how companies can create lasting positive impact while maintaining profitability.",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        bio: "Sustainability consultant and entrepreneur"
      },
      category: "Business",
      tags: ["Sustainability", "Business", "Environment"],
      publishedAt: "2024-01-13",
      readTime: "10 min read",
      likes: 67,
      comments: 8
    },
    {
      id: 4,
      title: "The Art of Storytelling in Design",
      excerpt: "How narrative thinking transforms user experience design and creates more meaningful digital interactions.",
      author: {
        name: "David Kim",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        bio: "UX designer and creative director"
      },
      category: "Design",
      tags: ["Design", "UX", "Storytelling"],
      publishedAt: "2024-01-12",
      readTime: "7 min read",
      likes: 156,
      comments: 23
    },
    {
      id: 5,
      title: "Machine Learning for Everyone",
      excerpt: "Demystifying artificial intelligence and machine learning concepts for non-technical audiences through practical examples.",
      author: {
        name: "Priya Patel",
        avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=40&h=40&fit=crop&crop=face",
        bio: "Data scientist and AI educator"
      },
      category: "Technology",
      tags: ["AI", "Machine Learning", "Education"],
      publishedAt: "2024-01-11",
      readTime: "12 min read",
      likes: 203,
      comments: 34
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 leading-tight">
            Stories that <span className="text-emerald-600">inspire</span>.
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-600 mb-8 font-light">
            Words that matter.
          </h2>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover thoughtful stories, ideas, and perspectives from writers who care about making a difference in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/write">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 text-lg">
                Start Writing
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="border-slate-300 text-slate-700 px-8 py-3 text-lg">
                Join Now
              </Button>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-slate-200 focus:border-emerald-500 rounded-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-16">
            {/* Featured Posts */}
            <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <div className="w-1 h-8 bg-emerald-600 rounded-full mr-4"></div>
                Featured Stories
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <BlogCard key={post.id} post={post} featured />
                ))}
              </div>
            </section>

            {/* Latest Posts */}
            <section>
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center">
                <div className="w-1 h-8 bg-emerald-600 rounded-full mr-4"></div>
                Latest Stories
              </h2>
              <div className="space-y-6">
                {latestPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <CategorySidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
