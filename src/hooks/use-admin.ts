import { addVolunteer, deleteStaff, getAllParticipation, getAllStaff, getAllVolunteers, getStaff, getVolunteer, updateStaff } from "@/utils/fn";
import type { CallFn, CreateStaff, CreateVolunteer, Participation } from "@/utils/types";
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";



export function useGetParticipation(filterOptions: Participation, token: string) {
    return useQuery({
        queryKey: ['participation'],
        queryFn: () => getAllParticipation(filterOptions),
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000,
        enabled: !!(token)
    })
}

export function useGetAllStaff() {
    return useQuery({
        queryKey: ['staff'],
        queryFn: getAllStaff,
        staleTime: 5 * 60 * 1000
    })
}

export function useGetStaffDetails(id: number) {
    return useQuery({
        queryKey: ['staff', id],
        queryFn: () => getStaff(id)
    })
}

export function useUpdateStaff(id: string, data: Partial<CreateStaff>, refetch: CallFn) {
    return useMutation({
        mutationFn: () => updateStaff(id, data),
        onSuccess: refetch
    })
}

export function useDeleteStaff(id: string, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deleteStaff(id),
        onSuccess: refetch
    })
}

export function useGetAllVolunteers() {
    return useQuery({
        queryKey: ['volunteers'],
        queryFn: getAllVolunteers,
        staleTime: 5 * 60 * 1000
    })
}

export function useGetVolunteerDetails(id: string) {
    return useQuery({
        queryKey: ['volunteer', id],
        queryFn: () => getVolunteer(id),
        staleTime: 5 * 60 * 1000
    })
}

export function useAddVolunteer(data: CreateVolunteer, refetch: CallFn) {
    return useMutation({
        mutationFn: () => addVolunteer(data),
        onSuccess: refetch
    })
}