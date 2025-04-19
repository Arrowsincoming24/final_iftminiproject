
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-900">
              Welcome to Family Nest Accounts Portal
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Manage your family's finances with our secure parent-child account system.
              Parents can oversee their children's accounts while teaching financial responsibility.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => navigate('/register/parent')}
              >
                Create Parent Account
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => navigate('/login')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Parent Accounts</h2>
            <p className="text-gray-600 mb-4">
              Create a parent account to manage your family's finances. Monitor child accounts and help guide 
              their financial decisions.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Complete oversight of all child accounts</li>
              <li>Secure transaction management</li>
              <li>Real-time balance updates</li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Child Accounts</h2>
            <p className="text-gray-600 mb-4">
              Child accounts are linked to parent accounts for security. Children can view their own accounts
              and learn financial management.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Safe and supervised access</li>
              <li>Limited to viewing their own account</li>
              <li>Learn financial responsibility</li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-blue-800">Secure & Transparent</h2>
            <p className="text-gray-600 mb-4">
              Our system maintains detailed audit logs of all actions, including when and where each change was made,
              for complete transparency.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Comprehensive audit trails</li>
              <li>Multiple timezone tracking</li>
              <li>System origin records</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Create your account today and experience the security and convenience of the Family Nest Accounts Portal.
          </p>
          <Button 
            size="lg" 
            className="bg-white text-blue-900 hover:bg-gray-100"
            onClick={() => navigate('/register/parent')}
          >
            Create Your Account
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
