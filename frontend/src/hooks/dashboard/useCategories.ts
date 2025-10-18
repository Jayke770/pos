import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import type { ICategory } from "@/types";
export default function useCategories(): {
	categories?: ICategory[];
	categoriesLoading: boolean;
	categoriesError: boolean;
	mutate: () => void;
} {
	const { data, error, isLoading, mutate } = useSWR(
		"/api/categories",
		fetcher,
		{
			shouldRetryOnError: true,
			revalidateOnMount: true,
			revalidateOnFocus: true,
			revalidateOnReconnect: true,
			refreshWhenHidden: true,
			refreshWhenOffline: true,
		},
	);
	return {
		mutate,
		categories: data,
		categoriesLoading: isLoading,
		categoriesError: error,
	};
}
