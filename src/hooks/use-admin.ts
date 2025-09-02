import { addSponsorship, addTarget, addVolunteer, addVolunteerParticipation, deletePartner, deleteSponsorship, deleteStaff, deleteTarget, deleteVolunteer, editPartner, getAllParticipation, getAllPartners, getAllStaff, getAllTargets, getAllVolunteers, getPartner, getStaff, getVolunteer, updateSponsorship, updateStaff, updateTarget, updateVolunteer, uploadAttendance } from "@/utils/fn";
import type { CallFn, CreateSponsorshipDto, CreateStaff, CreateTargetDto, CreateVolunteer, EditPartnerDetailsDto, EditSponsorshipDto, EditTargetDto, Participation, VolunteerParticipation } from "@/utils/types";
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

export function useUpdateVolunteer(id: string, data: Partial<CreateVolunteer>, refetch: CallFn) {
    return useMutation({
        mutationFn: () => updateVolunteer(id, data),
        onSuccess: refetch
    })
}

export function useDeleteVolunteer(id: string, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deleteVolunteer(id),
        onSuccess: refetch
    })
}

export function useAddVP(data: VolunteerParticipation, refetch: CallFn) {
    return useMutation({
        mutationFn: () => addVolunteerParticipation(data),
        onSuccess: refetch
    })
}

export function useUpload(data: FormData, refetch: CallFn) {
    return useMutation({
        mutationFn: () => uploadAttendance(data),
        onSuccess: refetch
    })
}

export function useGetAllTargets() {
    return useQuery({
        queryKey: ['targets'],
        queryFn: getAllTargets,
        staleTime: 5 * 60 * 1000
    })
}

export function useAddTarget(data: CreateTargetDto, refetch: CallFn) {
    return useMutation({
        mutationFn: () => addTarget(data),
        onSuccess: refetch
    })
}

export function useUpdateTarget(id: number, data: EditTargetDto, refetch: CallFn) {
    return useMutation({
        mutationFn: () => updateTarget(id, data),
        onSuccess: refetch
    })
}

export function useDeleteTarget(id: number, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deleteTarget(id),
        onSuccess: refetch
    })
}

export function useGetAllPartners() {
    return useQuery({
        queryKey: ['partners'],
        queryFn: getAllPartners,
        staleTime: 5 * 60 * 1000
    })
}

export function useGetPartner(id: number) {
    return useQuery({
        queryKey: ['partner', id],
        queryFn: () => getPartner(id),
        staleTime: 5 * 60 * 1000
    })
}

export function useUpdatePartner(id: number, data: EditPartnerDetailsDto, refetch: CallFn) {
    return useMutation({
        mutationFn: () => editPartner(id, data),
        onSuccess: refetch
    })
}

export function useDeletePartner(id: number, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deletePartner(id),
        onSuccess: refetch
    })
}

export function useAddSponsorship(data: CreateSponsorshipDto, refetch: CallFn) {
    return useMutation({
        mutationFn: () => addSponsorship(data),
        onSuccess: refetch
    })
}

export function useEditSponsorship(id: number, data: EditSponsorshipDto, refetch: CallFn) {
    return useMutation({
        mutationFn: () => updateSponsorship(id, data),
        onSuccess: refetch
    })
}

export function useDeleteSponsorship(id: number, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deleteSponsorship(id),
        onSuccess: refetch
    })
}