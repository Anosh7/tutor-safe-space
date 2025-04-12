
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Public pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentSessions from "./pages/student/StudentSessions";
import StudentHomework from "./pages/student/StudentHomework";
import StudentPayments from "./pages/student/StudentPayments";
import StudentTickets from "./pages/student/StudentTickets";

// Teacher pages
import TeacherDashboard from "./pages/teacher/TeacherDashboard";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Student Routes */}
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard/courses" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard/sessions" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentSessions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard/homework" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentHomework />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard/payments" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentPayments />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard/tickets" 
              element={
                <ProtectedRoute allowedRoles={["student"]}>
                  <StudentTickets />
                </ProtectedRoute>
              } 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher-dashboard" 
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Admin Routes */}
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
