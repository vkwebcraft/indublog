
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Heart, MessageSquare, Share2, Calendar, Clock, ArrowLeft, Send } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Blog = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Mock blog data - in real app, fetch based on ID
  const blog = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch in 2024",
    content: `
# Introduction

Web development continues to evolve at an unprecedented pace. As we navigate through 2024, several key trends are shaping the future of how we build and interact with web applications.

## The Rise of AI-Powered Development

Artificial intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are becoming indispensable for modern developers.

### Key Benefits:
- **Faster Development**: AI-powered tools can generate boilerplate code and suggest optimizations
- **Better Code Quality**: Automated code review and testing improve overall application reliability
- **Enhanced User Experience**: AI enables personalized content and intelligent interfaces

## Sustainable Web Development

Environmental consciousness is driving a new focus on sustainable coding practices. Developers are increasingly aware of their digital carbon footprint.

### Green Coding Practices:
1. Optimizing images and assets for faster loading
2. Using efficient algorithms and data structures
3. Implementing lazy loading and code splitting
4. Choosing eco-friendly hosting solutions

## The Evolution of JavaScript Frameworks

The JavaScript ecosystem continues to mature with new frameworks and improvements to existing ones.

Popular trends include:
- **Server-side rendering** for better performance
- **Component-based architecture** for maintainability
- **TypeScript adoption** for type safety

## Conclusion

The future of web development is bright, with exciting innovations on the horizon. As developers, staying informed about these trends will help us build better, more efficient, and more sustainable web applications.
    `,
    excerpt: "Exploring the latest innovations in web technology, from AI integration to sustainable coding practices that are shaping the future of digital experiences.",
    author: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=40&h=40&fit=crop&crop=face",
      bio: "Full-stack developer and tech writer passionate about emerging technologies",
      followers: 1240,
      following: 89
    },
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    category: "Technology",
    tags: ["Web Development", "AI", "Trends", "JavaScript"],
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    likes: 124,
    comments: 18
  };

  const comments = [
    {
      id: 1,
      author: {
        name: "Alex Johnson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
      },
      content: "Great insights on AI-powered development! I've been using Copilot for a few months now and the productivity boost is incredible.",
      publishedAt: "2024-01-16",
      likes: 12
    },
    {
      id: 2,
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face"
      },
      content: "The section on sustainable web development really resonates with me. We need more developers thinking about environmental impact.",
      publishedAt: "2024-01-16",
      likes: 8
    }
  ];

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // TODO: Submit comment
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // TODO: Show toast notification
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center text-slate-600 hover:text-primary mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-primary/10 text-primary">{blog.category}</Badge>
            {blog.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6 leading-tight">
            {blog.title}
          </h1>

          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            {blog.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Avatar className="w-12 h-12">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <Link to={`/author/${blog.author.name.toLowerCase().replace(' ', '-')}`}>
                  <h3 className="font-semibold text-slate-800 hover:text-primary">
                    {blog.author.name}
                  </h3>
                </Link>
                <div className="flex items-center space-x-4 text-sm text-slate-500">
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {blog.publishedAt}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {blog.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${isLiked ? 'text-red-500' : 'text-slate-600'} hover:text-red-500`}
              >
                <Heart className={`w-4 h-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
                {blog.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                {blog.comments}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare} className="text-slate-600">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
            {blog.content}
          </div>
        </article>

        {/* Author Card */}
        <Card className="mb-12 border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src={blog.author.avatar} alt={blog.author.name} />
                <AvatarFallback>{blog.author.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{blog.author.name}</h3>
                <p className="text-slate-600 mb-3">{blog.author.bio}</p>
                <div className="flex items-center space-x-4 text-sm text-slate-500 mb-4">
                  <span>{blog.author.followers} followers</span>
                  <span>{blog.author.following} following</span>
                </div>
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Follow
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Comment Form */}
          <Card className="mb-8 border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Write a thoughtful comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3 border-slate-200 focus:border-primary"
                  />
                  <Button 
                    onClick={handleComment}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Comment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <Card key={comment.id} className="border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex space-x-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-slate-800">{comment.author.name}</h4>
                        <span className="text-sm text-slate-500">{comment.publishedAt}</span>
                      </div>
                      <p className="text-slate-700 mb-3">{comment.content}</p>
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-red-500">
                        <Heart className="w-4 h-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
