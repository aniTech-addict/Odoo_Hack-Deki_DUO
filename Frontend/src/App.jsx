import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EquipmentPage from "./pages/Equipment.jsx";
import EquipmentDetailPage from "./pages/EquipmentDetailPage.jsx";
import MaintenancePage from "./pages/Maintenance.jsx";
import MaintenanceDetailPage from "./pages/MaintenanceDetailPage.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import ReportsPage from "./pages/Reports.jsx";
import SettingsPage from "./pages/Settings.jsx";
import Login from "./pages/Login.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import NotFound from "./pages/NotFound.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/equipment" element={<ProtectedRoute><EquipmentPage /></ProtectedRoute>} />
          <Route path="/equipment/:id" element={<ProtectedRoute><EquipmentDetailPage /></ProtectedRoute>} />
          <Route path="/maintenance" element={<ProtectedRoute><MaintenancePage /></ProtectedRoute>} />
          <Route path="/maintenance/:id" element={<ProtectedRoute><MaintenanceDetailPage /></ProtectedRoute>} />
          <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><ReportsPage /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;