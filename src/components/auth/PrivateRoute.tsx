
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

interface PrivateRouteProps {
  allowParent?: boolean;
  allowChild?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  allowParent = true, 
  allowChild = true 
}) => {
  const { isAuthenticated, isParent, isChild } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the allowed role
  if ((allowParent && isParent) || (allowChild && isChild)) {
    return <Outlet />;
  }

  // Redirect based on role
  if (isParent) {
    return <Navigate to="/parent-dashboard" replace />;
  } else if (isChild) {
    return <Navigate to="/child-dashboard" replace />;
  }

  // Fallback to login
  return <Navigate to="/login" replace />;
};

export default PrivateRoute;
