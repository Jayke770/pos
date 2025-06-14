import { Categories, Products } from "@/models/collections";
import { dbConnect } from "@/models/dbConnect";
import { AuthOptions } from "@/services/next-auth/auth";
import { Types } from "mongoose";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
const CategorySchema = z.union([
    z.object({
        category: z.string(),
        action: z.literal("create")
    }),
    z.object({
        id: z.string(),
        category: z.string(),
        action: z.literal("update")
    }),
    z.object({
        id: z.string(),
        action: z.literal("delete")
    })
])
export async function POST(req: NextRequest) {
    try {
        const categoryData = CategorySchema.safeParse(await req.json())
        if (!categoryData.success) return NextResponse.json({ status: false, message: "Invalid Category" })
        const session = await getServerSession(AuthOptions);
        if (!session || (session && !["admin", "owner"].includes(session?.user?.role))) return NextResponse.json({ status: false, message: "Invalid User!" })
        await dbConnect()
        if (categoryData.data.action === "create") {
            await Categories.create({ category: categoryData.data.category })
            return NextResponse.json({ status: true, message: "New Category Saved!" })
        }
        if (categoryData.data.action === "update") {
            await Categories.updateOne({ _id: new Types.ObjectId(categoryData.data.id) }, { $set: { category: categoryData.data.category } })
            return NextResponse.json({ status: true, message: "Category Updated!" })
        }
        if (categoryData.data.action === "delete") {
            const hasProduct = await Products.findOne({ categoryId: new Types.ObjectId(categoryData.data.id) })
            if (hasProduct) return NextResponse.json({ status: false, message: "Cannot delete category with existing products." })
            await Categories.deleteOne({ _id: new Types.ObjectId(categoryData.data.id) })
            return NextResponse.json({ status: true, message: "Category Deleted!" })
        }
        return NextResponse.json({ status: false, message: "Invalid Action" })
    } catch (e) {
        return NextResponse.json({ status: false, message: "Server Error", error: e })
    }
}
export async function GET() {
    try {
        const session = await getServerSession(AuthOptions);
        if (!session) return NextResponse.json({ status: false, message: "Invalid User!" })
        await dbConnect()
        const categories = await Categories.find({}, { id: "$_id", category: 1, _id: 0 }, { sort: { _id: -1 } }).lean()
        return NextResponse.json(categories)
    } catch (_) {
        return NextResponse.json([])
    }
}