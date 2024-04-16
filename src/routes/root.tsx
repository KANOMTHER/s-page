import { ThemeProvider } from '@/components/ui/theme-provider';
import { Link } from 'react-router-dom';
import {
	Bell,
	CircleUser,
	Home,
	LineChart,
	Menu,
	Package,
	Package2,
	School,
	Search,
	ShoppingCart,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Root = () => {
	return (
		<ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
			<div className="bg-background text-popover-foreground grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
				<div className="bg-muted/40 hidden border-r md:block">
					<div className="flex h-full max-h-screen flex-col gap-2">
						<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
							<Link to="/" className="flex items-center gap-2 font-semibold">
								<Package2 className="h-6 w-6" />
								<span className="">S-Portal</span>
							</Link>
							<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
								<Bell className="h-4 w-4" />
								<span className="sr-only">Toggle notifications</span>
							</Button>
						</div>
						<div className="flex-1">
							<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
								<Link
									to="#"
									className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
								>
									<Home className="h-4 w-4" />
									Dashboard
								</Link>
								<Link
									to="#"
									className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
								>
									<ShoppingCart className="h-4 w-4" />
									Orders
									<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
										6
									</Badge>
								</Link>
								<Link
									to="#"
									className="bg-muted text-primary hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
								>
									<Package className="h-4 w-4" />
									Products{' '}
								</Link>
								<Link
									to="#"
									className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
								>
									<Users className="h-4 w-4" />
									Customers
								</Link>
								<Link
									to="#"
									className="text-muted-foreground hover:text-primary flex items-center gap-3 rounded-lg px-3 py-2 transition-all"
								>
									<LineChart className="h-4 w-4" />
									Analytics
								</Link>
							</nav>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<header className="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="outline" size="icon" className="shrink-0 md:hidden">
									<Menu className="h-5 w-5" />
								</Button>
							</SheetTrigger>
							<SheetContent side="left" className="flex flex-col">
								<nav className="grid gap-2 text-lg font-medium">
									<Link to="#" className="flex items-center gap-2 text-popover-foreground text-lg font-semibold">
										<School className="h-6 w-6" />
										<span className="">S-portal</span>
									</Link>
									<Link
										to="#"
										className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
									>
										<Home className="h-5 w-5" />
										Dashboard
									</Link>
									<Link
										to="#"
										className="bg-muted text-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
									>
										<ShoppingCart className="h-5 w-5" />
										Orders
										<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
											6
										</Badge>
									</Link>
									<Link
										to="#"
										className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
									>
										<Package className="h-5 w-5" />
										Products
									</Link>
									<Link
										to="#"
										className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
									>
										<Users className="h-5 w-5" />
										Customers
									</Link>
									<Link
										to="#"
										className="text-muted-foreground hover:text-foreground mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2"
									>
										<LineChart className="h-5 w-5" />
										Analytics
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
						<div className="w-full flex-1">
							<form>
								<div className="relative">
									<Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
									<Input
										type="search"
										placeholder="Search products..."
										className="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
									/>
								</div>
							</form>
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
								<DropdownMenuItem>Logout</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</header>
					<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
						<div className="flex items-center">
							<h1 className="text-lg font-semibold md:text-2xl">Inventory</h1>
						</div>
						<div
							className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
							x-chunk="dashboard-02-chunk-1"
						>
							<div className="flex flex-col items-center gap-1 text-center">
								<h3 className="text-2xl font-bold tracking-tight">You have no products</h3>
								<p className="text-muted-foreground text-sm">
									You can start selling as soon as you add a product.
								</p>
								<Button className="mt-4">Add Product</Button>
							</div>
						</div>
					</main>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Root;
