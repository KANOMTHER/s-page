import Header from '@/components/shared/header';
import { columns } from '@/components/student/grades/columns';
import DataTable from '@/components/ui/datatable';

const data = [
	{
		courseCode: 'CSE-101',
		courseName: 'Introduction to Computer Science',
		credits: '3',
		grade: 3.5,
	},
	{
		courseCode: 'CSE-102',
		courseName: 'Programming Language',
		credits: '3',
		grade: 4,
	},
	{
		courseCode: 'CSE-103',
		courseName: 'Data Structure',
		credits: '3',
		grade: 3.5,
	},
	{
		courseCode: 'CSE-104',
		courseName: 'Algorithm',
		credits: '3',
		grade: 3,
	},
	{
		courseCode: 'CSE-105',
		courseName: 'Operating System',
		credits: '3',
		grade: 3.5,
	},
	{
		courseCode: 'CSE-106',
		courseName: 'Computer Network',
		credits: '3',
		grade: 4,
	},
];



const Grades = () => {
	return (
		<>
			<Header title="Grades" />
			<DataTable columns={columns} data={data} />
		</>
	);
};

export default Grades;
