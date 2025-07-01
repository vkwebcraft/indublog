
import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, PenTool, Heart } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Authors = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const authors = [
    {
      id: 1,
      name: "Sarah Chen",
      username: "sarah-chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b332-2616?w=80&h=80&fit=crop&crop=face",
      bio: "Full-stack developer and tech writer passionate about emerging technologies and sustainable coding practices.",
      followers: 1240,
      following: 89,
      articles: 23,
      totalLikes: 2456,
      categories: ["Technology", "AI", "Web Development"],
      featured: true,
      verified: true
    },
    {
      id: 2,
      name: "Marcus Thompson",
      username: "marcus-thompson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      bio: "Wellness coach and mindfulness advocate helping people find balance in the digital age.",
      followers: 890,
      following: 156,
      articles: 18,
      totalLikes: 1876,
      categories: ["Lifestyle", "Wellness", "Mindfulness"],
      featured: true,
      verified: false
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      username: "elena-rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      bio: "Sustainability consultant and entrepreneur focused on building a greener future through conscious business practices.",
      followers: 567,
      following: 234,
      articles: 15,
      totalLikes: 1234,
      categories: ["Business", "Sustainability", "Environment"],
      featured: true,
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      username: "david-kim",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      bio: "UX designer and creative director with 10+ years of experience in digital product design.",
      followers: 1456,
      following: 78,
      articles: 27,
      totalLikes: 3210,
      categories: ["Design", "UX", "Creativity"],
      featured: false,
      verified: true
    },
    {
      id: 5,
      name: "Priya Patel",
      username: "priya-patel",
      avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=80&h=80&fit=crop&crop=face",
      bio: "Data scientist and AI educator making complex topics accessible to everyone.",
      followers: 978,
      following: 145,
      articles: 21,
      totalLikes: 2187,
      categories: ["AI", "Data Science", "Education"],
      featured: false,
      verified: false
    },
    {
      id: 6,
      name: "James Wilson",
      username: "james-wilson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
      bio: "Travel photographer and storyteller capturing the beauty of our world through words and images.",
      followers: 654,
      following: 298,
      articles: 19,
      totalLikes: 1567,
      categories: ["Travel", "Photography", "Culture"],
      featured: false,
      verified: false
    }
  ];

  const featuredAuthors = authors.filter(author => author.featured);
  const allAuthors = authors.filter(author => !author.featured);

  const filteredAuthors = allAuthors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Meet Our Authors
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Discover the talented writers behind the stories that inspire and inform
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 w-full border-slate-200 focus:border-primary rounded-full"
            />
          </div>
        </div>

        {/* Featured Authors */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
            Featured Authors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredAuthors.map((author) => (
              <Card key={author.id} className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <Avatar className="w-20 h-20 mx-auto mb-4">
                      <AvatarImage src={author.avatar} alt={author.name} />
                      <AvatarFallback className="text-lg">{author.name[0]}</AvatarFallback>
                    </Avatar>
                    {author.verified && (
                      <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                  
                  <Link to={`/author/${author.username}`}>
                    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-primary">
                      {author.name}
                    </h3>
                  </Link>
                  
                  <p className="text-slate-600 text-sm mb-4 line-clamp-3">
                    {author.bio}
                  </p>

                  <div className="flex flex-wrap gap-1 justify-center mb-4">
                    {author.categories.slice(0, 3).map((category) => (
                      <Badge key={category} variant="secondary" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center mb-4">
                    <div>
                      <p className="text-lg font-bold text-primary">{author.articles}</p>
                      <p className="text-xs text-slate-500">Articles</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{author.followers}</p>
                      <p className="text-xs text-slate-500">Followers</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">{author.totalLikes}</p>
                      <p className="text-xs text-slate-500">Likes</p>
                    </div>
                  </div>

                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* All Authors */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
            All Authors ({filteredAuthors.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAuthors.map((author) => (
              <Card key={author.id} className="group hover:shadow-md transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="relative">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={author.avatar} alt={author.name} />
                        <AvatarFallback>{author.name[0]}</AvatarFallback>
                      </Avatar>
                      {author.verified && (
                        <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <Link to={`/author/${author.username}`}>
                        <h3 className="text-lg font-bold text-slate-800 mb-1 group-hover:text-primary">
                          {author.name}
                        </h3>
                      </Link>
                      
                      <p className="text-slate-600 text-sm mb-3 line-clamp-2">
                        {author.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {author.categories.slice(0, 3).map((category) => (
                          <Badge key={category} variant="secondary" className="text-xs">
                            {category}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span className="flex items-center">
                            <PenTool className="w-4 h-4 mr-1" />
                            {author.articles}
                          </span>
                          <span className="flex items-center">
                            <Users className="w-4 h-4 mr-1" />
                            {author.followers}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {author.totalLikes}
                          </span>
                        </div>
                        <Button size="sm" variant="outline">
                          Follow
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">{authors.length}</h3>
              <p className="text-slate-600">Total Authors</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">
                {authors.reduce((sum, author) => sum + author.articles, 0)}
              </h3>
              <p className="text-slate-600">Articles Published</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">
                {authors.reduce((sum, author) => sum + author.followers, 0)}
              </h3>
              <p className="text-slate-600">Total Followers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">
                {authors.reduce((sum, author) => sum + author.totalLikes, 0)}
              </h3>
              <p className="text-slate-600">Total Likes</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Authors;
