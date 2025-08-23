import Container from "@/components/Container"
import { SearchForm } from "@/components/SearchForm"
import StaffTable from "@/components/StaffTable"
import { Button } from "@/components/ui/button"
import { useGetAllStaff } from "@/hooks/use-admin"
import { CircleFadingPlus } from "lucide-react"
import { useNavigate } from "react-router"

export default function Staff() {

    const navigate = useNavigate()

    const {isLoading, isError, error, data} = useGetAllStaff()

    if (isLoading) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
      }

      function handleDelete(id:number) {
        console.log(id)
      }

    return (
        <Container label="Staff">
            <div className="flex gap-5 items-center justify-between">
                <SearchForm action={"hello"} />
                <Button
                    className="bg-[#00AEFF] text-white text-sm"
                    onClick={() => navigate('/add-staff')}
                >
                    <CircleFadingPlus />
                    <span>Add Staff</span>
                </Button>
            </div>
            <StaffTable data={data!} onDelete={handleDelete} />
        </Container>
    )
}