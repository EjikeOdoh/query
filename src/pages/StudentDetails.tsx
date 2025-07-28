import Heading from "@/components/Heading";
import Row from "@/components/Row";
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

    const date = new Date(data.dob);

    return (
        <div>
            <div>
                <div className="">
                    <h1>{data.firstName} {data.lastName}</h1>
                    <div className="subtitle">{data.school}</div>
                </div>

                <div className="profile-section">
                    <div className="section">
                        <Heading
                            text="Personal Details"
                        />
                        <div className="info-grid">

                            <Row
                                label="Date of Birth"
                                value="Feb 6"
                            />
                            <Row
                                label="School"
                                value={data.school}
                            />
 <Row
                                label="Phone"
                                value={data.phone}
                            />
                            <p className="">Phone:</p>
                            <p className="">{data.phone}</p>

                            <p className="">Country:</p>
                            <p className="">{data.country}</p>

                            <p className="">Year Joined:</p>
                            <p className="">{data.yearJoined}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}