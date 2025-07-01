import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Save, Eye, Image, Tag, X } from "lucide-react";

const Write = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    category: "",
    coverImage: "",
    tags: [] as string[]
  });
  const [currentTag, setCurrentTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Mock auth check

  const categories = [
    "Technology",
    "Design", 
    "Lifestyle",
    "Business",
    "Health",
    "Travel",
    "Food",
    "Education"
  ];

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5 flex items-center justify-center px-4">
        <Card className="w-full max-w-md text-center p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Authentication Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to start writing your story.</p>
          <Link to="/auth">
            <Button className="bg-primary hover:bg-primary/90">
              Sign In to Continue
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()]
      });
      setCurrentTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  const handlePublish = () => {
    // TODO: Implement publish logic with Supabase
    console.log("Publishing article:", formData);
    // navigate to published article or dashboard
  };

  const handleSaveDraft = () => {
    // TODO: Implement save draft logic
    console.log("Saving draft:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <h1 className="text-xl font-semibold text-slate-800">
                Write Your Story
              </h1>
            </div>

            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
              >
                <Eye className="w-4 h-4 mr-2" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSaveDraft}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90"
                onClick={handlePublish}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {!isPreview ? (
          /* Editor View */
          <div className="space-y-6">
            {/* Title */}
            <div>
              <Input
                type="text"
                name="title"
                placeholder="Write your story title here..."
                value={formData.title}
                onChange={handleInputChange}
                className="text-3xl font-bold border-0 px-0 py-2 placeholder:text-slate-400 focus-visible:ring-0 bg-transparent"
              />
            </div>

            {/* Excerpt */}
            <div>
              <Textarea
                name="excerpt"
                placeholder="Write a compelling excerpt that will grab readers' attention..."
                value={formData.excerpt}
                onChange={handleInputChange}
                className="text-lg border-slate-200 focus:border-emerald-500 bg-white/70 backdrop-blur-sm"
                rows={3}
              />
            </div>

            {/* Metadata */}
            <Card className="border-0 bg-white/70 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Category
                    </label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Cover Image URL
                    </label>
                    <div className="relative">
                      <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="url"
                        name="coverImage"
                        placeholder="https://example.com/image.jpg"
                        value={formData.coverImage}
                        onChange={handleInputChange}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tags
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-slate-500 hover:text-slate-700"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Add a tag and press Enter"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="pl-10"
                      />
                    </div>
                    <Button type="button" variant="outline" onClick={addTag}>
                      Add
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Editor */}
            <div>
              <Textarea
                name="content"
                placeholder="Tell your story... Use Markdown for formatting."
                value={formData.content}
                onChange={handleInputChange}
                className="min-h-[500px] text-lg leading-relaxed border-slate-200 focus:border-primary bg-white/70 backdrop-blur-sm"
              />
              <p className="text-sm text-slate-500 mt-2">
                You can use Markdown formatting. **Bold**, *italic*, [links](url), and more.
              </p>
            </div>
          </div>
        ) : (
          /* Preview View */
          <div className="space-y-8">
            {formData.coverImage && (
              <div className="aspect-video overflow-hidden rounded-lg">
                <img
                  src={formData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {formData.category && (
                  <Badge className="bg-primary/10 text-primary">
                    {formData.category}
                  </Badge>
                )}
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h1 className="text-4xl font-bold text-slate-800 leading-tight">
                {formData.title || "Your Story Title"}
              </h1>

              {formData.excerpt && (
                <p className="text-xl text-slate-600 leading-relaxed">
                  {formData.excerpt}
                </p>
              )}
            </div>

            <div className="prose prose-lg max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {formData.content || "Your story content will appear here..."}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Write;
