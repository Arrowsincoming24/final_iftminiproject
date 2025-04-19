import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import AuthService, { SignupRequest } from '@/services/AuthService';
import axios from 'axios';

interface RegisterChildFormInputs extends SignupRequest {
  confirmPassword: string;
}

interface ParentAccountOption {
  id: number;
  accountNumber: string;
  accountName: string;
}

const RegisterChildForm = () => {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<RegisterChildFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [parentAccounts, setParentAccounts] = useState<ParentAccountOption[]>([]);
  const [isLoadingParents, setIsLoadingParents] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const password = watch('password', '');

  useEffect(() => {
    const fetchParentAccounts = async () => {
      try {
        // Call the public endpoint that lists available parent accounts
        const response = await axios.get('http://localhost:8081/api/accounts/parents/available');
        if (response.data && Array.isArray(response.data)) {
          setParentAccounts(response.data);
          setLoadError(null);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching parent accounts:', error);
        setLoadError('Failed to load parent accounts. Please try again later or contact support.');
        // Don't set fallback mock data in production - show the error instead
        setParentAccounts([]);
      } finally {
        setIsLoadingParents(false);
      }
    };

    fetchParentAccounts();
  }, []);

  const onSubmit = async (data: RegisterChildFormInputs) => {
    setIsLoading(true);
    
    const { confirmPassword, ...signupRequest } = data;
    
    try {
      await AuthService.registerChild(signupRequest);
      
      toast({
        title: 'Registration Successful',
        description: 'Your child account has been created! You can now login.',
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: 'Registration Failed',
        description: error.response?.data?.message || 'Failed to create account. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleParentSelect = (parentId: string) => {
    setValue('parentAccountId', Number(parentId));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Register as Child</CardTitle>
        <CardDescription>
          Create a new child account linked to a parent account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              placeholder="Enter your full name"
              {...register('fullName', { required: 'Full name is required' })}
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Choose a username"
              {...register('username', { 
                required: 'Username is required',
                minLength: { value: 3, message: 'Username must be at least 3 characters' } 
              })}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email', { 
                required: 'Email is required',
                pattern: { 
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                } 
              })}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="parentAccountId">Parent Account</Label>
            {loadError && (
              <p className="text-sm text-amber-600 mb-2">{loadError}</p>
            )}
            <Select onValueChange={handleParentSelect} disabled={isLoadingParents}>
              <SelectTrigger>
                <SelectValue placeholder={isLoadingParents ? "Loading accounts..." : "Select a parent account"} />
              </SelectTrigger>
              <SelectContent>
                {isLoadingParents ? (
                  <SelectItem value="loading" disabled>Loading parent accounts...</SelectItem>
                ) : parentAccounts.length > 0 ? (
                  parentAccounts.map(account => (
                    <SelectItem key={account.id} value={account.id.toString()}>
                      {account.accountName} ({account.accountNumber})
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="none" disabled>No parent accounts available</SelectItem>
                )}
              </SelectContent>
            </Select>
            <input type="hidden" {...register('parentAccountId', { required: 'Parent account is required' })} />
            {errors.parentAccountId && (
              <p className="text-sm text-red-500">{errors.parentAccountId.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create a password"
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' } 
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              {...register('confirmPassword', { 
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match' 
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register Child Account'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="link" onClick={() => navigate('/login')}>
          Already have an account? Login
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RegisterChildForm;
