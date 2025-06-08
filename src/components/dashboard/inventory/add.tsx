"use client"

import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Package, Coffee, Milk, Droplets, Cake, Sandwich, Cookie, Leaf, Sparkles } from "lucide-react"
import { itemTypes } from "@/lib/config"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import axios from "axios"
import { toast } from "sonner"
import { IApiResponse } from "@/types"
// Inventory categories with icons
const inventoryCategories = [
    { id: "coffee", name: "Coffee", icon: Coffee, type: "ingredient" },
    { id: "tea", name: "Tea", icon: Leaf, type: "ingredient" },
    { id: "dairy", name: "Dairy", icon: Milk, type: "ingredient" },
    { id: "syrups", name: "Syrups", icon: Droplets, type: "ingredient" },
    { id: "sweeteners", name: "Sweeteners", icon: Sparkles, type: "ingredient" },
    { id: "spices", name: "Spices", icon: Sparkles, type: "ingredient" },
    { id: "pastries", name: "Pastries", icon: Cake, type: "food" },
    { id: "bread", name: "Bread", icon: Sandwich, type: "ingredient" },
    { id: "snacks", name: "Snacks", icon: Cookie, type: "food" },
    { id: "supplies", name: "Supplies", icon: Package, type: "packaging" },
]

// Item types


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
]

// Mock suppliers
const suppliers = [
    "Bean Co.",
    "Tea Masters",
    "Fresh Dairy",
    "Plant Milk Co.",
    "Flavor House",
    "Sweet Supply",
    "Local Honey",
    "Spice World",
    "Pack Pro",
    "Bakery Fresh",
    "Supply Central",
    "Eco Packaging",
    "Premium Foods",
]

// Zod validation schema
const inventorySchema = z.object({
    name: z.string().min(1, "Item name is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().optional(),
    unit: z.string().min(1, "Unit is required"),
    currentStock: z
        .number()
        .min(1, "Current stock cannot be negative"),
    maxStock: z
        .number()
        .gt(1, "Maximum stock must be greater than 0"),
    lowStockThreshold: z
        .number()
        .gt(0, "Low stock threshold must be greater than 0"),
})

type InventoryFormData = z.infer<typeof inventorySchema>



export function AddInventoryDialog() {
    const [open, setOpen] = useState(false)
    const [isSubmittingForm, setIsSubmittingForm] = useState<boolean>(false)
    // Initialize form with React Hook Form
    const newInventoryForm = useForm({
        resolver: zodResolver(inventorySchema),
        defaultValues: {
            name: "",
            type: "",
            description: "",
            unit: ""
        },
        mode: "onChange",
    })
    const onToggleIsSubmitting = useCallback(() => setIsSubmittingForm(e => !e), [isSubmittingForm])
    const onAddInventory = (data: InventoryFormData) => {
        onToggleIsSubmitting
        toast.promise(new Promise<string>(async (resolve, reject) => {
            try {
                const response = await axios.post("/api/inventory", { ...data, action: "create" })
                if (response?.status !== 200) reject("Failed to save inventory")
                const result = response.data as IApiResponse
                result?.status ? resolve(result.message) : reject(result.message)
            } catch (e) {
                reject("Something went wrong")
            }
        }), {
            loading: "Saving...",
            error: e => e,
            success: e => {
                return e
            },
            onAutoClose: () => {
                onToggleIsSubmitting
                // state.onUpdateCategory({ action: undefined })
            }
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}  >
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Inventory
                </Button>
            </DialogTrigger>
            <DialogContent className=" max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Inventory Item</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription />
                    </VisuallyHidden>
                </DialogHeader>

                <Form {...newInventoryForm}>
                    <form onSubmit={newInventoryForm.handleSubmit(onAddInventory)} className="space-y-6">
                        {/* Item Type */}
                        <FormField
                            control={newInventoryForm.control}
                            name="type"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Type</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value}>
                                        <FormControl>
                                            <SelectTrigger className=" w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {itemTypes.map((type) => (
                                                <SelectItem key={type.id} value={type.id}>
                                                    {type.name}
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
                            control={newInventoryForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Item Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. Coffee Beans, Cup" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Description */}
                        <FormField
                            control={newInventoryForm.control}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                            <FormField
                                control={newInventoryForm.control}
                                name="currentStock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Stock *</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="0"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value || 0))} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={newInventoryForm.control}
                                name="unit"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unit</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className=" w-full">
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


                        </div>

                        {/* Max Stock and Low Stock Alert */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                                control={newInventoryForm.control}
                                name="maxStock"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Maximum Stock</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value || 0))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={newInventoryForm.control}
                                name="lowStockThreshold"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Low Stock Alert</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min="1"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value || 0))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                            <Button type="submit" className="flex-1" disabled={!newInventoryForm.formState.isValid}>
                                Add to Inventory
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
