import Header from '@/components/shared/header';
// import { useAuth } from '@/hooks/auth_provider';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { Combobox } from '@/components/shared/combobox';
import { getClassByYear, getStudentByClass } from '@/model/data/teacher_data';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axfetch from '@/utils/axfetch';
import { KeyIcon } from 'lucide-react';
import { columns } from '@/components/teacher/grades/columns';
import DataTable from '@/components/ui/datatable';


const AddGrade = () => {
	// const auth = useAuth();
	const [year, setYear] = useState<number | undefined>(undefined);
	const [semester, setSemester] = useState<number | undefined>(undefined);
	const [option, setOption] = useState<{ value: string; label: string }[]>([]);
	const [classId, setClassId] = useState<string>('');

	const {
		data: classes,
		isError,
		error,
		refetch: refetchClasses,
	} = useQuery({
		queryKey: ['class', year, semester],
		queryFn: () => getClassByYear(semester, year),
		enabled: false,
	});

	const {
		data: students,
		isError: isGetStudentError,
		error: getStudentError,
		refetch: refetchStudents,
	} = useQuery({
		queryKey: ['students', classId],
		queryFn: () => getStudentByClass(classId),
		enabled: false,
	});

	const onSearchCourse = () => {
		refetchClasses().catch(() => {
			if (isError) {
				Swal.fire({
					icon: 'error',
					title: 'Error...',
					text: error.message,
				});
			}
		});
	};

	const onSearchStudent = () => {
		refetchStudents().catch(() => {
			if (isGetStudentError) {
				Swal.fire({
					icon: 'error',
					title: 'Error...',
					text: getStudentError.message,
				});
			}
		});
	};

	const onInitGrade = () => {
		Swal.fire({
			title: 'Are you sure?',
			text: 'You will not be able to revert this!',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, init all grade!',
			cancelButtonText: 'No, cancel!',
		}).then((result) => {
			if (result.isConfirmed) {
				axfetch.post('/api/grade/initAll', { year: year, semester: semester }).then((res) => {
					Swal.fire({
						icon: 'success',
						title: 'Success...',
						text: res.data.message,
					});
				});
			}
		});
	};

	useEffect(() => {
		setOption(
			classes?.map(
				(item: {
					ID: number;
					Course: {
						CourseCode: string;
						CourseName: string;
					};
					Section: number;
				}) => {
					return {
						label: `${item.Course.CourseCode} - ${item.Course.CourseName} : Sec ${item.Section}`,
						value: `${item.ID}`,
					};
				},
			) || [],
		);
	}, [classes]);

	useEffect(() => {
		localStorage.setItem('classId', classId);
	}, [classId]);

	return (
		<>
			<Header title="Add Student Grade" />
			<span className="flex items-center gap-4">
				<Input
					placeholder="Input Year"
					onChange={(event) => {
						event.target.value ? setYear(parseInt(event.target.value)) : setYear(undefined);
					}}
					className="max-w-52"
				/>
				<Input
					placeholder="Input Semester"
					onChange={(event) => {
						event.target.value ? setSemester(parseInt(event.target.value)) : setSemester(undefined);
					}}
					className="max-w-52"
				/>
				<Button onClick={onSearchCourse} className="max-w-52">
					Search
				</Button>
				<Button
					onClick={onInitGrade}
					className="h-10 w-10 bg-yellow-400"
					disabled={!year || !semester}
				>
					<div className="flex items-center justify-center">
						<KeyIcon />
					</div>
				</Button>
			</span>
			<span className="flex items-center gap-4">
				<Combobox
					name="Class ID"
					frameworks={option}
					disable={classes == undefined}
					value={classId}
					setValue={setClassId}
				/>
				<p hidden={classes !== undefined} className="text-red-400">
					please input year and semester
				</p>
				<span hidden={classes == undefined}>
					<Button onClick={onSearchStudent} className="max-w-52">
						Search
					</Button>
				</span>
			</span>
      <DataTable columns={columns} data={students || []} />
		</>
	);
};

export default AddGrade;
