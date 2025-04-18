
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AccountService, { ChildAccount } from '@/services/AccountService';
import AccountDetails from '@/components/dashboard/AccountDetails';
import Layout from '@/components/layout/Layout';

const ChildAccountDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [account, setAccount] = useState<ChildAccount | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChildAccount = async () => {
      if (!id) {
        setError('Invalid account ID');
        setIsLoading(false);
        return;
      }

      try {
        const response = await AccountService.getChildAccountById(Number(id));
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
  }, [id, toast]);

  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg">Loading account information...</p>
        </div>
      </Layout>
    );
  }

  if (error || !account) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-red-500 text-lg mb-4">{error || 'Something went wrong'}</p>
          <Button
            onClick={() => navigate('/parent-dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Child Account Details</h1>
          <Button
            variant="outline"
            onClick={() => navigate('/parent-dashboard')}
          >
            Back to Dashboard
          </Button>
        </div>
        
        <AccountDetails account={account} accountType="child" />
      </div>
    </Layout>
  );
};

export default ChildAccountDetailsPage;
