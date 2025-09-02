import Container from "@/components/Container";
import { useGetPartner } from "@/hooks/use-admin";
import { ChevronLeft } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router";

export default function PartnerDetails() {
    const navigate = useNavigate()
    const { partnerId } = useParams()

    const { isLoading, isError, error, data, refetch } = useGetPartner(Number(partnerId))

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    const {desc} = data!

    return (
        <Container label="Partner Details">
               <div className="w-fit">
                <NavLink to="/partners" className="flex items-center gap-2 text-[#171717] font-light text-xs" replace={true}>
                    <ChevronLeft color="#171717" size={14} />
                    Back to Partners
                </NavLink>
            </div>

            <div>{desc}</div>
        </Container>
    )
}