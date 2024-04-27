import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const gradesTableSchema = z.object({
  courseCode: z.string(),
  courseName: z.string(),
  credits: z.string(),
  grade: z.number().max(4).min(0),
});

export type Grades = z.infer<typeof gradesTableSchema>;

export const columns: ColumnDef<Grades>[] = [
  {
    accessorKey: 'courseCode',
    header: 'Course Code',
  },
  {
    accessorKey: 'courseName',
    header: 'Course Name',
  },
  {
    accessorKey: 'credits',
    header: 'Credits',
  },
  {
    accessorKey: 'grade',
    header: 'Grade',
  },
];