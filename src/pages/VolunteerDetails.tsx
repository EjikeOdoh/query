import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetVolunteerDetails } from "@/hooks/use-admin";
import { dateFormatter, updateData } from "@/utils/fn";
import type { CreateVolunteer } from "@/utils/types";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";

export default function VolunteerDetails() {

    const {volunteerId} = useParams()

        const {isLoading, isError, error, data} = useGetVolunteerDetails(volunteerId!)

       const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
       const [editVolunteerDto, setEditVolunteerDto] = useState<Partial<CreateVolunteer>>({})
    
        function openEditModal() {
            setIsEditModalOpen(true)
        }
    
        function closeEditModal() {
            setIsEditModalOpen(false)
        }

        function handleDelete() {
        }

        function handleUpdate() {}

           useEffect(() => {
                if (data) {
                    setEditVolunteerDto(data)
                }
            }, [data])

        if (isLoading) {
            return <span>Loading...</span>
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
                                <small>{data?.program}</small>
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

                    <div className="flex gap-10">

                        <div className="flex-1 flex flex-col gap-10">
                            <div>
                                <Heading
                                    text="Personal Details"
                                />
                                <div className="mt-4 flex flex-col gap-2">
                                    <Row
                                        label="Start Date"
                                        value={dateFormatter(data?.startDate!)}
                                    />

                                    <Row
                                        label="Status"
                                        value={data?.active ? "Active" : "Inactive"}
                                    />
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

                    <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <Heading text="Edit Staff Details" />

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
                            value={editVolunteerDto?.startDate ? new Date(editVolunteerDto?.startDate!).toISOString().split("T")[0] : ""
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
                    </div>

                    <Button className="w-full">Update</Button>
                </form>

            </Modal>
        </Container>
    )
}