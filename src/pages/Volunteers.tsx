import Container from "@/components/Container"
import Modal from "@/components/Dialog"
import { SpinnerCustom } from "@/components/Loader"
import { Button } from "@/components/ui/button"
import VolunteerTable from "@/components/VolunteerTable"
import { useAddUser, useDeleteUser, useDeleteVolunteer, useGetAllVolunteers } from "@/hooks/use-admin"
import { CircleFadingPlus, Trash2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router"


export default function Volunteers() {

    const navigate = useNavigate()
    const { isLoading, isError, error, data, refetch } = useGetAllVolunteers()

    const createUserMutation = useAddUser(refetch)
    const deleteUserMutation = useDeleteUser(refetch)

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
    const [vId, setVId] = useState<number>()

    function cleanUp() {
        refetch()
        closeModal()
    }

    const deleteMutation = useDeleteVolunteer(String(vId), cleanUp)

    function openDeleteModal(id: number) {
        setVId(id)
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
        deleteMutation.mutate()
    }

    function addUser(id: number) {

        const v = data!.find(x => x.id === id)!

        createUserMutation.mutate({
            firstName: v?.firstName,
            lastName: v?.lastName,
            role: "editor",
            email: v?.email,
            volunteerId: id
        })
    }

    function removeUser(id: number) {
      deleteUserMutation.mutate({id})
    }

    return (
        <Container label="Volunteers">
            {
                (isLoading || createUserMutation.isPending) ?
                    <SpinnerCustom />
                    :
                    <>
                        <div className="flex gap-5 items-center justify-between">
                            <Button
                                className="text-sm"
                                onClick={() => navigate('/add-volunteer')}
                            >
                                <CircleFadingPlus />
                                <span>Add Volunteer</span>
                            </Button>
                        </div>
                        {
                            data?.length ? (
                                <>
                                    <VolunteerTable
                                        data={data}
                                        onDelete={openDeleteModal}
                                        onCreate={addUser}
                                        onRemove={removeUser}
                                    />
                                </>
                            ) :
                                <div>
                                    <h1>No Volunteer record yet!</h1>
                                </div>
                        }

                    </>
            }

            <Modal isOpen={isDeleteModalOpen} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <Trash2 size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Delete Volunteer</h3>
                            <p className="font-light text-center">Are you sure you want to delete this volunteer?</p>

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