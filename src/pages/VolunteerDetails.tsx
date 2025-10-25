import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import Row from "@/components/Row";
import { Active, Inactive } from "@/components/Tags";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddVP, useDeleteVolunteer, useGetVolunteerDetails, useUpdateVolunteer } from "@/hooks/use-admin";
import { dateFormatter, updateData } from "@/utils/fn";
import type { EditVolunteerDto, ProgramStat, VolunteerParticipation } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";


export default function VolunteerDetails() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { volunteerId } = useParams()

    const queryClient = useQueryClient()
    const programs = queryClient.getQueryData(['programs']) as ProgramStat[]

    const { isLoading, isError, error, data, refetch } = useGetVolunteerDetails(volunteerId!)

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(state)
    const [isAddProgramModalOpen, setIsAddProgramModalOpen] = useState<boolean>(false)
    const [editVolunteerDto, setEditVolunteerDto] = useState<EditVolunteerDto>({})
    const [addProgramDto, setAddProgramDto] = useState<Partial<VolunteerParticipation>>({
        volunteerId: Number(volunteerId)
    })

    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)

    function openDeleteModal() {
        setIsDeleteModalOpen(true)
    }

    function cleanUp() {
        queryClient.invalidateQueries({ queryKey: ['volunteers'] })
        navigate('/volunteers', { replace: true })
    }

    const updateVolunteerMutation = useUpdateVolunteer(volunteerId!, editVolunteerDto, () => {
        refetch()
        queryClient.invalidateQueries({ queryKey: ['volunteers'] })
    })
    const deleteVolunteerMutation = useDeleteVolunteer(volunteerId!, cleanUp)

    const addProgramMutation = useAddVP(addProgramDto as VolunteerParticipation, refetch)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    // Close all modals
    function closeEditModal() {
        setIsEditModalOpen(false)
        setIsAddProgramModalOpen(false)
        setIsDeleteModalOpen(false)
    }

    function openAddProgramModal() {
        setIsAddProgramModalOpen(true)
    }

    function handleDelete() {
        closeEditModal()
        deleteVolunteerMutation.mutate()
    }

    function handleUpdate() {
        closeEditModal()
        updateVolunteerMutation.mutate()
    }

    function handleAddProgram() {
        closeEditModal()
        addProgramMutation.mutate()
    }

    useEffect(() => {
        if (data) {
            const { participations, ...rest } = data
            void participations;
            setEditVolunteerDto(rest)
        }
    }, [data])

    if (isLoading || updateVolunteerMutation.isPending) {
        return   <SpinnerCustom />
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }


    return (
        <Container label="Volunteer Information">
            <div className="w-fit">
                <NavLink to="/volunteers" className="flex items-center gap-2 text-[#171717] font-light text-xs" replace={true}>
                    <ChevronLeft color="#171717" size={14} />
                    Back to Dashboard
                </NavLink>
            </div>

            <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF]">
                        <p className="text-3xl font-semibold text-[#008BCC]">
                            {data?.firstName[0]}{data?.lastName[0]}
                        </p>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-black">{data?.firstName} {data?.lastName}</h1>
                        {data?.active ? <Active /> : <Inactive />}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" onClick={openEditModal}>
                        <Pencil color="#171717" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={openDeleteModal}>
                        <Trash2 color="#171717" />
                    </Button>
                </div>

            </div>

            {
                data?.type === "REGULAR" ? (
                    <div className="flex flex-col md:flex-row gap-10">
                        <div className="flex-1 flex flex-col gap-10">
                            <div>
                                <Heading
                                    text="Personal Details"
                                />
                                <div className="mt-4 flex flex-col gap-2">
                                    <Row
                                        label="Start Date"
                                        value={dateFormatter(data.startDate!)}
                                    />

                                    {!data.active && (
                                        <Row
                                            label="End Date"
                                            value={dateFormatter(data.endDate!)}
                                        />
                                    )}

                                </div>
                            </div>

                            <div>
                                <Heading
                                    text="Contact"
                                />
                                <div className="mt-4 flex flex-col gap-2">
                                    <Row
                                        label="Phone Number"
                                        value={data?.phone}
                                    />

                                    <Row
                                        label="Email Address"
                                        value={data?.email}
                                    />

                                    <Row
                                        label="Location"
                                        value={data?.location}
                                    />

                                    <Row
                                        label="House Address"
                                        value={data?.address}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-10">
                            <div className="">
                                <Heading
                                    text="Emergency Contact"
                                />
                                <div className="mt-4 flex flex-col gap-2">

                                    <Row
                                        label="Name"
                                        value={data?.cpName1}
                                    />

                                    <Row
                                        label="Relation"
                                        value={data?.cpRel1}
                                    />

                                    <Row
                                        label="Contact"
                                        value={data?.cpPhone1}
                                    />
                                </div>
                            </div>
                            <div className="">
                                <Heading
                                    text="Emergency Contact"
                                />
                                <div className="mt-4 flex flex-col gap-2">

                                    <Row
                                        label="Name"
                                        value={data?.cpName2}
                                    />

                                    <Row
                                        label="Relation"
                                        value={data?.cpRel2}
                                    />

                                    <Row
                                        label="Contact"
                                        value={data?.cpPhone2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div>
                            <Heading
                                text="Contact"
                            />
                            <div className="flex gap-10 mt-4">
                                <div className="flex-1 flex flex-col gap-2">
                                    <Row
                                        label="Phone Number"
                                        value={data?.phone}
                                    />

                                    <Row
                                        label="Email Address"
                                        value={data?.email}
                                    />
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <Row
                                        label="Location"
                                        value={data?.location}
                                    />

                                    <Row
                                        label="House Address"
                                        value={data?.address}
                                    />
                                </div>
                            </div>

                        </div>

                        {/* Participation table */}
                        <div className="space-y-5">
                            <div className="flex justify-between items-center">
                                <Heading text="Programs Volunteered" />
                                <Button
                                    onClick={openAddProgramModal}
                                >Add Program</Button>
                            </div>

                            <Table className="rounded-xl overflow-hidden">
                                <TableHeader className="">
                                    <TableRow className="bg-[#E6F7FF]">
                                        <TableHead className="text-[#808080] text-sm font-light min-w-28">Program</TableHead>
                                        <TableHead className="text-[#808080] text-sm font-light min-w-28">Year</TableHead>
                                        <TableHead className="text-[#808080] text-sm font-light min-w-28">Quarter</TableHead>
                                        <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data?.participations.map(particpation => (
                                        <TableRow key={particpation.id}>
                                            <TableCell className="text-[#171717] text-sm font-light">{particpation.program}</TableCell>
                                            <TableCell className="text-[#171717] text-sm font-light">{particpation.year}</TableCell>
                                            <TableCell className="text-[#171717] text-sm font-light">{particpation.quarter}</TableCell>
                                            <TableCell className="flex items-center justify-center gap-2">
                                                <Button variant="ghost" size="icon"
                                                // onClick={() => openEditParticipationModal(particpation.participation_id)}
                                                >
                                                    <Pencil color="#171717" />
                                                </Button>
                                                <Button variant="ghost" size="icon"
                                                // onClick={() => handleDeleteParticipation(particpation.participation_id)}
                                                >
                                                    <Trash2 color="#171717" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                        </div>
                    </div>
                )
            }

            {/* Edit Volunteer modal */}
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <Heading text="Edit Volunteer Details" />

                <form action={handleUpdate}>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            className="flex-1"
                            showLabel={true}
                            value={editVolunteerDto?.firstName ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            className="flex-1"
                            showLabel={true}
                            value={editVolunteerDto?.lastName ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="startDate"
                            type="date"
                            placeholder="Start Date"
                            showLabel={true}
                            value={editVolunteerDto?.startDate ? new Date(editVolunteerDto.startDate!).toISOString().split("T")[0] : ""
                            }
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />
                        <div>
                            <label className="text-sm text-[#3d3d3d]">Active?</label>
                            <Select
                                name="active"
                                onValueChange={x => setEditVolunteerDto({ ...editVolunteerDto, active: x === "yes" ? true : false })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Active?" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        <SelectItem value="yes">Yes</SelectItem>
                                        <SelectItem value="no">No</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Input
                            name="phone"
                            placeholder="Phone Number"
                            showLabel={true}
                            value={editVolunteerDto?.phone ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="email"
                            placeholder="Email Address"
                            type="email"
                            showLabel={true}
                            value={editVolunteerDto?.email ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="address"
                            placeholder="Home Address"
                            showLabel={true}
                            value={editVolunteerDto?.address ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="location"
                            placeholder="Location"
                            showLabel={true}
                            value={editVolunteerDto?.location ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />

                        <Input
                            name="skillSet"
                            placeholder="Skillset"
                            showLabel={true}
                            value={editVolunteerDto?.skillSet ?? ""}
                            onChange={e => updateData(e, setEditVolunteerDto)}
                        />
                        {
                            data?.type === "REGULAR" && (
                                <>
                                    <Input
                                        name="cpName1"
                                        placeholder="Emergency Contact 1 Name"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpName1 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />
                                    <Input
                                        name="cpRel1"
                                        placeholder="Relationship"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpRel1 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />

                                    <Input
                                        name="cpPhone"
                                        placeholder="Phone Number"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpPhone1 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />

                                    <Input
                                        name="cpName2"
                                        placeholder="Emergency Contact 2 Name"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpName2 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />

                                    <Input
                                        name="cpRel2"
                                        placeholder="Relationship"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpRel2 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />

                                    <Input
                                        name="cpPhone2"
                                        placeholder="Phone Number"
                                        showLabel={true}
                                        value={editVolunteerDto?.cpPhone2 ?? ""}
                                        onChange={e => updateData(e, setEditVolunteerDto)}
                                    />
                                </>
                            )
                        }
                    </div>

                    <Button className="w-full">Update</Button>
                </form>

            </Modal>

            {/* Add volunteer program modal */}
            <Modal isOpen={isAddProgramModalOpen} onClose={closeEditModal}>
                <Heading text="Add Program" />
                <form
                    className="flex flex-col gap-10"
                    onSubmit={handleAddProgram}
                >
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="program" className="text-sm font-light">Select Program</label>
                            <Select
                                name="program"
                                required
                                value={String(addProgramDto.programId)}
                                onValueChange={(x) => setAddProgramDto({ ...addProgramDto, programId: Number(x) })}
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
                            name="year"
                            required
                            placeholder="Year"
                            maxLength={4}
                            showLabel={true}
                            value={addProgramDto.year ?? ""}
                            onChange={e => updateData(e, setAddProgramDto)}
                        />

                        <div>
                            <label htmlFor="quarter" className="text-sm font-light">Select Quarter</label>
                            <Select
                                name="quarter"
                                required
                                onValueChange={(x) => setAddProgramDto({ ...addProgramDto, quarter: Number(x) })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Select Quarter" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectGroup>
                                        <SelectItem value="1">First</SelectItem>
                                        <SelectItem value="2">Second</SelectItem>
                                        <SelectItem value="3">Third</SelectItem>
                                        <SelectItem value="4">Fourth</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button className="w-full">Add Program</Button>
                </form>
            </Modal>

            {/* Delete Volunteer modal */}
            <Modal isOpen={isDeleteModalOpen} onClose={closeEditModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <Trash2 size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Delete Volunteer</h3>
                            <p className="font-light text-center">Are you sure you want to delete this volunteer?</p>

                        </div>

                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant='outline' className="flex-1" onClick={closeEditModal}>No</Button>
                        <Button variant="destructive" className="flex-1" onClick={handleDelete}>Yes, Delete</Button>
                    </div>
                </div>
            </Modal>
        </Container>
    )
}