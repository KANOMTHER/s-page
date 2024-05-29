import { Check, ChevronsUpDown } from 'lucide-react';

import { cn } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';

export function Combobox({
	frameworks,
	name,
	disable,
  value,
  setValue
}: {
	frameworks: { value: string; label: string }[];
	name: string;
	disable: boolean;
  value: string;
  setValue: (value: string) => void;
}) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[50%] justify-between"
					disabled={disable}
				>
					{value
						? frameworks.find((framework) => framework.value === value)?.label
						: `Select ${name}`}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[120%] p-0">
				<Command>
					<CommandInput placeholder={`Search ${name}...`} />
					<CommandEmpty>No {name} found.</CommandEmpty>
					<CommandGroup>
            <CommandList>
						{frameworks.map((framework) => (
							<CommandItem
								key={framework.value}
								value={framework.label}
								onSelect={(currentValue) => {
									setValue(currentValue === value ? '' : framework.value);
									setOpen(false);
								}}
							>
								<Check
									className={cn(
										'mr-2 h-4 w-4',
										value === framework.value ? 'opacity-100' : 'opacity-0',
									)}
								/>
								{framework.label}
							</CommandItem>
						))}
            </CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
