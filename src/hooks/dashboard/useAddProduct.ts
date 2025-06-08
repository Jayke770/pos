import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createDebouncedJSONStorage } from 'zustand-debounce';
interface ICategoryState {
    searchIngredients?: string,
    selectedIngredients?: { id: string, name: string }[]
}
interface ICategoryStateActions {
    onUpdate: (e: ICategoryState) => void
}

export const useAddProduct = create<ICategoryState & ICategoryStateActions>()(
    persist(
        (set) => ({
            searchIngredients: '',
            selectedIngredients: [],
            onUpdate: e => set({ ...e })
        }),
        {
            name: "dashboard-addproduct"
        }
    )
);
