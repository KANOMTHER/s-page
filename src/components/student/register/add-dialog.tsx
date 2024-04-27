import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';

export function AddCourseDialog() {

  const handleSubmit = () => {
    // Add course to schedule
  };

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="flex w-fit gap-2 self-end">
					<PlusCircle />
					Add Course
				</Button>
			</DialogTrigger>
			<DialogContent className="text-popover-foreground sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add Course</DialogTitle>
					<DialogDescription>Select Course and Section to add to your schedule.</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Course
						</Label>
						<Input id="name" className="col-span-3" />
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="username" className="text-right">
							Section
						</Label>
						<Input id="username" className="col-span-3" />
					</div>
				</div>
				<DialogFooter>
					<DialogClose>
						<Button
							type="submit"
							onClick={() => handleSubmit()}
						>
							Submit
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
