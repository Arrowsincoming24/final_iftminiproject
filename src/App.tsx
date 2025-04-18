
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/auth/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterParentPage from "./pages/RegisterParentPage";
import RegisterChildPage from "./pages/RegisterChildPage";
import ParentDashboardPage from "./pages/ParentDashboardPage";
import ChildDashboardPage from "./pages/ChildDashboardPage";
import ChildAccountDetailsPage from "./pages/ChildAccountDetailsPage";
import NotFoundPage from "./pages/NotFound";

const App = () => (
  <AuthProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register/parent" element={<RegisterParentPage />} />
          <Route path="/register/child" element={<RegisterChildPage />} />
          
          {/* Parent Only Routes */}
          <Route element={<PrivateRoute allowParent={true} allowChild={false} />}>
            <Route path="/parent-dashboard" element={<ParentDashboardPage />} />
            <Route path="/child-account/:id" element={<ChildAccountDetailsPage />} />
          </Route>
          
          {/* Child Only Routes */}
          <Route element={<PrivateRoute allowParent={false} allowChild={true} />}>
            <Route path="/child-dashboard" element={<ChildDashboardPage />} />
          </Route>
          
          {/* Catch-all for not found */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </AuthProvider>
);

export default App;
