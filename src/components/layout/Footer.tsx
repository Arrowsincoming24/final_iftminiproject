
const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              &copy; {year} Family Nest Accounts Portal. All rights reserved.
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-primary">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
