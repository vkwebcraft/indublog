
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, TrendingUp } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { BlogCard } from "@/components/BlogCard";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("latest");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "technology", label: "Technology" },
    { value: "design", label: "Design" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "business", label: "Business" },
    { value: "health", label: "Health" },
    { value: "travel", label: "Travel" },
    { value: "food", label: "Food" },
    { value: "education", label: "Education" }
  ];

  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "popular", label: "Most Popular" },
    { value: "trending", label: "Trending" },
    { value: "oldest", label: "Oldest" }
  ];

  const trendingTags = [
    "AI", "Web Development", "Design", "Productivity", "Remote Work",
    "Sustainability", "Mental Health", "Entrepreneurship", "Photography"
  ];

  // Mock data - in real app, this would be filtered based on search/category/sort
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch in 2024",
      excerpt: "Exploring the latest innovations in web technology, from AI integration to sustainable coding practices.",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=40&h=40&fit=crop&crop=face",
        bio: "Full-stack developer"
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
      excerpt: "How to maintain balance and presence while navigating our increasingly connected world.",
      author: {
        name: "Marcus Thompson",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        bio: "Wellness coach"
      },
      coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&h=400&fit=crop",
      category: "Lifestyle",
      tags: ["Mindfulness", "Digital Wellness", "Balance"],
      publishedAt: "2024-01-14",
      readTime: "6 min read",
      likes: 89,
      comments: 12
    },
    {
      id: 3,
      title: "Building Sustainable Businesses for Tomorrow",
      excerpt: "A deep dive into sustainable business practices and how companies can create lasting positive impact.",
      author: {
        name: "Elena Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        bio: "Sustainability consultant"
      },
      category: "Business",
      tags: ["Sustainability", "Business", "Environment"],
      publishedAt: "2024-01-13",
      readTime: "10 min read",
      likes: 67,
      comments: 8
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Explore Stories
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover amazing content from writers around the world
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles, authors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 w-full text-lg border-slate-200 focus:border-primary rounded-full"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-600">Filters:</span>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Trending Tags */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-6">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <h2 className="text-xl font-semibold text-slate-800">Trending Topics</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {trendingTags.map((tag) => (
              <Link key={tag} to={`/tag/${tag.toLowerCase().replace(' ', '-')}`}>
                <Badge 
                  variant="secondary" 
                  className="hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors"
                >
                  #{tag}
                </Badge>
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-slate-300">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Explore;
