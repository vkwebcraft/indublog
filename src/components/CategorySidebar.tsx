
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tag, User, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export const CategorySidebar = () => {
  const popularTags = [
    { name: "Technology", count: 45 },
    { name: "Design", count: 32 },
    { name: "Lifestyle", count: 28 },
    { name: "Business", count: 24 },
    { name: "AI", count: 18 },
    { name: "Web Development", count: 15 },
    { name: "Mindfulness", count: 12 },
    { name: "Sustainability", count: 10 }
  ];

  const featuredAuthors = [
    {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=40&h=40&fit=crop&crop=face",
      bio: "Full-stack developer",
      followers: 1240
    },
    {
      name: "Marcus Thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      bio: "Wellness coach",
      followers: 890
    },
    {
      name: "Elena Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      bio: "Sustainability expert",
      followers: 567
    }
  ];

  const trendingTopics = [
    "The Future of AI",
    "Sustainable Living",
    "Remote Work Culture",
    "Digital Minimalism",
    "Creative Writing"
  ];

  return (
    <div className="space-y-6">
      {/* Popular Tags */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <Tag className="w-5 h-5 mr-2 text-primary" />
            Popular Tags
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag) => (
              <Link key={tag.name} to={`/tag/${tag.name.toLowerCase().replace(' ', '-')}`}>
                <Badge 
                  variant="secondary" 
                  className="hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                >
                  {tag.name} ({tag.count})
                </Badge>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Trending Topics */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-primary" />
            Trending Now
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {trendingTopics.map((topic, index) => (
              <Link 
                key={topic} 
                to={`/search?q=${encodeURIComponent(topic)}`}
                className="block text-sm text-slate-600 hover:text-primary transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400 font-mono">#{index + 1}</span>
                  <span className="hover:underline">{topic}</span>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Featured Authors */}
      <Card className="border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
            <User className="w-5 h-5 mr-2 text-primary" />
            Featured Authors
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4">
            {featuredAuthors.map((author) => (
              <Link 
                key={author.name} 
                to={`/author/${author.name.toLowerCase().replace(' ', '-')}`}
                className="block group"
              >
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={author.avatar} alt={author.name} />
                    <AvatarFallback>{author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 group-hover:text-primary transition-colors">
                      {author.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{author.bio}</p>
                    <p className="text-xs text-slate-400">{author.followers} followers</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Newsletter Signup */}
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-primary/10">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Stay Updated</h3>
          <p className="text-sm text-slate-600 mb-4">
            Get the best stories delivered to your inbox weekly.
          </p>
          <Link to="/newsletter">
            <button className="w-full bg-primary hover:bg-primary/90 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              Subscribe Now
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
