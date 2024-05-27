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
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getStudent } from '@/model/data/student_data';
import { useAuth } from '@/hooks/auth_provider';
import { studentSchema } from '@/model/types/student_schema';
import type { Student } from '@/model/types/student_schema';
import { updateStudent } from '@/model/func/student_action';
import Swal from 'sweetalert2';

const StudentProfile = () => {
	const auth = useAuth();
	const queryClient = useQueryClient();

	useEffect(
		() => {
			if (auth?.user?.role !== 'student') {
				auth?.navigateTo(auth?.user?.role ?? '');
			}
			if (!auth?.user) {
				auth?.getUser();
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[auth?.user?.role, auth?.user],
	);

	const {
		data: student,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['student', auth?.user?.id],
		queryFn: () => getStudent(auth?.user?.id || 0),
		enabled: !!auth?.user?.id,
	});

	const mutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: Student }) => updateStudent(id, body),
		onSuccess: (data) => {
			queryClient.setQueryData(['student', auth?.user?.id], data);
		},
		onMutate: () => {
			Swal.fire({
				title: 'Updating ...',
				allowOutsideClick: false,
				allowEscapeKey: false,
				allowEnterKey: false,
				showConfirmButton: false,
				showCancelButton: false,
				showCloseButton: false,
				showLoaderOnConfirm: true,
				backdrop: true,
				didOpen: () => {
					Swal.showLoading();
				},
			});
		},
		onSettled: () => {
			Swal.close();
			Swal.fire({
				title: 'Student Profile Updated',
				text: 'Student profile has been updated successfully',
				icon: 'success',
				showConfirmButton: false,
				showCancelButton: false,
				showCloseButton: false,
				toast: true,
				timer: 2000,
				timerProgressBar: true,
				position: 'top-right',
			})
		}
	});

	const form = useForm<Student>({
		resolver: zodResolver(studentSchema),
	});

	const onSubmit = (values: Student) => {
		console.log(values);
		if (auth?.user?.id) {
			mutation.mutate({ id: auth.user.id, body: values });
		}
	};

	useEffect(() => {
		if (!student) return;
		form.reset({
			...student,
			DOB: new Date(student.DOB).toLocaleString('en-EN', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
			}),
			Entered: new Date(student.Entered).toLocaleString('en-EN', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
			}),
		});
	}, [form, student]);

	if (isPending) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<>
			<Header title="Student Profile" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
					{/* ID */}
					<FormField
						control={form.control}
						name="ID"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Student ID</FormLabel>
								<FormControl>
									<Input placeholder="Student ID" type="number" disabled {...field} />
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
								name="FName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input placeholder="First Name" disabled {...field} />
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
								name="LName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Last Name" disabled {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<span className="flex w-full flex-row flex-wrap items-center gap-4">
						{/* Date of Birth */}
						<span className="min-w-64 flex-1">
							<FormField
								control={form.control}
								name="DOB"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Date of Birth</FormLabel>
										<FormControl>
											<Input type="text" {...field} disabled />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						{/* Email */}
						<span className="min-w-64 flex-1">
							<FormField
								control={form.control}
								name="Email"
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
						{/* Phone */}
						<span className="min-w-64 flex-1 sm:max-w-[49%]">
							<FormField
								control={form.control}
								name="Phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="Phone Number" {...field} />
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
								name="Degree"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Degree</FormLabel>
										<FormControl>
											<Input placeholder="Degree" disabled {...field} />
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
								name="Program.Faculty.Major"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Major</FormLabel>
										<FormControl>
											<Input placeholder="Major" disabled {...field} />
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
								name="Program.Faculty.Department"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Department</FormLabel>
										<FormControl>
											<Input placeholder="Department" disabled {...field} />
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
								name="Program.ProgramName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Program</FormLabel>
										<FormControl>
											<Input placeholder="Program" disabled {...field} />
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
								name="Year"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Year</FormLabel>
										<FormControl>
											<Input type="number" placeholder="Year" disabled {...field} />
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
								name="Entered"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Entered</FormLabel>
										<FormControl>
											<Input type="text" disabled {...field} />
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
								name="Graduated"
								render={() => (
									<FormItem>
										<FormLabel>Graduated</FormLabel>
										<FormControl>
											<Input type="text" disabled value={student.Graduated ?? 'Not Graduate'} />
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
								name="Advisor.FName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advisor First Name</FormLabel>
										<FormControl>
											<Input placeholder="Advisor First Name" disabled {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
						<span className="flex-1">
							<FormField
								control={form.control}
								name="Advisor.LName"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Advisor Last Name</FormLabel>
										<FormControl>
											<Input placeholder="Advisor Last Name" disabled {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</span>
					</span>
					<span className="flex w-full flex-row items-stretch gap-2">
						{/* Revert Button */}
						<Button
							type="button"
							className="flex-1"
							variant="secondary"
							disabled={mutation.isPending}
							onClick={() =>
								form.reset({
									...student,
									DOB: new Date(student.DOB).toLocaleString('en-EN', {
										year: 'numeric',
										month: 'short',
										day: '2-digit',
									}),
									Entered: new Date(student.Entered).toLocaleString('en-EN', {
										year: 'numeric',
										month: 'short',
										day: '2-digit',
									}),
									Graduated: student.Graduated
										? new Date(student.Entered).toLocaleDateString('en-En', {
												year: 'numeric',
												month: 'short',
												day: '2-digit',
											})
										: 'Not Graduate',
								})
							}
						>
							Undo
						</Button>
						{/* Submit Button */}
						<Button type="submit" className="flex-1">
							Update
						</Button>
					</span>
				</form>
			</Form>
		</>
	);
};

export default StudentProfile;
