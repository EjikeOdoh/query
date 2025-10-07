import Container from "@/components/Container"
import Modal from "@/components/Dialog"
import { SpinnerCustom } from "@/components/Loader"
import StaffTable from "@/components/StaffTable"
import { Button } from "@/components/ui/button"
import { useDeleteStaff, useGetAllStaff } from "@/hooks/use-admin"
import { CircleFadingPlus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Staff() {

    const navigate = useNavigate()

    const { isLoading, isError, error, data, refetch } = useGetAllStaff()

    const [sId, setSId] = useState<number>()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    const deleteMutation = useDeleteStaff(String(sId), refetch)

    function openModal(id: number) {
        setSId(id)
        setIsDeleteModalOpen(true)
    }

    function closeModal() {
        setIsDeleteModalOpen(false)
    }

    if (isLoading) {
        return <SpinnerCustom />
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    function handleDelete() {
        closeModal()
        deleteMutation.mutate()
    }

    return (
        <Container label="Staff">
            <div className="flex gap-5 items-center justify-between">
                <Button
                    className="bg-[#00AEFF] text-white text-sm"
                    onClick={() => navigate('/add-staff')}
                >
                    <CircleFadingPlus />
                    <span>Add Staff</span>
                </Button>
            </div>
            <StaffTable data={data!} onDelete={openModal} />
            {/* Delete modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <Trash2 size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Delete Staff</h3>
                            <p className="font-light text-center">Are you sure you want to delete this staff?</p>

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