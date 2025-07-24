import { getStats } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";

export function getDashboardStats(filterYear: number) {
    return useQuery({
        queryKey:['stats', filterYear],
        queryFn: ()=>getStats(filterYear),
        staleTime: 5 * 60 * 1000,
    })
}