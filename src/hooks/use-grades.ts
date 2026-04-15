import { createGrade, deleteGrade, downloader, updateGrade } from "@/utils/fn";
import type { CallFn, DownloadDto, GradeAddData, GradeEditData } from "@/utils/types";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddGrades(studentId: number, data: GradeAddData, refetch: CallFn) {
    return useMutation({
        mutationFn: () => createGrade(studentId, data),
        onSuccess: refetch
    })
}

export function useUpdateGrades(id: string, data: GradeEditData, refetch: CallFn) {
    return useMutation({
        mutationFn: () => updateGrade(id, data),
        onSuccess: refetch
    })
}


export function useDeleteGrades(id: number, refetch: CallFn) {
   return useMutation({
      mutationFn: () =>deleteGrade(id),
      onSuccess: refetch
   })
}

export function useProgressDownloader(dto: DownloadDto) {
    return useQuery({
        queryKey: ["download"],
        queryFn: () => downloader(dto)
    })
}