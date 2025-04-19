import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import Layout from '@/components/layout/Layout';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isParent, isChild } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      if (isParent) {
        navigate('/parent-dashboard');
      } else if (isChild) {
        navigate('/child-dashboard');
      }
    } else {
      navigate('/register/parent');
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Family Nest Accounts Portal</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A secure platform for managing family finances with parent and child accounts
            </p>
            {!isAuthenticated && (
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <Button size="lg" onClick={handleGetStarted} className="bg-blue-600 hover:bg-blue-700">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')}>
                  Login
                </Button>
              </div>
            )}
            {isAuthenticated && (
              <div className="mt-8">
                <Button size="lg" onClick={handleGetStarted}>
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="text-blue-700">Parent Accounts</CardTitle>
                <CardDescription>Primary family account management</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create and manage a primary financial account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Link and monitor multiple child accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View both parent and linked child account details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive financial overview for the whole family</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-blue-50 flex justify-center py-4">
                {!isAuthenticated && (
                  <Button onClick={() => navigate('/register/parent')}>Register as Parent</Button>
                )}
              </CardFooter>
            </Card>

            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-50">
                <CardTitle className="text-green-700">Child Accounts</CardTitle>
                <CardDescription>Linked dependent accounts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personal account linked to a parent account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View only your own account information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure and separate access from parent account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Track your individual balance and account activity</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="bg-green-50 flex justify-center py-4">
                {!isAuthenticated && (
                  <Button onClick={() => navigate('/register/child')} variant="outline">Register as Child</Button>
                )}
              </CardFooter>
            </Card>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 shrink-0">1</div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Create a Parent Account</h3>
                  <p className="text-gray-600">Register as a parent to create the main account for your family.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 shrink-0">2</div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Create Child Accounts</h3>
                  <p className="text-gray-600">Register child accounts and link them to your parent account.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center font-bold mr-4 shrink-0">3</div>
                <div>
                  <h3 className="text-lg font-medium mb-1">Manage Family Finances</h3>
                  <p className="text-gray-600">As a parent, view and manage all accounts. Children can access only their own accounts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
