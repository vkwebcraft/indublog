
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Heart, Briefcase, Plane, Camera, BookOpen, Utensils, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import Footer from "@/components/Footer";

const Categories = () => {
  const categories = [
    {
      name: "Technology",
      slug: "technology",
      description: "Dive into the latest tech trends, programming tutorials, and digital innovations shaping our future",
      icon: Code,
      color: "bg-blue-500",
      count: 145,
      featured: true
    },
    {
      name: "Design",
      slug: "design", 
      description: "Explore creative design principles, UI/UX best practices, and visual inspiration for modern interfaces",
      icon: Palette,
      color: "bg-purple-500",
      count: 89,
      featured: true
    },
    {
      name: "Lifestyle",
      slug: "lifestyle",
      description: "Discover wellness tips, productivity hacks, and personal development strategies for a balanced life",
      icon: Heart,
      color: "bg-pink-500",
      count: 124,
      featured: true
    },
    {
      name: "Business",
      slug: "business",
      description: "Learn about entrepreneurship, marketing strategies, and industry insights from successful leaders",
      icon: Briefcase,
      color: "bg-green-500",
      count: 97,
      featured: false
    },
    {
      name: "Travel",
      slug: "travel",
      description: "Get inspired by travel stories, destination guides, and tips for your next adventure",
      icon: Plane,
      color: "bg-sky-500",
      count: 73,
      featured: false
    },
    {
      name: "Photography",
      slug: "photography",
      description: "Master photography techniques, composition tips, and visual storytelling methods",
      icon: Camera,
      color: "bg-orange-500",
      count: 56,
      featured: false
    },
    {
      name: "Education",
      slug: "education",
      description: "Enhance your learning journey with educational resources, study techniques, and skill development",
      icon: BookOpen,
      color: "bg-indigo-500",
      count: 82,
      featured: false
    },
    {
      name: "Food",
      slug: "food",
      description: "Savor delicious recipes, cooking techniques, and explore diverse culinary cultures",
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
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            Explore by Category
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Find exactly what interests you. Browse our carefully curated categories filled with inspiring stories, practical guides, and expert insights.
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Popular Categories</h2>
              <p className="text-slate-600">Most read and trending topics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} to={`/category/${category.slug}`} className="group">
                  <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white group-hover:-translate-y-1">
                    <CardHeader className="text-center pb-6">
                      <div className={`w-20 h-20 ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-bold text-slate-900 mb-3">
                        {category.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center pt-0 px-6 pb-8">
                      <p className="text-slate-600 mb-6 leading-relaxed text-base">
                        {category.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-primary/10 text-primary font-medium">
                          {category.count} articles
                        </Badge>
                        <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* All Categories */}
        <section className="mb-16">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">More Categories</h2>
            <p className="text-slate-600">Discover additional topics and interests</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {otherCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} to={`/category/${category.slug}`} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-slate-900 mb-1 text-lg group-hover:text-primary transition-colors">
                            {category.name}
                          </h3>
                          <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                            {category.count} articles
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
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
        <section className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Our Community</h3>
            <p className="text-slate-600">Join thousands of readers and writers</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary mb-2">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </h4>
              <p className="text-slate-600 font-medium">Total Articles</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary mb-2">{categories.length}</h4>
              <p className="text-slate-600 font-medium">Categories</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary mb-2">50+</h4>
              <p className="text-slate-600 font-medium">Expert Writers</p>
            </div>
            <div className="text-center">
              <h4 className="text-4xl font-bold text-primary mb-2">1.2K</h4>
              <p className="text-slate-600 font-medium">Active Readers</p>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default Categories;
