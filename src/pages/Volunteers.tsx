import Container from "@/components/Container"
import { SearchForm } from "@/components/SearchForm"
import { Button } from "@/components/ui/button"
import VolunteerTable from "@/components/VolunteerTable"
import { useGetAllVolunteers } from "@/hooks/use-admin"
import { CircleFadingPlus } from "lucide-react"
import { useNavigate } from "react-router"


export default function Volunteers() {

    const navigate = useNavigate()
    const { isLoading, isError, error, data } = useGetAllVolunteers()

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
        <Container label="Volunteers">
            <div className="flex gap-5 items-center justify-between">
                <SearchForm placeholder="Search by volunteer names" action={"hello"} />
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
                        <VolunteerTable data={data} onDelete={handleDelete} />
                    </>
                ) : <div>
                    <h1>No Volunteer record yet!</h1>
                </div>
            }

        </Container>
    )
}