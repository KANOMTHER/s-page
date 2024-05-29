import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth_provider';

const ProtectedRoute = (props: { children: React.ReactNode, role: string }) => {
	const auth = useAuth();

	useEffect(
		() => {
      if (!auth?.user) {
        auth?.getUser();
      }
      else if (auth?.user.id === 0  && auth?.user.role === '') {
        auth.logout();
      }
      if (auth?.user?.role !== props.role) {
        auth?.navigateTo(auth?.user?.role ?? '');
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[auth?.user?.role, auth?.user],
	);

	return <>{props.children}</>;
};

export default ProtectedRoute;
