
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name: string;
  credits: number;
  role: "user" | "admin";
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateCredits: (newCredits: number) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check for stored user in localStorage on initial load
    const storedUser = localStorage.getItem("ugc_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
        localStorage.removeItem("ugc_user");
      }
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // In a real app, you would call your API here to verify credentials
      // For demo purposes, we're using mock data
      if (email && password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          credits: 50,
          role: "user"
        };
        
        setUser(mockUser);
        localStorage.setItem("ugc_user", JSON.stringify(mockUser));
        toast.success("Successfully signed in!");
      } else {
        throw new Error("Please provide both email and password");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to sign in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      // In a real app, you would call your API here to create a new user
      // For demo purposes, we're using mock data
      if (email && password && name) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock user creation
        const mockUser: User = {
          id: "user_" + Math.random().toString(36).substr(2, 9),
          email,
          name,
          credits: 10, // New users start with 10 credits
          role: "user"
        };
        
        setUser(mockUser);
        localStorage.setItem("ugc_user", JSON.stringify(mockUser));
        toast.success("Account created successfully!");
      } else {
        throw new Error("Please fill in all required fields");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("ugc_user");
    toast.info("You have been signed out");
  };

  const updateCredits = (newCredits: number) => {
    if (user) {
      const updatedUser = { ...user, credits: newCredits };
      setUser(updatedUser);
      localStorage.setItem("ugc_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, updateCredits }}>
      {children}
    </AuthContext.Provider>
  );
};
