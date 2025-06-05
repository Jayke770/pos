"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import Image from "next/image"

interface Product {
    id: string
    name: string
    category: string
    price: number
    cost: number
    stock: number
    lowStockThreshold: number
    image: string
    description: string
    isActive: boolean
}

interface ProductCardProps {
    product: Product
    onEdit: (product: Product) => void
    onDelete: (productId: string) => void
    onView: (product: Product) => void
}

export function ProductCard({ product, onEdit, onDelete, onView }: ProductCardProps) {
    const getStockStatus = () => {
        if (product.stock === 0) return { label: "Out of Stock", color: "bg-red-100 text-red-800" }
        if (product.stock <= product.lowStockThreshold)
            return { label: "Low Stock", color: "bg-yellow-100 text-yellow-800" }
        return { label: "In Stock", color: "bg-green-100 text-green-800" }
    }

    const stockStatus = getStockStatus()
    const profit = product.price - product.cost
    const profitMargin = ((profit / product.price) * 100).toFixed(1)

    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-sm sm:text-base truncate">{product.name}</h3>
                            {!product.isActive && (
                                <Badge variant="secondary" className="text-xs">
                                    Inactive
                                </Badge>
                            )}
                        </div>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => onView(product)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEdit(product)}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image
                        width={300}
                        height={300}
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                        <Badge variant="secondary" className={stockStatus.color}>
                            {stockStatus.label}
                        </Badge>
                    </div>

                    <div className="flex justify-between items-baseline gap-2 text-xs">
                        <div>
                            <span className="text-muted-foreground">Cost:</span>
                            <span className="ml-1 font-medium">${product.cost.toFixed(2)}</span>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Margin:</span>
                            <span className="ml-1 font-medium">{profitMargin}%</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground">Stock: {product.stock} units</span>
                        <span className="text-muted-foreground">ID: {product.id}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
