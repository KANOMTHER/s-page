import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/auth_provider';

const ProtectedRoute = (props: { children: React.ReactNode, rule: React.ReactNode }) => {
	const auth = useAuth();

	useEffect(
		() => {
      if (!auth?.user) {
        auth?.getUser();
      }
      else if (auth?.user.id === 0  && auth?.user.role === '') {
        auth.logout();
      }
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[auth?.user?.role, auth?.user],
	);

	return <>
  {props.rule}
  {props.children}</>;
};

export default ProtectedRoute;

export const IsRole = (props: { role: React.ReactNode }) => {
  const auth = useAuth();

  if (auth?.user?.role !== props.role) {
    auth?.navigateTo(auth?.user?.role ?? '');
  }
  return <></>;
}
