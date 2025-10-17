import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { Inventory } from "@/models/collections";
import { dbConnect } from "@/models/dbConnect";
import { AuthOptions } from "@/services/next-auth/auth";

const InventorySchema = z.union([
  z.object({
    stocks: z.number(),
    description: z.string().optional(),
    lowStockThreshold: z.number(),
    contentPerUnit: z.number(),
    name: z.string(),
    expiryDate: z.string(),
    type: z.string(),
    unit: z.string(),
    action: z.literal("create"),
  }),
  z.object({
    stock: z.number(),
    description: z.string().optional(),
    lowStockThreshold: z.number(),
    maxStock: z.number(),
    name: z.string(),
    type: z.string(),
    unit: z.string(),
    id: z.string(),
    action: z.literal("edit"),
  }),
  z.object({
    id: z.string(),
    action: z.literal("delete"),
  }),
]);
export async function POST(req: NextRequest) {
  const inventoryData = InventorySchema.safeParse(await req.json());
  if (!inventoryData.success)
    return NextResponse.json({
      status: false,
      message: "Invalid Inventory!",
      error: inventoryData.error,
    });
  const session = await getServerSession(AuthOptions);
  if (
    !session ||
    (session && !["admin", "owner"].includes(session?.user?.role))
  )
    return NextResponse.json({ status: false, message: "Invalid User!" });
  await dbConnect();
  if (inventoryData.data.action === "create") {
    await Inventory.insertOne({
      ...inventoryData.data,
      expiryDate: new Date(inventoryData.data.expiryDate),
    });
    return NextResponse.json({ status: true, message: "New Inventory Saved!" });
  }
  return NextResponse.json({ status: false, message: "Invalid Action" });
}

export async function GET() {
  try {
    const session = await getServerSession(AuthOptions);
    if (!session)
      return NextResponse.json({ status: false, message: "Invalid User!" });
    await dbConnect();
    const categories = await Inventory.find(
      {},
      {
        id: "$_id",
        _id: 0,
        stocks: 1,
        description: 1,
        lowStockThreshold: 1,
        stockUsed: 1,
        type: 1,
        name: 1,
        unit: 1,
        expiryDate: 1,
      },
      { sort: { _id: -1 } },
    ).lean();
    return NextResponse.json(categories);
  } catch (_e) {
    return NextResponse.json([]);
  }
}
