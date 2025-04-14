
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { students, teachers } from "@/data/mockData";

// Define user roles
export type UserRole = "student" | "teacher" | "admin" | null;

// Define user interfaces
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profileImage?: string;
  password?: string; // Make password optional in the User interface
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    password: "password123",
    role: "admin" as UserRole,
    profileImage: "/placeholder.svg"
  }
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage on initial load
    const storedUser = localStorage.getItem("eduUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call with delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // First, check static admin users
    let foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    // If not found, check dynamically created students
    if (!foundUser) {
      const studentUser = students.find(
        s => s.email === email && s.password === password
      );
      
      if (studentUser) {
        // For the User type with password included initially
        foundUser = {
          id: studentUser.id,
          name: studentUser.name,
          email: studentUser.email,
          role: studentUser.role,
          profileImage: studentUser.profileImage,
          password: studentUser.password // Include password initially
        };
      }
    }
    
    // If not found, check dynamically created teachers
    if (!foundUser) {
      const teacherUser = teachers.find(
        t => t.email === email && t.password === password
      );
      
      if (teacherUser) {
        // For the User type with password included initially
        foundUser = {
          id: teacherUser.id,
          name: teacherUser.name,
          email: teacherUser.email,
          role: teacherUser.role,
          profileImage: teacherUser.profileImage,
          password: teacherUser.password // Include password initially
        };
      }
    }
    
    if (foundUser && foundUser.name) { // Add null check for foundUser.name
      // Remove password before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem("eduUser", JSON.stringify(userWithoutPassword));
      toast.success(`Welcome back, ${foundUser.name}!`);
    } else {
      toast.error("Invalid email or password");
      throw new Error("Invalid credentials");
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("eduUser");
    toast.info("You have been logged out");
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
