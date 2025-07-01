
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenTool, Heart, MessageSquare, Eye, Settings, Edit, Trash2 } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("articles");

  // Mock user data
  const user = {
    name: "John Doe",
    username: "john-doe",
    email: "john@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    bio: "Passionate writer and developer sharing insights about technology and life.",
    followers: 324,
    following: 89,
    joinedAt: "2023-06-15"
  };

  const userArticles = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      status: "published",
      publishedAt: "2024-01-15",
      views: 1248,
      likes: 89,
      comments: 23,
      category: "Technology"
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      status: "draft",
      publishedAt: null,
      views: 0,
      likes: 0,
      comments: 0,
      category: "Design"
    },
    {
      id: 3,
      title: "Building Sustainable Habits",
      status: "published",
      publishedAt: "2024-01-10",
      views: 867,
      likes: 56,
      comments: 12,
      category: "Lifestyle"
    }
  ];

  const stats = {
    totalArticles: userArticles.length,
    publishedArticles: userArticles.filter(a => a.status === 'published').length,
    totalViews: userArticles.reduce((sum, article) => sum + article.views, 0),
    totalLikes: userArticles.reduce((sum, article) => sum + article.likes, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xl">{user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{user.name}</h1>
                <p className="text-slate-600">@{user.username}</p>
                <p className="text-slate-600 max-w-md">{user.bio}</p>
              </div>
            </div>
            <div className="text-right">
              <Link to="/settings">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <PenTool className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalArticles}</h3>
              <p className="text-slate-600">Articles</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Eye className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalViews}</h3>
              <p className="text-slate-600">Views</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <Heart className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{stats.totalLikes}</h3>
              <p className="text-slate-600">Likes</p>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-2" />
              <h3 className="text-2xl font-bold text-slate-800">{user.followers}</h3>
              <p className="text-slate-600">Followers</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="articles">My Articles</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="articles">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Published Articles</CardTitle>
                <Link to="/write">
                  <Button className="bg-primary hover:bg-primary/90">
                    <PenTool className="w-4 h-4 mr-2" />
                    Write New Article
                  </Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userArticles.filter(article => article.status === 'published').map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <Link to={`/blog/${article.id}`}>
                          <h3 className="font-semibold text-slate-800 hover:text-primary mb-1">
                            {article.title}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <Badge variant="secondary">{article.category}</Badge>
                          <span>Published on {article.publishedAt}</span>
                          <span className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {article.likes}
                          </span>
                          <span className="flex items-center">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            {article.comments}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link to={`/write/${article.id}`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drafts">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Draft Articles</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userArticles.filter(article => article.status === 'draft').map((article) => (
                    <div key={article.id} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-1">{article.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <Badge variant="outline">Draft</Badge>
                          <Badge variant="secondary">{article.category}</Badge>
                          <span>Last modified: Today</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link to={`/write/${article.id}`}>
                          <Button variant="outline" size="sm">
                            Continue Writing
                          </Button>
                        </Link>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Article Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Views</span>
                      <span className="font-bold text-primary">{stats.totalViews}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Likes</span>
                      <span className="font-bold text-primary">{stats.totalLikes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Published Articles</span>
                      <span className="font-bold text-primary">{stats.publishedArticles}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Audience Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Followers</span>
                      <span className="font-bold text-primary">{user.followers}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Following</span>
                      <span className="font-bold text-primary">{user.following}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Member Since</span>
                      <span className="font-bold text-primary">{user.joinedAt}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
