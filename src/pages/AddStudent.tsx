import Container from "@/components/Container";
import Modal from "@/components/Dialog";
import LoadingLayout from "@/components/LoadingLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createStudent, updateData } from "@/utils/fn";
import type { CreateStudentData } from "@/utils/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CircleCheck, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Heading({ text, count }: { text: string, count: number }) {
    return (
        <div className="flex items-center justify-between">
            <h3 className="font-bold text-[#171717] text-xl">{text}</h3>
            <p className="font-light text-[#171717]">{count} of 6</p>

        </div>
    )
}

export default function AddStudent() {

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [step, setStep] = useState<number>(1)

    const [type, setType] = useState<boolean>(false)
    const [data, setData] = useState<CreateStudentData>({
        school: "",
        currentClass: "",
        firstName: "",
        lastName: "",
        dob: "",
        address: "",
        country: "",
        phone: "",
        email: "",
        fatherLastName: "",
        fatherFirstName: "",
        fatherPhone: "",
        fatherEducation: "",
        fatherJob: "",
        motherLastName: "",
        motherFirstName: "",
        motherPhone: "",
        motherEducation: "",
        motherJob: "",
        noOfSisters: "",
        noOfBrothers: "",
        position: "",
        focus: "",
        favSubject: "",
        difficultSubject: "",
        careerChoice1: "",
        careerChoice2: "",
        program: "",
        year: "",
        quarter: "",
        academicYear: "",
        term: "",
        english: "",
        math: "",
        chemistry: "",
        physics: "",
        government: "",
        economics: "",
        biology: "",
        commerce: "",
        literature: "",
        accounting: "",

    })

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false)

    function cleanUp() {
        queryClient.invalidateQueries({ queryKey: ['students'] })
        queryClient.invalidateQueries({ queryKey: ['stats'] })
        setIsSuccessModalOpen(true)
    }

    function closeModal() {
        setIsSuccessModalOpen(false)
        navigate('/students', { replace: true })
    }

    const { mutate, isPending, isError, error, reset } = useMutation({
        mutationFn: () => createStudent(data),
        onSuccess: cleanUp
    })

    function handleFormSubmit(x: FormData) {
        const entries = Object.fromEntries(x)
        setData({
            ...data, ...entries
        })
        setStep(prev => Math.min(prev + 1, 7))
    }

    function prevStep() {
        setStep(prev => {
            return Math.max(prev - 1, 1)
        })
    }

    useEffect(() => {
        if (step === 7) {
            mutate()
        }
    }, [step, mutate])


    if (isPending) {
        return (
            <LoadingLayout label="Add Student" />
        )
    }

    return (
        <Container label="Add New Student">
            <div className="w-full md:w-[600px] m-auto">
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
                                    required
                                    // value={data.program}
                                    onValueChange={(x) => setData({ ...data, program: x })}
                                >
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
                                <Input name="year" type="number" placeholder="Year of Participation" required maxLength={4}
                                    value={data.year}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Select
                                    name="quarter"
                                    required
                                    onValueChange={(x) => setData({ ...data, program: x })}
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
                                <Input name="school" placeholder="School"
                                    value={data.school}
                                    onChange={(e) => updateData(e, setData)}
                                    required />
                                <Input name="currentClass" placeholder="Current Class"
                                    value={data.currentClass}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="lastName"
                                        placeholder="Last Name"
                                        required
                                        value={data.lastName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="firstName"
                                        placeholder="First Name"
                                        required
                                        value={data.firstName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="dob"
                                        placeholder="Date of Birth"
                                        type={type ? "date" : "text"}
                                        required
                                        value={data.dob}
                                        onChange={(e) => updateData(e, setData)}
                                        onFocus={() => setType(true)}
                                        onBlur={() => setType(false)}
                                    />
                                    <Input
                                        name="phone"
                                        placeholder="Phone Number"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={data.email}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="country"
                                        placeholder="Country"
                                        value={data.country}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>


                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="House Address"
                                    value={data.address}
                                    onChange={(e) => updateData(e, setData)}
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
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="fatherLastName"
                                        placeholder="Father's Last Name"
                                        value={data.fatherLastName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="fatherFirstName"
                                        placeholder="Father's First Name"
                                        value={data.fatherFirstName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="fatherEducation"
                                        placeholder="Father's Education i.e SSCE, BSc, MSc, PHD"
                                        value={data.fatherEducation}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="fatherPhone"
                                        placeholder="Father's Phone Number"
                                        value={data.fatherPhone}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <Input
                                    name="fatherJob"
                                    placeholder="Father's Job"
                                    value={data.fatherJob}
                                    onChange={(e) => updateData(e, setData)}
                                />

                                {/* Mother's Info */}
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="motherLastName"
                                        placeholder="Mother's Last Name"
                                        value={data.motherLastName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="motherFirstName"
                                        placeholder="Mother's First Name"
                                        value={data.motherFirstName}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="motherEducation"
                                        placeholder="Mother's Education i.e SSCE, BSc, MSc, PHD"
                                        value={data.motherEducation}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="motherPhone"
                                        placeholder="Mother's Phone Number"
                                        value={data.motherPhone}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <Input
                                    name="motherJob"
                                    placeholder="Mother's Job"
                                    value={data.motherJob}
                                    onChange={(e) => updateData(e, setData)}
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

                                <Input
                                    name="noOfSisters"
                                    placeholder="Number of Sisters"
                                    value={data.noOfSisters}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Input
                                    name="noOfBrothers"
                                    placeholder="Number of Brothers"
                                    value={data.noOfBrothers}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Input
                                    name="position"
                                    placeholder="Position i.e Oldest, Second, Third, Youngest"
                                    value={data.position}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Select
                                    name="focus"
                                >
                                    <SelectTrigger className="flex-1 w-full">
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
                                text="Academic Information"
                                count={step}
                            />
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="academicYear"
                                        placeholder="Academic Year"
                                        value={data.academicYear}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Select
                                        name="term"
                                        required
                                    // value={data.program}
                                    // onValueChange={(x) => setData({ ...data, program: x })}
                                    >
                                        <SelectTrigger className="w-full px-6">
                                            <SelectValue placeholder="Select program" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white py-4">
                                            <SelectGroup>
                                                <SelectItem value="first">First</SelectItem>
                                                <SelectItem value="second">Second</SelectItem>
                                                <SelectItem value="third">Third</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="math"
                                        placeholder="Math Grade"
                                        value={data.math}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="english"
                                        placeholder="English Grade"
                                        value={data.english}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="chemistry"
                                        placeholder="Chemistry Grade"
                                        value={data.chemistry}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="physics"
                                        placeholder="Physics Grade"
                                        value={data.physics}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="government"
                                        placeholder="Government Grade"
                                        value={data.government}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="economics"
                                        placeholder="Economics Grade"
                                        value={data.economics}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="biology"
                                        placeholder="Biology Grade"
                                        value={data.biology}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="literature"
                                        placeholder="Literature in English Grade" value={data.literature}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row gap-4">
                                    <Input
                                        name="accounting"
                                        placeholder="Accounting Grade"
                                        value={data.accounting}
                                        onChange={(e) => updateData(e, setData)}
                                    />
                                    <Input
                                        name="commerce"
                                        placeholder="Commerce Grade"
                                        value={data.commerce}
                                        onChange={(e) => updateData(e, setData)}
                                    />
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
                                    value={data.favSubject}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Input
                                    name="difficultSubject"
                                    placeholder="Most Difficult Subject"
                                    value={data.difficultSubject}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Input
                                    name="careerChoice1"
                                    placeholder="Career Choice 1"
                                    value={data.careerChoice1}
                                    onChange={(e) => updateData(e, setData)}
                                />
                                <Input
                                    name="careerChoice2"
                                    placeholder="Career Choice 2"
                                    value={data.careerChoice2}
                                    onChange={(e) => updateData(e, setData)}
                                />
                            </div>
                            <div className="flex gap-4 ">
                                <Button
                                    onClick={prevStep}
                                    type="button" className="flex-1" variant='outline'>Previous</Button>
                                <Button className="flex-1">Submit</Button>
                            </div>
                        </form>
                    )
                }

            </div>

            {/* Success modal */}
            <Modal isOpen={isSuccessModalOpen} onClose={closeModal}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <CircleCheck size={90} className="mx-auto" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Student Added</h3>
                            <p className="font-light text-center">The student has been added successfully</p>
                        </div>
                    </div>
                    <Button className="w-full" onClick={closeModal}>Okay</Button>
                </div>
            </Modal>

            {/* Error modal */}
            <Modal isOpen={isError} onClose={reset}>
                <div className="space-y-10">
                    <div className="space-y-8">
                        <ShieldOff size={90} className="mx-auto" color="#D92121" />
                        <div>
                            <h3 className="font-bold text-3xl text-center">Error</h3>
                            {error && <p className="font-light text-center">{error!.message}</p>}
                        </div>
                    </div>
                    <Button variant='default' className="w-full" onClick={reset}>Close</Button>
                </div>
            </Modal>
        </Container>
    )
}