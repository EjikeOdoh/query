import Modal from "@/components/Dialog";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";

export default function StaffDetails() {

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function closeEditModal() {
        setIsEditModalOpen(false)
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
                                <p className="text-3xl font-semibold text-[#008BCC]">EO</p>
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-black">Ejike Odoh</h1>
                                <small>Head Instructor</small>
                            </div>
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Button variant="ghost" size="icon" onClick={openEditModal}>
                                <Pencil color="#171717" />
                            </Button>
                            <Button variant="ghost" size="icon">
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
                                        value="April 15, 2024"
                                    />

                                    <Row
                                        label="Status"
                                        value="Active"
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
                                        value="April 15, 2024"
                                    />

                                    <Row
                                        label="Email Address"
                                        value="Active"
                                    />

                                    <Row
                                        label="Location"
                                        value="Active"
                                    />

                                    <Row
                                        label="House Address"
                                        value="Active"
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
                                        value=""
                                    />

                                    <Row
                                        label="Relation"
                                        value=""
                                    />

                                    <Row
                                        label="Contact"
                                        value=""
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
                                        value=""
                                    />

                                    <Row
                                        label="Relation"
                                        value=""
                                    />

                                    <Row
                                        label="Contact"
                                        value=""
                                    />
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
                <Heading text="Edit Staff Details" />

                <form>
                    <div className="flex flex-col gap-4 mb-5">
                        <Input
                            name="firstName"
                            placeholder="First Name"
                            className="flex-1"
                            showLabel={true}
                        />

                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            className="flex-1"
                            showLabel={true}
                        />

                        <Input
                            name="year"
                            type="date"
                            placeholder="Date of Employment"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Position"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Staff ID"
                            showLabel={true}
                        />
                        <div>
                            <label className="text-sm text-[#3d3d3d]">Active?</label>
                            <Select
                                name="isActive"
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
                            placeholder="Phone Number"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Email Address"
                            type="email"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Home Address"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Location"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Emergency Contact 1 Name"
                            showLabel={true}
                        />
                        <Input
                            placeholder="Relationship"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Phone Number"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Emergency Contact 2 Name"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Relationship"
                            showLabel={true}
                        />

                        <Input
                            placeholder="Phone Number"
                            showLabel={true}
                        />
                    </div>

                    <Button className="w-full">Update</Button>
                </form>

            </Modal>
        </div>
    )
}