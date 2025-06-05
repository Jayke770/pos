import { ICategory } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface ICategoryState {
    category?: ICategory,
    action?: "edit" | "delete"
}
interface ICategoryStateActions {
    onUpdateCategory: (e: ICategoryState) => void
}
export const useCategoryState = create<ICategoryState & ICategoryStateActions>()(
    persist(
        (set) => ({
            onUpdateCategory: e => set({ ...e })
        }),
        {
            name: 'useCategoryState',
        },
    ),
)