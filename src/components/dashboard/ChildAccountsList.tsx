import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Child Accounts</h2>
        <Badge variant="outline" className="px-3 py-1 text-sm bg-blue-50">
          {childAccounts.length} {childAccounts.length === 1 ? 'Account' : 'Accounts'}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {childAccounts.map((account) => (
          <Card key={account.id} className="overflow-hidden border-t-4 border-t-blue-500 hover:shadow-lg transition-all duration-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-white">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{account.accountName}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="font-mono">#{account.accountNumber}</span>
                  </CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                  Active
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-gray-500">Current Balance:</span>
                  <span className="font-bold text-xl text-green-600">{formatCurrency(account.balance)}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Created</p>
                    <p className="font-medium">{formatDate(account.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p className="font-medium">{formatDate(account.updatedAt)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="bg-gray-50 border-t border-gray-100 pt-4">
              <Button 
                className="w-full" 
                onClick={() => viewChildAccount(account.id)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {childAccounts.length > 0 && (
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mt-8">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> As a parent, you have full access to all linked child accounts. You can view their details, monitor balances, and track activities.
          </p>
        </div>
      )}
    </div>
  );
};

export default ChildAccountsList;
