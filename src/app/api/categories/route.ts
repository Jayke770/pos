import { Categories } from "@/models/collections";
import { dbConnect } from "@/models/dbConnect";
import { AuthOptions } from "@/services/next-auth/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from 'zod'
const CreateCategorySchema = z.object({
    category: z.string()
})
export async function POST(req: NextRequest) {
    try {
        const newCategory = CreateCategorySchema.safeParse(await req.json())
        if (!newCategory.success) return NextResponse.json({ status: false, message: "Invalid Category" })
        const session = await getServerSession(AuthOptions);
        if (!session || (session && !["admin", "owner"].includes(session?.user?.role))) return NextResponse.json({ status: false, message: "Invalid User!" })
        await dbConnect()
        await Categories.create({ category: newCategory.data.category })
        return NextResponse.json({ status: true, message: "New Category Saved!" })
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
    } catch (e) {
        return NextResponse.json([])
    }
}