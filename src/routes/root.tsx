import { ThemeProvider } from '@/components/ui/theme-provider';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Outlet />
    </ThemeProvider>
  );
};

export default Root;
