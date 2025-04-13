
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
import TeacherStudents from "./pages/teacher/TeacherStudents";
import TeacherSessions from "./pages/teacher/TeacherSessions";
import TeacherHomework from "./pages/teacher/TeacherHomework";
import TeacherEarnings from "./pages/teacher/TeacherEarnings";
import TeacherTickets from "./pages/teacher/TeacherTickets";
import CreateSession from "./pages/teacher/CreateSession";
import StudentDetail from "./pages/teacher/StudentDetail";
import CreateHomework from "./pages/teacher/CreateHomework";
import HomeworkDetail from "./pages/teacher/HomeworkDetail";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminCourses from "./pages/admin/AdminCourses";
import AdminSessions from "./pages/admin/AdminSessions";
import AdminFinances from "./pages/admin/AdminFinances";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";
import CreateUser from "./pages/admin/CreateUser";
import CreateCourse from "./pages/admin/CreateCourse";
import UserDetail from "./pages/admin/UserDetail";
import EditUser from "./pages/admin/EditUser";

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
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/students" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherStudents />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/students/:id" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <StudentDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/sessions" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherSessions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/sessions/create" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <CreateSession />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/homework" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherHomework />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/homework/create" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <CreateHomework />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/homework/:id" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <HomeworkDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/earnings" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherEarnings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher-dashboard/tickets" 
              element={
                <ProtectedRoute allowedRoles={["teacher", "admin"]}>
                  <TeacherTickets />
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
            <Route 
              path="/admin-dashboard/users" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminUsers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/users/create" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateUser />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/users/:id" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <UserDetail />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/users/edit/:id" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <EditUser />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/courses" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminCourses />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/courses/create" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <CreateCourse />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/sessions" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSessions />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/finances" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminFinances />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/tickets" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminTickets />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/analytics" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminAnalytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard/settings" 
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminSettings />
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
