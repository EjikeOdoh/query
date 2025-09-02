import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import SponsorshipTable from "@/components/SponsorshipTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetPartner } from "@/hooks/use-admin";
import { updateData } from "@/utils/fn";
import type { CreateSponsorshipDto, EditPartnerDetailsDto, EditSponsorshipDto, ProgramStat } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

export default function PartnerDetails() {
    const navigate = useNavigate()
    const { partnerId } = useParams()

    const queryClient = useQueryClient()
    const programs = queryClient.getQueryData(['programs']) as ProgramStat[]

    const { isLoading, isError, error, data, refetch } = useGetPartner(Number(partnerId))

    // Partner details variables
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [editPartnerDto, setEditPartnerDto] = useState<EditPartnerDetailsDto>({})

    //  Sponsorship variables
    const [sId, setSId] = useState<number>()
    const [isAddSponsorshipModalOpen, setIsAddSponsorshipModalOpen] = useState<boolean>(false)
    const [isEditSponsorshipModalOpen, setIsEditSponsorshipModalOpen] = useState<boolean>(false)
    const [createSponsorshipDto, setCreateSponsorshipDto] = useState<CreateSponsorshipDto>({
        year: 0,
        amount: 0,
        currency: "",
        inKindDonation: "",
        partnerId: Number(partnerId),
        programId: 0
    })
    const [editSponsorshipDto, setEditSponsorshipDto] = useState<EditSponsorshipDto>({})

    function openAddSponsorshipModal() {
        setIsAddSponsorshipModalOpen(true)
    }

    function closeModal() {
        setIsEditModalOpen(false)
        setIsAddSponsorshipModalOpen(false)
        setIsEditSponsorshipModalOpen(false)
    }

    useEffect(() => {
        if (data) {
            const { id, sponsorships, ...rest } = data
            setEditPartnerDto(rest)
        }
    }, [data])

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    const { desc, logoUrl, name, year, id, isActive, linkedIn, logoPublicId, sponsorships, twitter } = data!

    return (
        <Container label="Partner Details">
            <div className="space-y-10">
                <div className="w-fit">
                    <NavLink to="/partners" className="flex items-center gap-2 text-[#171717] font-light text-xs" replace={true}>
                        <ChevronLeft color="#171717" size={14} />
                        Back to Partners
                    </NavLink>
                </div>

                <div>
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-clip">
                            <img src={logoUrl} />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold">{name}</h1>
                            {year && <p>Since {year}</p>}
                        </div>
                    </div>
                </div>

                {/* Meta data */}
                <div className="flex justify-between items-start gap-20">
                    <div className="flex-1 space-y-5">
                        <Heading text="Description" />
                        <p>{desc}</p>
                    </div>

                    <div className="flex-1 space-y-5">
                        <Heading text="Contact Info" />

                        <div className="space-y-3">
                            <Row
                                label="LinkedIn"
                                value={linkedIn}
                            />
                            <Row
                                label="X"
                                value={twitter}
                            />
                        </div>
                    </div>

                </div>

                <div className="space-y-5">
                    <Button onClick={openAddSponsorshipModal}>Add Sponsorship</Button>
                    {
                        sponsorships.length !== 0 && (
                            <SponsorshipTable
                                data={sponsorships || []}
                                edit={() => console.log('id')}
                                remove={() => console.log(id)}
                            />
                        )
                    }
                </div>
            </div>

            {/* Add sponsorship modal */}

            <Modal isOpen={isAddSponsorshipModalOpen} onClose={closeModal}>
                <Heading text="Add Sponsorship" />
                <form action={() => { }}>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            maxLength={4}
                            required
                            className="flex-1"
                            showLabel={true}
                            value={createSponsorshipDto?.year ?? ""}
                            onChange={e => updateData(e, setCreateSponsorshipDto)}
                        />
                        <div>
                            <label htmlFor="programId" className="text-sm font-light">Select Program</label>
                            <Select
                                name="programId"
                                required
                                value={String(createSponsorshipDto.programId) ?? ""}
                                onValueChange={(x) => setCreateSponsorshipDto({ ...createSponsorshipDto, programId: Number(x) })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        {programs?.map(program => (<SelectItem key={program.id} value={String(program.id)}>{program.program}</SelectItem>))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            name="amount"
                            placeholder="Amount"
                            type="number"
                            required
                            className="flex-1"
                            showLabel={true}
                            value={createSponsorshipDto?.amount ?? ""}
                            onChange={e => updateData(e, setCreateSponsorshipDto)}
                        />
                        <div>
                            <label htmlFor="currency" className="text-sm font-light">Select Currency</label>
                            <Select
                                name="currency"
                                required
                                value={String(createSponsorshipDto.programId) ?? ""}
                                onValueChange={(x) => setCreateSponsorshipDto({ ...createSponsorshipDto, programId: Number(x) })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Choose currency" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        <SelectItem value="NGN">NGN</SelectItem>
                                        <SelectItem value="USD">USD</SelectItem>
                                        <SelectItem value="EUR">EUR</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Input
                            name="inKindDonation"
                            placeholder="In Kind Donation"
                            required
                            className="flex-1"
                            showLabel={true}
                            value={createSponsorshipDto?.inKindDonation ?? ""}
                            onChange={e => updateData(e, setCreateSponsorshipDto)}
                        />
                    </div>
                    <Button className="w-full">Add Sponsorship</Button>
                </form>
            </Modal>
        </Container>
    )
}