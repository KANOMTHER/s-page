import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';

const sectionSchema = z.object({
    Section: z.number(),
    Course: z.object({
        ID: z.number(),
        CourseCode: z.string(),
        CourseName: z.string(),
        Credit: z.number(),
        Semester: z.number(),
        Year: z.number(),
    }),
});

export type Section = z.infer<typeof sectionSchema>;

export const columns: ColumnDef<Section>[] = [
    {
        accessorKey: 'Course.Semester',
        header: 'Semester',
    },
    {
        accessorKey: 'Course.Year',
        header: 'Year',
    },
    {
        accessorKey: 'Course.CourseCode',
        header: 'Course Code',
    },
    {
        accessorKey: 'Course.CourseName',
        header: 'Course Name',
    },
    {
        accessorKey: 'Section',
        header: 'Section',
    },
    {
        accessorKey: 'Course.Credit',
        header: 'Credit',
    },
];