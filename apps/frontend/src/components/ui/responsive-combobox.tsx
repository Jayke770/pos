import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import type { ReactNode } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from "@/components/ui/command";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/use-mobile";

export function ResponsiveComboBox({
	children,
	triggerComponent,
	searchNotFoundText,
	searchPlaceholder,
}: {
	triggerComponent: ReactNode;
	searchPlaceholder: string;
	searchNotFoundText: string;
	children: ReactNode;
}) {
	const isMobile = useIsMobile();
	return isMobile ? (
		<Drawer>
			<DrawerTrigger asChild>{triggerComponent}</DrawerTrigger>
			<DrawerContent>
				<VisuallyHidden>
					<DrawerHeader>
						<DrawerTitle></DrawerTitle>
						<DrawerDescription></DrawerDescription>
					</DrawerHeader>
				</VisuallyHidden>
				<Command>
					<CommandInput placeholder={searchPlaceholder} className=" h-9" />
					<CommandList>
						<CommandEmpty>{searchNotFoundText}</CommandEmpty>
						<CommandGroup>{children}</CommandGroup>
					</CommandList>
				</Command>
			</DrawerContent>
		</Drawer>
	) : (
		<Popover>
			<PopoverTrigger asChild>{triggerComponent}</PopoverTrigger>
			<PopoverContent side="bottom" className="min-w-[200px] p-0">
				<Command>
					<CommandInput placeholder={searchPlaceholder} className=" h-9" />
					<CommandList>
						<CommandEmpty>{searchNotFoundText}</CommandEmpty>
						<CommandGroup>{children}</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
