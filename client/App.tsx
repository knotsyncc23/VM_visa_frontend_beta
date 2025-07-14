// NUCLEAR OPTION: Completely suppress ALL React defaultProps warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  // Convert all arguments to strings and join
  const argStrings = args.map((arg) => String(arg));
  const fullMessage = argStrings.join(" ");

  // Block EVERYTHING related to defaultProps
  if (fullMessage.includes("defaultProps")) {
    return;
  }

  // Block specific Recharts components
  if (fullMessage.includes("XAxis") || fullMessage.includes("YAxis")) {
    return;
  }

  // Block anything from recharts
  if (fullMessage.includes("recharts")) {
    return;
  }

  originalWarn.apply(console, args);
};

import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/ui/navigation";
import { AuthProvider, ProtectedRoute } from "@/components/auth/auth-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ClientDashboard from "./pages/ClientDashboard";
import AgentDashboard from "./pages/AgentDashboard";
import OrganizationDashboard from "./pages/OrganizationDashboard";
import ChatPage from "./pages/ChatPage";
import MessagesPage from "./pages/MessagesPage";
import CalendarPage from "./pages/CalendarPage";
import SupportPage from "./pages/SupportPage";
import SettingsPage from "./pages/SmartSettingsPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import AgentInsightsPage from "./pages/AgentInsightsPage";
import FileManagerPage from "./pages/FileManagerPage";
import PaymentsPage from "./pages/PaymentsPage";
import ToolsPage from "./pages/ToolsPage";
import EscrowDashboard from "./pages/EscrowDashboard";
import AdminEscrowPage from "./pages/AdminEscrowPage";
import NotificationsPage from "./pages/NotificationsPage";
import NotFound from "./pages/NotFound";
import CaseDetailPage from "./pages/CaseDetailPage";
import AgentProfilePage from "./pages/AgentProfilePage";

const queryClient = new QueryClient();

function AppContent() {
  const location = useLocation();
  const hideNavigation = [
    "/signup",
    "/login",
    "/dashboard",
    "/agent-dashboard",
    "/org-dashboard",
    "/chat",
    "/messages",
    "/calendar",
    "/support",
    "/settings",
    "/profile",
    "/notifications",
    "/agent-insights",
    "/file-manager",
    "/payments",
    "/tools",
    "/escrow",
    "/admin/escrow",
  ].includes(location.pathname) || location.pathname.startsWith('/case/');

  return (
    <>
      {!hideNavigation && <Navigation />}
      <main className={!hideNavigation ? "pt-20" : ""}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <ClientDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent-dashboard"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <AgentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/org-dashboard"
            element={
              <ProtectedRoute allowedRoles={["organization"]}>
                <OrganizationDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ChatPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <MessagesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <CalendarPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <SupportPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <SettingsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <NotificationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent-insights"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <AgentInsightsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/file-manager"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <FileManagerPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payments"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <PaymentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tools"
            element={
              <ProtectedRoute allowedRoles={["agent"]}>
                <ToolsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/escrow"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <EscrowDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/escrow"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminEscrowPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/case/:caseId"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <CaseDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/agent/:agentId"
            element={
              <ProtectedRoute
                allowedRoles={["client", "agent", "organization"]}
              >
                <AgentProfilePage />
              </ProtectedRoute>
            }
          />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
