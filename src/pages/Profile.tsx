
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Calendar, 
  MapPin, 
  Globe, 
  Twitter, 
  Linkedin,
  Save,
  Edit,
  Camera
} from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "john-doe",
    email: "john@example.com",
    bio: "Passionate writer and developer sharing insights about technology and life.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    twitter: "@johndoe",
    linkedin: "linkedin.com/in/johndoe",
    joinedAt: "June 2023"
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true
  });

  const stats = {
    articles: 12,
    followers: 324,
    following: 89,
    likes: 1205
  };

  const recentArticles = [
    {
      id: 1,
      title: "Getting Started with React Hooks",
      publishedAt: "2024-01-15",
      status: "published",
      views: 1248,
      likes: 89
    },
    {
      id: 2,
      title: "The Art of Minimalist Design",
      publishedAt: "2024-01-10",
      status: "draft",
      views: 0,
      likes: 0
    },
    {
      id: 3,
      title: "Building Sustainable Habits",
      publishedAt: "2024-01-05",
      status: "published",
      views: 867,
      likes: 56
    }
  ];

  const handleSave = () => {
    console.log("Saving profile changes:", profile);
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-2xl">{profile.name[0]}</AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                  >
                    <Camera className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">{profile.name}</h1>
                <p className="text-slate-600">@{profile.username}</p>
                <p className="text-slate-600 max-w-md mt-1">{profile.bio}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-slate-500">
                  <span className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profile.location}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Joined {profile.joinedAt}
                  </span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "outline" : "default"}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 bg-white/70 backdrop-blur-sm text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.articles}</div>
              <div className="text-sm text-slate-600">Articles</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.followers}</div>
              <div className="text-sm text-slate-600">Followers</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.following}</div>
              <div className="text-sm text-slate-600">Following</div>
            </CardContent>
          </Card>
          <Card className="border-0 bg-white/70 backdrop-blur-sm text-center">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{stats.likes}</div>
              <div className="text-sm text-slate-600">Likes</div>
            </CardContent>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Articles */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Recent Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentArticles.map((article) => (
                      <div key={article.id} className="p-3 rounded-lg bg-white/50">
                        <h4 className="font-medium text-slate-800 mb-1">{article.title}</h4>
                        <div className="flex items-center justify-between text-sm text-slate-600">
                          <div className="flex items-center space-x-3">
                            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
                              {article.status}
                            </Badge>
                            <span>{article.publishedAt}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span>{article.views} views</span>
                            <span>{article.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Activity Summary */}
              <Card className="border-0 bg-white/70 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Activity Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">This Month</span>
                      <span className="font-semibold">3 articles published</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Total Views</span>
                      <span className="font-semibold">2,115 views</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Engagement Rate</span>
                      <span className="font-semibold">7.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">New Followers</span>
                      <span className="font-semibold">+23 this week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    disabled={!isEditing}
                    className="mt-1"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website" className="flex items-center">
                        <Globe className="w-4 h-4 mr-2" />
                        Website
                      </Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter" className="flex items-center">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin" className="flex items-center">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                </div>

                {isEditing && (
                  <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Email Notifications</Label>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="email-notifications"
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notifications">Push Notifications</Label>
                      <p className="text-sm text-slate-600">Receive push notifications</p>
                    </div>
                    <Switch
                      id="push-notifications"
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weekly-digest">Weekly Digest</Label>
                      <p className="text-sm text-slate-600">Get a weekly summary of activity</p>
                    </div>
                    <Switch
                      id="weekly-digest"
                      checked={notifications.weeklyDigest}
                      onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Privacy Controls</h3>
                  <p className="text-slate-600">Advanced privacy settings coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
