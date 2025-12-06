import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";

import { useState } from "react";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import DashboardPage from "./pages/DashboardPage";
import PaymentStatus from "./pages/PaymentStatusPage";
import PaymentStatus2 from "./pages/PaymentStatus";
import DocumentsPage from "./pages/DocumentsPage";
import IdCardPage from "./pages/IdCard";
import NoticePage from "./pages/NoticePage";
import CertificatePage from "./pages/CertificatePage";
import RegistrationPage from "./pages/RegistrationPage";
import AuthRedirect from "./components/AuthRedirect";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Header from "./components/Header";
import ApplicationsPage from "./pages/ApplicationsPage";
import WorkInProgress from "./components/WorkInProgress";
import Profile from "./pages/StudentProfilePage";

function Layout({ sidebarOpen, setSidebarOpen }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#EDECEC] overflow-hidden">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 p-4 overflow-y-auto space-y-3 ${
          sidebarOpen ? "mt-6 " : "mt-6 md:ml-64"
        } md:mt-0`}
      >
        <Header />
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route path="/" element={<RegistrationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <Layout
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/payment-status" element={<PaymentStatus2 />} />
            <Route path="/payment-status-re" element={<PaymentStatus2 />} />
            <Route path="/documents" element={<DocumentsPage />} />
            <Route path="/certificates" element={<CertificatePage />} />
            <Route path="/id-card" element={<IdCardPage />} />
            <Route path="/notice" element={<NoticePage />} />

            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
