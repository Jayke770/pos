import { Dashboard, Inventory, Products } from "@/models/collections";
import { NextResponse } from "next/server";
import dayjs from 'dayjs'
export async function GET() {
    try {
        const [totalItems, ingredients, pakaging, lowStock, outOfStock] = await Promise.all([
            Inventory.estimatedDocumentCount(),
            Inventory.find({ type: "ingredient" }).countDocuments(),
            Inventory.find({ type: "pakaging" }).countDocuments(),
            Inventory.find({ $expr: { $lte: ["$currentStock", "$lowStockThreshold"] } }).countDocuments(),
            Inventory.find({ currentStock: 0 }).countDocuments(),
        ])
        console.log()
        return NextResponse.json({ totalItems, ingredients, pakaging, lowStock, outOfStock })
    } catch (e) {
        return NextResponse.json({})
    }
}