import { useGetStudentDetails } from "@/hooks/use-students";
import type { StudentDetail } from "@/utils/types";
import { useParams } from "react-router";

export default function Student() {
    const { studentId } = useParams();
    
    if (!studentId) {
        return <div>No student ID provided</div>
    }

    const { isLoading, isError, error, data } = useGetStudentDetails(studentId);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {error.message}</div>;
    }


    if (!data) {
        return <div>No student data found</div>;
    }


    const studentDetail: StudentDetail = data;
    const date = new Date(studentDetail.dob);

    return (
        <div>
            <div>
                <div className="">
                    <h1>{studentDetail.firstName} {studentDetail.lastName}</h1>
                    <div className="subtitle">{studentDetail.school}</div>
                </div>

                <div className="profile-section">
                    <div className="section">
                        <h2>Personal Information</h2>
                        <div className="info-grid">
                            <p className="">Date of Birth:</p>
                            <p className="">{new Intl.DateTimeFormat().format(date)}</p>

                            <p className="">Phone:</p>
                            <p className="">{studentDetail.phone}</p>

                            <p className="">Country:</p>
                            <p className="">{studentDetail.country}</p>

                            <p className="">Year Joined:</p>
                            <p className="">{studentDetail.yearJoined}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}