
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChildAccount } from '@/services/AccountService';

interface ChildAccountsListProps {
  childAccounts: ChildAccount[];
}

const ChildAccountsList: React.FC<ChildAccountsListProps> = ({ childAccounts }) => {
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const viewChildAccount = (id: number) => {
    navigate(`/child-account/${id}`);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Child Accounts</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childAccounts.map((account) => (
          <Card key={account.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{account.accountName}</CardTitle>
              <CardDescription>Account #{account.accountNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Balance:</span>
                  <span className="font-bold text-green-600">{formatCurrency(account.balance)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Created:</span>
                  <span>{formatDate(account.createdAt)}</span>
                </div>
                <Button 
                  className="w-full mt-4" 
                  onClick={() => viewChildAccount(account.id)}
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ChildAccountsList;
