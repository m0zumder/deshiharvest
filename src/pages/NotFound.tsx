import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <div className="text-8xl mb-8">🌾</div>
        <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! This field is empty</p>
        <p className="mb-8 text-muted-foreground">The page you're looking for doesn't exist</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-gradient-accent text-accent-foreground rounded-lg hover:shadow-accent transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
