import { ICategory } from '@/types';
import { create } from 'zustand';

interface ICategoryState {
    category?: ICategory,
    action?: "edit" | "delete"
}
interface ICategoryStateActions {
    onUpdateCategory: (e: ICategoryState) => void
}

export const useCategoryState = create<ICategoryState & ICategoryStateActions>()(
    (set) => ({
        onUpdateCategory: e => set({ ...e })
    })
)
