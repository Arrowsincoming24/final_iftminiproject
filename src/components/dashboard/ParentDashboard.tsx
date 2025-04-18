
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AccountService, { ParentAccount, ChildAccount, ParentDashboardData } from '@/services/AccountService';
import AccountDetails from './AccountDetails';
import ChildAccountsList from './ChildAccountsList';

const ParentDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<ParentDashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchParentAccount = async () => {
      try {
        const response = await AccountService.getParentAccount();
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching parent account:', error);
        setError('Failed to load account information');
        toast({
          variant: "destructive",
          title: 'Error',
          description: 'Failed to load account information',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchParentAccount();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading account information...</p>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-lg mb-4">{error || 'Something went wrong'}</p>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Parent Dashboard</h1>
      
      <Tabs defaultValue="parent-account" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="parent-account">My Account</TabsTrigger>
          <TabsTrigger value="child-accounts">Child Accounts ({dashboardData.childAccounts.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parent-account" className="mt-6">
          <AccountDetails account={dashboardData.parentAccount} accountType="parent" />
        </TabsContent>
        
        <TabsContent value="child-accounts" className="mt-6">
          {dashboardData.childAccounts.length > 0 ? (
            <ChildAccountsList childAccounts={dashboardData.childAccounts} />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Child Accounts</CardTitle>
                <CardDescription>
                  You don't have any child accounts linked to your parent account yet.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  To add a child account, please register a new child user and link it to your parent account.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ParentDashboard;
