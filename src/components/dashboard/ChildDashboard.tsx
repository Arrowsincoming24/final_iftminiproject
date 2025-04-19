import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/components/auth/AuthContext';
import AccountService, { ChildAccount } from '@/services/AccountService';
import AccountDetails from './AccountDetails';

const ChildDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<ChildAccount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchChildAccount = async () => {
      try {
        const response = await AccountService.getChildAccount();
        setAccount(response.data);
      } catch (error) {
        console.error('Error fetching child account:', error);
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

    fetchChildAccount();
  }, [toast]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg">Loading account information...</p>
      </div>
    );
  }

  if (error || !account) {
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user?.fullName || 'Child'}</h1>
          <p className="text-gray-500 mt-1">Here's your account overview</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button variant="outline" className="mr-2">
            Transaction History
          </Button>
          <Button>
            Contact Parent
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Your personal account information</CardDescription>
          </CardHeader>
          <CardContent>
            <AccountDetails account={account} accountType="child" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Balance Summary</CardTitle>
            <CardDescription>Your current financial status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <p className="text-gray-500 mb-2">Current Balance</p>
              <p className="text-4xl font-bold text-green-600">
                {formatCurrency(account.balance)}
              </p>
              <Separator className="my-6" />
              <div className="mt-4">
                <p className="text-gray-500 text-sm mb-1">Account Number</p>
                <p className="font-mono font-medium">{account.accountNumber}</p>
              </div>
              <div className="mt-4">
                <Button variant="outline" className="w-full">
                  View Transactions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-blue-50 border border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800">Child Account Access</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-blue-700">
            As a child account holder, you have access to your own account information only. 
            Your parent can view your account details and help you manage your finances.
          </p>
          <div className="mt-4 bg-white p-4 rounded-lg border border-blue-100">
            <p className="font-medium">Parent Account: #{account.parentAccountId}</p>
            <p className="text-sm text-gray-500">This is the parent account your account is linked to.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChildDashboard;
