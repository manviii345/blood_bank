import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Navigate to respective dashboard if role doesn't match
    return <Navigate to={`/dashboard/${user.role === 'super_admin' ? 'admin' : user.role}`} replace />;
  }

  return children;
}
