import { useGetAllPartners } from "@/hooks/use-admin";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { useNavigate } from "react-router";
import type { CallFn } from "@/utils/types";
import { useState } from "react";
import { SpinnerCustom } from "@/components/Loader";

interface CardProps {
    imgUrl: string,
    name?: string,
    onclick: CallFn
}

function Card({ imgUrl, onclick }: CardProps) {
    return (
        <button
            onClick={onclick}
            className="w-full flex flex-col h-[120px] items-center justify-center gap-2 cursor-pointer border-2 border-[#F5F5F5] rounded-2xl p-2 outline-2 outline-white bg-clip-padding overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img src={imgUrl} className="object-contain w-full" />
        </button>
    )
}

export default function Partners() {
    const { isLoading, isError, error, data } = useGetAllPartners()
    const navigate = useNavigate()

    const [filter, setFilter] = useState<string>('all')


    if (isLoading) {
        return <SpinnerCustom />
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    const partners = filter === 'all' ? data!
        : filter === 'active' ? data!.filter(x => x.isActive === true)
            : filter === 'inactive' ? data!.filter(x => x.isActive !== true)
                : data!

    const cards = partners.length > 0 ? partners.map(card => (
        <Card
            key={card.id}
            imgUrl={card.logoUrl}
            name={card.name}
            onclick={() => navigate(`/partners/${card.id}`)}
        />
    )) : <p>Partner record not added yet</p>
    return (
        <Container label="Partners" bgColor="transparent">
            <div className="flex items-center justify-between bg-white py-4 px-8 rounded-2xl">
                <div className="flex items-center gap-5">
                    <Button
                        variant={filter === "all" ? 'default' : 'secondary'}
                        className="font-light text-sm border border-[#E5E5E5]"
                        onClick={() => setFilter('all')}
                    >All</Button>

                    <Button
                        variant={filter === "active" ? 'default' : 'secondary'}
                        className="font-light text-sm border border-[#E5E5E5]"
                        onClick={() => setFilter('active')}

                    >Active</Button>

                    <Button
                        variant={filter === "inactive" ? 'default' : 'secondary'}
                        className="font-light text-sm border border-[#E5E5E5]"
                        onClick={() => setFilter('inactive')}

                    >Inactive</Button>
                </div>
                <Button
                    className="text-sm"
                    onClick={() => navigate('/add-partner')}
                >
                    <CircleFadingPlus />
                    <span>Add Partner</span>
                </Button>
            </div>

            {/* List of partners */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
                {cards}
            </div>
        </Container>
    )
}