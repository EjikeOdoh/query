import { createGrade, deleteGrade, updateGrade } from "@/utils/fn";
import type { GradeAddData, GradeEditData } from "@/utils/types";
import { useMutation } from "@tanstack/react-query";

export function useAddGrades(studentId: number, data: GradeAddData, refetch: any) {
    return useMutation({
        mutationFn: () => createGrade(studentId, data),
        onSuccess: refetch
    })
}

export function useUpdateGrades(id: string, data: GradeEditData, refetch: any) {
    return useMutation({
        mutationFn: () => updateGrade(id, data),
        onSuccess: refetch
    })
}


export function useDeleteGrades(id: number, refetch: any) {
   return useMutation({
      mutationFn: () =>deleteGrade(id),
      onSuccess: refetch
   })
}