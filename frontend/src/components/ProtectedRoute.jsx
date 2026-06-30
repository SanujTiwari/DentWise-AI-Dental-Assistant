import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
        <div className="relative flex flex-col items-center justify-center">
          <div className="absolute w-24 h-24 rounded-full border border-primary/30 animate-ping opacity-75"></div>
          <div className="absolute w-28 h-28 rounded-full border-2 border-primary/10 animate-pulse"></div>
          <div className="absolute w-32 h-32 rounded-full border-4 border-transparent border-t-primary border-b-primary animate-spin"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center shadow-md animate-pulse">
            <img src="/logo.svg" alt="DentWise" className="w-10 h-auto" />
          </div>
          <div className="mt-8 flex flex-col items-center gap-1.5">
            <span className="text-sm font-bold tracking-widest text-primary uppercase animate-pulse">
              DentWise
            </span>
            <span className="text-[10px] text-muted-foreground tracking-widest uppercase animate-bounce">
              Loading...
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
