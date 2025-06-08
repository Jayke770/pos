import { fetcher } from "@/lib/utils";
import { IInventory } from "@/types";
import useSWR from "swr";
export default function useInventories(): { inventories?: IInventory[]; inventoriesLoading: boolean; inventoriesError: boolean; mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR("/api/inventory", fetcher,
        {
            shouldRetryOnError: true,
            revalidateOnMount: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            refreshWhenHidden: true,
            refreshWhenOffline: true,
        }
    );
    return {
        mutate,
        inventories: data,
        inventoriesLoading: isLoading,
        inventoriesError: error,
    };
}
