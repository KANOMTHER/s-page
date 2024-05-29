import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card } from '../ui/card';

interface TableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

type TDayData = {
	Day: number;
	Class: {
		CourseCode: string;
		Section: number;
		StartTime: string;
		EndTime: string;
		Classroom: string;
		ClassType: string;
	}[];
};

interface DayData {
	day_data: TDayData[];
	data: Array<unknown>;
	modify_data: TDayData[];
	mapping(): void;
}

class MappingClassToDay implements DayData {
	day_data: TDayData[];
	data: Array<unknown>;
	modify_data: TDayData[];

	constructor(data: Array<unknown>) {
		this.day_data = Array.from({ length: 7 }, (_, index) => {
			return {
				Day: index,
				Class: [] as TDayData['Class'],
			};
		});

		this.data = data;
		this.modify_data = [];
	}

	mapping(): void {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		this.data?.map((item: any) => {
			this.day_data[item.Day].Class.push({
				CourseCode: item.CourseCode,
				Section: item.Section,
				StartTime: new Date(item.StartTime).toLocaleTimeString('th-TH', {
					hour: 'numeric',
					minute: '2-digit',
					timeZone: 'UTC',
				}),
				EndTime: new Date(item.EndTime).toLocaleTimeString('th-EN', {
					hour: 'numeric',
					minute: '2-digit',
					timeZone: 'UTC',
				}),
				Classroom: item.Classroom,
				ClassType: item.ClassType,
			});
		});

		this.modify_data = this.day_data;
	}
}

const Timetable = <TData, TValue>({ columns, data }: TableProps<TData, TValue>) => {
	const mappingComponent = new MappingClassToDay(data);
	mappingComponent.mapping();
	const table = useReactTable({
		data: mappingComponent.modify_data as TData[], // Cast modify_data to TData[]
		columns: columns,
		getCoreRowModel: getCoreRowModel(),
	});
	return (
		<Card className="overflow-hidden bg-muted/30">
			<Table>
				<TableHeader className="bg-muted">
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map((header) => {
								return (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(header.column.columnDef.header, header.getContext())}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								No results.
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</Card>
	);
};

export default Timetable;
