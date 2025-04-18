
import RegisterChildForm from '@/components/auth/RegisterChildForm';
import Layout from '@/components/layout/Layout';

const RegisterChildPage = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <RegisterChildForm />
        </div>
      </div>
    </Layout>
  );
};

export default RegisterChildPage;
