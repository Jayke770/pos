"use client"
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Plus, Trash2, Coffee, Package, AlertCircle, CheckCircle, Search, ChevronsUpDown, Check } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { ResponsiveComboBox } from "@/components/ui/responsive-combobox"
import useCategories from "@/hooks/dashboard/useCategories"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useAddProduct } from "@/hooks/dashboard/useAddProduct"
import { useShallow } from "zustand/react/shallow"
// Mock data for UI demonstration
const mockCategories = [
    { id: "cat_coffee", category: "Coffee" },
    { id: "cat_tea", category: "Tea" },
    { id: "cat_pastries", category: "Pastries" },
    { id: "cat_sandwiches", category: "Sandwiches" },
    { id: "cat_beverages", category: "Beverages" },
    { id: "cat_snacks", category: "Snacks" },
]

const mockIngredients = [
    { id: "ing_coffee_beans", name: "Coffee Beans", unit: "g", stock: 5000 },
    { id: "ing_milk", name: "Milk", unit: "ml", stock: 10000 },
    { id: "ing_sugar", name: "Sugar", unit: "g", stock: 8000 },
    { id: "ing_chocolate_syrup", name: "Chocolate Syrup", unit: "ml", stock: 2000 },
    { id: "ing_caramel_syrup", name: "Caramel Syrup", unit: "ml", stock: 1500 },
    { id: "ing_vanilla_extract", name: "Vanilla Extract", unit: "ml", stock: 1000 },
    { id: "ing_whipped_cream", name: "Whipped Cream", unit: "g", stock: 3000 },
    { id: "ing_cinnamon", name: "Cinnamon", unit: "g", stock: 500 },
    { id: "ing_tea_leaves", name: "Tea Leaves", unit: "g", stock: 2000 },
    { id: "ing_honey", name: "Honey", unit: "ml", stock: 1200 },
]

const mockPackaging = [
    { id: "pkg_small_cup", name: "Small Cup (8oz)", stock: 500 },
    { id: "pkg_medium_cup", name: "Medium Cup (12oz)", stock: 400 },
    { id: "pkg_large_cup", name: "Large Cup (16oz)", stock: 300 },
    { id: "pkg_paper_bag", name: "Paper Bag", stock: 600 },
    { id: "pkg_box", name: "Box", stock: 200 },
    { id: "pkg_takeaway_cup", name: "Takeaway Cup", stock: 350 },
]

// Mock add-ons data for search and select
const mockAddons = [
    { id: "addon_extra_shot", name: "Extra Shot", unit: "shot", defaultQuantity: 1, price: 0.75 },
    { id: "addon_decaf", name: "Decaf", unit: "shot", defaultQuantity: 1, price: 0.0 },
    { id: "addon_whipped_cream", name: "Whipped Cream", unit: "pump", defaultQuantity: 1, price: 0.5 },
    { id: "addon_vanilla_syrup", name: "Vanilla Syrup", unit: "pump", defaultQuantity: 1, price: 0.6 },
    { id: "addon_caramel_syrup", name: "Caramel Syrup", unit: "pump", defaultQuantity: 1, price: 0.6 },
    { id: "addon_chocolate_syrup", name: "Chocolate Syrup", unit: "pump", defaultQuantity: 1, price: 0.6 },
    { id: "addon_hazelnut_syrup", name: "Hazelnut Syrup", unit: "pump", defaultQuantity: 1, price: 0.6 },
    { id: "addon_almond_milk", name: "Almond Milk", unit: "ml", defaultQuantity: 200, price: 0.8 },
    { id: "addon_soy_milk", name: "Soy Milk", unit: "ml", defaultQuantity: 200, price: 0.7 },
    { id: "addon_oat_milk", name: "Oat Milk", unit: "ml", defaultQuantity: 200, price: 0.9 },
    { id: "addon_coconut_milk", name: "Coconut Milk", unit: "ml", defaultQuantity: 200, price: 0.8 },
    { id: "addon_extra_hot", name: "Extra Hot", unit: "temp", defaultQuantity: 1, price: 0.0 },
    { id: "addon_iced", name: "Iced", unit: "temp", defaultQuantity: 1, price: 0.0 },
    { id: "addon_half_caff", name: "Half Caff", unit: "shot", defaultQuantity: 1, price: 0.0 },
    { id: "addon_extra_foam", name: "Extra Foam", unit: "amount", defaultQuantity: 1, price: 0.0 },
    { id: "addon_no_foam", name: "No Foam", unit: "amount", defaultQuantity: 1, price: 0.0 },
    { id: "addon_cinnamon_powder", name: "Cinnamon Powder", unit: "sprinkle", defaultQuantity: 1, price: 0.25 },
    { id: "addon_nutmeg", name: "Nutmeg", unit: "sprinkle", defaultQuantity: 1, price: 0.25 },
]

// Zod validation schema
const ingredientSchema = z.object({
    id: z.string().min(1, "Ingredient is required"),
    amount: z.number().min(1, "Amount must be at least 1"),
})

const sizeSchema = z.object({
    size: z.string().min(1, "Size name is required"),
    ingredients: z.array(ingredientSchema).min(1, "At least one ingredient is required"),
    packaging: z.object({
        id: z.string().min(1, "Packaging is required"),
    }),
})

const addonSchema = z.object({
    name: z.string().min(1, "Add-on name is required"),
    unit: z.string().min(1, "Unit is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    totalUsed: z.number().default(0),
})

const productSchema = z.object({
    name: z.string().min(1, "Product name is required"),
    categoryId: z.object({
        id: z.string(),
        category: z.string(),
        totalProducts: z.number()
    }),
    totalSold: z.number().default(0),
})

type ProductFormData = z.infer<typeof productSchema>

interface AddProductDialogProps {
    onAddProduct: (product: any) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
    const { categories } = useCategories()
    const [open, setOpen] = useState(false)
    const addProductState = useAddProduct(useShallow(state => state))

    const addProductForm = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {},
        mode: "onChange",
    })



    // Watch form values for calculations
    const addProductValues = addProductForm.watch()

    // Handle form submission
    const onSubmit = (data: ProductFormData) => {
        // // Create a product object that matches both our form data and what the parent component expects
        //     const newProduct = {
        //         ...data,
        //         // Add fields expected by the parent component for UI display
        //         id: `PRD-${Date.now()}`,
        //         price: calculatePrice(data),
        //         cost: calculateCost(data),
        //         stock: 100, // Default stock
        //         lowStockThreshold: 20, // Default threshold
        //         description: generateDescription(data),
        //         isActive: true,
        //         image: "/placeholder.svg?height=120&width=200",
        //         category: getCategoryName(data.categoryId),
        //     }

        //     onAddProduct(newProduct)
        //     setOpen(false)
        //     resetForm()
    }

    // Generate product description
    const generateDescription = (data: ProductFormData) => {
        return ""
    }

    // Get category name by ID
    const getCategoryName = (categoryId: string) => {
        const category = mockCategories.find((cat) => cat.id === categoryId)
        return category ? category.category : "Unknown Category"
    }



    // Calculate price based on sizes and ingredients (mock calculation)
    const calculatePrice = (data: ProductFormData) => {
        return 0
        // let basePrice = 3.5

        // // Category-based pricing
        // const categoryMultiplier = {
        //     cat_coffee: 1.2,
        //     cat_tea: 1.0,
        //     cat_pastries: 0.8,
        //     cat_sandwiches: 1.5,
        //     cat_beverages: 1.1,
        //     cat_snacks: 0.7,
        // }

        // const multiplier = (categoryMultiplier as any)[data.categoryId] || 1.0
        // basePrice *= multiplier

        // // Size premium
        // const sizePremium = data.sizes.length > 0 ? data.sizes.length * 0.5 : 0

        // // Ingredients cost
        // const ingredientsCost = data.sizes.reduce((total, size) => {
        //     return total + size.ingredients.reduce((sum, ing) => sum + ing.amount * 0.02, 0)
        // }, 0)

        // // Add-ons value
        // const addonsValue = data.addons.length * 0.75

        // return basePrice + sizePremium + ingredientsCost + addonsValue
    }

    // Calculate cost based on ingredients (mock calculation)
    const calculateCost = (data: ProductFormData) => {
        return calculatePrice(data) * 0.35 // 35% of price as cost
    }



    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <VisuallyHidden>
                        <DialogDescription></DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>

                <Form {...addProductForm}>
                    <form onSubmit={addProductForm.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <Tabs defaultValue="basic">
                            <TabsList className="grid grid-cols-2 mb-4 w-full">
                                <TabsTrigger value="basic">
                                    Basic Info
                                </TabsTrigger>
                                <TabsTrigger value="ingredients">
                                    Ingredients
                                </TabsTrigger>
                            </TabsList>

                            {/* Basic Info Tab */}
                            <TabsContent value="basic" className="space-y-4">
                                <div className="flex flex-col gap-4">
                                    <FormField
                                        control={addProductForm.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Product Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter product name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={addProductForm.control}
                                        name="categoryId"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <ResponsiveComboBox
                                                    searchNotFoundText="Category not found"
                                                    searchPlaceholder="Search category"
                                                    triggerComponent={
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                role="combobox"
                                                                className={cn(
                                                                    "min-w-[200px] justify-between",
                                                                    !field.value && "text-muted-foreground"
                                                                )}>
                                                                {field?.value?.category || "Select Category"}
                                                                <ChevronsUpDown className="opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    }>
                                                    {categories?.map(category => (
                                                        <CommandItem
                                                            key={category.id}
                                                            onSelect={() => addProductForm.setValue("categoryId", category)}>
                                                            {category.category}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    category.id === field.value?.id
                                                                        ? "opacity-100"
                                                                        : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </ResponsiveComboBox>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </TabsContent>

                            {/* Ingredients Tab */}
                            <TabsContent value="ingredients" className="space-y-4">
                                <div className=" flex flex-col">
                                    <div className="relative">
                                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            onChange={e => addProductState.onUpdate({ searchIngredients: e.target.value })}
                                            placeholder="Search ingredients..."
                                            className="pl-8"
                                        />
                                    </div>
                                    {/* ingredients list */}
                                    <div className=" flex flex-col mt-2 gap-2">
                                        <Card className="max-h-48 overflow-y-auto py-0">
                                            <CardContent className="p-2">
                                                {addProductState?.searchIngredients && mockIngredients?.filter(e => e.name.toLowerCase().includes((addProductState?.searchIngredients ?? "").toLowerCase())).map(ingredient => (
                                                    <div
                                                        key={ingredient.id}
                                                        className={cn("flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/50")} >
                                                        <div className="flex-1">
                                                            <p className="text-sm font-medium">{ingredient.name}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Stock: {ingredient.stock}
                                                            </p>
                                                        </div>
                                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </CardContent>
                                        </Card>
                                        {(addProductState?.selectedIngredients?.length || 0) <= 0 ? (
                                            <div className="text-center py-6 border-2 border-dashed border-muted rounded-lg">
                                                <Package className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                                <p className="text-sm text-muted-foreground">
                                                    Search and select ingredients for this product
                                                </p>
                                            </div>
                                        ) : (
                                            <>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                        </Tabs>

                        {/* Form Summary */}
                        <div className="bg-muted/50 p-4 rounded-lg hidden space-y-3">
                            <h3 className="font-medium">Product Summary</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                {/* <div className="space-y-2">
                                    <div>
                                        <span className="text-muted-foreground">Name:</span>{" "}
                                        <span className="font-medium">{watchedValues.name || "Not set"}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Category:</span>{" "}
                                        <span className="font-medium">
                                            {watchedValues.categoryId ? getCategoryName(watchedValues.categoryId) : "Not set"}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Sizes:</span>{" "}
                                        <span className="font-medium">{watchedValues.sizes?.filter((s) => s.size).length || "None"}</span>
                                    </div>
                                </div> */}
                                {/* <div className="space-y-2">
                                    <div>
                                        <span className="text-muted-foreground">Add-ons:</span>{" "}
                                        <span className="font-medium">{watchedValues.addons?.filter((a) => a.name).length || "None"}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Est. Price:</span>{" "}
                                        <span className="font-medium text-green-600">${calculatePrice(watchedValues).toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="text-muted-foreground">Est. Cost:</span>{" "}
                                        <span className="font-medium text-orange-600">${calculateCost(watchedValues).toFixed(2)}</span>
                                    </div>
                                </div> */}
                            </div>
                        </div>

                        <div className="flex gap-2 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                                Cancel
                            </Button>
                            <Button type="submit" className="flex-1" disabled={!addProductForm.formState.isValid}>
                                Add Product
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
