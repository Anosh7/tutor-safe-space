
import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  BookOpen, 
  Calendar, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  LogOut,
  Menu,
  X,
  Users,
  Settings,
  BarChart,
  User
} from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define navigation links based on user role
  const getNavigationLinks = () => {
    if (user?.role === "student") {
      return [
        { name: "Dashboard", icon: <Home className="w-5 h-5 mr-3" />, href: "/student-dashboard" },
        { name: "Courses", icon: <BookOpen className="w-5 h-5 mr-3" />, href: "/student-dashboard/courses" },
        { name: "Sessions", icon: <Calendar className="w-5 h-5 mr-3" />, href: "/student-dashboard/sessions" },
        { name: "Homework", icon: <FileText className="w-5 h-5 mr-3" />, href: "/student-dashboard/homework" },
        { name: "Payments", icon: <CreditCard className="w-5 h-5 mr-3" />, href: "/student-dashboard/payments" },
        { name: "Tickets", icon: <MessageSquare className="w-5 h-5 mr-3" />, href: "/student-dashboard/tickets" }
      ];
    } else if (user?.role === "teacher") {
      return [
        { name: "Dashboard", icon: <Home className="w-5 h-5 mr-3" />, href: "/teacher-dashboard" },
        { name: "Students", icon: <Users className="w-5 h-5 mr-3" />, href: "/teacher-dashboard/students" },
        { name: "Sessions", icon: <Calendar className="w-5 h-5 mr-3" />, href: "/teacher-dashboard/sessions" },
        { name: "Homework", icon: <FileText className="w-5 h-5 mr-3" />, href: "/teacher-dashboard/homework" },
        { name: "Earnings", icon: <CreditCard className="w-5 h-5 mr-3" />, href: "/teacher-dashboard/earnings" },
        { name: "Tickets", icon: <MessageSquare className="w-5 h-5 mr-3" />, href: "/teacher-dashboard/tickets" }
      ];
    } else if (user?.role === "admin") {
      return [
        { name: "Dashboard", icon: <Home className="w-5 h-5 mr-3" />, href: "/admin-dashboard" },
        { name: "Users", icon: <Users className="w-5 h-5 mr-3" />, href: "/admin-dashboard/users" },
        { name: "Courses", icon: <BookOpen className="w-5 h-5 mr-3" />, href: "/admin-dashboard/courses" },
        { name: "Sessions", icon: <Calendar className="w-5 h-5 mr-3" />, href: "/admin-dashboard/sessions" },
        { name: "Finances", icon: <CreditCard className="w-5 h-5 mr-3" />, href: "/admin-dashboard/finances" },
        { name: "Tickets", icon: <MessageSquare className="w-5 h-5 mr-3" />, href: "/admin-dashboard/tickets" },
        { name: "Analytics", icon: <BarChart className="w-5 h-5 mr-3" />, href: "/admin-dashboard/analytics" },
        { name: "Settings", icon: <Settings className="w-5 h-5 mr-3" />, href: "/admin-dashboard/settings" }
      ];
    } else {
      return [];
    }
  };

  const navigationLinks = getNavigationLinks();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="w-64 flex flex-col">
          {/* Sidebar component */}
          <div className="flex flex-col h-0 flex-1 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <div className="w-8 h-8 rounded-full bg-educational-purple flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <span className="ml-2 text-xl font-montserrat font-bold text-educational-purple">
                  TutorSafeSpace
                </span>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                {navigationLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                    }}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md hover-effect hover:bg-gray-50 hover:text-educational-purple text-gray-600"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={handleLogout}
                className="flex-shrink-0 group block w-full flex items-center text-sm font-medium rounded-md hover-effect hover:bg-gray-50 hover:text-educational-purple text-gray-600 px-2 py-2"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 px-4 py-2 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-600 hover:text-educational-purple focus:outline-none"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <div className="ml-3 flex items-center">
            <div className="w-8 h-8 rounded-full bg-educational-purple flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="ml-2 text-xl font-montserrat font-bold text-educational-purple">
              TutorSafeSpace
            </span>
          </div>
        </div>
        <div>
          <Avatar className="h-8 w-8" onClick={() => navigate('/profile')}>
            <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Mobile sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-20 flex md:hidden">
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
            <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
              <div className="flex-shrink-0 flex items-center px-4">
                <div className="w-8 h-8 rounded-full bg-educational-purple flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <span className="ml-2 text-xl font-montserrat font-bold text-educational-purple">
                  TutorSafeSpace
                </span>
              </div>
              <div className="flex-shrink-0 flex border-t border-b border-gray-200 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <Avatar>
                        <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
                        <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                        {user?.name}
                      </p>
                      <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 capitalize">
                        {user?.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <nav className="mt-5 px-2 space-y-1">
                {navigationLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.href);
                      setMobileMenuOpen(false);
                    }}
                    className="group flex items-center px-2 py-2 text-base font-medium rounded-md hover-effect hover:bg-gray-50 hover:text-educational-purple text-gray-600"
                  >
                    {item.icon}
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="flex-shrink-0 group block w-full flex items-center text-base font-medium rounded-md hover-effect hover:bg-gray-50 hover:text-educational-purple text-gray-600 px-2 py-2"
              >
                <LogOut className="w-5 h-5 mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <main className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6">
          <div className="px-4 sm:px-6 md:px-8 mt-14 md:mt-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
