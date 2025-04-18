
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/layout/Layout';

const LoginPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <LoginForm />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
