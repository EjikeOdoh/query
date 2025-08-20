import Modal from "@/components/Dialog";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useDeleteStaff, useGetStaffDetails, useUpdateStaff } from "@/hooks/use-admin";
import { dateFormatter, updateData } from "@/utils/fn";
import { type StaffDetails } from "@/utils/types";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router";

export default function StaffDetails() {

    const navigate = useNavigate()
    const { staffId } = useParams()

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function closeEditModal() {
        setIsEditModalOpen(false)
    }

    const { isLoading, isError, error, data, refetch } = useGetStaffDetails(Number(staffId))
    const [editStaffDto, setEditStaffDto] = useState<Partial<StaffDetails>>(data!)

    const updateStaffMutation = useUpdateStaff(staffId!, editStaffDto, refetch)
    const deleteStaffMutation = useDeleteStaff(staffId!, () => navigate('/staff', { replace: true }))

    function handleUpdate() {
        closeEditModal()
        updateStaffMutation.mutate()
    }

    function handleDelete() {
        deleteStaffMutation.mutate()
    }

    useEffect(() => {
        if (data) {
            setEditStaffDto(data)
        }
    }, [data])

    if (isLoading || updateStaffMutation.isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        console.log(error)
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="flex flex-col">
            <Header label="Staff Information" />
            <div className="pb-10">
                <div className="w-11/12 m-auto bg-white py-10 px-14 rounded-2xl space-y-10">
                    <div>
                        <NavLink to="/staff" className="flex items-center gap-2 text-[#171717] font-light text-xs">
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
                                <small>{data?.role}</small>
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
                            value={editStaffDto?.firstName ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            className="flex-1"
                            showLabel={true}
                            value={editStaffDto?.lastName ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="startDate"
                            type="date"
                            placeholder="Date of Employment"
                            showLabel={true}
                            value={editStaffDto?.startDate ? new Date(editStaffDto?.startDate!).toISOString().split("T")[0] : ""
                            }
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="role"
                            placeholder="Position"
                            showLabel={true}
                            value={editStaffDto?.role ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="staffId"
                            placeholder="Staff ID"
                            showLabel={true}
                            value={editStaffDto?.staffId ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />
                        <div>
                            <label className="text-sm text-[#3d3d3d]">Active?</label>
                            <Select
                                name="active"
                                onValueChange={x => setEditStaffDto({ ...editStaffDto, active: x === "yes" ? true : false })}
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
                            value={editStaffDto?.phone ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="email"
                            placeholder="Email Address"
                            type="email"
                            showLabel={true}
                            value={editStaffDto?.email ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="address"
                            placeholder="Home Address"
                            showLabel={true}
                            value={editStaffDto?.address ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="location"
                            placeholder="Location"
                            showLabel={true}
                            value={editStaffDto?.location ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="cpName1"
                            placeholder="Emergency Contact 1 Name"
                            showLabel={true}
                            value={editStaffDto?.cpName1 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />
                        <Input
                            name="cpRel1"
                            placeholder="Relationship"
                            showLabel={true}
                            value={editStaffDto?.cpRel1 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="cpPhone"
                            placeholder="Phone Number"
                            showLabel={true}
                            value={editStaffDto?.cpPhone1 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="cpName2"
                            placeholder="Emergency Contact 2 Name"
                            showLabel={true}
                            value={editStaffDto?.cpName2 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="cpRel2"
                            placeholder="Relationship"
                            showLabel={true}
                            value={editStaffDto?.cpRel2 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />

                        <Input
                            name="cpPhone2"
                            placeholder="Phone Number"
                            showLabel={true}
                            value={editStaffDto?.cpPhone2 ?? ""}
                            onChange={e => updateData(e, setEditStaffDto)}
                        />
                    </div>

                    <Button className="w-full">Update</Button>
                </form>

            </Modal>
        </div>
    )
}