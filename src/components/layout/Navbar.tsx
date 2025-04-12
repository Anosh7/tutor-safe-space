
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X, LogOut, User, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-educational-purple flex items-center justify-center">
                <span className="text-white font-bold text-sm">TS</span>
              </div>
              <span className="text-xl font-montserrat font-bold text-educational-purple">
                TutorSafeSpace
              </span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="hover-effect text-gray-700 hover:text-educational-purple px-3 py-2 font-medium">
              Home
            </Link>
            <Link to="/courses" className="hover-effect text-gray-700 hover:text-educational-purple px-3 py-2 font-medium">
              Courses
            </Link>
            <Link to="/about" className="hover-effect text-gray-700 hover:text-educational-purple px-3 py-2 font-medium">
              About
            </Link>
            <Link to="/contact" className="hover-effect text-gray-700 hover:text-educational-purple px-3 py-2 font-medium">
              Contact
            </Link>

            {!isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button variant="outline" onClick={() => navigate('/login')}>
                  Log In
                </Button>
                <Button onClick={() => navigate('/register')}>Sign Up</Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(`/${user?.role}-dashboard`)}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Profile Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="hover-effect text-gray-700 hover:text-educational-purple focus:outline-none"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="hover-effect block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-educational-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover-effect block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-educational-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="hover-effect block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-educational-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover-effect block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-educational-purple"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>

            {!isAuthenticated ? (
              <div className="flex flex-col space-y-2 pt-2">
                <Button variant="outline" onClick={() => {
                  navigate('/login');
                  setMobileMenuOpen(false);
                }}>
                  Log In
                </Button>
                <Button onClick={() => {
                  navigate('/register');
                  setMobileMenuOpen(false);
                }}>
                  Sign Up
                </Button>
              </div>
            ) : (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <Avatar>
                      <AvatarImage src={user?.profileImage || "/placeholder.svg"} alt={user?.name || "User"} />
                      <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium">{user?.name}</div>
                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <a
                    href={`/${user?.role}-dashboard`}
                    className="hover-effect block px-4 py-2 text-base font-medium text-gray-700 hover:text-educational-purple"
                    onClick={() => {
                      navigate(`/${user?.role}-dashboard`);
                      setMobileMenuOpen(false);
                    }}
                  >
                    Dashboard
                  </a>
                  <a
                    href="/profile"
                    className="hover-effect block px-4 py-2 text-base font-medium text-gray-700 hover:text-educational-purple"
                    onClick={() => {
                      navigate('/profile');
                      setMobileMenuOpen(false);
                    }}
                  >
                    Profile Settings
                  </a>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="hover-effect block px-4 py-2 text-base font-medium text-gray-700 hover:text-educational-purple"
                  >
                    Log out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
