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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-white">
        <div className="container mx-auto px-4 py-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Family Nest Accounts Portal
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              A secure platform for managing family finances with parent and child accounts
            </p>
            {!isAuthenticated && (
              <div className="mt-10 flex flex-col md:flex-row gap-5 justify-center">
                <Button size="lg" onClick={handleGetStarted} className="px-8 py-6 text-base">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/login')} className="px-8 py-6 text-base">
                  Login
                </Button>
              </div>
            )}
            {isAuthenticated && (
              <div className="mt-10">
                <Button size="lg" onClick={handleGetStarted} className="px-8 py-6 text-base">
                  Go to Dashboard
                </Button>
              </div>
            )}
          </div>

          {/* Cards Section */}
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <Card className="overflow-hidden border-0">
              <div className="h-2 bg-gradient-to-r from-primary to-accent"></div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl text-primary">Parent Accounts</CardTitle>
                <CardDescription>Primary family account management</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Create and manage a primary financial account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Link and monitor multiple child accounts</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View both parent and linked child account details</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-primary mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Comprehensive financial overview for the whole family</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center py-6">
                {!isAuthenticated && (
                  <Button onClick={() => navigate('/register/parent')} size="lg">Register as Parent</Button>
                )}
              </CardFooter>
            </Card>

            <Card className="overflow-hidden border-0">
              <div className="h-2 bg-gradient-to-r from-accent to-accent/70"></div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl text-accent">Child Accounts</CardTitle>
                <CardDescription>Linked dependent accounts</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Personal account linked to a parent account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>View only your own account information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure and separate access from parent account</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-6 w-6 text-accent mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Track your individual balance and account activity</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center py-6">
                {!isAuthenticated && (
                  <Button onClick={() => navigate('/register/child')} variant="outline" size="lg">Register as Child</Button>
                )}
              </CardFooter>
            </Card>
          </div>

          {/* How It Works Section */}
          <div className="max-w-4xl mx-auto bg-white p-10 rounded-3xl shadow-card">
            <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">How It Works</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mr-5 shrink-0">1</div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Create a Parent Account</h3>
                  <p className="text-gray-600 text-lg">Register as a parent to create the main account for your family.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mr-5 shrink-0">2</div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Create Child Accounts</h3>
                  <p className="text-gray-600 text-lg">Register child accounts and link them to your parent account.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-full h-12 w-12 flex items-center justify-center font-bold mr-5 shrink-0">3</div>
                <div>
                  <h3 className="text-xl font-medium mb-2">Manage Family Finances</h3>
                  <p className="text-gray-600 text-lg">As a parent, view and manage all accounts. Children can access only their own accounts.</p>
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
