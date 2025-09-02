import Header from "@/components/Header";
import Logo from '../assets/google.png'
import { useGetAllPartners } from "@/hooks/use-admin";
import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { useNavigate } from "react-router";
import type { CallFn } from "@/utils/types";

interface CardProps {
    imgUrl: string,
    name?: string,
    onclick: CallFn
}

function Card({ imgUrl,name, onclick }: CardProps) {
    return (
        <button 
        onClick={onclick}
        className="w-full flex flex-col h-[120px] items-center justify-center gap-2 cursor-pointer border-2 border-[#F5F5F5] rounded-2xl p-2 outline-2 outline-white bg-clip-padding overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img src={imgUrl} className="object-contain w-full" />
            {/* <p>{name}</p> */}
        </button>
    )
}

export default function Partners() {
    const { isLoading, isError, error, data } = useGetAllPartners()
    const navigate = useNavigate()

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    const cards = data!.map(card => (
        <Card
            key={card.id}
            imgUrl={card.logoUrl}
            name={card.name}
            onclick={() => navigate(`/partners/${card.id}`)} 
        />
    ))
    return (
        <Container label="Partners" bgColor="transparent">


            <div className="flex items-center justify-between bg-white py-4 px-8 rounded-2xl">
                <div>Tags</div>

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