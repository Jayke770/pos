"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Package } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Item types
const itemTypes = [
	{
		id: "ingredient",
		name: "Ingredient",
		description: "Raw materials for products",
	},
	{
		id: "food",
		name: "Food Item",
		description: "Ready-to-serve food products",
	},
	{ id: "packaging", name: "Packaging", description: "Cups, lids, bags, etc." },
	{
		id: "supply",
		name: "Supply",
		description: "General supplies and equipment",
	},
];

// Common units
const commonUnits = [
	"kg",
	"g",
	"L",
	"ml",
	"pcs",
	"bottles",
	"bags",
	"boxes",
	"loaves",
	"shots",
	"pumps",
	"cups",
	"oz",
	"lbs",
];

// Zod validation schema
const inventorySchema = z.object({
	name: z.string().min(1, "Item name is required"),
	type: z.string().min(1, "Type is required"),
	description: z.string().optional(),
	unit: z.string().min(1, "Unit is required"),
	currentStock: z.number().min(0, "Current stock cannot be negative"),
	maxStock: z.number().min(1, "Maximum stock must be at least 1"),
	lowStockThreshold: z
		.number()
		.min(1, "Low stock threshold must be at least 1"),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

interface EditInventoryDialogProps {
	item: any;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onUpdateItem: (item: any) => void;
}

export function EditInventoryDialog({
	item,
	open,
	onOpenChange,
	onUpdateItem,
}: EditInventoryDialogProps) {
	// Initialize form with React Hook Form
	const form = useForm<InventoryFormData>({
		resolver: zodResolver(inventorySchema),
		defaultValues: {
			name: "",
			type: "",
			description: "",
			unit: "",
			currentStock: 0,
			maxStock: 100,
			lowStockThreshold: 20,
		},
		mode: "onChange",
	});

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = form;

	// Watch form values
	const watchedValues = watch();

	// Update form when item changes
	useEffect(() => {
		if (item && open) {
			reset({
				name: item.name || "",
				type: item.type || "",
				description: item.description || "",
				unit: item.unit || "",
				currentStock: item.stock || 0,
				maxStock: item.maxStock || 100,
				lowStockThreshold: item.lowStockThreshold || 20,
			});
		}
	}, [item, open, reset]);

	// Handle form submission
	const onSubmit = (data: InventoryFormData) => {
		const updatedItem = {
			...item,
			...data,
			stock: data.currentStock,
			status: getStockStatus(data.currentStock, data.lowStockThreshold),
		};

		onUpdateItem(updatedItem);
	};

	// Get stock status
	const getStockStatus = (stock: number, threshold: number) => {
		if (stock === 0) return "out";
		if (stock <= threshold) return "low";
		return "good";
	};

	// Get type name
	const getTypeName = (typeId: string) => {
		const type = itemTypes.find((t) => t.id === typeId);
		return type ? type.name : "Unknown";
	};

	if (!item) return null;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Edit Inventory Item</DialogTitle>
				</DialogHeader>

				<Form {...form}>
					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						{/* Item Type */}
						<FormField
							control={control}
							name="type"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Item Type *</FormLabel>
									<Select onValueChange={field.onChange} value={field.value}>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{itemTypes.map((type) => (
												<SelectItem key={type.id} value={type.id}>
													<div>
														<div className="font-medium">{type.name}</div>
														<div className="text-xs text-muted-foreground">
															{type.description}
														</div>
													</div>
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Item Name */}
						<FormField
							control={control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Item Name *</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g. Coffee Beans - Arabica"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Description */}
						<FormField
							control={control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Optional description or notes about this item"
											className="resize-none"
											rows={3}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						{/* Unit and Current Stock */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={control}
								name="unit"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Unit *</FormLabel>
										<Select onValueChange={field.onChange} value={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select unit" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{commonUnits.map((unit) => (
													<SelectItem key={unit} value={unit}>
														{unit}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="currentStock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Current Stock *</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="0"
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseFloat(e.target.value) || 0)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Max Stock and Low Stock Alert */}
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
							<FormField
								control={control}
								name="maxStock"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Maximum Stock *</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="1"
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseFloat(e.target.value) || 0)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={control}
								name="lowStockThreshold"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Low Stock Alert *</FormLabel>
										<FormControl>
											<Input
												type="number"
												min="1"
												{...field}
												onChange={(e) =>
													field.onChange(Number.parseFloat(e.target.value) || 0)
												}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* Preview */}
						{(watchedValues.name || watchedValues.type) && (
							<div className="space-y-4">
								<h3 className="text-lg font-medium">Preview</h3>
								<Card>
									<CardContent className="p-4">
										<div className="flex items-center gap-4">
											<div className="h-16 w-16 bg-muted rounded-md flex items-center justify-center">
												<Package className="h-8 w-8 text-muted-foreground" />
											</div>
											<div className="flex-1">
												<h4 className="font-medium">
													{watchedValues.name || "Item Name"}
												</h4>
												<p className="text-sm text-muted-foreground">
													{watchedValues.type
														? getTypeName(watchedValues.type)
														: "No type selected"}
												</p>
												{watchedValues.description && (
													<p className="text-xs text-muted-foreground mt-1">
														{watchedValues.description}
													</p>
												)}
											</div>
											<div className="text-right">
												<div className="text-lg font-bold">
													{watchedValues.currentStock || 0}/
													{watchedValues.maxStock || 0}{" "}
													{watchedValues.unit || "units"}
												</div>
												<Badge
													variant="secondary"
													className={
														getStockStatus(
															watchedValues.currentStock || 0,
															watchedValues.lowStockThreshold || 0,
														) === "out"
															? "bg-red-100 text-red-800"
															: getStockStatus(
																		watchedValues.currentStock || 0,
																		watchedValues.lowStockThreshold || 0,
																	) === "low"
																? "bg-yellow-100 text-yellow-800"
																: "bg-green-100 text-green-800"
													}
												>
													{getStockStatus(
														watchedValues.currentStock || 0,
														watchedValues.lowStockThreshold || 0,
													) === "out"
														? "Out of Stock"
														: getStockStatus(
																	watchedValues.currentStock || 0,
																	watchedValues.lowStockThreshold || 0,
																) === "low"
															? "Low Stock"
															: "In Stock"}
												</Badge>
											</div>
										</div>
									</CardContent>
								</Card>
							</div>
						)}

						<div className="flex gap-2 pt-4 border-t">
							<Button
								type="button"
								variant="outline"
								onClick={() => onOpenChange(false)}
								className="flex-1"
							>
								Cancel
							</Button>
							<Button type="submit" className="flex-1" disabled={!isValid}>
								Update Item
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
