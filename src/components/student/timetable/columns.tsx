import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const timetableSchema = z.object({
	Day: z.number(),
	Class: z.array(
		z.object({
			CourseCode: z.string(),
			Section: z.number(),
			StartTime: z.string(),
			EndTime: z.string(),
			Classroom: z.string(),
			ClassType: z.string(),
		}),
	),
});

export type Timetable = z.infer<typeof timetableSchema>;
type Class = z.infer<typeof timetableSchema>['Class'][0];

// create time array
const time_array = (start: string, end: string, period: number) => {
	const start_time = new Date(`1970-01-01T${start}:00`);
	const end_time = new Date(`1970-01-01T${end}:00`);
	const range = end_time.getTime() - start_time.getTime();
	const time_array = [];

	for (let i = 0; i < period; i++) {
		const time = new Date(start_time.getTime() + (range / period) * i);
		time_array.push(time.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }));
	}
	return time_array;
};

export const columns: ColumnDef<Timetable>[] = [
	{
		header: 'Day',
		cell: (cell) => {
			const day = cell.row.original.Day;
			const day_name = [
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
				'Sunday',
			];
			const day_color = [
				'dark:text-yellow-200 text-yellow-600',
				'dark:text-pink-200 text-pink-600',
				'dark:text-green-200 text-green-600',
				'dark:text-orange-200 text-orange-600',
				'dark:text-blue-200 text-blue-600',
				'dark:text-purple-200 text-purple-600',
				'dark:text-red-200 text-red-600',
			];
			return <span className={`${day_color[day]} `}>{day_name[day]}</span>;
		},
	},
	...time_array('08:00', '18:00', 5).map((time) => {
		return {
			header: time,
			cell: (cell: { row: { original: { Class: Class[] } } }) => {
				const class_ = cell.row.original.Class?.find((class_) => {
					return class_.StartTime == time;
				});
				if (class_) {
					return (
						<div>
							<p>{class_.CourseCode}</p>
							<p>{class_.Classroom}</p>
						</div>
					);
				}
				return <div className="h-10" />;
			},
		};
	}),
];
