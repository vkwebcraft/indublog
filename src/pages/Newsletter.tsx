
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log("Newsletter subscription for:", email);
      
      setIsSubscribed(true);
      toast({
        title: "Success!",
        description: "You've been subscribed to our newsletter",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubscribed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
        <Navigation />
        
        <div className="max-w-2xl mx-auto px-4 py-20">
          <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
            <CardContent className="p-12 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-800 mb-4">
                You're All Set!
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                Thank you for subscribing to IndubLog newsletter. You'll receive our best stories and updates weekly.
              </p>
              <div className="space-y-4">
                <Link to="/">
                  <Button className="bg-primary hover:bg-primary/90">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Homepage
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-primary/5">
      <Navigation />
      
      <div className="max-w-2xl mx-auto px-4 py-20">
        <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-center mb-4">
              <Mail className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-3xl font-bold text-center text-slate-800">
              Stay Updated with IndubLog
            </CardTitle>
            <p className="text-center text-slate-600 text-lg mt-4">
              Get the best stories, insights, and updates delivered to your inbox weekly. 
              Join thousands of readers who never miss our latest content.
            </p>
          </CardHeader>
          
          <CardContent className="pt-0">
            <form onSubmit={handleSubscribe} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 text-lg border-slate-200 focus:border-primary"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 text-lg bg-primary hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? "Subscribing..." : "Subscribe Now"}
              </Button>
            </form>
            
            <div className="mt-8 p-6 bg-slate-50 rounded-lg">
              <h3 className="font-semibold text-slate-800 mb-3">What you'll get:</h3>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Weekly digest of our best stories
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Exclusive author insights and behind-the-scenes content
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  Early access to new features and updates
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                  No spam, unsubscribe anytime
                </li>
              </ul>
            </div>
            
            <p className="text-xs text-slate-500 text-center mt-6">
              By subscribing, you agree to receive emails from IndubLog. 
              You can unsubscribe at any time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Newsletter;
