import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import Heading from "@/components/Heading";
import { SpinnerCustom } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAddVolunteer } from "@/hooks/use-admin";
import { updateData } from "@/utils/fn";
import { type CreateVolunteer, type ProgramStat } from "@/utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { CircleCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function AddVolunteer() {

    const navigate = useNavigate()

    const [step, setStep] = useState<number>(0)
    const [type, setType] = useState<boolean>(false)

    const queryClient = useQueryClient()
    const programs = queryClient.getQueryData(['programs']) as ProgramStat[]

    const [createDto, setCreateDto] = useState<Partial<CreateVolunteer>>({})
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

    function cleanUp() {
        queryClient.invalidateQueries({ queryKey: ['volunteers'] })
        setIsSuccessModalOpen(true)
    }

    function closeModal() {
        setIsSuccessModalOpen(false)
        navigate('/volunteers', { replace: true })
    }

    function handleFormSubmit() {
        if (createDto.type) {
            setStep(prev => prev + 1)
        }
    }

    function previousStep() {
        setStep(prev => prev - 1)
    }

    const { mutate, isPending } = useAddVolunteer(createDto as CreateVolunteer, cleanUp)

    useEffect(() => {
        if ((createDto.type === 'PROGRAM' && step === 3) || step === 4) {
            mutate()
        }
    }, [step, createDto, mutate])

    if (isPending) {
        return (
            <SpinnerCustom />
        )
    }

    return (
        <Container label="Add Volunteer">
            <div className="w-[600px] m-auto">

                {step === 0 && (
                    <form action={handleFormSubmit}
                        className="flex flex-col gap-10"
                    >
                        <Heading
                            text="Volunteer Type"
                        />
                        <div className="flex flex-col gap-4">
                            <Select
                                name="type"
                                required={true}
                                value={createDto.type === undefined ? "" : createDto.type}
                                onValueChange={x => setCreateDto({ ...createDto, type: x })}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Volunteer Type" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        <SelectItem value="REGULAR">Regular</SelectItem>
                                        <SelectItem value="PROGRAM">Program</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            {createDto.type === "PROGRAM" ?
                                <>
                                    <Select
                                        name="program"
                                        required
                                        value={createDto.programId?.toString() ?? ""}
                                        onValueChange={(x) => setCreateDto({ ...createDto, programId: Number(x) })}
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

                                    <Input
                                        name="year"
                                        required
                                        placeholder="Year"
                                        maxLength={4}
                                        value={createDto.year ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    />

                                    <Select
                                        name="quarter"
                                        required
                                        onValueChange={(x) => setCreateDto({ ...createDto, quarter: Number(x) })}
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
                                </>
                                : null
                            }

                        </div>
                        <Button className="w-full">Next</Button>
                    </form>
                )}

                {
                    step === 1 && (
                        <form action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Volunteer Information"
                            />
                            <div className="flex flex-col gap-4">

                                <Input
                                    name="firstName"
                                    placeholder="First Name"
                                    className="flex-1"
                                    value={createDto.firstName ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                    required
                                />

                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="flex-1"
                                    value={createDto.lastName ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                    required
                                />

                                {
                                    createDto.type === 'REGULAR' && (
                                        <>
                                            <Input
                                                name="startDate"
                                                type={type ? "date" : "text"}
                                                placeholder="Start Date"
                                                onFocus={() => setType(true)}
                                                onBlur={() => setType(false)}
                                                value={createDto.startDate ? new Date(createDto?.startDate).toISOString().split("T")[0] : ""}
                                                onChange={e => updateData(e, setCreateDto)}
                                                required
                                            />

                                            <Select
                                                name="isActive"
                                                required
                                                value={createDto.active === undefined ? "" : createDto.active ? "yes" : "no"}
                                                onValueChange={x => setCreateDto({ ...createDto, active: x === "yes" ? true : false })}
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

                                            {createDto.active === undefined ? null : !createDto.active ?
                                                <Input
                                                    name="endDate"
                                                    type={type ? "date" : "text"}
                                                    required
                                                    placeholder="End Date"
                                                    onFocus={() => setType(true)}
                                                    onBlur={() => setType(false)}
                                                    value={createDto.endDate ? new Date(createDto?.endDate).toISOString().split("T")[0] : ""}
                                                    onChange={e => updateData(e, setCreateDto)}
                                                /> : null
                                            }
                                        </>
                                    )
                                }


                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline" type="button" onClick={previousStep}>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }
                {
                    step === 2 && (
                        <form action={handleFormSubmit} className="flex flex-col gap-10">
                            <Heading text="Contact Information" />
                            <div className="flex flex-col gap-4">
                                <Input
                                    required
                                    name="phone"
                                    placeholder="Phone Number"
                                    value={createDto.phone ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                />

                                <Input
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    value={createDto.email ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                />

                                <Input
                                    placeholder="Home Address"
                                    name="address"
                                    value={createDto.address ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                />

                                <Input
                                    placeholder="Location"
                                    name="location"
                                    value={createDto.location ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                />
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline" type="button" onClick={previousStep}>Previous</Button>
                                <Button className="flex-1">{createDto.type === 'PROGRAM' ? "Add Volunteer" : "Next"}</Button>
                            </div>
                        </form>
                    )
                }

                {
                    (step === 3 && createDto.type === 'REGULAR') && (
                        <form action={handleFormSubmit} className="flex flex-col gap-10">
                            <Heading text="Emergency Contact" />
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Emergency Contact 1 Name"
                                    name="cpName1"
                                    value={createDto.cpName1 ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}
                                />
                                <div className="flex gap-4">

                                    <Input
                                        placeholder="Relationship"
                                        name="cpRel1"
                                        value={createDto.cpRel1 ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    />
                                    <Input
                                        placeholder="Phone Number"
                                        name="cpPhone1"
                                        value={createDto.cpPhone1 ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    />

                                </div>
                                <Input
                                    placeholder="Emergency Contact 2 Name"
                                    name="cpName2"
                                    value={createDto.cpName2 ?? ""}
                                    onChange={e => updateData(e, setCreateDto)}

                                />
                                <div className="flex gap-4">
                                    <Input
                                        placeholder="Relationship"
                                        name="cpRel2"
                                        value={createDto.cpRel2 ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    />
                                    <Input
                                        placeholder="Phone Number"
                                        name="cpPhone2"
                                        value={createDto.cpPhone2 ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    />

                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline" type="button" onClick={previousStep}>Previous</Button>
                                <Button className="flex-1">Add Volunteer</Button>
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
                            <h3 className="font-bold text-3xl text-center">Volunteer Added</h3>
                            <p className="font-light text-center">The volunteer has been added successfully</p>
                        </div>
                    </div>
                    <Button className="w-full" onClick={closeModal}>Okay</Button>
                </div>
            </Modal>
        </Container >
    )
}