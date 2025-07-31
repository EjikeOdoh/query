import Modal from "@/components/Dialog";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetStudentDetails, useUpdateStudent } from "@/hooks/use-students";
import { updateData } from "@/utils/fn";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Student() {
    const { studentId } = useParams();
    const [editData, setEditData] = useState<any>();
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false)

    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function closeEditModal(

    ) {
        setIsEditModalOpen(false)
    }

    const { isLoading, isError, error, data, refetch } = useGetStudentDetails(studentId ?? "");
    const { isPending, mutate } = useUpdateStudent(studentId, editData, refetch)

    useEffect(() => {
        if (data) {
            const { participations, grades, ...profile } = data;
            setEditData(profile);
        }
    }, [data]);

    if (!studentId) {
        return <div>No student ID provided</div>;
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No student data found</div>;
    }

    if (isPending) {
        return <div>Update Loading...</div>;
    }

    function handleSubmitStudentData() {
        setIsEditModalOpen(false)
        mutate()
    }

    const { firstName, lastName, currentClass, address, school, dob, phone, country, yearJoined, fatherFirstName, fatherLastName, motherFirstName, fatherPhone, motherPhone, favSubject, difficultSubject, email, participations, grades, } = data


    return (
        <div>
            <Header
                label="Student Information"
            />
            <div className="p-5">
                <Button
                    onClick={openEditModal}
                    variant="ghost" size="icon">
                    <Pencil color="#171717" />
                </Button>
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF]">
                        <p className="text-3xl font-semibold text-[#008BCC]">{firstName[0]}{lastName[0]}</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-lg text-black">{firstName} {lastName}</h1>
                        <small>Since {yearJoined}</small>
                    </div>
                </div>

                <div className="flex">
                    <div className="flex-1">
                        <Heading
                            text="Personal Details"
                        />
                        <div className="info-grid">

                            <Row
                                label="Date of Birth"
                                value={String(dob)}
                            />

                            <Row
                                label="Country"
                                value={country}
                            />

                            <Row
                                label="School"
                                value={school}
                            />

                            <Row
                                label="Class"
                                value={currentClass}
                            />

                            <Row label="Favorite Subject" value={favSubject} />


                            <Row label="Most Difficult Subject" value={difficultSubject} />


                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="section">
                            <Heading
                                text="Parents Details"
                            />
                            <div className="info-grid">

                                <Row
                                    label="Father's Name"
                                    value={fatherLastName}
                                />

                                <Row
                                    label="Mother's Name"
                                    value={motherFirstName}
                                />
                            </div>
                        </div>
                        <div className="section">
                            <Heading
                                text="Contacts"
                            />
                            <div className="info-grid">

                                <Row
                                    label="Email Address"
                                    value={email}
                                />

                                <Row
                                    label="Phone Number"
                                    value={phone}
                                />


                                <Row
                                    label="House Address"
                                    value={address}
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className="p-5">
                <h3>Grades</h3>

                <Table className="rounded-xl overflow-hidden">
                    <TableHeader className="">
                        <TableRow className="bg-[#E6F7FF]">
                            <TableHead className="text-[#808080] text-sm font-light">Year</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Mth</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Eng</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Chm</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Phy</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Bio</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Gov</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Eco</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Lit</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Act</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-10">Com</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light w-28">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {grades.map(grade => (
                            <TableRow key={grade.id}>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.year}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.math}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.english}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.chemistry}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.physics}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.biology}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.government}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.economics}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.literature}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.accounting}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{grade.commerce}</TableCell>
                                <TableCell className="flex items-center justify-center gap-2">

                                    <Button variant="ghost" size="icon">
                                        <Pencil color="#171717" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 color="#171717" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>

            <div className="p-5">
                <h3>Participations</h3>

                <Table className="rounded-xl overflow-hidden">
                    <TableHeader className="">
                        <TableRow className="bg-[#E6F7FF]">
                            <TableHead className="text-[#808080] text-sm font-light min-w-28">Program</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-28">Year</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-28">Quarter</TableHead>
                            <TableHead className="text-[#808080] text-sm font-light min-w-28 w-28">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody >
                        {participations.map(particpation => (
                            <TableRow key={particpation.participation_id}>
                                <TableCell className="text-[#171717] text-sm font-light">{particpation.program_program}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{particpation.participation_year}</TableCell>
                                <TableCell className="text-[#171717] text-sm font-light">{particpation.participation_quarter}</TableCell>
                                <TableCell className="flex items-center justify-center gap-2">

                                    <Button variant="ghost" size="icon">
                                        <Pencil color="#171717" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 color="#171717" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>

            <Modal
                isOpen={isEditModalOpen}
                onClose={closeEditModal}
            >

                <Heading
                    text="Edit Student's Details"
                />

                <form action={handleSubmitStudentData}>
                    <div className="flex flex-col gap-4 py-5">
                        <Input
                            name="yearJoined"
                            placeholder="Year Joined"
                            type="number"
                            maxLength={4}
                            value={editData?.yearJoined ? String(editData?.yearJoined) : ""}
                            onChange={e => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="school"
                            placeholder="School"
                            value={editData?.school ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="currentClass"
                            placeholder="Current Class"
                            value={editData?.currentClass ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="lastName"
                            placeholder="Last Name"
                            value={editData?.lastName ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="firstName"
                            placeholder="First Name"
                            value={editData?.firstName ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="dob"
                            placeholder="Date of Birth"
                            type="date"
                            value={editData?.dob ? new Date(editData?.dob).toISOString().split("T")[0] : ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="phone"
                            placeholder="Phone Number"
                            type="tel"
                            value={editData?.phone ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={editData?.email! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="country"
                            placeholder="Country"
                            value={editData?.country ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            type="text"
                            name="address"
                            placeholder="House Address"
                            value={editData?.address! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherLastName"
                            placeholder="Father's Last Name"
                            value={editData?.fatherLastName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherFirstName"
                            placeholder="Father's First Name"
                            value={editData?.fatherFirstName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherEducation"
                            placeholder="Father's Education i.e SSCE, BSc, MSc, PHD"
                            value={editData?.fatherEducation! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherLastName"
                            placeholder="Father's Last Name"
                            value={editData?.fatherLastName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherFirstName"
                            placeholder="Father's First Name"
                            value={editData?.fatherFirstName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherEducation"
                            placeholder="Father's Education i.e SSCE, BSc, MSc, PHD"
                            value={editData?.fatherEducation! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherPhone"
                            placeholder="Father's Phone Number"
                            value={editData?.fatherPhone! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherJob"
                            placeholder="Father's Job"
                            value={editData?.fatherJob! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherLastName"
                            placeholder="Mother's Last Name"
                            value={editData?.motherLastName! ?? ""}
                            showLabel={true}
                            onChange={(e) => updateData(e, setEditData)}
                        />
                        <Input
                            name="motherFirstName"
                            placeholder="Mother's First Name"
                            value={editData?.motherFirstName! ?? ""}
                            showLabel={true}
                            onChange={(e) => updateData(e, setEditData)}
                        />


                        <Input
                            name="motherEducation"
                            placeholder="Mother's Education i.e SSCE, BSc, MSc, PHD"
                            value={editData?.motherEducation! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherPhone"
                            placeholder="Mother's Phone Number"
                            value={editData?.motherPhone! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherJob"
                            placeholder="Mother's Job"
                            value={editData?.motherJob! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherPhone"
                            placeholder="Father's Phone Number"
                            value={editData?.fatherPhone! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="fatherJob"
                            placeholder="Father's Job"
                            value={editData?.fatherJob! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherLastName"
                            placeholder="Mother's Last Name"
                            value={editData?.motherLastName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherFirstName"
                            placeholder="Mother's First Name"
                            value={editData?.motherFirstName! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherEducation"
                            placeholder="Mother's Education i.e SSCE, BSc, MSc, PHD"
                            value={editData?.motherEducation! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherPhone"
                            placeholder="Mother's Phone Number"
                            value={editData?.motherPhone! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <Input
                            name="motherJob"
                            placeholder="Mother's Job"
                            value={editData?.motherJob! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />


                        <Input
                            name="noOfSisters"
                            placeholder="Number of Sisters"
                            value={editData?.noOfSisters! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />
                        <Input
                            name="noOfBrothers"
                            placeholder="Number of Brothers"
                            value={editData?.noOfBrothers! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />
                        <Input
                            name="position"
                            placeholder="Position i.e Oldest, Second, Third, Youngest"
                            value={editData?.position! ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />

                        <div>
                            <label className="text-sm font-light">Focus i.e Science, Art, Technology, Commercial</label>
                            <Select
                                name="focus"
                                value={editData?.focus!}
                                onValueChange={(x) => setEditData({
                                    ...editData, focus: x
                                })}
                            >
                                <SelectTrigger className="flex-1 min-w-1/2 w-full">
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

                        <Input
                            name="favSubject"
                            placeholder="Favorite Subject"
                            value={editData?.favSubject ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />
                        <Input
                            name="difficultSubject"
                            placeholder="Most Difficult Subject"
                            value={editData?.difficultSubject ?? ""}
                            showLabel={true}
                            onChange={(e) => updateData(e, setEditData)}
                        />
                        <Input
                            name="careerChoice1"
                            placeholder="Career Choice 1"
                            value={editData?.careerChoice1 ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />
                        <Input
                            name="careerChoice2"
                            placeholder="Career Choice 2"
                            value={editData?.careerChoice2 ?? ""}
                            onChange={(e) => updateData(e, setEditData)}
                            showLabel={true}
                        />
                    </div>

                    <Button className="w-full">Submit</Button>
                </form>

            </Modal>

        </div>
    );
}