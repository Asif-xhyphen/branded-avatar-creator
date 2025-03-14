import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const SignOutButton = () => {
  const { signOut } = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={signOut}
      className="text-slate-600 hover:text-slate-900"
    >
      <LogOut className="h-4 w-4 mr-2" />
      Sign Out
    </Button>
  );
};

export default SignOutButton;