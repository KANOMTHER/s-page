import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { School } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/auth_provider';

const loginSchema = z.object({
	id: z.coerce.number({
		required_error: 'ID is required',
		invalid_type_error: 'ID must be a number',
	}),
	password: z.string().min(3, { message: 'Password must be at least 3 characters' }),
});

const Login = () => {
	const auth = useAuth();

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			id: undefined,
			password: '',
		},
	});

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		console.log(values);
		console.log(auth);
		auth?.login(values);
	};

	useEffect(() => {
		console.log(form.getValues('id'));
		if (String(form.getValues('id')) === ''){
			form.resetField('id');
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [form.getValues('id')])

	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-8 bg-background">
			<span className="flex flex-row items-center gap-2 text-2xl font-bold text-popover-foreground">
				<School className="h-6 w-6" />
				S-portal
			</span>
			<Card className="w-full max-w-sm bg-white/10">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit((values) => {
							onSubmit(values);
						})}
					>
						<CardHeader>
							<CardTitle className="text-center text-2xl">Login</CardTitle>
							<CardDescription className="text-center">
								Both students and teachers could login here !
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="id"
									render={({ field }) => (
										<FormItem>
											<FormLabel>ID</FormLabel>
											<FormControl>
												<Input type="string" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="grid gap-2">
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type="password" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
						<CardFooter>
							<Button className="w-full" type="submit">
								Sign in
							</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</div>
	);
};

export default Login;
