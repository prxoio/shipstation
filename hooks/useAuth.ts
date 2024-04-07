// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserEmail(user.email); // Set the user's email address
        if (pathname.includes('/auth/')) {
          router.push('/');
        }
      } else {
        setIsLoggedIn(false);
        setUserEmail(null); // Clear the email address
        if (!pathname.includes('/auth/')) {
          router.push('/auth/login');
        }
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth, pathname, router]);

  return { isLoggedIn, userEmail }; // Return both isLoggedIn and userEmail
};
