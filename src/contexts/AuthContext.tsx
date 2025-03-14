
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

type AppUser = {
  id: string;
  email: string;
  name: string;
  credits: number;
  role: "user" | "admin";
};

type AuthContextType = {
  user: AppUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
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
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Convert Supabase user to AppUser
  const formatUser = async (supabaseUser: User): Promise<AppUser> => {
    // Fetch user profile from your profiles table to get additional data
    const { data } = await supabase
      .from('profiles')
      .select('name, credits, role')
      .eq('id', supabaseUser.id)
      .single();
    
    return {
      id: supabaseUser.id,
      email: supabaseUser.email || "",
      name: data?.name || supabaseUser.email?.split('@')[0] || "User",
      credits: data?.credits || 10,
      role: data?.role || "user"
    };
  };

  // Create or update user profile in the database
  const upsertProfile = async (userId: string, name: string, email: string) => {
    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: userId,
        name,
        email,
        credits: 10, // Default credits for new users
        updated_at: new Date().toISOString(),
      });
    
    if (error) {
      console.error("Error upserting profile:", error);
    }
  };

  useEffect(() => {
    // Set up auth state listener when component mounts
    const setupAuthListener = async () => {
      setIsLoading(true);
      
      // Check current auth state
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        try {
          const formattedUser = await formatUser(session.user);
          setUser(formattedUser);
          localStorage.setItem("ugc_user", JSON.stringify(formattedUser));
        } catch (error) {
          console.error("Error formatting user:", error);
          localStorage.removeItem("ugc_user");
        }
      } else {
        setUser(null);
        localStorage.removeItem("ugc_user");
      }
      
      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session) {
            const formattedUser = await formatUser(session.user);
            setUser(formattedUser);
            localStorage.setItem("ugc_user", JSON.stringify(formattedUser));
            toast.success("Successfully signed in!");
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            localStorage.removeItem("ugc_user");
            toast.info("You have been signed out");
          }
        }
      );
      
      setIsLoading(false);
      
      // Cleanup subscription on unmount
      return () => {
        subscription.unsubscribe();
      };
    };
    
    setupAuthListener();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });
      
      if (error) throw error;
      
      if (data.user) {
        await upsertProfile(data.user.id, name, email);
      }
      
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      
      if (error) throw error;
      
    } catch (error: any) {
      toast.error(error.message || "Failed to sign in with Google");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || "Failed to sign out");
    } finally {
      setIsLoading(false);
    }
  };

  const updateCredits = async (newCredits: number) => {
    if (user) {
      try {
        // Update the credits in the database
        const { error } = await supabase
          .from('profiles')
          .update({ credits: newCredits })
          .eq('id', user.id);
        
        if (error) throw error;
        
        // Update the local user state
        const updatedUser = { ...user, credits: newCredits };
        setUser(updatedUser);
        localStorage.setItem("ugc_user", JSON.stringify(updatedUser));
      } catch (error) {
        console.error("Error updating credits:", error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      signIn, 
      signUp, 
      signInWithGoogle, 
      signOut, 
      updateCredits 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
