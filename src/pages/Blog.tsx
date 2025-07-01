
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Calendar, 
  Clock, 
  ArrowLeft, 
  Send,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Facebook
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Blog = () => {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [showShareMenu, setShowShareMenu] = useState(false);

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
    comments: 18,
    slug: "future-of-web-development-trends-2024"
  };

  // SEO Meta tags
  useEffect(() => {
    // Update document title
    document.title = `${blog.title} | IndubLog`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', blog.excerpt);
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');

    if (ogTitle) ogTitle.setAttribute('content', blog.title);
    if (ogDescription) ogDescription.setAttribute('content', blog.excerpt);
    if (ogImage) ogImage.setAttribute('content', blog.coverImage);
    if (ogUrl) ogUrl.setAttribute('content', window.location.href);

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    const twitterImage = document.querySelector('meta[name="twitter:image"]');

    if (twitterTitle) twitterTitle.setAttribute('content', blog.title);
    if (twitterDescription) twitterDescription.setAttribute('content', blog.excerpt);
    if (twitterImage) twitterImage.setAttribute('content', blog.coverImage);

    // Cleanup function to reset title when component unmounts
    return () => {
      document.title = "IndubLog - Stories that inspire. Words that matter.";
    };
  }, [blog]);

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
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  const shareUrl = window.location.href;
  const shareText = `${blog.title} - ${blog.excerpt}`;

  const handleShareTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleShareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      {/* SEO Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blog.title,
            "description": blog.excerpt,
            "image": blog.coverImage,
            "author": {
              "@type": "Person",
              "name": blog.author.name
            },
            "publisher": {
              "@type": "Organization",
              "name": "IndubLog"
            },
            "datePublished": blog.publishedAt,
            "dateModified": blog.publishedAt
          })
        }}
      />

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
              
              {/* Share Button with Dropdown */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="text-slate-600"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                
                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border z-50 py-2 min-w-[180px]">
                    <button
                      onClick={handleShareTwitter}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Twitter className="w-4 h-4 text-blue-500" />
                      <span>Share on Twitter</span>
                    </button>
                    <button
                      onClick={handleShareLinkedIn}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Linkedin className="w-4 h-4 text-blue-600" />
                      <span>Share on LinkedIn</span>
                    </button>
                    <button
                      onClick={handleShareFacebook}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <Facebook className="w-4 h-4 text-blue-700" />
                      <span>Share on Facebook</span>
                    </button>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      <LinkIcon className="w-4 h-4 text-slate-500" />
                      <span>Copy Link</span>
                    </button>
                  </div>
                )}
              </div>
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

      {/* Click outside to close share menu */}
      {showShareMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowShareMenu(false)}
        />
      )}
    </div>
  );
};

export default Blog;
