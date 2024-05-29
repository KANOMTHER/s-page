import Header from '@/components/shared/header';
import { columns } from '@/components/student/timetable/columns';
import Timetable from '@/components/shared/timetable';
import { getTAClass } from '@/model/data/student_data';
import { useAuth } from '@/hooks/auth_provider';
// import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const TATimetable = () => {
	const auth = useAuth();

	const { data, isPending, isError, error } = useQuery({
		queryKey: ['timetable', auth?.user?.id],
		queryFn: () => getTAClass(auth?.user?.id ?? 0, undefined, undefined),
		enabled: !!auth?.user?.id,
	});

	if (isPending) return <div>Loading...</div>;

	if (isError) return <div>Error: {error.message}</div>;

	return (
		<>
			<Header title="Timetable" />
			<Timetable columns={columns} data={data} />
		</>
	);
};

export default TATimetable;
