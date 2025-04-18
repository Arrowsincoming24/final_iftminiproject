
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ParentAccount, ChildAccount } from '@/services/AccountService';

interface AccountDetailsProps {
  account: ParentAccount | ChildAccount;
  accountType: 'parent' | 'child';
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ account, accountType }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {accountType === 'parent' ? 'Parent Account Details' : 'Child Account Details'}
        </CardTitle>
        <CardDescription>
          View your account information below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Account Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Name:</span>
                  <span className="font-medium">{account.accountName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Account Number:</span>
                  <span className="font-medium">{account.accountNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Balance:</span>
                  <span className="font-bold text-lg text-green-600">
                    {formatCurrency(account.balance)}
                  </span>
                </div>
                {'parentAccountId' in account && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Parent Account ID:</span>
                    <span className="font-medium">{account.parentAccountId}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Audit Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created On (UTC):</span>
                  <span className="font-medium">{formatDate(account.createdAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created On (IST):</span>
                  <span className="font-medium">{formatDate(account.createdAtIST)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated (UTC):</span>
                  <span className="font-medium">{formatDate(account.updatedAt)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated (IST):</span>
                  <span className="font-medium">{formatDate(account.updatedAtIST)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Created By:</span>
                  <span className="font-medium">{account.systemCreated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Updated By:</span>
                  <span className="font-medium">{account.systemUpdated}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountDetails;
