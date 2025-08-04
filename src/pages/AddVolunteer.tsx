import Container from "@/components/Container";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateData } from "@/utils/fn";
import { type CreateVolunteer } from "@/utils/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function AddVolunteer() {

    const [step, setStep] = useState<number>(1)
    const [type, setType] = useState<boolean>(false)

    const [createDto, setCreateDto] = useState<Partial<CreateVolunteer>>({
        // active: true
    })

    function handleFormSubmit() {
        setStep(prev => prev + 1)
    }

    function previousStep() {
        setStep(prev => prev - 1)
    }

    useEffect(() => {
        if (step === 4) {
            console.log(createDto)
        }
    }, [step])

    return (
        <Container label="Add Volunteer">
            <div className="w-[600px] m-auto">
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

                                <Input
                                    name="startDate"
                                    type={type ? "date" : "text"}
                                    placeholder="Start Date"
                                    onFocus={() => setType(true)}
                                    onBlur={() => setType(false)}
                                    value={createDto.startDate ?? ""}
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
                                        value={createDto.endDate ?? ""}
                                        onChange={e => updateData(e, setCreateDto)}
                                    /> : null
                                }

                                <Select
                                    name="program"
                                    required
                                    value={createDto.program ?? ""}
                                    onValueChange={(x) => setCreateDto({ ...createDto, program: x })}
                                >
                                    <SelectTrigger className="w-full px-6">
                                        <SelectValue placeholder="Select program" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white py-4">
                                        <SelectGroup>
                                            <SelectItem value="All">All</SelectItem>
                                            <SelectItem value="ASCG">ASCG</SelectItem>
                                            <SelectItem value="CBC">CBC</SelectItem>
                                            <SelectItem value="SSC">SSC</SelectItem>
                                            <SelectItem value="DSC">DSC</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>

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
                                <Button className="flex-1">Add Staff</Button>
                            </div>
                        </form>
                    )
                }
            </div>
        </Container>
    )
}