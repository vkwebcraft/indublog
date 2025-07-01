
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Heart, Briefcase, Plane, Camera, BookOpen, Utensils } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const Categories = () => {
  const categories = [
    {
      name: "Technology",
      slug: "technology",
      description: "Latest in tech, programming, and digital innovation",
      icon: Code,
      color: "bg-blue-500",
      count: 145,
      featured: true
    },
    {
      name: "Design",
      slug: "design", 
      description: "UI/UX, graphic design, and creative inspiration",
      icon: Palette,
      color: "bg-purple-500",
      count: 89,
      featured: true
    },
    {
      name: "Lifestyle",
      slug: "lifestyle",
      description: "Wellness, productivity, and personal development",
      icon: Heart,
      color: "bg-pink-500",
      count: 124,
      featured: true
    },
    {
      name: "Business",
      slug: "business",
      description: "Entrepreneurship, marketing, and industry insights",
      icon: Briefcase,
      color: "bg-green-500",
      count: 97,
      featured: false
    },
    {
      name: "Travel",
      slug: "travel",
      description: "Adventures, destinations, and travel tips",
      icon: Plane,
      color: "bg-sky-500",
      count: 73,
      featured: false
    },
    {
      name: "Photography",
      slug: "photography",
      description: "Visual storytelling and photography techniques",
      icon: Camera,
      color: "bg-orange-500",
      count: 56,
      featured: false
    },
    {
      name: "Education",
      slug: "education",
      description: "Learning, teaching, and knowledge sharing",
      icon: BookOpen,
      color: "bg-indigo-500",
      count: 82,
      featured: false
    },
    {
      name: "Food",
      slug: "food",
      description: "Recipes, culinary adventures, and food culture",
      icon: Utensils,
      color: "bg-red-500",
      count: 64,
      featured: false
    }
  ];

  const featuredCategories = categories.filter(cat => cat.featured);
  const otherCategories = categories.filter(cat => !cat.featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Browse Categories
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore stories organized by topics you care about
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
            Featured Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
                    <CardHeader className="text-center pb-4">
                      <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0">
                      <p className="text-slate-600 mb-4">{category.description}</p>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {category.count} articles
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center">
            <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
            All Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} to={`/category/${category.slug}`}>
                  <Card className="group hover:shadow-md transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800 mb-1">
                            {category.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mt-3">
                        {category.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </h3>
              <p className="text-slate-600">Total Articles</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">{categories.length}</h3>
              <p className="text-slate-600">Categories</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">50+</h3>
              <p className="text-slate-600">Writers</p>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-primary mb-2">1.2K</h3>
              <p className="text-slate-600">Readers</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
