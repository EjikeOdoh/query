import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Row from "@/components/Row";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetStudentDetails } from "@/hooks/use-students";
import type { EditStudentPayload } from "@/utils/types";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Student() {
    const { studentId } = useParams();
    const [editData, setEditData] = useState<EditStudentPayload>();
    
    const { isLoading, isError, error, data } = useGetStudentDetails(studentId ?? "");
    
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
    
    const { firstName, lastName, class: currentClass, address, school, dob, phone, country, yearJoined, fatherFirstName, fatherLastName, motherFirstName, fatherPhone, motherPhone, favSubject, difficultSubject, email, participations, grades, } = data


    return (
        <div>
            <Header
                label="Student Information"
            />
            <div className="p-5">
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

            
        </div>
    );
}