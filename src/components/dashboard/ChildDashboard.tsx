
import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import AccountService, { ChildAccount } from '@/services/AccountService';
import AccountDetails from './AccountDetails';

const ChildDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<ChildAccount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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
      <h1 className="text-3xl font-bold mb-8">Child Dashboard</h1>
      <AccountDetails account={account} accountType="child" />
    </div>
  );
};

export default ChildDashboard;
