// components/ProtectedRoute.tsx
"use client"
import { useRecoilValue } from 'recoil';
import { authState } from '../atoms/atomauth';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const auth = useRecoilValue(authState);
  const router = useRouter();

  useEffect(() => {
    console.log('Authenticated:', auth.isAuthenticated);
    console.log('User role:', auth.role);
    console.log('Required role:', requiredRole);

    if (!auth.isAuthenticated) {
      router.push('/login'); // Redirect to login if not authenticated
    } else if (auth.role !== requiredRole) {
      router.push('/unauthorized'); // Redirect if user doesn't have required role
    }
  }, [auth, requiredRole, router]);

  if (!auth.isAuthenticated || auth.role !== requiredRole) {
    return null; // or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
