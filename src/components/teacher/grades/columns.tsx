import { ColumnDef } from '@tanstack/react-table';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axfetch from '@/utils/axfetch';
import Swal from 'sweetalert2';

const gradesTableSchema = z.object({
	ID: z.string(),
	FName: z.string(),
	LName: z.string(),
	Grade: z.number().max(4).min(0),
});

export type Grades = z.infer<typeof gradesTableSchema>;

export const columns: ColumnDef<Grades>[] = [
	{
		accessorKey: 'ID',
		header: 'Student ID',
	},
	{
		accessorKey: 'FName',
		header: 'Student Name',
	},
	{
		accessorKey: 'LName',
		header: 'Student Last Name',
	},
	{
		accessorKey: 'Grade',
		header: 'Grade',
		cell: (cell) => {
			let grade: number;
			return (
				<>
					<span className="flex gap-4">
						<Input
							id={cell.row.original.ID}
							placeholder="Grade"
							type="number"
							className="w-24"
							max={4}
							min={0}
							onChange={(e) => {
								grade = Number(e.target.value);
							}}
						/>
						<span className="flex items-center gap-2">/4</span>
						<Button
							onClick={() => {
								axfetch
									.put(`/api/grade/update/${localStorage.getItem('classId')}`, {
										Grade: [grade],
										StudentID: [cell.row.original.ID],
									})
									.then(() => {
										Swal.fire({
											icon: 'success',
											title: 'Success...',
											text: 'Grade updated',
										}).then(() => {
											document.getElementById(cell.row.original.ID)?.setAttribute('disabled', 'true');
										});
									});
							}}
						>
							submit
						</Button>
					</span>
				</>
			);
		},
	},
];
