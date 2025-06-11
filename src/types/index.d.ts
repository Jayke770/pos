import { Types } from "mongoose"

//model 
export type IUserRole = "admin" | "owner" | "user"
export interface IUserModel {
    role: IUserRole,
    firstName: string,
    lastName: string,
    username: string,
    password: string
}
export interface IInventoryModel {
    currentStock: number,
    description?: string
    lowStockThreshold: number
    maxStock: number
    name: string
    type: string
    unit: string
}
export interface IProductCategoryModel {
    category: string,
    productIds: Types.ObjectId[],
    totalProducts: number
}
export interface IIngredientsModel {
    unit: string,
    name: string,
    quantity: number,
    totalUsed: number
}
export interface IProductSizes {
    size: string,
    ingredients: { id: Types.ObjectId, amount: number }[],
    packaging: { id: Types.ObjectId }
}
export interface IProductModel {
    categoryId: Types.ObjectId,
    addons: IIngredientsModel[],
    name: string,
    sizes: IProductSizes[],
    totalSold: number
}

//api responses 
export interface IApiResponse {
    status: boolean,
    message: string
}

//hooks 
export interface ICategory {
    id: string,
    category: string,
    totalProducts: number
}
export interface IInventory extends IInventoryModel {
    id: string
}


