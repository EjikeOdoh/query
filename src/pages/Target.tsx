import Container from "@/components/Container";
import TargetsTable from "@/components/TargetsTable";
import { Button } from "@/components/ui/button";
import { useGetAllTargets } from "@/hooks/use-admin";
import { CircleFadingPlus } from "lucide-react";

export default function Target() {

    const { isLoading, isError, error, data } = useGetAllTargets()


    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    console.log(data)
    return (
        <Container label="Yearly Target">
             <div className="flex gap-5 items-center justify-between">
                <Button
                    className="text-sm"
                >
                    <CircleFadingPlus />
                    <span>Add Target</span>
                </Button>
            </div>
            <TargetsTable data={data || []} />
        </Container>
    )
}