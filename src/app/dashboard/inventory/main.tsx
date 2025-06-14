"use client"
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
import useDashboardStats from "@/hooks/dashboard/useDashboardStats"
import { Skeleton } from "@/components/ui/skeleton"
import { useIsMobile } from "@/hooks/use-mobile"
export default function InventoryPage() {
    const { inventories } = useInventories()
    const { dashboardStats } = useDashboardStats() 
    const isMobile = useIsMobile()
    const [searchTerm, setSearchTerm] = useState("")
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
                            <AddInventoryDialog />
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
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Items</CardTitle>
                        <Package className={`h-4 w-4 text-blue-600`} />
                    </CardHeader>
                    <CardContent>
                        {dashboardStats ? <div className="text-xl sm:text-2xl font-bold">{dashboardStats?.totalItems}</div> : <Skeleton className=" w-12 h-5 sm:h-6" />}
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ingredients</CardTitle>
                        <Coffee className={`h-4 w-4 text-green-600`} />
                    </CardHeader>
                    <CardContent>
                        {dashboardStats ? <div className="text-xl sm:text-2xl font-bold">{dashboardStats?.ingredients}</div> : <Skeleton className=" w-12 h-5 sm:h-6" />}
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
                        <AlertTriangle className={`h-4 w-4 text-orange-600`} />
                    </CardHeader>
                    <CardContent>
                        {dashboardStats ? <div className="text-xl sm:text-2xl font-bold">{dashboardStats?.lowStock}</div> : <Skeleton className=" w-12 h-5 sm:h-6" />}
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
                        <Package className={`h-4 w-4 text-red-600`} />
                    </CardHeader>
                    <CardContent>
                        {dashboardStats ? <div className="text-xl sm:text-2xl font-bold">{dashboardStats?.outOfStock}</div> : <Skeleton className=" w-12 h-5 sm:h-6" />}
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Inventory Items</CardTitle>
                </CardHeader>
                <CardContent>
                    {isMobile ? (
                        <div className="space-y-4">
                            {inventories?.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-medium">{item.name}</span>
                                            <Badge variant="outline" className="text-xs capitalize">
                                                {item.type}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-2">
                                            {item.expiryDate && `Expires: ${new Date(item.expiryDate).toLocaleDateString()}`}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <Progress value={item.stockUsed} max={item.stocks} className="flex-1 h-2" />
                                            <span className="text-sm font-medium">{item.stockUsed} / {item.stocks} {item.unit.toUpperCase()}</span>
                                        </div>
                                    </div>
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
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>
                                                Name
                                            </TableHead>
                                            <TableHead>
                                                Type
                                            </TableHead>
                                            <TableHead>
                                                Stocks
                                            </TableHead>
                                            <TableHead>
                                                Expiry Date
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
                                                        <Progress value={inventory.stockUsed} max={inventory.stocks} className="w-16 h-2" />
                                                        <span className="text-sm font-medium whitespace-nowrap">
                                                            {inventory.stockUsed}/{inventory.stocks} {inventory.unit.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <span className=" text-sm text-center"> {new Date(inventory.expiryDate).toLocaleDateString()}</span>
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
