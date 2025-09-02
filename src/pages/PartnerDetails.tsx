import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import SponsorshipTable from "@/components/SponsorshipTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddSponsorship, useDeleteSponsorship, useEditSponsorship, useGetPartner } from "@/hooks/use-admin";
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
        inkinddonation: "",
        partnerId: Number(partnerId),
        programId: 0
    })
    const [editSponsorshipDto, setEditSponsorshipDto] = useState<EditSponsorshipDto>(data!?.sponsorships?.find(x => x.id === sId) || {})

    const addSponsorshipMutation = useAddSponsorship(createSponsorshipDto, refetch)
    const editSponsorshipMutation = useEditSponsorship(sId!, 
        { inkinddonation: editSponsorshipDto.inkinddonation, amount: editSponsorshipDto.amount, currency: editSponsorshipDto.currency, year: editSponsorshipDto.year}
        , refetch)
    const deleteSponsorshipMutation = useDeleteSponsorship(sId!, refetch)

    function openAddSponsorshipModal() {
        setIsAddSponsorshipModalOpen(true)
    }

    function openEditSponsorshipModal(id: number) {
        setSId(id)
        setEditSponsorshipDto(data!?.sponsorships.find(x => x.id === id) || {})
        setIsEditSponsorshipModalOpen(true)
    }

    function closeModal() {
        setIsEditModalOpen(false)
        setIsAddSponsorshipModalOpen(false)
        setIsEditSponsorshipModalOpen(false)
    }


    function handleAddSponsorship() {
        closeModal()
        addSponsorshipMutation.mutate()
    }

    function handleUpdateSponsorship() {
        setIsEditSponsorshipModalOpen(false)
        editSponsorshipMutation.mutate()
    }

    function handleDeleteSponsorship() {
        deleteSponsorshipMutation.mutate()
    }


    useEffect(() => {
        if (data) {
            console.log(data)
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
                                edit={openEditSponsorshipModal}
                                remove={handleDeleteSponsorship}
                            />
                        )
                    }
                </div>
            </div>

            {/* Edit partner modal */}
            <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                <Heading text="Edit Partner" />
                <form>
                    <Input
                        name="name"
                        placeholder="Partner Name"

                    />
                    <Input
                        name="desc"
                        placeholder="Description"

                    />


                </form>

            </Modal>

            {/* Add sponsorship modal */}
            <Modal isOpen={isAddSponsorshipModalOpen} onClose={closeModal}>
                <Heading text="Add Sponsorship" />
                <form action={handleAddSponsorship}>
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
                            className="flex-1"
                            showLabel={true}
                            value={createSponsorshipDto?.amount ?? ""}
                            onChange={e => updateData(e, setCreateSponsorshipDto)}
                        />
                        <div>
                            <label htmlFor="currency" className="text-sm font-light">Select Currency</label>
                            <Select
                                name="currency"
                                value={String(createSponsorshipDto.currency) ?? ""}
                                onValueChange={(x) => setCreateSponsorshipDto({ ...createSponsorshipDto, currency: x })}
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
                            name="inkinddonation"
                            placeholder="In Kind Donation"
                            className="flex-1"
                            showLabel={true}
                            value={createSponsorshipDto?.inkinddonation ?? ""}
                            onChange={e => updateData(e, setCreateSponsorshipDto)}
                        />
                    </div>
                    <Button className="w-full">Add Sponsorship</Button>
                </form>
            </Modal>

            {/* Edit sponsorship modal */}
            <Modal isOpen={isEditSponsorshipModalOpen} onClose={closeModal}>
                <Heading text="Edit Sponsorship" />
                <form action={handleUpdateSponsorship}>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            maxLength={4}
                            className="flex-1"
                            showLabel={true}
                            value={editSponsorshipDto?.year ?? ""}
                            onChange={e => updateData(e, setEditSponsorshipDto)}
                        />
                        <Input
                            name="amount"
                            placeholder="Amount"
                            type="number"
                            className="flex-1"
                            showLabel={true}
                            value={editSponsorshipDto?.amount ?? ""}
                            onChange={e => updateData(e, setEditSponsorshipDto)}
                        />
                        <div>
                            <label htmlFor="currency" className="text-sm font-light">Select Currency</label>
                            <Select
                                name="currency"
                                value={String(editSponsorshipDto.currency) ?? ""}
                                onValueChange={(x) => setEditSponsorshipDto({ ...editSponsorshipDto, currency: x })}
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
                            name="inkinddonation"
                            placeholder="In-Kind Donation"
                            className="flex-1"
                            showLabel={true}
                            value={editSponsorshipDto?.inkinddonation ?? ""}
                            onChange={e => updateData(e, setEditSponsorshipDto)}
                        />
                    </div>
                    <Button className="w-full">Edit Sponsorship</Button>
                </form>
            </Modal>

        </Container>
    )
}