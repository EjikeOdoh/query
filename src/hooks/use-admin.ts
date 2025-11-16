import { addSponsorship, addStaff, addTarget, addUser, addVolunteer, addVolunteerParticipation, deletePartner, deleteSponsorship, deleteStaff, deleteTarget, deleteUploadTag, deleteUser, deleteVolunteer, getAllPartners, getAllStaff, getAllTags, getAllTargets, getAllUsers, getAllVolunteers, getPartner, getStaff, getVolunteer, updatePartnerStatus, updateSponsorship, updateStaff, updateTarget, updateUser, updateVolunteer, uploadAttendance } from "@/utils/fn";
import type { CallFn, CreateSponsorshipDto, CreateStaff, CreateTargetDto, CreateUserDto, CreateVolunteer, EditPartnerDetailsDto, EditSponsorshipDto, EditTargetDto, EditUserDto, VolunteerParticipation } from "@/utils/types";
import { useQuery, useMutation } from "@tanstack/react-query";


// export function useGetParticipation(filterOptions: Participation, token: string) {
//     return useQuery({
//         queryKey: ['participation'],
//         queryFn: () => getAllParticipation(filterOptions),
//         placeholderData: keepPreviousData,
//         staleTime: 5 * 60 * 1000,
//         enabled: !!(token)
//     })
// }

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

export function useAddStaff(data: CreateStaff, refetch: CallFn) {
    return useMutation({
        mutationFn: () => addStaff(data),
        onSuccess: refetch
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
        mutationFn: () => updatePartnerStatus(id, data),
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

export function useGetAllTags() {
    return useQuery({
        queryKey: ['tags'],
        queryFn: getAllTags,
        staleTime: 5 * 60 * 1000
    })
}

export function useDeleteTag(tag: string, refetch: CallFn) {
    return useMutation({
        mutationFn: () => deleteUploadTag(tag),
        onSuccess: refetch
    })
}

export function useGetAllUsers() {
    return useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
        staleTime: 5 * 60 * 1000
    })
}

export function useAddUser(refetch?: CallFn) {
    return useMutation({
        mutationFn: async (data: CreateUserDto) => {
            if (data.staffId) {
               await updateStaff(String(data.staffId), { hasAccount: true })
            } else if (data.volunteerId) {
               await updateVolunteer(String(data.volunteerId), { hasAccount: true })
            }
            return addUser(data)
        },
        onSuccess: refetch
    })
}

export function useUpdateUser(refetch?: CallFn) {
    return useMutation({
        mutationFn: ({ id, data }: { id: number; data?: EditUserDto }) =>
            updateUser(id, data),
        onSuccess: refetch
    })
}


export function useDeleteUser(refetch: CallFn) {
    return useMutation({
        mutationFn: ({ id }: { id: number }) =>
            deleteUser(id),
        onSuccess: refetch
    })
}
