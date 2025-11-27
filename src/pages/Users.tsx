import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import ErrorLayout from "@/components/ErrorLayout";
import Heading from "@/components/Heading";
import LoadingLayout from "@/components/LoadingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UsersTable from "@/components/UsersTable";
import { useAddUser, useDeleteUser, useGetAllUsers, useUpdateUser } from "@/hooks/use-admin";
import { updateData } from "@/utils/fn";
import { type EditUserDto, type CreateUserDto } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { CircleCheckBig, CircleFadingPlus } from "lucide-react";
import { useState } from "react";

const roles = ["viewer", "editor", "admin"]

export default function Users() {
    const { isLoading, isError, error, data, refetch } = useGetAllUsers()
    const queryClient = useQueryClient()

    // Mutation fns
    const addUserMutation = useAddUser(cleanUp)
    const updateUserMutation = useUpdateUser(revCleanUp)
    const deleteUserMutation = useDeleteUser(revCleanUp)

    const [createUserDto, setCreateUserDto] = useState<CreateUserDto>({
        email: "",
        role: "",
    })
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const [uId, setUId] = useState<number>(0)
    const [editUserDto, setEditUserDto] = useState<EditUserDto>({})
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)


    function openCreateModal() {
        setIsCreateModalOpen(true)
    }

    function openEditModal(id: number) {
        setUId(id)
        setEditUserDto(data!.find(user => user.id === id) as EditUserDto)
        setIsEditModalOpen(true)
    }

    function closeModal() {
        setIsCreateModalOpen(false)
        setIsEditModalOpen(false)
        setIsSuccessModalOpen(false)
    }

    function updateUser() {
        closeModal()
        updateUserMutation.mutate({ id: uId, data: editUserDto })
    }

    function resetUser(id: number) {
        updateUserMutation.mutate({ id, data: { password: 'password' } })
    }

    function deleteUser(id: number) {
        deleteUserMutation.mutate({ id })
        const user = data?.find(user => user.id === id)
        if (user?.staff) {
            queryClient.invalidateQueries({ queryKey: ['staff'] })
        } else if (user?.volunteer) {
            queryClient.invalidateQueries({ queryKey: ['volunteers'] })
        }
    }

    function handleCreateAccount() {
        addUserMutation.mutate(createUserDto)
    }

    function cleanUp() {
        closeModal()
        refetch()
        setCreateUserDto({
            firstName: "",
            lastName: "",
            email: "",
            role: ""
        })
    }

    function revCleanUp() {
        refetch()
        setEditUserDto({
            firstName: "",
            lastName: "",
            email: "",
            role: ""
        })
        setIsSuccessModalOpen(true)
    }

    if (isLoading || addUserMutation.isPending || updateUserMutation.isPending || deleteUserMutation.isPending) {
        return <LoadingLayout label="Accounts" />
    }

    if (
        isError ||
        addUserMutation.isError ||
        updateUserMutation.isError ||
        deleteUserMutation.isError
    ) {
        return (
            <ErrorLayout
                label="Accounts"
                text={
                    error?.message ||
                    addUserMutation.error?.message ||
                    updateUserMutation.error?.message ||
                    deleteUserMutation.error?.message ||
                    "Error"
                }
            />
        );
    }


    if (data) {
        return (
            <>
                <Container label="Accounts">
                    <div className="flex gap-5 items-center justify-between">
                        <Button
                            className="bg-[#00AEFF] text-white text-sm"
                            onClick={openCreateModal}
                        >
                            <CircleFadingPlus />
                            <span>Add User</span>
                        </Button>
                    </div>
                    <UsersTable data={data} onReset={resetUser} onDelete={deleteUser} onUpdate={openEditModal} />
                </Container>

                {/* Add Account Modal */}
                <Modal isOpen={isCreateModalOpen} onClose={closeModal}>
                    <Heading
                        text="Create New User"
                    />
                    <form action={handleCreateAccount}>
                        <div className="flex flex-col gap-4 mb-5">
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                className="flex-1"
                                showLabel={true}
                                value={createUserDto?.firstName ?? ""}
                                onChange={e => updateData(e, setCreateUserDto)}
                            />

                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                className="flex-1"
                                showLabel={true}
                                value={createUserDto?.lastName ?? ""}
                                onChange={e => updateData(e, setCreateUserDto)}
                            />

                            <Input
                                name="email"
                                type="email"
                                required={true}
                                placeholder="Email"
                                className="flex-1"
                                showLabel={true}
                                value={createUserDto?.email ?? ""}
                                onChange={e => updateData(e, setCreateUserDto)}
                            />

                            <Select
                                name="role"
                                required
                                // value={data.program}
                                onValueChange={(x) => setCreateUserDto({ ...createUserDto, role: x })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Choose role" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        {roles.map(role => <SelectItem value={role}>{role}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full">Create User</Button>
                    </form>
                </Modal>

                {/* Edit Account Modal */}
                <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                    <form action={updateUser}>
                        <div className="flex flex-col gap-4 mb-5">
                            <Input
                                name="firstName"
                                placeholder="First Name"
                                className="flex-1"
                                showLabel={true}
                                value={editUserDto?.firstName ?? ""}
                                onChange={e => updateData(e, setEditUserDto)}
                            />

                            <Input
                                name="lastName"
                                placeholder="Last Name"
                                className="flex-1"
                                showLabel={true}
                                value={editUserDto?.lastName ?? ""}
                                onChange={e => updateData(e, setEditUserDto)}
                            />

                            <Input
                                name="email"
                                type="email"
                                required={true}
                                placeholder="Email"
                                className="flex-1"
                                showLabel={true}
                                value={editUserDto?.email ?? ""}
                                onChange={e => updateData(e, setEditUserDto)}
                            />

                            <Select
                                name="role"
                                required
                                // value={data.program}
                                onValueChange={(x) => setEditUserDto({ ...editUserDto, role: x })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Choose role" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        {roles.map(role => <SelectItem value={role}>{role}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button className="w-full">Edit User</Button>
                    </form>
                </Modal>

                {/* Success modal */}
                <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <CircleCheckBig size={90} className="mx-auto text-green-600" />
                            <div>
                                <h3 className="font-bold text-3xl text-center">Update Successful</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant='default' className="flex-1" onClick={closeModal}>Close</Button>

                        </div>
                    </div>
                </Modal>
            </>
        )
    }

}