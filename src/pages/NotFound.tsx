
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const NotFoundPage = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
        <h1 className="text-6xl font-bold text-blue-900 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page not found</p>
        <p className="text-gray-500 max-w-md text-center mb-8">
          The page you are looking for might have been removed, had its name changed,
          or is temporarily unavailable.
        </p>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          Return to Home
        </Button>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
