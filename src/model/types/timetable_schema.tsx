import { z } from 'zod';

export const timetableSchema = z.object({
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
