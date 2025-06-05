"use client"
import { useState, useMemo } from "react"
import { ProductsStats } from "@/components/dashboard/products/stats"
import { ProductFilters } from "@/components/dashboard/products/filters"
import { ProductCard } from "@/components/dashboard/products/card"
import { AddProductDialog } from "@/components/dashboard/products/addProduct"
import { Button } from "@/components/ui/button"
import { Download, Grid, List, Package } from "lucide-react"
import { cn } from "@/lib/utils"

const initialProducts = [
    {
        id: "PRD-001",
        name: "Espresso",
        category: "Coffee",
        price: 3.5,
        cost: 1.2,
        stock: 150,
        lowStockThreshold: 20,
        image: "/placeholder.svg?height=120&width=200",
        description: "Rich and bold espresso shot",
        isActive: true,
    },
    {
        id: "PRD-002",
        name: "Cappuccino",
        category: "Coffee",
        price: 4.75,
        cost: 1.8,
        stock: 8,
        lowStockThreshold: 15,
        image: "/placeholder.svg?height=120&width=200",
        description: "Creamy cappuccino with steamed milk",
        isActive: true,
    },
    {
        id: "PRD-003",
        name: "Croissant",
        category: "Pastries",
        price: 3.25,
        cost: 1.5,
        stock: 0,
        lowStockThreshold: 10,
        image: "/placeholder.svg?height=120&width=200",
        description: "Buttery, flaky croissant",
        isActive: true,
    },
    {
        id: "PRD-004",
        name: "Green Tea",
        category: "Tea",
        price: 2.95,
        cost: 0.8,
        stock: 45,
        lowStockThreshold: 15,
        image: "/placeholder.svg?height=120&width=200",
        description: "Organic green tea",
        isActive: true,
    },
    {
        id: "PRD-005",
        name: "Blueberry Muffin",
        category: "Pastries",
        price: 4.5,
        cost: 2.0,
        stock: 25,
        lowStockThreshold: 12,
        image: "/placeholder.svg?height=120&width=200",
        description: "Fresh blueberry muffin",
        isActive: true,
    },
    {
        id: "PRD-006",
        name: "Iced Latte",
        category: "Coffee",
        price: 5.25,
        cost: 2.1,
        stock: 32,
        lowStockThreshold: 20,
        image: "/placeholder.svg?height=120&width=200",
        description: "Refreshing iced latte",
        isActive: true,
    },
    {
        id: "PRD-007",
        name: "Chocolate Chip Cookie",
        category: "Pastries",
        price: 2.75,
        cost: 1.0,
        stock: 18,
        lowStockThreshold: 15,
        image: "/placeholder.svg?height=120&width=200",
        description: "Homemade chocolate chip cookie",
        isActive: true,
    },
    {
        id: "PRD-008",
        name: "Chai Latte",
        category: "Tea",
        price: 4.25,
        cost: 1.6,
        stock: 22,
        lowStockThreshold: 10,
        image: "/placeholder.svg?height=120&width=200",
        description: "Spiced chai latte with steamed milk",
        isActive: true,
    },
]

export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts)
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [filters, setFilters] = useState({
        search: "",
        category: "All Categories",
        status: "All Status",
    })

    // Filter products based on current filters
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const matchesSearch =
                product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                product.description.toLowerCase().includes(filters.search.toLowerCase())

            const matchesCategory = filters.category === "All Categories" || product.category === filters.category

            let matchesStatus = true
            if (filters.status === "In Stock") {
                matchesStatus = product.stock > product.lowStockThreshold
            } else if (filters.status === "Low Stock") {
                matchesStatus = product.stock > 0 && product.stock <= product.lowStockThreshold
            } else if (filters.status === "Out of Stock") {
                matchesStatus = product.stock === 0
            }

            return matchesSearch && matchesCategory && matchesStatus
        })
    }, [products, filters])

    // Calculate stats
    const stats = useMemo(() => {
        const totalProducts = products.filter((p) => p.isActive).length
        const totalValue = products.reduce((sum, p) => sum + p.stock * p.cost, 0)
        const lowStockItems = products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length
        const avgMargin = products.reduce((sum, p) => sum + ((p.price - p.cost) / p.price) * 100, 0) / products.length

        return { totalProducts, totalValue, lowStockItems, avgMargin }
    }, [products])

    // @typescript-eslint/no-explicit-any
    const handleAddProduct = (newProduct: any) => {
        setProducts([...products, newProduct])
    }

    const handleEditProduct = (product: any) => {
        console.log("Edit product:", product)
        // Implement edit functionality
    }

    const handleDeleteProduct = (productId: string) => {
        setProducts(products.filter((p) => p.id !== productId))
    }

    const handleViewProduct = (product: any) => {
        console.log("View product:", product)
        // Implement view functionality
    }

    const handleExportProducts = () => {
        // Create CSV content
        const headers = ["ID", "Name", "Category", "Price", "Cost", "Stock", "Status"]
        const csvContent = [
            headers.join(","),
            ...filteredProducts.map((product) =>
                [
                    product.id,
                    `"${product.name}"`,
                    product.category,
                    product.price,
                    product.cost,
                    product.stock,
                    product.stock === 0 ? "Out of Stock" : product.stock <= product.lowStockThreshold ? "Low Stock" : "In Stock",
                ].join(","),
            ),
        ].join("\n")

        // Download CSV
        const blob = new Blob([csvContent], { type: "text/csv" })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `products-${new Date().toISOString().split("T")[0]}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="bg-card rounded-lg p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Products</h1>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            Manage your coffee shop inventory and pricing
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="h-9 w-9" onClick={handleExportProducts}>
                            <Download className="h-4 w-4" />
                        </Button>
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
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                className="h-9 w-9 rounded-l-none"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                        <AddProductDialog onAddProduct={handleAddProduct} />
                    </div>
                </div>
            </div>

            {/* Stats */}
            <ProductsStats {...stats} />

            {/* Filters */}
            <div className="bg-background rounded-lg p-4 sm:p-6 shadow-sm">
                <ProductFilters
                    onSearchChange={(search) => setFilters({ ...filters, search })}
                    onCategoryChange={(category) => setFilters({ ...filters, category })}
                    onStatusChange={(status) => setFilters({ ...filters, status })}
                    activeFilters={filters}
                />
            </div>

            {/* Products Grid */}
            <div className="bg-background rounded-lg p-4 sm:p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Products ({filteredProducts.length})</h2>
                    {filteredProducts.length > 0 && (
                        <div className="text-sm text-muted-foreground">
                            Showing {filteredProducts.length} of {products.length} products
                        </div>
                    )}
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No products found</h3>
                        <p className="text-muted-foreground mb-4">
                            {filters.search || filters.category !== "All Categories" || filters.status !== "All Status"
                                ? "Try adjusting your filters to see more products."
                                : "Get started by adding your first product."}
                        </p>
                        {!filters.search && filters.category === "All Categories" && filters.status === "All Status" && (
                            <AddProductDialog onAddProduct={handleAddProduct} />
                        )}
                    </div>
                ) : (
                    <div className={cn("grid gap-4", `${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`)}>
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onEdit={handleEditProduct}
                                onDelete={handleDeleteProduct}
                                onView={handleViewProduct}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
