import Header from '@/components/header';
import { columns } from '@/components/student/timetable/columns';
import Timetable from '@/components/timetable';

const data = [
	{
		CourseCode: 'CSE-101',
		Section: 1,
		Day: 0,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A101',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-102',
		Section: 1,
		Day: 1,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A102',
		ClassType: 'Lecture',
	},
	// {
	// 	CourseCode: 'CSE-103',
	// 	Section: 1,
	// 	Day: 2,
	// 	StartTime: '08:00',
	// 	EndTime: '10:00',
	// 	Classroom: 'A103',
	// 	ClassType: 'Lecture',
	// },
	{
		CourseCode: 'CSE-104',
		Section: 1,
		Day: 3,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A104',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-105',
		Section: 1,
		Day: 4,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A105',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-106',
		Section: 1,
		Day: 5,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A106',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-107',
		Section: 1,
		Day: 6,
		StartTime: '08:00',
		EndTime: '10:00',
		Classroom: 'A107',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-108',
		Section: 1,
		Day: 0,
		StartTime: '10:00',
		EndTime: '12:00',
		Classroom: 'A108',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-109',
		Section: 1,
		Day: 1,
		StartTime: '10:00',
		EndTime: '12:00',
		Classroom: 'A109',
		ClassType: 'Lecture',
	},
];

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

data.forEach((item) => {
	day_data[item.Day].Class.push({
		CourseCode: item.CourseCode,
		Section: item.Section,
		StartTime: item.StartTime,
		EndTime: item.EndTime,
		Classroom: item.Classroom,
		ClassType: item.ClassType,
	});
});

const STimetable = () => {
	return (
		<div>
			<Header title="Timetable" />
			<Timetable columns={columns} data={day_data} />
		</div>
	);
};

export default STimetable;
