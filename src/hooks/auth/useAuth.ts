import useSWR from "swr";
import { backendHandler } from "@/lib/config";
import { Treaty } from "@elysiajs/eden";
export function useAuthentication(): {
    user?: Treaty.Data<typeof backendHandler.api.auth.me.get>;
    userLoading: boolean;
    userError: boolean;
    mutate: () => void;
} {
    const { data, error, isLoading, mutate } = useSWR(
        "/api/categories",
        () => backendHandler.api.auth.me.get({
            fetch: {
                credentials: "include"
            },
        }),
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
        user: data as Treaty.Data<typeof backendHandler.api.auth.me.get> | undefined,
        userLoading: isLoading,
        userError: error,
    };
}
