import Header from "@/components/Header";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";


export default function AddStaff() {

    const [step, setStep] = useState<number>(1)
    // For toggle date input types
    const [type, setType] = useState<boolean>(false)


    function handleFormSubmit() {
        setStep(prev => prev + 1)
    }

    useEffect(() => {
        if (step === 7) {
        }
    }, [step])

    return (
        <div>
            <Header label="Add Staff" />
            <div className="max-w-[600px] m-auto">
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
                                />

                                <Input
                                    name="lastName"
                                    placeholder="Last Name"
                                    className="flex-1"
                                />

                                <Input 
                                name="startDate" 
                                type={type ? "date" : "text"}
                                placeholder="Start Date"
                                onFocus={() => setType(true)}
                                onBlur={() => setType(false)}
                                />

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

                                <Input
                                    placeholder="Position"
                                />

                                <Input
                                    placeholder="Staff ID"
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

                                />

                                <Input
                                    placeholder="Email Address"
                                    type="email"

                                />

                                <Input
                                    placeholder="Home Address"

                                />

                                <Input
                                    placeholder="Location"

                                />
                            </div>
                            <div className="flex gap-4">
                                <Button className="flex-1" variant="outline">Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

                {
                    step === 3 && (
                        <form className="flex flex-col gap-10">
                            <Heading text="Emergency Contact" />
                            <div className="flex flex-col gap-4">
                                <Input
                                    placeholder="Emergency Contact 1 Name"

                                />
                                <Input
                                    placeholder="Relationship"

                                />
                                <Input
                                    placeholder="Phone Number"

                                />
                                <Input
                                    placeholder="Emergency Contact 2 Name"

                                />
                                <Input
                                    placeholder="Relationship"

                                />
                                <Input
                                    placeholder="Phone Number"
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
        </div>
    )
}