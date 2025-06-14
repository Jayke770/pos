import { Inventory } from "@/models/collections";
import { NextResponse } from "next/server";
export async function GET() {
    const [totalItems, ingredients, pakaging, lowStock, outOfStock] = await Promise.all([
        Inventory.estimatedDocumentCount(),
        Inventory.find({ type: "ingredient" }).countDocuments(),
        Inventory.find({ type: "pakaging" }).countDocuments(),
        Inventory.find({ $expr: { $lte: ["$currentStock", "$lowStockThreshold"] } }).countDocuments(),
        Inventory.find({ currentStock: 0 }).countDocuments(),
    ])
    return NextResponse.json({ totalItems, ingredients, pakaging, lowStock, outOfStock })
}