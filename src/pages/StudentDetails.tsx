import Modal from "@/components/Dialog";
import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAddGrades, useDeleteGrades, useUpdateGrades } from "@/hooks/use-grades";
import { useAddStudentParticipation, useDeleteStudent, useDeleteStudentParticipation, useGetStudentDetails, useUpdateStudent, useUpdateStudentParticipation } from "@/hooks/use-students";
import { updateData } from "@/utils/fn";
import { type ParticipationAddData, type GradeAddData, type GradeEditData, type ParticipationEditData } from "@/utils/types";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, NavLink } from "react-router";
import { useGetPrograms } from "@/hooks/use-dashboard";


export default function Student() {
    const { studentId, } = useParams();
    const { state } = useLocation()
    const navigate = useNavigate()

    const programs = useGetPrograms()

    const [editData, setEditData] = useState<any>();
    const [addGradesData, setAddGradesData] = useState<GradeAddData>({
        year: 0,
    })
    const [editGradesData, setEditGradesData] = useState<GradeEditData>({})
    const [editParticipationData, setEditParticipationData] = useState<ParticipationEditData>({})
    const [addParticipationData, setAddParticipationData] = useState<ParticipationAddData>({
        studentId: Number(studentId)
    })
    const [pId, setPId] = useState<number>()
    const [gradeId, setGradeId] = useState<number>()

    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(state ?? false)
    const [isEditGradeModalOpen, setIsEditGradeModalOpen] = useState<boolean>(false)
    const [isAddGradeModalOpen, setIsAddGradeModalOpen] = useState<boolean>(false)
    const [isEditParticipationModalOpen, setIsParticipationModalOpen] = useState<boolean>(false)
    const [isAddParticipationModalOpen, setIsAddParticipationModalOpen] = useState<boolean>(false)

    const { isLoading, isError, error, data, refetch } = useGetStudentDetails(studentId ?? "");
    const { isPending, mutate } = useUpdateStudent(studentId, editData, refetch)
    const deleteStudentMutation = useDeleteStudent(Number(studentId), () => navigate('/students', { replace: true }))


    const updateGradeMutation = useUpdateGrades(String(editGradesData.id), editGradesData, refetch)
    const addGradeMutation = useAddGrades(Number(studentId), addGradesData, refetch)
    const deleteGradeMutation = useDeleteGrades(gradeId!, refetch)

    const updateParticipationMutation = useUpdateStudentParticipation(Number(studentId), editParticipationData, refetch)
    const addPartipationMutation = useAddStudentParticipation(addParticipationData, refetch)
    const deleteParticipationMutation = useDeleteStudentParticipation(pId!, refetch)



    function openEditModal() {
        setIsEditModalOpen(true)
    }

    function openEditGradeModal(id: any) {
        setEditGradesData(() => {
            return data!.grades!.find(x => x.id === id) as GradeEditData
        })
        setIsEditGradeModalOpen(true)
    }

    function openAddGradeModal() {
        addGradeMutation.mutate()
        setIsAddGradeModalOpen(true)
    }

    function openEditParticipationModal(id: any) {
        setEditParticipationData(() => data!.participations!.find(x => x.participation_id === id) as ParticipationEditData)
        setIsParticipationModalOpen(true)
    }

    function openAddParticipationModal() {
        setIsAddParticipationModalOpen(true)
    }

    function closeEditModal() {
        setIsEditModalOpen(false)
        setIsEditGradeModalOpen(false)
        setIsAddGradeModalOpen(false)
        setIsParticipationModalOpen(false)
        setIsAddParticipationModalOpen(false)
    }

    function handleSubmitStudentData() {
        setIsEditModalOpen(false)
        mutate()
    }

    function handleAddGrade() {
        closeEditModal()
        addGradeMutation.mutate()
    }

    function handleUpdateGrade() {
        closeEditModal()
        updateGradeMutation.mutate()
    }

    function handleEditParticipation() {
        closeEditModal()
        updateParticipationMutation.mutate()
    }

    function handleAddParticipation(formData: FormData) {
        closeEditModal()
        addPartipationMutation.mutate()
    }

    function handleDeleteParticipation(id: number) {
        setPId(id)
        deleteParticipationMutation.mutate()
    }

    function handleDeleteGrade(id: number) {
        setGradeId(id)
        deleteGradeMutation.mutate()
    }

    useEffect(() => {
        if (data) {
            const { participations, grades, ...profile } = data;
            setEditData(profile);
        }
    }, [data]);

    if (!studentId) {
        return <div>No student ID provided</div>;
    }

    if (isLoading || programs.isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>No student data found</div>;
    }

    if (isPending || updateGradeMutation.isPending || addGradeMutation.isPending || updateParticipationMutation.isPending || addPartipationMutation.isPending || deleteParticipationMutation.isPending || deleteGradeMutation.isPending || deleteStudentMutation.isPending) {
        return <div>Update Loading...</div>;
    }

    const { firstName, lastName, currentClass, address, school, dob, phone, country, yearJoined, fatherFirstName, fatherLastName, motherFirstName, fatherPhone, motherPhone, favSubject, difficultSubject, email, participations, grades, } = data


    return (
        <div className="flex flex-col">
            <Header
                label="Student Information"
            />
            <div className="pt-5 pb-20">
                <div className="w-11/12 m-auto space-y-10">
                    <div className="py-6 px-10 bg-white rounded-2xl space-y-10">

                        <div>
                            <NavLink to="/students" className="flex items-center gap-2 text-[#171717] font-light text-xs">
                                <ChevronLeft color="#171717" size={14} />
                                Back to Dashboard
                            </NavLink>
                        </div>

                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full flex items-center justify-center bg-[#B0E6FF] border-2 border-[#D9F3FF]">
                                    <p className="text-3xl font-semibold text-[#008BCC]">{firstName[0]}{lastName[0]}</p>
                                </div>
                                <div>
                                    <h1 className="font-bold text-lg text-black">{firstName} {lastName}</h1>
                                    <small>Since {yearJoined}</small>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2">
                                <Button variant="ghost" size="icon" onClick={openEditModal}>
                                    <Pencil color="#171717" />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => deleteStudentMutation.mutate()}>
                                    <Trash2 color="#171717" />
                                </Button>
                            </div>

                        </div>

                        <div className="flex">
                            <div className="flex-1 space-y-5">
                                <Heading
                                    text="Personal Details"
                                />
                                <div className="space-y-2">
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
                            <div className="flex-1 space-y-10">
                                <div className="space-y-5">
                                    <Heading
                                        text="Parents Details"
                                    />
                                    <div className="space-y-2">
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
                                <div className="space-y-5">
                                    <Heading
                                        text="Contacts"
                                    />
                                    <div className="space-y-2">

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

                    {/* Grades table */}

                    <div className="py-6 px-10 bg-white rounded-2xl space-y-5">
                        <div className="flex justify-between items-center">
                            <Heading text="Grades" />
                            <Button onClick={openAddGradeModal}>
                                Add Grades
                            </Button>
                        </div>
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
                                            <Button variant="ghost" size="icon" onClick={() => openEditGradeModal(grade.id)}>
                                                <Pencil color="#171717" />
                                            </Button>
                                            <Button variant="ghost" size="icon"
                                                onClick={() => handleDeleteGrade(grade.id)}
                                            >
                                                <Trash2 color="#171717" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Participation table */}
                    <div className="py-6 px-10 bg-white rounded-2xl space-y-5">
                        <div className="flex justify-between items-center">
                            <Heading text="Participations" />
                            <Button onClick={openAddParticipationModal}>Add Participation</Button>
                        </div>

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

                                            <Button variant="ghost" size="icon"
                                                onClick={() => openEditParticipationModal(particpation.participation_id)} >
                                                <Pencil color="#171717" />
                                            </Button>
                                            <Button variant="ghost" size="icon"
                                                onClick={() => handleDeleteParticipation(particpation.participation_id)}
                                            >
                                                <Trash2 color="#171717" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </div>

            {/* Edit student modal */}
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

            {/* Edit grade modal */}
            <Modal isOpen={isEditGradeModalOpen} onClose={closeEditModal}>
                <form
                    className="flex flex-col gap-5"
                    action={handleUpdateGrade}
                >
                    <Heading
                        text="Edit Grades"

                    />
                    <div className="flex flex-col gap-4">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            maxLength={4}
                            value={editGradesData.year! ?? ""}
                            onChange={(e) => updateData(e, setEditGradesData)}
                            showLabel={true}
                        />
                        <div className="flex gap-4">
                            <Input
                                name="math"
                                placeholder="Math Grade"
                                value={editGradesData.math! ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="english"
                                placeholder="English Grade"
                                value={editGradesData.english ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="chemistry"
                                placeholder="Chemistry Grade"
                                value={editGradesData.chemistry ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="physics"
                                placeholder="Physics Grade"
                                value={editGradesData.physics ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="government"
                                placeholder="Government Grade"
                                value={editGradesData.government ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="economics"
                                placeholder="Economics Grade"
                                value={editGradesData.economics ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="biology"
                                placeholder="Biology Grade"
                                value={editGradesData.biology ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="literature"
                                placeholder="Literature in English Grade" value={editGradesData.literature ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="accounting"
                                placeholder="Accounting Grade"
                                value={editGradesData.accounting ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="commerce"
                                placeholder="Commerce Grade"
                                value={editGradesData.commerce ?? ""}
                                onChange={(e) => updateData(e, setEditGradesData)}
                                showLabel={true}
                            />
                        </div>
                    </div>
                    <Button className="w-full">Submit</Button>
                </form>
            </Modal>

            {/* Edit participation modal */}
            <Modal isOpen={isEditParticipationModalOpen} onClose={closeEditModal}>
                <form action={handleEditParticipation}
                    className="flex flex-col gap-5"
                >
                    <Heading
                        text="Edit Participation"
                    />
                    <div className="flex flex-col gap-4">
                        {/* Will fix this program dropdown later */}
                        {/* <Select
                            name="program"
                            required
                            value={String(editParticipationData.program_program) ?? ""}
                            onValueChange={x => setEditParticipationData(prev => ({ ...prev, program_program: x }))}
                        >
                            <SelectTrigger className="w-full px-6">
                                <SelectValue placeholder="Select program" />
                            </SelectTrigger>
                            <SelectContent className="bg-white py-4">
                                <SelectGroup>
                                    {programs.data?.map(program => (<SelectItem key={program.id} value={String(program.id)}>{program.program}</SelectItem>))}
                                </SelectGroup>
                            </SelectContent>
                        </Select> */}
                        <Input
                            name="year"
                            type="number"
                            placeholder="Year of Participation"
                            required
                            maxLength={4}
                            value={editParticipationData.participation_year}
                            onChange={(e) => setEditParticipationData(prev => ({ ...prev, participation_year: Number(e.target.value) }))}
                        />
                        <Select
                            name="quarter"
                            onValueChange={x => setEditParticipationData(prev => ({ ...prev, participation_quarter: Number(x) }))}
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
                    <Button className="w-full">Submit</Button>
                </form>
            </Modal>

            {/* Add grade modal */}

            <Modal isOpen={isAddGradeModalOpen} onClose={closeEditModal} >
                <form
                    className="flex flex-col gap-5"
                    action={handleAddGrade}
                >
                    <Heading
                        text="Add Grades"

                    />
                    <div className="flex flex-col gap-4">
                        <Input
                            name="year"
                            placeholder="Year"
                            type="number"
                            maxLength={4}
                            value={addGradesData.year! ?? ""}
                            onChange={(e) => updateData(e, setAddGradesData)}
                            showLabel={true}
                        />
                        <div className="flex gap-4">
                            <Input
                                name="math"
                                placeholder="Math Grade"
                                value={addGradesData.math! ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="english"
                                placeholder="English Grade"
                                value={addGradesData.english ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="chemistry"
                                placeholder="Chemistry Grade"
                                value={addGradesData.chemistry ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="physics"
                                placeholder="Physics Grade"
                                value={addGradesData.physics ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="government"
                                placeholder="Government Grade"
                                value={addGradesData.government ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="economics"
                                placeholder="Economics Grade"
                                value={addGradesData.economics ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="biology"
                                placeholder="Biology Grade"
                                value={addGradesData.biology ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="literature"
                                placeholder="Literature in English Grade" value={addGradesData.literature ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                        </div>
                        <div className="flex gap-4">
                            <Input
                                name="accounting"
                                placeholder="Accounting Grade"
                                value={addGradesData.accounting ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                            <Input
                                name="commerce"
                                placeholder="Commerce Grade"
                                value={addGradesData.commerce ?? ""}
                                onChange={(e) => updateData(e, setAddGradesData)}
                                showLabel={true}
                            />
                        </div>
                    </div>
                    <Button className="w-full">Submit</Button>
                </form>
            </Modal>

            {/* Add participation modal */}
            <Modal isOpen={isAddParticipationModalOpen} onClose={closeEditModal}>
                <form action={handleAddParticipation}
                    className="flex flex-col gap-5"
                >
                    <Heading
                        text="Add Participation"
                    />
                    <div className="flex flex-col gap-4">
                        <div>
                            <label htmlFor="program" className="text-sm font-light">Select Program</label>
                            <Select
                                name="program"
                                required
                                value={String(addParticipationData.program_program) ?? ""}
                                onValueChange={x => setAddParticipationData(prev => ({ ...prev, program_program: Number(x) }))}
                            >
                                <SelectTrigger className="w-full px-6">
                                    <SelectValue placeholder="Select program" />
                                </SelectTrigger>
                                <SelectContent className="bg-white py-4">
                                    <SelectGroup>
                                        {programs.data?.map(program => (<SelectItem key={program.id} value={String(program.id)}>{program.program}</SelectItem>))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                        </div>
                        <Input
                            name="year"
                            type="number"
                            placeholder="Year of Participation"
                            required
                            maxLength={4}
                            value={addParticipationData.participation_year ?? 0}
                            onChange={(e) => setAddParticipationData(prev => ({ ...prev, participation_year: Number(e.target.value) }))}
                            showLabel={true}
                        />
                        <div>
                            <label htmlFor="program" className="text-sm font-light">Select Quarter</label>
                            <Select
                                name="quarter"
                                value={String(addParticipationData.participation_quarter)}
                                onValueChange={x => setAddParticipationData(prev => ({ ...prev, participation_quarter: Number(x) }))}
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
                    </div>
                    <Button className="w-full">Submit</Button>
                </form>
            </Modal>
        </div >
    );
}