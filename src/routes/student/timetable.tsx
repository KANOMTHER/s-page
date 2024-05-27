import Header from '@/components/header';
import { columns } from '@/components/student/timetable/columns';
import Timetable from '@/components/timetable';
import { getRegisteredClass } from '@/model/data/student_data';
import { useAuth } from '@/hooks/auth_provider';
// import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const STimetable = () => {
	const auth = useAuth();

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
		data,
		isPending,
		isError,
		error,
	} = useQuery({
		queryKey: ['timetable', auth?.user?.id],
		queryFn: () => getRegisteredClass(auth?.user?.id ?? 0, undefined, undefined),
		enabled: !!auth?.user?.id,
	});


	const day_data = Array.from({ length: 7 }, (_, index) => {
		return {
			Day: index,
			Class: [] as {
				CourseCode: string;
				Section: number;
				StartTime: string;
				EndTime: string;
				Classroom: string;
				ClassType: string;
			}[],
		};
	});

	if (isPending) return <div>Loading...</div>;
	
	if (isError) return <div>Error: {error.message}</div>;

	console.log(data)
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data?.map((item: any) => {
		day_data[item.Day].Class.push({
			CourseCode: item.CourseCode,
			Section: item.Section,
			StartTime: new Date(item.StartTime).toLocaleTimeString('th-TH', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }),
			EndTime: new Date(item.EndTime).toLocaleTimeString('th-EN', { hour: 'numeric', minute: '2-digit', timeZone: 'UTC' }),
			Classroom: item.Classroom,
			ClassType: item.ClassType,
		});
	});

	console.log(day_data);

	return (
		<>
			<Header title="Timetable" />
			<Timetable columns={columns} data={day_data} />
		</>
	);
};

export default STimetable;
