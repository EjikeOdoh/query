import { getPrograms, getStats } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats(filterYear: number) {
    return useQuery({
        queryKey:['stats', filterYear],
        queryFn: ()=>getStats(filterYear),
        staleTime: 5 * 60 * 1000,
    })
}

export function useGetPrograms() {
    return useQuery({
        queryKey:['programs'],
        queryFn: getPrograms,
        staleTime: 5 * 60 * 1000,
    })
}