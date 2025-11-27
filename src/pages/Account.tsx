import { TooltipButton } from "@/components/ButtonWithTip";
import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import ErrorLayout from "@/components/ErrorLayout";
import Heading from "@/components/Heading";
import LoadingLayout from "@/components/LoadingLayout";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TokenContext } from "@/context/TokenContext";
import { useUpdateStaff, useUpdateUser, useUpdateVolunteer } from "@/hooks/use-admin";
import { useGetProfile } from "@/hooks/useGetProfile";
import { dateFormatter, extractInitials, extractNames, updateData } from "@/utils/fn";
import type { EditUserDto, EditVolunteerDto, StaffDetails, VolunteerDetails } from "@/utils/types";
import { CircleCheckBig, Eye, EyeOff, Pencil } from "lucide-react";
import { useContext, useEffect, useState } from "react";

export function Account() {
    const value = sessionStorage.getItem("myToken")
    const token = useContext(TokenContext) || value
    const { data, isLoading, isError, error, refetch } = useGetProfile(token as string)

    const isStaff = data?.staff?.id ? true : false
    const isVolunteer = data?.volunteer?.id ? true : false

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

    // Edit Dtos
    const [editDto, setEditDto] = useState<EditUserDto>({})
    const [editStaffDto, setEditStaffDto] = useState<Partial<StaffDetails>>()
    const [editVolunteerDto, setEditVolunteerDto] = useState<EditVolunteerDto>({})

    // Mutation fns for account details
    const updateAccountMutation = useUpdateUser(cleanUp)

    // Mutation fns
    const updateVolunteerMutation = useUpdateVolunteer(String(data!.volunteer?.id), editVolunteerDto, refetch)

    const updateStaffMutation = useUpdateStaff(String(data!.staff?.id), editStaffDto as StaffDetails, refetch)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
        setIsEditModalOpen(false)
        setIsSuccessModalOpen(false)
    }

    function togglePassVisibility() {
        setIsPasswordVisible(prev => !prev)
    }

    function handlePasswordChange() {
        closeModal()
        updateAccountMutation.mutate({ id: data!.id!, data: editDto })
    }

    function handleUpdate() {
        closeModal()
        if (isStaff) {
            updateStaffMutation.mutate()
        } else if (isVolunteer) {
            updateVolunteerMutation.mutate()
        } else {
            updateAccountMutation.mutate({ id: data!.id!, data: editDto })
        }
    }

    function cleanUp() {
        setIsSuccessModalOpen(true)
        setEditDto({ ...editDto, password: "" })
        refetch()
    }

    useEffect(() => {
        if (data) {
            if (isStaff) {
                setEditStaffDto(data.staff as StaffDetails)
            } else if (isVolunteer) {
                setEditVolunteerDto(data.volunteer as VolunteerDetails)
            } else {
                setEditDto({ firstName: data.firstName, lastName: data.lastName })
            }
        }
    }, [data, isStaff, isVolunteer])

    // Rendering
    if (isLoading || updateAccountMutation.isPending || updateStaffMutation.isPending || updateVolunteerMutation.isPending) {
        return (<LoadingLayout label="Account Information" />)
    }

    if (
        isError ||
        updateAccountMutation.isError ||
        updateStaffMutation.isError ||
        updateVolunteerMutation.isError
    ) {
        return (
            <ErrorLayout
                label="Acccount Information"
                text={
                    error?.message ||
                    updateAccountMutation.error?.message ||
                    updateStaffMutation.error?.message ||
                    updateVolunteerMutation.error?.message ||
                    "Error"
                }
            />
        );
    }

    if (data) {
        const initials = data.staff ? extractInitials(data.staff.firstName, data.staff.lastName) : (data.volunteer) ?
            extractInitials(data.volunteer.firstName, data.volunteer.lastName) : (data.firstName && data.lastName) ? extractInitials(data.firstName, data.lastName) : `VF`;

        return (
            <Container label="Account Information">
                <div className="space-y-10">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">

                            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF] p-2">
                                <p className="text-xl font-bold text-[#008BCC]">{initials}</p>
                            </div>
                            <div className="space-y-[-6px]">
                                <h6 className="text-[#171717] text-lg font-bold">{extractNames(data)}</h6>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <TooltipButton tooltip="Edit Profile" variant="ghost" size="icon" onClick={openEditModal}>
                                <Pencil color="#171717" />
                            </TooltipButton>
                        </div>
                    </div>

                    <Button onClick={openModal}>Change Password</Button>
                </div>

                {
                    (isStaff || isVolunteer) &&
                    <>
                        <div className="flex flex-col md:flex-row gap-10">

                            <div className="flex-1 flex flex-col gap-10">
                                <div>
                                    <Heading
                                        text="Personal Details"
                                    />
                                    <div className="mt-4 flex flex-col gap-2">
                                        <Row
                                            label="Start Date"
                                            value={dateFormatter(data.staff?.startDate || data.volunteer?.startDate) || ""}
                                        />
                                        {isStaff &&
                                            <>
                                                <Row
                                                    label="Role"
                                                    value={data.staff?.role}
                                                />

                                                <Row
                                                    label="Staff ID"
                                                    value={data.staff?.staffId}
                                                />

                                            </>}
                                    </div>
                                </div>

                                <div>
                                    <Heading
                                        text="Contact"
                                    />
                                    <div className="mt-4 flex flex-col gap-2">
                                        <Row
                                            label="Phone Number"
                                            value={data.staff?.phone || data.volunteer?.phone}
                                        />

                                        <Row
                                            label="Email Address"
                                            value={data.staff?.email || data.volunteer?.email}
                                        />

                                        <Row
                                            label="Location"
                                            value={data.staff?.location || data.volunteer?.location}
                                        />

                                        <Row
                                            label="House Address"
                                            value={data.staff?.address || data.volunteer?.address}
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
                                            value={data.staff?.cpName1 || data.volunteer?.cpName1}
                                        />

                                        <Row
                                            label="Relation"
                                            value={data.staff?.cpRel1 || data.volunteer?.cpRel1}
                                        />

                                        <Row
                                            label="Contact"
                                            value={data.staff?.cpPhone1 || data.volunteer?.cpPhone1}
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
                                            value={data.staff?.cpName2 || data.volunteer?.cpName2}
                                        />

                                        <Row
                                            label="Relation"
                                            value={data.staff?.cpRel2 || data.volunteer?.cpRel2}
                                        />

                                        <Row
                                            label="Contact"
                                            value={data.staff?.cpPhone2 || data.volunteer?.cpPhone2}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                }

                {/* Change password modal */}
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Heading text="Change Password" />
                    <form action={handlePasswordChange}>
                        <div className="flex gap-2 items-end mb-5">
                            <Input
                                name="password"
                                placeholder="Password"
                                type={isPasswordVisible ? "text" : "password"}
                                minLength={6}
                                required
                                className="flex-1"
                                showLabel={true}
                                value={editDto?.password ?? ""}
                                onChange={e => updateData(e, setEditDto)}
                            />
                            <Button type="button" variant="ghost" size="icon" onClick={togglePassVisibility}>
                                {
                                    isPasswordVisible ? <EyeOff /> : <Eye />
                                }
                            </Button>
                        </div>
                        <Button className="w-full">Change Password</Button>
                    </form>
                </Modal>

                {/* Edit modal */}
                <Modal isOpen={isEditModalOpen} onClose={closeModal}>
                    <Heading text={`Edit ${isStaff ? "Staff" : "Volunteer"} Details`} />

                    <form action={handleUpdate}>
                        {
                            isStaff ? (
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
                                        value={editStaffDto?.startDate ? new Date(editStaffDto?.startDate).toISOString().split("T")[0] : ""
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
                                        name="cpPhone1"
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
                            ) : isVolunteer ? (
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

                                    {!editVolunteerDto.active &&
                                        <Input
                                            name="endDate"
                                            type="date"
                                            placeholder="End Date"
                                            showLabel={true}
                                            value={editVolunteerDto?.startDate ? new Date(editVolunteerDto.endDate!).toISOString().split("T")[0] : ""
                                            }
                                            onChange={e => updateData(e, setEditVolunteerDto)}
                                        />}

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
                                        name="cpPhone1"
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
                                </div>) : (
                                <div className="flex flex-col gap-4 mb-5">
                                    <Input
                                        name="firstName"
                                        placeholder="First Name"
                                        className="flex-1"
                                        showLabel={true}
                                        value={editDto?.firstName ?? ""}
                                        onChange={e => updateData(e, setEditDto)}
                                    />

                                    <Input
                                        name="lastName"
                                        placeholder="Last Name"
                                        className="flex-1"
                                        showLabel={true}
                                        value={editDto?.lastName ?? ""}
                                        onChange={e => updateData(e, setEditDto)}
                                    />

                                </div>
                            )

                        }
                        <Button className="w-full">Update</Button>
                    </form>

                </Modal>

                {/* Success modal */}
                <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
                    <div className="space-y-10">
                        <div className="space-y-8">
                            <CircleCheckBig size={90} className="mx-auto text-green-600" />
                            <div>
                                <h3 className="font-bold text-3xl text-center">Update Successful</h3>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Button variant='default' className="flex-1" onClick={closeModal}>Close</Button>

                        </div>
                    </div>
                </Modal>
            </Container>
        )
    }

}