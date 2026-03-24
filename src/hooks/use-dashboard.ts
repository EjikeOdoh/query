import { getAllSchools, getProgramBreakdown, getPrograms, getStats } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";

export function useDashboardStats(filterYear: number) {
    return useQuery({
        queryKey: ['stats', filterYear],
        queryFn: () => getStats(filterYear),
        staleTime: 5 * 60 * 1000,
    })
}

export function useGetPrograms() {
    return useQuery({
        queryKey: ['programs'],
        queryFn: getPrograms,
        staleTime: 5 * 60 * 1000,
    })
}

export function useGetProgramBreakdown(filterYear: number) {
    return useQuery({
        queryKey: ['breakdown', filterYear],
        queryFn: () => getProgramBreakdown(filterYear),
        enabled: !!(filterYear)
    })
}

export function useGetAllSchools() {
    return useQuery({
        queryKey: ['schools'],
        queryFn: getAllSchools,
        staleTime: 5 * 60 * 1000,
        select(data) {
            const keywords = ["GSS", "JSS", "MSS", "MJSS", "GDSS", "GGSS", "ADSS"];
            return data.data.filter((school: string) =>  keywords.some(keyword => school.includes(keyword)))
        },
    })
}