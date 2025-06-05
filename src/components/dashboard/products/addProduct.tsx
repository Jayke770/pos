"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus } from "lucide-react"

const categories = ["Coffee", "Tea", "Pastries", "Sandwiches", "Beverages", "Snacks"]

interface AddProductDialogProps {
    onAddProduct: (product: any) => void
}

export function AddProductDialog({ onAddProduct }: AddProductDialogProps) {
    const [open, setOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        cost: "",
        stock: "",
        lowStockThreshold: "",
        description: "",
        isActive: true,
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const newProduct = {
            id: `PRD-${Date.now()}`,
            name: formData.name,
            category: formData.category,
            price: Number.parseFloat(formData.price),
            cost: Number.parseFloat(formData.cost),
            stock: Number.parseInt(formData.stock),
            lowStockThreshold: Number.parseInt(formData.lowStockThreshold),
            description: formData.description,
            isActive: formData.isActive,
            image: "/placeholder.svg?height=120&width=200",
        }

        onAddProduct(newProduct)
        setOpen(false)
        setFormData({
            name: "",
            category: "",
            price: "",
            cost: "",
            stock: "",
            lowStockThreshold: "",
            description: "",
            isActive: true,
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <Label htmlFor="name">Product Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="category">Category</Label>
                            <Select
                                value={formData.category}
                                onValueChange={(value) => setFormData({ ...formData, category: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
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
                            <Label htmlFor="price">Price ($)</Label>
                            <Input
                                id="price"
                                type="number"
                                step="0.01"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="cost">Cost ($)</Label>
                            <Input
                                id="cost"
                                type="number"
                                step="0.01"
                                value={formData.cost}
                                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="stock">Stock Quantity</Label>
                            <Input
                                id="stock"
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="threshold">Low Stock Alert</Label>
                            <Input
                                id="threshold"
                                type="number"
                                value={formData.lowStockThreshold}
                                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                                required
                            />
                        </div>

                        <div className="col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                rows={3}
                            />
                        </div>

                        <div className="col-span-2 flex items-center space-x-2">
                            <Switch
                                id="active"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                            />
                            <Label htmlFor="active">Active Product</Label>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
                            Cancel
                        </Button>
                        <Button type="submit" className="flex-1">
                            Add Product
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
