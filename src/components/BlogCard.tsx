
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageSquare, Calendar } from "lucide-react";

interface Author {
  name: string;
  avatar: string;
  bio: string;
}

interface Post {
  id: number;
  title: string;
  excerpt: string;
  author: Author;
  coverImage?: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
  likes: number;
  comments: number;
}

interface BlogCardProps {
  post: Post;
  featured?: boolean;
}

export const BlogCard = ({ post, featured = false }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (featured) {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm overflow-hidden">
        {post.coverImage && (
          <div className="relative overflow-hidden">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <Badge className="absolute top-4 left-4 bg-emerald-600 text-white">
              {post.category}
            </Badge>
          </div>
        )}
        <CardHeader className="pb-2">
          <div className="flex items-center space-x-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-slate-700">{post.author.name}</p>
              <div className="flex items-center text-xs text-slate-500 space-x-2">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.publishedAt)}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
          <Link to={`/blog/${post.id}`} className="group">
            <h3 className="text-xl font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight">
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-slate-600 mb-4 leading-relaxed">{post.excerpt}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {post.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-slate-500">
              <div className="flex items-center space-x-1">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10 flex-shrink-0">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-2">
              <p className="text-sm font-medium text-slate-700">{post.author.name}</p>
              <span className="text-slate-400">•</span>
              <div className="flex items-center text-xs text-slate-500 space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(post.publishedAt)}</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500">{post.readTime}</span>
            </div>
            
            <Link to={`/blog/${post.id}`} className="group">
              <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-600 transition-colors leading-tight mb-2">
                {post.title}
              </h3>
            </Link>
            
            <p className="text-slate-600 mb-3 leading-relaxed">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                  {post.category}
                </Badge>
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center space-x-4 text-slate-500">
                <div className="flex items-center space-x-1 cursor-pointer hover:text-emerald-600 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-sm">{post.likes}</span>
                </div>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-emerald-600 transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
