
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="relative mx-auto w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <div className="text-6xl font-bold text-slate-300">?</div>
          <div className="absolute top-0 right-0 h-6 w-6 bg-slate-200 rounded-full"></div>
          <div className="absolute bottom-4 left-0 h-4 w-4 bg-slate-200 rounded-full"></div>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Page Not Found</h1>
        
        <p className="text-slate-600 mb-8">
          We couldn't find the page you're looking for. It might have been moved, deleted,
          or never existed in the first place.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            className="button-hover-effect w-full sm:w-auto"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          
          <Button
            className="button-hover-effect w-full sm:w-auto"
            asChild
          >
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
