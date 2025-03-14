
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/avatars', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500" />
    </div>
  );
};

export default AuthCallback;

// const AuthCallback1 = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleAuthCallback = async () => {
//       const { error } = await supabase.auth.getSession();
      
//       if (error) {
//         console.error("Auth callback error:", error);
//         navigate('/sign-in');
//         return;
//       }
      
//       // Redirect to avatars page after successful authentication
//       navigate('/avatars');
//     };

//     handleAuthCallback();
//   }, [navigate]);

//   return (
//     <div className="min-h-screen flex items-center justify-center">
//       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-500" />
//     </div>
//   );
// };

// export default AuthCallback1;

