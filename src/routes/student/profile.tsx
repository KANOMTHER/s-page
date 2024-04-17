import Header from '@/components/header';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const studentSchema = z.object({
	id: z.number(),
	programId: z.number(),
	program: z.object({
		faculty: z.object({
			major: z.string(),
			department: z.string(),
		}),
		programname: z.string(),
	}),
	degree: z.string(),
	year: z.number(),
	fName: z.string(),
	lName: z.string(),
	dob: z.string(),
	entered: z.string(),
	graduated: z.string().nullable(),
	email: z.string().email(),
	phone: z.string(),
	advisorId: z.number(),
	advisor: z.object({
		fName: z.string(),
		lName: z.string(),
	}),
});

const StudentProfile = () => {
	const form = useForm<z.infer<typeof studentSchema>>({
		resolver: zodResolver(studentSchema),
	});

	const onSubmit = (values: z.infer<typeof studentSchema>) => {
		console.log(values);
	};

	return (
		<>
			<Header title="Student Profile" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
					{/* ID */}
					<FormField
						control={form.control}
						name="id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Student ID</FormLabel>
								<FormControl>
									<Input placeholder="Student ID" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<span className="flex w-full flex-row items-center gap-4">
						{/* First Name */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="fName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="First Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Last Name */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="lName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Last Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<span className="flex w-full flex-row items-center gap-4">
						{/* Date of Birth */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="dob"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date of Birth</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Email */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<h3 className="my-2 font-bold">Academic Information</h3>
					<span className="flex w-full flex-row flex-wrap items-center gap-4">
						{/* Degree */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="degree"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Degree</FormLabel>
										<FormControl>
											<Input placeholder="Degree" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Major */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="program.faculty.major"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Major</FormLabel>
										<FormControl>
											<Input placeholder="Major" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Department */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="program.faculty.department"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Department</FormLabel>
										<FormControl>
											<Input placeholder="Department" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Program */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="program.programname"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Program</FormLabel>
										<FormControl>
											<Input placeholder="Program" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<span className="flex w-full flex-row items-center gap-4">
						{/* Year */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="year"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Year</FormLabel>
										<FormControl>
											<Input type="number" placeholder="Year" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Entered */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="entered"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Entered</FormLabel>
										<FormControl>
											<Input type="date" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Graduated */}
						<span className="flex flex-1 flex-col space-y-2">
							<FormField
								control={form.control}
								name="entered"
								render={() => (
									<FormItem>
										<FormLabel>Graduated</FormLabel>
										<FormControl>
											<Input type="text" value={'Not Graduate'} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<h3 className="my-2 font-bold">Advisor Information</h3>
					<span className="flex w-full flex-row items-center gap-4">
						{/* Advisor Name */}
						<span className="flex-1">
							<FormField
								control={form.control}
								name="advisor.fName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advisor First Name</FormLabel>
										<FormControl>
											<Input placeholder="Advisor First Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						<span className="flex-1">
							<FormField
								control={form.control}
								name="advisor.lName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advisor Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Advisor Last Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
				</form>
			</Form>
		</>
	);
};

export default StudentProfile;
