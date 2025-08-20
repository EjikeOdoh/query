import Header from "@/components/Header";
import Logo from '../assets/google.png'

function Card() {
    return (
        <button className="w-full flex h-[100px] flexbun cursor-pointer border-2 border-[#F5F5F5] rounded-2xl p-2 outline-2 outline-white bg-clip-padding overflow-hidden grayscale hover:grayscale-0 transition-all">
            <img src={Logo} className="rounded-lg object-cover" />
        </button>
    )
}

export default function Partners() {
    const cards = Array(10).fill(9).map((i) => (<Card key={i} />))
    console.log(cards)
    return (
        <div className="flex flex-col">
            <Header label="Partners" />

            {/* Page header */}
            <div className="flex-1">
                <div className="w-11/12 m-auto space-y-10">
                    <div className="flex items-center justify-between bg-white py-4 px-8 rounded-2xl">
                        <div>Tags</div>
                        <div>Filter</div>
                    </div>

                    {/* List of partners */}
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
                        {cards}
                    </div>

                </div>

            </div>
        </div>
    )
}