import Modal from "@/components/Dialog";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddStaff } from "@/hooks/use-admin";
import { updateData } from "@/utils/fn";
import type { CreateStaff } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function AddStaff() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const [step, setStep] = useState<number>(1)
    // For toggle date input types
    const [type, setType] = useState<boolean>(false)

    const [createStaffDto, setCreateStaffDto] = useState<Partial<CreateStaff>>({})
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

    function cleanUp() {
        queryClient.invalidateQueries({ queryKey: ['staff'] })
        setIsSuccessModalOpen(true)
    }

    function closeModal() {
        setIsSuccessModalOpen(false)
        navigate('/staff', { replace: true })
    }

    const { mutate, isPending, isError, error } = useAddStaff(createStaffDto as CreateStaff, cleanUp)

    function handlePrev() {
        setStep(prev => prev - 1)
    }

    function handleFormSubmit() {
        setStep(prev => prev + 1)
    }

    useEffect(() => {
        if (step === 4) {
            mutate()
        }
    }, [step, mutate])

    if (isPending) {
        return <SpinnerCustom />
    }

    if (isError) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div>
            <Header label="Add Staff" />
            <div className="w-11/12 p-5 md:p-10 md:max-w-[600px] m-auto rounded-2xl bg-white">
                {
                    step === 1 && (
                        <form action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Staff Information"
                            />
                            <div className="flex flex-col gap-4">

                                <Input
                                    name="firstName"
                                    placeholder="First Name"
                                    className="flex-1"
                                    value={createStaffDto.firstName ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                    required
                                />

                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="flex-1"
                                    value={createStaffDto.lastName ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                    required
                                />

                                <Input
                                    name="startDate"
                                    type={type ? "date" : "text"}
                                    placeholder="Start Date"
                                    onFocus={() => setType(true)}
                                    onBlur={() => setType(false)}
                                    value={createStaffDto.startDate ? new Date(createStaffDto?.startDate).toISOString().split("T")[0] : ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                    required
                                />

                                <Select
                                    name="isActive"
                                    onValueChange={value => {
                                        const bool = value === "yes"
                                        setCreateStaffDto({ ...createStaffDto, active: bool })
                                    }}
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

                                <Input
                                    name="role"
                                    placeholder="Position"
                                    value={createStaffDto.role ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />

                                <Input
                                    name="staffId"
                                    placeholder="Staff ID"
                                    value={createStaffDto.staffId ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                            </div>
                            <Button className="w-full">Next</Button>
                        </form>
                    )
                }
                {
                    step === 2 && (
                        <form action={handleFormSubmit} className="flex flex-col gap-10">
                            <Heading text="Contact Information" />
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Phone Number"
                                    name="phone"
                                    value={createStaffDto.phone ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />

                                <Input
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    value={createStaffDto.email ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />

                                <Input
                                    placeholder="Home Address"
                                    name="address"
                                    value={createStaffDto.address ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />

                                <Input
                                    placeholder="Location"
                                    name="location"
                                    value={createStaffDto.location ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline" type="button" onClick={handlePrev}>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

                {
                    step === 3 && (
                        <form action={handleFormSubmit} className="flex flex-col gap-10">
                            <Heading text="Emergency Contact" />
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Emergency Contact 1 Name"
                                    name="cpName1"
                                    value={createStaffDto.cpName1 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                                <Input
                                    placeholder="Relationship"
                                    name="cpRel1"
                                    value={createStaffDto.cpRel1 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                                <Input
                                    placeholder="Phone Number"
                                    name='cpPhone1'
                                    value={createStaffDto.cpPhone1 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}

                                />
                                <Input
                                    placeholder="Emergency Contact 2 Name"
                                    name="cpName2"
                                    value={createStaffDto.cpName2 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                                <Input
                                    placeholder="Relationship"
                                    name="cpRel2"
                                    value={createStaffDto.cpRel2 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                                <Input
                                    placeholder="Phone Number"
                                    name='cpPhone2'
                                    value={createStaffDto.cpPhone2 ?? ""}
                                    onChange={e => updateData(e, setCreateStaffDto)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline">Previous</Button>
                                <Button className="flex-1">Add Staff</Button>
                            </div>
                        </form>
                    )
                }
            </div>
            <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <CircleCheck size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Staff Added</h3>
                            <p className="font-light text-center">Staff added successfully</p>
                        </div>
                    </div>
                    <Button className="w-full" onClick={closeModal}>Okay</Button>
                </div>
            </Modal>
        </div>
    )
}