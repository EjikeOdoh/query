import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

function Heading({ text, count }: { text: string, count?: number }) {
    return (
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#171717] text-xl">{text}</h3>
            <p className="font-light text-[#171717]">{count} of 6</p>

        </div>
    )
}

export default function AddStudent() {
    const [step, setStep] = useState<number>(1)
    const [data, setData] = useState({
    })

    function handleFormSubmit(x: FormData) {

        const entries = Object.fromEntries(x)
        setData({
            ...data, ...entries
        })
        setStep(prev => Math.min(prev + 1, 6))

        if (step === 6) {
            console.log(data)
        }

    }

    function prevStep() {
        setStep(prev => {
            return Math.max(prev - 1, 1)
        })
    }


    return (
        <div>
            <Header
                label="Add New Student"
            />

            <div className="w-[600px] m-auto">
                {
                    step === 1 && (
                        <form action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Select Program"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">
                                <Select
                                    name="program"
                                    required>
                                    <SelectTrigger className="w-full px-6">
                                        <SelectValue placeholder="Select program" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white py-4">
                                        <SelectGroup>
                                            <SelectItem value="ASCG">ASCG</SelectItem>
                                            <SelectItem value="CBC">CBC</SelectItem>
                                            <SelectItem value="SSC">SSC</SelectItem>
                                            <SelectItem value="DSC">DSC</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <Input name="year" type="number" placeholder="Year of Participation" required maxLength={4} />
                                <Select
                                    name="quarter"
                                    required>
                                    <SelectTrigger className="w-full px-6">
                                        <SelectValue placeholder="Select Quarter" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectItem value="1">1</SelectItem>
                                            <SelectItem value="2">2</SelectItem>
                                            <SelectItem value="3">3</SelectItem>
                                            <SelectItem value="4">4</SelectItem>
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
                        <form
                            action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Student Information"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">
                                <Input name="school" placeholder="School" required />
                                <Input name="class" placeholder="Current Class" />
                                <div className="flex gap-4">
                                    <Input
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                    />
                                    <Input
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <Input
                                        name="dob"
                                        placeholder="Date of Birth"
                                        type="date"
                                        required
                                    />
                                    <Input
                                        name="phone"
                                        placeholder="Phone Number"
                                        type="tel"
                                    />
                                </div>

                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Email Address"
                                />
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="House Address"
                                />
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

                {
                    step === 3 && (
                        <form
                            action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Guardian Information"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">
                                <div className="flex gap-4">
                                    <Input name="fatherLastName" placeholder="Father's Last Name" />
                                    <Input name="fatherFirstName" placeholder="Father's First Name" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="fatherEducation" placeholder="Father's Education i.e SSCE, BSc, MSc, PHD" />
                                    <Input name="fatherPhone" placeholder="Father's Phone Number" />
                                </div>
                                <Input name="fatherJob" placeholder="Father's Job" />

                                {/* Mother's Info */}
                                <div className="flex gap-4">
                                    <Input name="motherLastName" placeholder="Mother's Last Name" />
                                    <Input name="motherFirstName" placeholder="Mother's First Name" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="motherEducation" placeholder="Mother's Education i.e SSCE, BSc, MSc, PHD" />
                                    <Input name="motherPhone" placeholder="Mother's Phone Number" />
                                </div>
                                <Input name="motherJob" placeholder="Mother's Job" />
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

                {
                    step === 4 && (
                        <form
                            action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Additional Information"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">

                                <Input name="noOfSisters" placeholder="Number of Sisters" />
                                <Input name="noOfBrothers" placeholder="Number of Brothers" />
                                <Input name="position" placeholder="Position i.e Oldest, Second, Third, Youngest" />
                                <Select
                                    name="focus"
                                >
                                    <SelectTrigger className="flex-1 min-w-1/2">
                                        <SelectValue placeholder="Focus i.e Science, Art, Technology, Commercial" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        <SelectGroup>
                                            <SelectItem value="Science">Science</SelectItem>
                                            <SelectItem value="Arts">Arts</SelectItem>
                                            <SelectItem value="Commerce">Commerce</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

                {
                    step === 5 && (
                        <form
                            action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Additional Information"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">

                                <div className="flex gap-4">
                                    <Input name="math" placeholder="Math Grade" />
                                    <Input name="english" placeholder="English Grade" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="chemistry" placeholder="Chemistry Grade" />
                                    <Input name="physics" placeholder="Physics Grade" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="government" placeholder="Government Grade" />
                                    <Input name="economics" placeholder="Economics Grade" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="biology" placeholder="Biology Grade" />
                                    <Input name="literature" placeholder="Literature in English Grade" />
                                </div>
                                <div className="flex gap-4">
                                    <Input name="accounting" placeholder="Accounting Grade" />
                                    <Input name="commerce" placeholder="Commerce Grade" />
                                </div>
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }


                {
                    step === 6 && (
                        <form
                            action={handleFormSubmit}
                            className="flex flex-col gap-10"
                        >
                            <Heading
                                text="Additional Information"
                                count={step}
                            />

                            <div className="flex flex-col gap-4">
                                <Input
                                    name="favSubject"
                                    placeholder="Favorite Subject"
                                />
                                <Input
                                    name="difficultSubject"
                                    placeholder="Most Difficult Subject"
                                />
                                <Input
                                    name="careerChoice1"
                                    placeholder="Career Choice 1"
                                />
                                <Input
                                    name="careerChoice2"
                                    placeholder="Career Choice 2"
                                />
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    type="button" className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Next</Button>
                            </div>
                        </form>
                    )
                }

            </div>


        </div>
    )
}