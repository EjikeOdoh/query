import Container from "@/components/Container";
import { SpinnerCustom } from "@/components/Loader";
import UsersTable from "@/components/UsersTable";
import { useDeleteUser, useGetAllUsers, useUpdateUser } from "@/hooks/use-admin";

export default function Users() {
    const { isLoading, data, refetch } = useGetAllUsers()

    const updateUserMutation = useUpdateUser(refetch)

    const deleteUserMutation = useDeleteUser(refetch)

    function updateUser(id: number) {
        alert(id)
        // updateUserMutation.mutate({ id, data: editUserDto })
    }

    function resetUser(id: number) {
        
        updateUserMutation.mutate({ id, data: { password: 'password' } })
    }

    function deleteUser(id: number) {
        deleteUserMutation.mutate({ id })
    }
    return (
        <Container label="Accounts">

            {
                (isLoading || updateUserMutation.isPending || deleteUserMutation.isPending) ?
                    <SpinnerCustom />
                    :
                    <>
                        <UsersTable data={data} onReset={resetUser} onDelete={deleteUser} onUpdate={updateUser} />
                    </>
            }
        </Container>
    )
}