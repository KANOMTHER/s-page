import { z } from 'zod';

export const studentSchema = z.object({
	ID: z.number(),
	Program: z.object({
		Faculty: z.object({
			Major: z.string(),
			Department: z.string(),
		}),
		ProgramName: z.string(),
	}),
	Degree: z.string(),
	Year: z.number(),
	FName: z.string(),
	LName: z.string(),
	DOB: z.string(),
	Entered: z.string(),
	Graduated: z.string().nullable(),
	Email: z.string().email(),
	Phone: z.string(),
	Advisor: z.object({
		FName: z.string(),
		LName: z.string(),
	}),
});

export type Student = z.infer<typeof studentSchema>;
