
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("student" | "teacher" | "admin")[];
}

const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // While checking authentication status, show nothing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-educational-purple"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If roles are specified and user doesn't have required role
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role as any)) {
    // Redirect based on user role
    if (user.role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    } else if (user.role === "teacher") {
      return <Navigate to="/teacher-dashboard" replace />;
    } else if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    } else {
      // Fallback to login if role is unknown
      return <Navigate to="/login" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
