import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import Row from "@/components/Row";
import SponsorshipTable from "@/components/SponsorshipTable";
import { Active, Inactive } from "@/components/Tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddSponsorship, useDeleteSponsorship, useEditSponsorship, useGetPartner, useUpdatePartner } from "@/hooks/use-admin";
import { editPartner, updateData } from "@/utils/fn";
import type { CreateSponsorshipDto, EditPartnerDetailsDto, EditSponsorshipDto, ProgramStat } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

export default function PartnerDetails() {
    const { partnerId } = useParams()

    const queryClient = useQueryClient()
    const programs = queryClient.getQueryData(['programs']) as ProgramStat[]

    const { isLoading, isError, error, data, refetch } = useGetPartner(Number(partnerId))

    function cleanUp() {
        refetch()
        queryClient.invalidateQueries({
            queryKey: ['partners']
        })
    }

    // Partner details variables
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [editPartnerDto, setEditPartnerDto] = useState<EditPartnerDetailsDto>({})
    const [isStatusModalOpen, setIsStatusModalOpen] = useState<boolean>(false)

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
    const [editSponsorshipDto, setEditSponsorshipDto] = useState<EditSponsorshipDto>(data?.sponsorships?.find(x => x.id === sId) || {})

// Update picture and other properties
    const { mutate, isPending,  } = useMutation({
        mutationFn: (x: FormData) => editPartner(Number(partnerId), x),
        onSuccess: refetch
    })

// Update status
    const updateStatusMutation = useUpdatePartner(Number(partnerId), editPartnerDto, cleanUp)

    const addSponsorshipMutation = useAddSponsorship(createSponsorshipDto, refetch)
    const editSponsorshipMutation = useEditSponsorship(sId!,
        { inkinddonation: editSponsorshipDto.inkinddonation, amount: editSponsorshipDto.amount, currency: editSponsorshipDto.currency, year: editSponsorshipDto.year }
        , refetch)
    const deleteSponsorshipMutation = useDeleteSponsorship(sId!, refetch)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function openUpdateStatusModal() {
        setIsStatusModalOpen(true)
    }

    function openAddSponsorshipModal() {
        setIsAddSponsorshipModalOpen(true)
    }

    function openEditSponsorshipModal(id: number) {
        setSId(id)
        setEditSponsorshipDto(data?.sponsorships.find(x => x.id === id) || {})
        setIsEditSponsorshipModalOpen(true)
    }

    function closeModal() {
        setIsEditModalOpen(false)
        setIsAddSponsorshipModalOpen(false)
        setIsEditSponsorshipModalOpen(false)
        setIsStatusModalOpen(false)
    }


    function handleAddSponsorship() {
        closeModal()
        addSponsorshipMutation.mutate()
    }

    function handleUpdateSponsorship() {
        closeModal()
        editSponsorshipMutation.mutate()
    }

    function handleDeleteSponsorship() {
        deleteSponsorshipMutation.mutate()
    }

    function handleUpdate(x: FormData) {
        closeModal()
        mutate(x)
    }

    function handleUpdateStatus() {
        console.log(editPartnerDto)
        closeModal()
        updateStatusMutation.mutate()
    }

    function handleDelete() {

    }


    useEffect(() => {
        if (data) {
            const { id, sponsorships, ...rest } = data
            void id
            void sponsorships
            setEditPartnerDto(rest)
        }
    }, [data])

    if (isLoading || isPending || updateStatusMutation.isPending) {
        return <SpinnerCustom />
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    const { desc, logoUrl, name, year, isActive, linkedIn, sponsorships, twitter } = data!

    return (
        <Container label="Partner Details">
            <div className="space-y-10">
                <div className="w-fit">
                    <NavLink to="/partners" className="flex items-center gap-2 text-[#171717] font-light text-xs" replace={true}>
                        <ChevronLeft color="#171717" size={14} />
                        Back to Partners
                    </NavLink>
                </div>

                <div className="flex items-start justify-between">
                    <div className="flex flex-col md:flex-row gap-4 items-start">
                        {
                            logoUrl && <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-clip">
                                <img src={logoUrl} />
                            </div>
                        }

                        <div>
                            <h1 className="text-2xl font-bold">{name}</h1>
                            {(!!year) && <p className="text-xs">Since {year}</p>}
                            <div className="flex items-center gap-2 mt-2">
                                {isActive ? <Active /> : <Inactive />}
                                <Button variant='link'
                                    onClick={openUpdateStatusModal}
                                    className="text-[10px]"
                                >Change status</Button>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" onClick={openEditModal}>
                            <Pencil color="#171717" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={handleDelete}>
                            <Trash2 color="#171717" />
                        </Button>
                    </div>
                </div>

                {/* Meta data */}
                <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-20">
                    <div className="flex-1 space-y-5">
                        <Heading text="Description" />
                        <p className="text-sm text-[#171717]">{desc || <span className="font-light text-sm text-[#171717] italic">Not provided</span>}</p>
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

            {/* Edit partner details */}
            <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                <Heading text="Edit Partner Information" />
                <form action={handleUpdate} className="space-y-5">
                    <Input
                        name="name"
                        placeholder="Name"
                        showLabel={true}
                        defaultValue={editPartnerDto.name}
                    />
                    <Input
                        name="desc"
                        placeholder="Description"
                        showLabel={true}
                        defaultValue={editPartnerDto.desc}
                    />
                    <Input
                        name="twitter"
                        placeholder="Twitter"
                        showLabel={true}
                        defaultValue={editPartnerDto.twitter}
                    />
                    <Input
                        name="linkedIn"
                        placeholder="LinkedIn"
                        showLabel={true}
                        defaultValue={editPartnerDto.linkedIn}
                    />
                    <Input
                        name="year"
                        type="number"
                        placeholder="Year"
                        showLabel={true}
                        maxLength={4}
                        defaultValue={editPartnerDto.year ?? 0}
                    />
                    <Input
                        name="logo"
                        type="file"
                        placeholder="Logo"
                        showLabel={true}
                    />

                    <Button className="w-full mt-5">Update</Button>
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
                                value={String(createSponsorshipDto.programId)}
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
                                value={String(createSponsorshipDto.currency)}
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
                            placeholder="In-Kind Donation"
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
                                value={String(editSponsorshipDto.currency)}
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

            {/* Edit status Modal */}
            <Modal isOpen={isStatusModalOpen} onClose={closeModal}>
                <form action={handleUpdateStatus}>
                    <Heading text="Update Partner Status" />
                    <div className="my-5">
                        <label className="text-sm text-[#3d3d3d]">Active?</label>
                        <Select
                            name="isActive"
                            onValueChange={(val) => {
                                const boolVal = val === "yes";
                                setEditPartnerDto({ ...editPartnerDto, isActive: boolVal });
                            }}
                        >
                            <SelectTrigger className="flex-1 p-6 w-full">
                                <SelectValue placeholder="Active?" />
                            </SelectTrigger>
                            <SelectContent className="bg-white py-4 w-full">
                                <SelectGroup>
                                    <SelectItem value="yes">Yes</SelectItem>
                                    <SelectItem value="no">No</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="w-full">Update Status</Button>
                </form>
            </Modal>

        </Container>
    )
}