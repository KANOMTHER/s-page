import Header from '@/components/shared/header';
import { columns } from '@/components/student/register/columns';
import DataTable from '@/components/ui/datatable';
import { AddCourseDialog } from '@/components/student/register/add-dialog';

const section = [
	{
		Section: 1,
		Course: {
			ID: 1,
			CourseCode: 'CSE-101',
			CourseName: 'Introduction to Computer Science',
			Credit: 3,
			Semester: 1,
			Year: 2022,
		},
	},
	{
		Section: 2,
		Course: {
			ID: 1,
			CourseCode: 'CSE-101',
			CourseName: 'Introduction to Computer Science',
			Credit: 3,
			Semester: 1,
			Year: 2022,
		},
	},
	{
		Section: 1,
		Course: {
			ID: 2,
			CourseCode: 'CSE-102',
			CourseName: 'Programming Language',
			Credit: 3,
			Semester: 1,
			Year: 2022,
		},
	},
	{
		Section: 1,
		Course: {
			ID: 3,
			CourseCode: 'CSE-103',
			CourseName: 'Data Structure',
			Credit: 3,
			Semester: 1,
			Year: 2022,
		},
	},
];

const Register = () => {
	return (
		<>
			<Header title="Register" />
			<AddCourseDialog />
			<DataTable columns={columns} data={section} />
		</>
	);
};

export default Register;
