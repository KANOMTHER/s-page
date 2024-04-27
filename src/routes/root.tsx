import { ThemeProvider } from '@/components/ui/theme-provider';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AuthProvider from '@/hooks/auth_provider';

const Root = () => {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
				<AuthProvider>
					<Outlet />
				</AuthProvider>
			</ThemeProvider>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
};

export default Root;
