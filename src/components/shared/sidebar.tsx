import { Link, NavLink, Outlet } from 'react-router-dom';
import {
  CircleUser,
  Menu,
  School,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RouteComposite } from '@/utils/routes_composite';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useAuth } from '@/hooks/auth_provider';

const Sidebar = ({ routeNode }: { routeNode: RouteComposite }) => {
  const auth = useAuth();
  return (
    <div className="grid min-h-screen w-full bg-background text-popover-foreground md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <School className="h-6 w-6" />
              S-Portal
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {routeNode.getNode().children.map((child) => (
                <NavLink
                  key={child.path}
                  to={child.path}
                  className={({ isActive, isPending }) => {
                    return `flex items-center gap-2 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground 
                                        ${isPending ? 'bg-muted text-foreground' : isActive ? 'bg-muted text-foreground' : ''}`;
                  }}
                >
                  {child.icon && <child.icon className="h-4 w-4" />}
                  {child.path.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="text-md grid gap-2 font-medium">
                <Link
                  to="#"
                  className="mb-4 flex items-center gap-2 text-lg font-semibold text-popover-foreground"
                >
                  <School className="h-6 w-6" />
                  <span className="">S-portal</span>
                </Link>
                {routeNode.getNode().children.map((child) => (
                  <NavLink
                    key={child.path}
                    to={child.path}
                    className={({ isActive, isPending }) => {
                      return `mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground 
                                                ${isPending ? 'bg-muted text-foreground' : isActive ? 'bg-muted text-foreground' : ''}`;
                    }}
                  >
                    {child.icon && <child.icon className="h-6 w-6" />}
                    {child.path.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={
                () => {
                  auth?.logout();
                }
              }>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
