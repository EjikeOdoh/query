import { getProfile } from "@/utils/fn";
import { useQuery } from "@tanstack/react-query";


export default function useGetProfile(token: string) {
    return useQuery({
        queryKey:['profile'],
        queryFn: getProfile,
        enabled: !!(token),
        staleTime: 5 * 60 * 1000
    })
}
