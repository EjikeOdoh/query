import Container from "@/components/Container"
import Modal from "@/components/Dialog"
import { SpinnerCustom } from "@/components/Loader"
import StaffTable from "@/components/StaffTable"
import { Button } from "@/components/ui/button"
import { useAddUser, useDeleteStaff, useDeleteUser, useGetAllStaff } from "@/hooks/use-admin"
import { CircleFadingPlus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Staff() {

    const navigate = useNavigate()

    const { isLoading, isError, error, data, refetch } = useGetAllStaff()

    const createUserMutation = useAddUser(refetch)
    const deleteUserMutation = useDeleteUser(refetch)

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

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    function handleDelete() {
        closeModal()
        deleteMutation.mutate()
    }

    function addUser(id: number) {

        const staff = data!.find(x => x.id === id)!

        createUserMutation.mutate({
            firstName: staff?.firstName,
            lastName: staff?.lastName,
            role: "editor",
            email: staff?.email,
            staffId: id
        })
    }

    function removeUser(id: number) {
        deleteUserMutation.mutate({id})
    }

    return (
        <Container label="Staff">
            {
                (isLoading || deleteMutation.isPending || createUserMutation.isPending) ?
                    <SpinnerCustom />
                    :
                    <>
                        <div className="flex gap-5 items-center justify-between">
                            <Button
                                className="bg-[#00AEFF] text-white text-sm"
                                onClick={() => navigate('/add-staff')}
                            >
                                <CircleFadingPlus />
                                <span>Add Staff</span>
                            </Button>
                        </div>
                        {data?.length ?
                            <StaffTable
                                data={data!}
                                onDelete={openModal}
                                onCreate={addUser}
                                onRemove={removeUser}
                            /> :
                            <div>
                                <h1>No Staff record yet!</h1>
                            </div>}
                    </>
            }

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