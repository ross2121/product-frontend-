import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

interface WithAuthProps {
  children?: React.ReactNode;
}

interface DecodedToken {
  role: string;
}

export function withAuth<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  requiredRole: string
): React.FC<T & WithAuthProps> {
  const AuthenticatedComponent = (props: T & WithAuthProps) => {
    const router = useRouter();
    const token = typeof window !== 'undefined' ? localStorage.getItem("authtoken") : null;

    useEffect(() => {
      const checkAuth = async () => {
        if (!token) {
          router.push('/login'); // Redirect to login if no token
          return;
        }

        try {
          const decodedToken: DecodedToken = JSON.parse(atob(token.split(".")[1]));
          const userRole = decodedToken.role;

          if (userRole !== requiredRole) {
            alert("You are not authorized to view this page.");
            router.push('/unauthorized'); // Redirect if role doesn't match
          }
        } catch (error) {
          console.error("Error verifying token:", error);
          localStorage.removeItem("authtoken");
          router.push('/login');
        }
      };

      checkAuth();
    }, [router, token, requiredRole]);

    // Render the wrapped component if authorized
    return token ? <WrappedComponent {...(props as T)} /> : null;
  };

  // Set display name for easier debugging
  AuthenticatedComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthenticatedComponent;
}
