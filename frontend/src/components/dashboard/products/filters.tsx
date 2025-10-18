"use client";

import { Filter, Search, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const categories = [
	"All Categories",
	"Coffee",
	"Tea",
	"Pastries",
	"Sandwiches",
	"Beverages",
	"Snacks",
];

const statusOptions = ["All Status", "In Stock", "Low Stock", "Out of Stock"];

interface ProductFiltersProps {
	onSearchChange: (search: string) => void;
	onCategoryChange: (category: string) => void;
	onStatusChange: (status: string) => void;
	activeFilters: {
		search: string;
		category: string;
		status: string;
	};
}

export function ProductFilters({
	onSearchChange,
	onCategoryChange,
	onStatusChange,
	activeFilters,
}: ProductFiltersProps) {
	const [showFilters, setShowFilters] = useState(false);

	const clearFilters = () => {
		onSearchChange("");
		onCategoryChange("All Categories");
		onStatusChange("All Status");
	};

	const hasActiveFilters =
		activeFilters.search ||
		activeFilters.category !== "All Categories" ||
		activeFilters.status !== "All Status";

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<Input
						placeholder="Search products..."
						value={activeFilters.search}
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-8"
					/>
				</div>
				<div className="flex gap-2">
					<Button
						variant="outline"
						onClick={() => setShowFilters(!showFilters)}
						className="flex items-center gap-2"
					>
						<Filter className="h-4 w-4" />
						Filters
						{hasActiveFilters && (
							<Badge
								variant="secondary"
								className="ml-1 h-5 w-5 rounded-full p-0 text-xs"
							>
								!
							</Badge>
						)}
					</Button>
					{hasActiveFilters && (
						<Button variant="ghost" onClick={clearFilters} size="icon">
							<X className="h-4 w-4" />
						</Button>
					)}
				</div>
			</div>

			{showFilters && (
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 p-4 border rounded-lg bg-muted/50">
					<div>
						<Label className="text-sm font-medium mb-2 block">Category</Label>
						<Select
							value={activeFilters.category}
							onValueChange={onCategoryChange}
						>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{categories.map((category) => (
									<SelectItem key={category} value={category}>
										{category}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div>
						<Label className="text-sm font-medium mb-2 block">
							Stock Status
						</Label>
						<Select value={activeFilters.status} onValueChange={onStatusChange}>
							<SelectTrigger>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								{statusOptions.map((status) => (
									<SelectItem key={status} value={status}>
										{status}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
			)}
		</div>
	);
}
