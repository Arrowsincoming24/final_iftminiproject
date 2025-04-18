
import RegisterParentForm from '@/components/auth/RegisterParentForm';
import Layout from '@/components/layout/Layout';

const RegisterParentPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <RegisterParentForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterParentPage;
