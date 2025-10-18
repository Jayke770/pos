"use client";
import { Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { useCallback } from "react";
import { useShallow } from "zustand/react/shallow";
import {
	AddCategory,
	DeleteCategory,
	EditCategory,
} from "@/components/dashboard/categories/dialogs";
import { Button } from "@/components/ui/button";
import { AppLoader } from "@/components/ui/loader";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import useCategories from "@/hooks/dashboard/useCategories";
import { useCategoryState } from "@/hooks/dashboard/useCategoryState";
import { cn } from "@/lib/utils";
import type { ICategory } from "@/types";
export default function Categories() {
	const state = useCategoryState(useShallow((state) => state));
	const {
		mutate: updateCategory,
		categories,
		categoriesLoading,
	} = useCategories();
	const onToggleCategoryModal = useCallback(
		(action: "edit" | "delete", category: ICategory) =>
			state.onUpdateCategory({ action, category }),
		[state],
	);
	return (
		<>
			<div className="space-y-4 sm:space-y-6">
				{/* Header */}
				<div className="bg-card rounded-lg p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
						<div>
							<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
								Categories
							</h1>
							<p className="text-sm sm:text-base text-muted-foreground">
								Create, edit, and organize your product categories
							</p>
						</div>
						<div className="flex gap-2">
							<AddCategory updateCategories={updateCategory} />
						</div>
					</div>
				</div>
				<div className="rounded-lg shadow-sm bg-card p-4">
					{categoriesLoading && (
						<AppLoader className="flex p-4 w-full justify-center items-center col-span-full" />
					)}
					<Table className={cn(categoriesLoading && "hidden")}>
						<TableHeader>
							<TableRow>
								<TableHead>Name</TableHead>
								<TableHead className="text-right px-4">Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{categories?.map((category) => (
								<TableRow key={category.id}>
									<TableCell className="font-medium">
										{category.category}
									</TableCell>
									<TableCell className="text-right">
										<Button
											variant="ghost"
											size="icon"
											asChild
											onClick={() => onToggleCategoryModal("edit", category)}
											className=" cursor-pointer rounded-xl mr-2"
										>
											<motion.button whileTap={{ scale: 0.8 }}>
												<Pencil className="h-4 w-4" />
											</motion.button>
										</Button>
										<Button
											variant="ghost"
											size="icon"
											asChild
											onClick={() => onToggleCategoryModal("delete", category)}
											className=" text-destructive hover:text-destructive active:text-destructive cursor-pointer rounded-xl"
										>
											<motion.button whileTap={{ scale: 0.8 }}>
												<Trash2 className="h-4 w-4" />
											</motion.button>
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
			<EditCategory updateCategories={updateCategory} />
			<DeleteCategory updateCategories={updateCategory} />
		</>
	);
}
