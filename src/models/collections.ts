import { IProductCategoryModel, IProductModel } from "@/types";
import { Schema, model, models, deleteModel, Types, Document } from "mongoose";

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