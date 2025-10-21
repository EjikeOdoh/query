import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import TargetsTable from "@/components/TargetsTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddTarget, useDeleteTarget, useGetAllTargets, useUpdateTarget } from "@/hooks/use-admin";
import { updateData } from "@/utils/fn";
import type { CreateTargetDto, EditTargetDto } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";

export default function Target() {

    const queryClient = useQueryClient()

    const { isLoading, isError, error, data, refetch } = useGetAllTargets()

    const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [id, setId] = useState<number>()

    const [createTargetDto, setCreateTargetDto] = useState<CreateTargetDto>({
        target: 0,
        year: 0
    })
    const [editTargetDto, setEditTargetDto] = useState<EditTargetDto>(data?.find(x => x.id === id) || {})

    const addMutation = useAddTarget(createTargetDto, refetch)
    const editMutation = useUpdateTarget(id!, editTargetDto, refetch)
    const deleteMutation = useDeleteTarget(id!, refetch)

    function openAddModal() {
        setIsAddModalOpen(true)
    }

    function openEditModal(id: number) {
        setId(id)
        setEditTargetDto(data?.find(x => x.id === id) || {})
        setIsEditModalOpen(true)
    }

    function closeModal() {
        setIsAddModalOpen(false)
        setIsEditModalOpen(false)
    }

    function handleAddTarget() {
        if (!createTargetDto.target || !createTargetDto.year) return
        closeModal()
        addMutation.mutate()
        queryClient.invalidateQueries({ queryKey:['stats']})
    }

    function handleEditTarget() {
        closeModal()
        editMutation.mutate()
        queryClient.invalidateQueries({ queryKey:['stats']})
    }

    function handleDeleteTarget(id: number) {
        setId(id)
        deleteMutation.mutate()
        queryClient.invalidateQueries({ queryKey:['stats']})
    }


    if (isLoading) {
        return   <SpinnerCustom />
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }


    return (
        <Container label="Yearly Target">
            <div className="flex gap-5 items-center justify-between">
                <Button
                    className="text-sm"
                    onClick={openAddModal}
                >
                    <CircleFadingPlus />
                    <span>Add Target</span>
                </Button>
            </div>
            <TargetsTable data={data || []}
                edit={openEditModal}
                remove={handleDeleteTarget}
            />

            {/* Add target modal */}
            <Modal isOpen={isAddModalOpen} onClose={closeModal}>
                <Heading text="Add Target" />
                <form action={handleAddTarget}>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            maxLength={4}
                            required
                            className="flex-1"
                            showLabel={true}
                            value={createTargetDto?.year ?? ""}
                            onChange={e => updateData(e, setCreateTargetDto)}
                        />
                        <Input
                            name="target"
                            placeholder="Target"
                            type="number"
                            required
                            className="flex-1"
                            showLabel={true}
                            value={createTargetDto?.target ?? ""}
                            onChange={e => updateData(e, setCreateTargetDto)}
                        />
                    </div>
                    <Button className="w-full">Add Target</Button>
                </form>
            </Modal>

            {/* Edit target modal */}
            <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                <Heading text="Edit Target" />
                <form action={handleEditTarget}>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            className="flex-1"
                            showLabel={true}
                            value={editTargetDto?.year ?? ""}
                            onChange={e => updateData(e, setEditTargetDto)}
                        />

                        <Input
                            name="target"
                            placeholder="Target"
                            type="number"
                            className="flex-1"
                            showLabel={true}
                            value={editTargetDto?.target ?? ""}
                            onChange={e => updateData(e, setEditTargetDto)}
                        />
                    </div>
                    <Button className="w-full">Edit Target</Button>
                </form>
            </Modal>
        </Container>
    )
}