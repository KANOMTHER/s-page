import Header from '@/components/shared/header';
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
import { getTeacher } from '@/model/data/teacher_data';
import { useAuth } from '@/hooks/auth_provider';
import { teacherSchema } from '@/model/types/teacher_schema';
import type { Teacher } from '@/model/types/teacher_schema';
import { updateTeacher } from '@/model/func/teacher_action';
import Swal from 'sweetalert2';

const TeacherProfile = () => {
	const auth = useAuth();
	const queryClient = useQueryClient();

	const {
		data: teacher,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['teacher', auth?.user?.id],
		queryFn: () => getTeacher(auth?.user?.id || 0),
		enabled: !!auth?.user?.id,
	});

	const mutation = useMutation({
		mutationFn: ({ id, body }: { id: number; body: Teacher }) => updateTeacher(id, body),
		onSuccess: (data) => {
			queryClient.setQueryData(['teacher', auth?.user?.id], data);
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
				title: 'Teacher Profile Updated',
				text: 'Teacher profile has been updated successfully',
				icon: 'success',
				showConfirmButton: false,
				showCancelButton: false,
				showCloseButton: false,
				toast: true,
				timer: 2000,
				timerProgressBar: true,
				position: 'top-right',
			});
		},
	});

	const form = useForm<Teacher>({
		resolver: zodResolver(teacherSchema),
	});

	const onSubmit = (values: Teacher) => {
		console.log(values);
		if (auth?.user?.id) {
			mutation.mutate({ id: auth.user.id, body: values });
		}
	};

	useEffect(() => {
		if (!teacher) return;
		form.reset({
			...teacher,
			DOB: new Date(teacher.DOB).toLocaleString('en-EN', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
			}),
			Entered: new Date(teacher.Entered).toLocaleString('en-EN', {
				year: 'numeric',
				month: 'short',
				day: '2-digit',
			}),
		});
	}, [form, teacher]);

	if (isPending) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<>
			<Header title="Teacher Profile" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
					{/* ID */}
					<FormField
						control={form.control}
						name="ID"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Teacher ID</FormLabel>
								<FormControl>
									<Input placeholder="Teacher ID" type="number" disabled {...field} />
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
					<h3 className="my-2 font-bold">DepartMent Information</h3>
					<span className="flex w-full flex-row flex-wrap items-center gap-4">
						{/* Major */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="Faculty.Major"
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
								name="Faculty.Department"
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
						{/* Position */}
						<span className="min-w-56 flex-1">
							<FormField
								control={form.control}
								name="Position"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Position</FormLabel>
										<FormControl>
											<Input placeholder="Position" disabled {...field} />
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
								form.reset({...teacher,})
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

export default TeacherProfile;
