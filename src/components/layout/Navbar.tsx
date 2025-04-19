
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, isParent, isChild, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const goToDashboard = () => {
    if (isParent) {
      navigate('/parent-dashboard');
    } else if (isChild) {
      navigate('/child-dashboard');
    }
  };

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-2">
          <h1 
            className="text-xl font-bold cursor-pointer" 
            onClick={() => navigate('/')}
          >
            Parentlink
          </h1>
          <span className="text-sm bg-blue-700 px-2 py-0.5 rounded-md">Accounts Portal</span>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden md:block text-sm">
                Logged in as{' '}
                <span className="font-semibold">{user?.fullName}</span>
                {' '}({isParent ? 'Parent' : 'Child'})
              </div>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={goToDashboard}
              >
                Dashboard
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => navigate('/register/parent')}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
