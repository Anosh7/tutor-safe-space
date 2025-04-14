
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
        // Create a user object without the password for storage
        const { password: _, ...userWithoutPassword } = studentUser;
        // For the User type, we don't need the password
        foundUser = {
          id: studentUser.id,
          name: studentUser.name,
          email: studentUser.email,
          role: studentUser.role,
          profileImage: studentUser.profileImage
        };
      }
    }
    
    // If not found, check dynamically created teachers
    if (!foundUser) {
      const teacherUser = teachers.find(
        t => t.email === email && t.password === password
      );
      
      if (teacherUser) {
        // Create a user object without the password for storage
        const { password: _, ...userWithoutPassword } = teacherUser;
        // For the User type, we don't need the password
        foundUser = {
          id: teacherUser.id,
          name: teacherUser.name,
          email: teacherUser.email,
          role: teacherUser.role,
          profileImage: teacherUser.profileImage
        };
      }
    }
    
    if (foundUser) {
      // Remove password from admin user before storing
      if ('password' in foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem("eduUser", JSON.stringify(userWithoutPassword));
        toast.success(`Welcome back, ${userWithoutPassword.name}!`);
      } else {
        setUser(foundUser as User);
        localStorage.setItem("eduUser", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
      }
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
