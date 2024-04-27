import Header from '@/components/header';
import { columns } from '@/components/student/timetable/columns';
import Timetable from '@/components/timetable';

const data = [
	{
		CourseCode: 'CSE-105',
		Section: 1,
		Day: 4,
		StartTime: '16:00',
		EndTime: '18:00',
		Classroom: 'A105',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-108',
		Section: 1,
		Day: 0,
		StartTime: '14:00',
		EndTime: '16:00',
		Classroom: 'A108',
		ClassType: 'Lecture',
	},
	{
		CourseCode: 'CSE-109',
		Section: 1,
		Day: 1,
		StartTime: '14:00',
		EndTime: '18:00',
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

const TATimetable = () => {
	return (
		<>
			<Header title="Assistance Timetable" />
			<Timetable columns={columns} data={day_data} />
		</>
	);
};

export default TATimetable;
