import { getAllParticipation } from "@/utils/fn";
import type { Participation } from "@/utils/types";
import { useQuery, keepPreviousData } from "@tanstack/react-query";

export function useGetParticipation(filterOptions:Participation, token:string) {
    return useQuery({
        queryKey:['participation'],
        queryFn:()=>getAllParticipation(filterOptions),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
        enabled: !!(token)
    })
}