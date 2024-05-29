import { z } from 'zod';

export const teacherSchema = z.object({
	ID: z.number(),
	FName: z.string(),
	LName: z.string(),
	Email: z.string().email(),
	Phone: z.string(),
  Position: z.string(),
  Faculty: z.object({
    Major: z.string(),
    Department: z.string(),
  })
});

export type Teacher = z.infer<typeof teacherSchema>;
