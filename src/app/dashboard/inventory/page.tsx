"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
    Package,
    AlertTriangle,
    TrendingDown,
    Coffee,
    MoreHorizontal,
    Edit,
    Trash2,
    Search,
    Grid,
    List,
    ArrowUpDown,
} from "lucide-react"
import { useMemo, useState } from "react"
import { AddInventoryDialog } from "@/components/dashboard/inventory/add"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import useInventories from "@/hooks/dashboard/useInventory"

const initialInventoryItems = [
    // Coffee & Tea
    {
        id: "inv_001",
        name: "Coffee Beans - Arabica",
        category: "Coffee",
        type: "ingredient",
        stock: 45,
        maxStock: 100,
        unit: "kg",
        status: "low",
        cost: 12.5,
        supplier: "Bean Co.",
    },
    {
        id: "inv_002",
        name: "Coffee Beans - Robusta",
        category: "Coffee",
        type: "ingredient",
        stock: 30,
        maxStock: 80,
        unit: "kg",
        status: "good",
        cost: 10.0,
        supplier: "Bean Co.",
    },
    {
        id: "inv_003",
        name: "Tea Leaves - Earl Grey",
        category: "Tea",
        type: "ingredient",
        stock: 15,
        maxStock: 25,
        unit: "kg",
        status: "good",
        cost: 25.0,
        supplier: "Tea Masters",
    },
    {
        id: "inv_004",
        name: "Green Tea Leaves",
        category: "Tea",
        type: "ingredient",
        stock: 8,
        maxStock: 20,
        unit: "kg",
        status: "low",
        cost: 30.0,
        supplier: "Tea Masters",
    },

    // Dairy & Liquids
    {
        id: "inv_005",
        name: "Whole Milk",
        category: "Dairy",
        type: "ingredient",
        stock: 0,
        maxStock: 50,
        unit: "L",
        status: "out",
        cost: 1.2,
        supplier: "Fresh Dairy",
    },
    {
        id: "inv_006",
        name: "Almond Milk",
        category: "Dairy",
        type: "ingredient",
        stock: 25,
        maxStock: 30,
        unit: "L",
        status: "good",
        cost: 3.5,
        supplier: "Plant Milk Co.",
    },
    {
        id: "inv_007",
        name: "Oat Milk",
        category: "Dairy",
        type: "ingredient",
        stock: 18,
        maxStock: 25,
        unit: "L",
        status: "good",
        cost: 4.0,
        supplier: "Plant Milk Co.",
    },

    // Syrups & Flavorings
    {
        id: "inv_008",
        name: "Vanilla Syrup",
        category: "Syrups",
        type: "ingredient",
        stock: 12,
        maxStock: 20,
        unit: "bottles",
        status: "good",
        cost: 8.5,
        supplier: "Flavor House",
    },
    {
        id: "inv_009",
        name: "Caramel Syrup",
        category: "Syrups",
        type: "ingredient",
        stock: 5,
        maxStock: 20,
        unit: "bottles",
        status: "low",
        cost: 9.0,
        supplier: "Flavor House",
    },
    {
        id: "inv_010",
        name: "Chocolate Syrup",
        category: "Syrups",
        type: "ingredient",
        stock: 14,
        maxStock: 20,
        unit: "bottles",
        status: "good",
        cost: 8.75,
        supplier: "Flavor House",
    },

    // Sweeteners & Spices
    {
        id: "inv_011",
        name: "Sugar",
        category: "Sweeteners",
        type: "ingredient",
        stock: 25,
        maxStock: 30,
        unit: "kg",
        status: "good",
        cost: 2.5,
        supplier: "Sweet Supply",
    },
    {
        id: "inv_012",
        name: "Honey",
        category: "Sweeteners",
        type: "ingredient",
        stock: 8,
        maxStock: 15,
        unit: "kg",
        status: "low",
        cost: 12.0,
        supplier: "Local Honey",
    },
    {
        id: "inv_013",
        name: "Cinnamon Powder",
        category: "Spices",
        type: "ingredient",
        stock: 3,
        maxStock: 5,
        unit: "kg",
        status: "good",
        cost: 15.0,
        supplier: "Spice World",
    },

    // Supplies & Packaging
    {
        id: "inv_014",
        name: "Paper Cups - Small",
        category: "Supplies",
        type: "packaging",
        stock: 150,
        maxStock: 500,
        unit: "pcs",
        status: "low",
        cost: 0.15,
        supplier: "Pack Pro",
    },
    {
        id: "inv_015",
        name: "Paper Cups - Large",
        category: "Supplies",
        type: "packaging",
        stock: 200,
        maxStock: 400,
        unit: "pcs",
        status: "good",
        cost: 0.2,
        supplier: "Pack Pro",
    },
    {
        id: "inv_016",
        name: "Takeaway Lids",
        category: "Supplies",
        type: "packaging",
        stock: 300,
        maxStock: 600,
        unit: "pcs",
        status: "good",
        cost: 0.08,
        supplier: "Pack Pro",
    },

    // Food Items
    {
        id: "inv_017",
        name: "Croissants",
        category: "Pastries",
        type: "food",
        stock: 12,
        maxStock: 20,
        unit: "pcs",
        status: "good",
        cost: 2.5,
        supplier: "Bakery Fresh",
    },
    {
        id: "inv_018",
        name: "Blueberry Muffins",
        category: "Pastries",
        type: "food",
        stock: 8,
        maxStock: 15,
        unit: "pcs",
        status: "low",
        cost: 3.0,
        supplier: "Bakery Fresh",
    },
    {
        id: "inv_019",
        name: "Sandwich Bread",
        category: "Bread",
        type: "ingredient",
        stock: 6,
        maxStock: 10,
        unit: "loaves",
        status: "good",
        cost: 2.0,
        supplier: "Bakery Fresh",
    },
]

export default function InventoryPage() {
    const { inventories } = useInventories()
    const [inventoryItems, setInventoryItems] = useState(initialInventoryItems)
    const [editingItem, setEditingItem] = useState(null)
    const [deletingItem, setDeletingItem] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
    const [sortField, setSortField] = useState<string>("name")
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

    const handleAddItem = (newItem) => {
        setInventoryItems([...inventoryItems, newItem])
    }

    const handleUpdateItem = (updatedItem) => {
        setInventoryItems((items) => items.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
        setEditingItem(null)
    }

    const handleDeleteItem = (itemId) => {
        setInventoryItems((items) => items.filter((item) => item.id !== itemId))
        setDeletingItem(null)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "good":
                return "bg-green-100 text-green-800"
            case "low":
                return "bg-yellow-100 text-yellow-800"
            case "out":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusLabel = (status: string) => {
        switch (status) {
            case "good":
                return "In Stock"
            case "low":
                return "Low Stock"
            case "out":
                return "Out of Stock"
            default:
                return "Unknown"
        }
    }

    const stats = useMemo(() => {
        const totalItems = inventoryItems.length
        const ingredients = inventoryItems.filter((item) => item.type === "ingredient").length
        const lowStockItems = inventoryItems.filter((item) => item.stock > 0 && item.stock <= item.maxStock * 0.2).length
        const outOfStockItems = inventoryItems.filter((item) => item.stock === 0).length
        const totalValue = inventoryItems.reduce((sum, item) => sum + item.stock * item.cost, 0)

        return { totalItems, ingredients, lowStockItems, outOfStockItems, totalValue }
    }, [inventoryItems])

    // Filter and sort inventory items
    const filteredAndSortedItems = useMemo(() => {
        const filtered = inventoryItems.filter(
            (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.supplier.toLowerCase().includes(searchTerm.toLowerCase()),
        )

        // Sort items
        filtered.sort((a, b) => {
            let aValue = a[sortField]
            let bValue = b[sortField]

            // Handle different data types
            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase()
                bValue = bValue.toLowerCase()
            }

            if (sortDirection === "asc") {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
            } else {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
            }
        })

        return filtered
    }, [inventoryItems, searchTerm, sortField, sortDirection])

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const inventoryStats = [
        { title: "Total Items", value: stats.totalItems.toString(), icon: Package, color: "text-blue-600" },
        { title: "Ingredients", value: stats.ingredients.toString(), icon: Coffee, color: "text-green-600" },
        { title: "Low Stock", value: stats.lowStockItems.toString(), icon: AlertTriangle, color: "text-orange-600" },
        { title: "Out of Stock", value: stats.outOfStockItems.toString(), icon: TrendingDown, color: "text-red-600" },
    ]

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="bg-background rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Inventory</h1>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Track and manage your coffee shop inventory
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex border rounded-lg">
                                <Button
                                    variant={viewMode === "grid" ? "default" : "ghost"}
                                    size="icon"
                                    className="h-9 w-9 rounded-r-none"
                                    onClick={() => setViewMode("grid")}
                                >
                                    <Grid className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant={viewMode === "table" ? "default" : "ghost"}
                                    size="icon"
                                    className="h-9 w-9 rounded-l-none"
                                    onClick={() => setViewMode("table")}
                                >
                                    <List className="h-4 w-4" />
                                </Button>
                            </div>
                            <AddInventoryDialog onAddItem={handleAddItem} />
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative max-w-md">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search inventory items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {inventoryStats.map((stat) => (
                    <Card key={stat.title} className="shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Inventory Items</CardTitle>
                        <div className="text-sm text-muted-foreground">
                            {filteredAndSortedItems.length} of {inventoryItems.length} items
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* {viewMode === "table" ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("name")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Name
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("category")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Category
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("type")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Type
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("stock")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Stock
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("status")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Status
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleSort("cost")}
                                                className="h-auto p-0 font-medium hover:bg-transparent"
                                            >
                                                Cost
                                                <ArrowUpDown className="ml-2 h-4 w-4" />
                                            </Button>
                                        </TableHead>
                                        <TableHead className="w-[50px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredAndSortedItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell className="font-medium">{item.name}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell>
                                                <Badge variant="outline" className="text-xs">
                                                    {item.type}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Progress value={(item.stock / item.maxStock) * 100} className="w-16 h-2" />
                                                    <span className="text-sm font-medium whitespace-nowrap">
                                                        {item.stock}/{item.maxStock} {item.unit}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={getStatusColor(item.status)}>
                                                    {getStatusLabel(item.status)}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                ${item.cost}/{item.unit}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => setEditingItem(item)}>
                                                            <Edit className="h-4 w-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => setDeletingItem(item)} className="text-red-600">
                                                            <Trash2 className="h-4 w-4 mr-2" />
                                                            Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                            <div className="space-y-4">
                                {filteredAndSortedItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="font-medium">{item.name}</span>
                                                <Badge variant="secondary" className={getStatusColor(item.status)}>
                                                    {getStatusLabel(item.status)}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs">
                                                    {item.type}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                {item.category} • Supplier: {item.supplier} • Cost: ${item.cost}/{item.unit}
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <Progress value={(item.stock / item.maxStock) * 100} className="flex-1 h-2" />
                                                <span className="text-sm font-medium">
                                                    {item.stock}/{item.maxStock} {item.unit}
                                                </span>
                                            </div>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => setEditingItem(item)}>
                                                    <Edit className="h-4 w-4 mr-2" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => setDeletingItem(item)} className="text-red-600">
                                                    <Trash2 className="h-4 w-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))}
                            </div>
                    )} */}
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort("name")}
                                            className="h-auto p-0 font-medium hover:bg-transparent"
                                        >
                                            Name
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort("type")}
                                            className="h-auto p-0 font-medium hover:bg-transparent"
                                        >
                                            Type
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort("stock")}
                                            className="h-auto p-0 font-medium hover:bg-transparent"
                                        >
                                            Stock
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleSort("status")}
                                            className="h-auto p-0 font-medium hover:bg-transparent"
                                        >
                                            Status
                                            <ArrowUpDown className="ml-2 h-4 w-4" />
                                        </Button>
                                    </TableHead>
                                    <TableHead className="w-[50px]"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {inventories?.map((inventory) => (
                                    <TableRow key={inventory.id}>
                                        <TableCell className="font-medium">{inventory.name}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs capitalize">
                                                {inventory.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={(inventory.currentStock / inventory.maxStock) * 100} className="w-16 h-2" />
                                                <span className="text-sm font-medium whitespace-nowrap">
                                                    {inventory.currentStock.toLocaleString()}/{inventory.maxStock.toLocaleString()} {inventory.unit}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={getStatusColor("good")}>
                                                {getStatusLabel("good")}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {/* ${item.cost}/{item.unit} */}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    {filteredAndSortedItems.length === 0 && (
                        <div className="text-center py-12">
                            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-lg font-medium mb-2">No items found</h3>
                            <p className="text-muted-foreground mb-4">
                                {searchTerm ? `No items match "${searchTerm}"` : "No inventory items available"}
                            </p>
                            {!searchTerm && <AddInventoryDialog onAddItem={handleAddItem} />}
                        </div>
                    )}
                </CardContent>
            </Card>
            {/* Edit Dialog */}
            {/* <EditInventoryDialog
                item={editingItem}
                open={!!editingItem}
                onOpenChange={(open) => !open && setEditingItem(null)}
                onUpdateItem={handleUpdateItem}
            /> */}

            {/* Delete Confirmation Dialog */}
            {/* <AlertDialog open={!!deletingItem} onOpenChange={(open) => !open && setDeletingItem(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete Inventory Item</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{deletingItem?.name}"? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => handleDeleteItem(deletingItem?.id)}
                            className="bg-red-600 hover:bg-red-700"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog> */}
        </div>
    )
}
