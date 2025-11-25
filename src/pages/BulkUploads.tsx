import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import ErrorLayout from "@/components/ErrorLayout";
import HistoryTable from "@/components/HistoryTable";
import LoadingLayout from "@/components/LoadingLayout";
import { Button } from "@/components/ui/button";
import { useDeleteTag, useGetAllTags } from "@/hooks/use-admin";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function BulkUploads() {
    const queryClient = useQueryClient()
    const { isLoading, isError, error, data, refetch } = useGetAllTags()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [tag, setTag] = useState<string>("")

    const deleteMutation = useDeleteTag(tag, cleanUp)

    function openDeleteModal(str: string) {
        setTag(str)
        setIsDeleteModalOpen(true)
    }

    function closeModal() {
        setIsDeleteModalOpen(false)
    }


    function cleanUp() {
        refetch()
        queryClient.invalidateQueries({ queryKey: ['stats'] })
        queryClient.invalidateQueries({ queryKey: ['students'] })
        closeModal()
    }

    function handleDelete() {
        deleteMutation.mutate()
    }

    if (isLoading) {
        return <LoadingLayout label="Upload History" />
    }

    if (isError) {
        return <ErrorLayout label="Upload History" text={error.message} />
    }

    if (data) {
        const tags = data!.filter(row => row.tag !== null)

        return (
            <Container label="Upload History">
                {
                    data?.length ? (
                        <>
                            <HistoryTable data={tags} onDelete={openDeleteModal} />
                        </>
                    ) : <div>
                        <h1>No upload record yet!</h1>
                    </div>
                }

                <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <Trash2 size={90} className="mx-auto" />
                            <div>
                                <h3 className="font-bold text-3xl text-center">Delete Records</h3>
                                <p className="font-light text-center">Are you sure you want to delete these records?</p>

                            </div>

                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant='outline' className="flex-1" onClick={closeModal}>No</Button>
                            <Button variant="destructive" className="flex-1" onClick={handleDelete}>Yes, Delete</Button>
                        </div>
                    </div>
                </Modal>

            </Container>
        )
    }
}