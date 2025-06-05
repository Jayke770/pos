import { IProductCategoryModel } from "@/types";
import { Schema, model, models, deleteModel, Types, Document } from "mongoose";

const CategorySchame = new Schema<IProductCategoryModel>({
    category: { type: String, required: true },
    productIds: [],
    totalProducts: { type: Number, default: 0 }
}, { timestamps: true })
export const Categories = model("categories", CategorySchame, "categories", { overwriteModels: true })