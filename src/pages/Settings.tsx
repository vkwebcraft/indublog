
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Bell, Shield, Palette, Save, Upload } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Settings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "john-doe",
    email: "john@example.com",
    bio: "Passionate writer and developer sharing insights about technology and life.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
    website: "",
    twitter: "",
    linkedin: ""
  });

  const [notifications, setNotifications] = useState({
    emailComments: true,
    emailLikes: false,
    emailFollows: true,
    pushComments: true,
    pushLikes: false,
    weeklyDigest: true
  });

  const [privacy, setPrivacy] = useState({
    profilePublic: true,
    showEmail: false,
    allowComments: true,
    moderateComments: false
  });

  const handleProfileSave = () => {
    console.log("Saving profile:", profile);
    // TODO: Save profile changes
  };

  const handleNotificationSave = () => {
    console.log("Saving notifications:", notifications);
    // TODO: Save notification preferences
  };

  const handlePrivacySave = () => {
    console.log("Saving privacy:", privacy);
    // TODO: Save privacy settings
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Account Settings</h1>
          <p className="text-slate-600">Manage your account preferences and settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Privacy</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center space-x-2">
              <Palette className="w-4 h-4" />
              <span>Appearance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar} alt={profile.name} />
                    <AvatarFallback className="text-xl">{profile.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">Profile Photo</h3>
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload New Photo
                    </Button>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile({ ...profile, username: e.target.value })}
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
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="mt-1"
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-slate-800">Social Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        placeholder="https://yourwebsite.com"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profile.twitter}
                        onChange={(e) => setProfile({ ...profile, twitter: e.target.value })}
                        placeholder="@username"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={profile.linkedin}
                      onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      className="mt-1"
                    />
                  </div>
                </div>

                <Button onClick={handleProfileSave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-800 mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-comments">New Comments</Label>
                        <p className="text-sm text-slate-600">Get notified when someone comments on your articles</p>
                      </div>
                      <Switch
                        id="email-comments"
                        checked={notifications.emailComments}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, emailComments: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-likes">New Likes</Label>
                        <p className="text-sm text-slate-600">Get notified when someone likes your articles</p>
                      </div>
                      <Switch
                        id="email-likes"
                        checked={notifications.emailLikes}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, emailLikes: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-follows">New Followers</Label>
                        <p className="text-sm text-slate-600">Get notified when someone follows you</p>
                      </div>
                      <Switch
                        id="email-follows"
                        checked={notifications.emailFollows}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, emailFollows: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-digest">Weekly Digest</Label>
                        <p className="text-sm text-slate-600">Get a weekly summary of your activity</p>
                      </div>
                      <Switch
                        id="weekly-digest"
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => 
                          setNotifications({ ...notifications, weeklyDigest: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={handleNotificationSave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="profile-public">Public Profile</Label>
                      <p className="text-sm text-slate-600">Make your profile visible to other users</p>
                    </div>
                    <Switch
                      id="profile-public"
                      checked={privacy.profilePublic}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, profilePublic: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-email">Show Email</Label>
                      <p className="text-sm text-slate-600">Display your email address on your profile</p>
                    </div>
                    <Switch
                      id="show-email"
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, showEmail: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="allow-comments">Allow Comments</Label>
                      <p className="text-sm text-slate-600">Let readers comment on your articles</p>
                    </div>
                    <Switch
                      id="allow-comments"
                      checked={privacy.allowComments}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, allowComments: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="moderate-comments">Moderate Comments</Label>
                      <p className="text-sm text-slate-600">Require approval before comments are published</p>
                    </div>
                    <Switch
                      id="moderate-comments"
                      checked={privacy.moderateComments}
                      onCheckedChange={(checked) => 
                        setPrivacy({ ...privacy, moderateComments: checked })
                      }
                    />
                  </div>
                </div>

                <Button onClick={handlePrivacySave} className="bg-primary hover:bg-primary/90">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center py-8">
                  <Palette className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Theme Customization</h3>
                  <p className="text-slate-600">Dark mode and theme options coming soon!</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
