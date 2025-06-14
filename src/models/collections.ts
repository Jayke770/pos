import { IDashboardStatsModel, IInventoryModel, IProductCategoryModel, IProductModel } from "@/types";
import { Schema, model } from "mongoose";

const CategorySchame = new Schema<IProductCategoryModel>({
    category: { type: String, required: true },
    productIds: [],
    totalProducts: { type: Number, default: 0 }
}, { timestamps: true })
export const Categories = model("categories", CategorySchame, "categories", { overwriteModels: true }) 

const ProductSchema = new Schema<IProductModel>({
    categoryId: { type: Schema.Types.ObjectId, required: true },
    addons: [],
    name: { type: String },
    sizes: [],
    totalSold: { type: Number }
}, {
    timestamps: true
})
export const Products = model("products", ProductSchema, "products", { overwriteModels: true }) 

const InventorySchema = new Schema<IInventoryModel>({
    stocks: { type: Number, required: true },
    description: { type: String },
    lowStockThreshold: { type: Number, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    unit: { type: String, required: true }, 
    stockUsed: { type: Number, default: 0 },
    expiryDate: { type: Date }
}, { timestamps: true, overwriteModels: true, })
export const Inventory = model("inventory", InventorySchema, "inventory", { overwriteModels: true })

const DashboardSchema = new Schema<IDashboardStatsModel>({
    ingredients: { type: Number },
    inventory: { type: Number },
    lowStock: { type: Number },
    outOfStock: { type: Number }
}, { timestamps: true })
export const Dashboard = model("dashboard", DashboardSchema, "dashboard", { overwriteModels: true })   