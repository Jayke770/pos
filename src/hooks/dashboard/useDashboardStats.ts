import { fetcher } from "@/lib/utils";
import { ICategory } from "@/types";
import useSWR from "swr";
interface IDashboardStats {
    totalItems: number;
    ingredients: number;
    pakaging: number;
    lowStock: number;
    outOfStock: number;
}
export default function useDashboardStats(): { dashboardStats: IDashboardStats; dashboardStatsLoading: boolean; dashboardStatsError: boolean; mutate: () => void } {
    const { data, error, isLoading, mutate } = useSWR("/api/stats", fetcher,
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
        dashboardStats: data,
        dashboardStatsLoading: isLoading,
        dashboardStatsError: error,
    };
}
